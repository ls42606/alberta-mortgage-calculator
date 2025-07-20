#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Professional-grade validation rules for mortgage industry accuracy
const CRITICAL_VALIDATION_RULES = [
  {
    name: 'Specific rate predictions',
    pattern: /\d+\.?\d*%\s*(interest|mortgage|rate|fixed|variable)/gi,
    severity: 'error',
    message: 'Specific rate predictions are prohibited - causes Google penalties'
  },
  {
    name: 'Active FTHB program claims',
    pattern: /(first[\s-]?time\s+home\s+buyer\s+(?:program|incentive))(?!\s*.*discontinued)/gi,
    severity: 'error',
    message: 'CRITICAL: Program discontinued - must specify discontinuation'
  },
  {
    name: 'Guarantee claims',
    pattern: /(guaranteed|guarantee)\s+(approval|qualification|rate)/gi,
    severity: 'error',
    message: 'LEGAL RISK: Remove all guarantee claims immediately'
  },
  {
    name: 'Specific stress test rates',
    pattern: /stress\s+test\s+rate:?\s*(\d+\.?\d*)%/gi,
    severity: 'error',
    message: 'Use "Bank of Canada qualifying rate" instead of specific percentages'
  },
  {
    name: 'Alberta provincial program claims',
    pattern: /alberta\s+(government|provincial)\s+(?:mortgage|housing|first.time|down.payment)\s+program/gi,
    severity: 'error',
    message: 'Alberta has minimal municipal programs only - no provincial programs'
  },
  {
    name: 'Outdated GDS ratio (32%)',
    pattern: /(?:gds|gross\s+debt\s+service).*?32%|32%.*?(?:gds|gross\s+debt\s+service|maximum|ratio)/gi,
    severity: 'error',
    message: 'PROFESSIONAL ERROR: GDS maximum is 39% for CMHC, 45% for conventional - not 32%'
  },
  {
    name: 'Outdated TDS ratio (40%)',
    pattern: /(?:tds|total\s+debt\s+service).*?40%|40%.*?(?:tds|total\s+debt\s+service|maximum|ratio)/gi,
    severity: 'error',
    message: 'PROFESSIONAL ERROR: TDS maximum is 44% for CMHC, 50% for conventional - not 40%'
  },
  {
    name: 'Standalone 32% GDS without context',
    pattern: /(?:^|[^a-zA-Z])32%(?!\s*(?:down|deposit|savings|fee|commission|ltv|loan.to.value|interest|rate|APR|markup|margin))/gi,
    severity: 'warning',
    message: 'CONTEXT WARNING: 32% likely refers to debt service ratio - specify CMHC vs conventional'
  },
  {
    name: 'Standalone 40% TDS without context',
    pattern: /(?:^|[^a-zA-Z])40%(?!\s*(?:down|deposit|savings|fee|commission|ltv|loan.to.value|interest|rate|APR|markup|margin))/gi,
    severity: 'warning',
    message: 'CONTEXT WARNING: 40% likely refers to debt service ratio - specify CMHC vs conventional'
  },
  {
    name: 'Generic debt service ratios without context',
    pattern: /(?:maximum|limit).{0,20}(?:32%|40%).{0,20}(?:debt\s+service|gds|tds)/gi,
    severity: 'error',
    message: 'SPECIFY: Must distinguish between CMHC (39%/44%) vs conventional (45%/50%) standards'
  },
  {
    name: 'Old CMHC ratios (35% GDS)',
    pattern: /(?:cmhc|insured).{0,30}35%/gi,
    severity: 'error',
    message: 'OUTDATED: CMHC GDS increased from 35% to 39% in July 2021'
  },
  {
    name: 'Old CMHC ratios (42% TDS)',
    pattern: /(?:cmhc|insured).{0,30}42%/gi,
    severity: 'error',
    message: 'OUTDATED: CMHC TDS increased from 42% to 44% in July 2021'
  },
  {
    name: 'Missing mortgage type context for ratios',
    pattern: /(?:gds|tds|debt\s+service).*?(?:maximum|limit|ratio)(?!.*(?:cmhc|conventional|insured|uninsured))/gi,
    severity: 'warning',
    message: 'CLARITY: Specify if referring to CMHC insured vs conventional uninsured mortgage ratios'
  }
];

function findLineNumber(content, searchText) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes(searchText.toLowerCase())) {
      return i + 1;
    }
  }
  return 1;
}

async function validateContent(content) {
  const errors = [];
  const warnings = [];
  
  for (const rule of CRITICAL_VALIDATION_RULES) {
    const matches = content.match(rule.pattern);
    if (matches) {
      for (const match of matches) {
        const lineNumber = findLineNumber(content, match);
        const issue = {
          rule: rule.name,
          match: match.trim(),
          line: lineNumber,
          severity: rule.severity,
          message: rule.message
        };
        
        if (rule.severity === 'error') {
          errors.push(issue);
        } else {
          warnings.push(issue);
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalIssues: errors.length + warnings.length,
      errorRate: errors.length / Math.max(1, errors.length + warnings.length)
    }
  };
}

async function validateAllContent() {
  console.log('🔍 Starting critical content validation audit...\n');
  
  // Find all content files
  const contentPatterns = [
    'src/pages/blog/**/*.tsx',
    'src/content/**/*.md'
  ];
  
  const allFiles = [];
  for (const pattern of contentPatterns) {
    try {
      const files = await glob(pattern);
      allFiles.push(...files);
    } catch (error) {
      console.error(`Error finding files with pattern ${pattern}:`, error.message);
    }
  }
  
  console.log(`📁 Found ${allFiles.length} content files to validate\n`);
  
  let totalErrors = 0;
  let totalWarnings = 0;
  let filesWithErrors = 0;
  const criticalIssues = [];
  
  for (const filePath of allFiles) {
    console.log(`Validating: ${filePath}`);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const validation = await validateContent(content);
      
      if (validation.errors.length > 0) {
        filesWithErrors++;
        console.log(`❌ ${validation.errors.length} critical errors found:`);
        
        validation.errors.forEach(error => {
          console.log(`   Line ${error.line}: ${error.rule}`);
          console.log(`   Found: "${error.match}"`);
          console.log(`   Issue: ${error.message}`);
          criticalIssues.push(`${filePath}:${error.line} - ${error.rule}`);
        });
      } else {
        console.log(`✅ PASS`);
      }
      
      if (validation.warnings.length > 0) {
        console.log(`⚠️  ${validation.warnings.length} warnings`);
      }
      
      totalErrors += validation.errors.length;
      totalWarnings += validation.warnings.length;
      
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message);
      totalErrors++;
      filesWithErrors++;
    }
    
    console.log('');
  }
  
  // Print summary
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Files Scanned: ${allFiles.length}`);
  console.log(`Files with Errors: ${filesWithErrors}`);
  console.log(`Critical Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log(`Pass Rate: ${((allFiles.length - filesWithErrors) / allFiles.length * 100).toFixed(1)}%`);
  console.log('');
  
  if (criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES - MUST FIX BEFORE DEPLOY:');
    criticalIssues.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
    console.log('These issues will cause Google penalties and legal problems.');
    console.log('Run "npm run fix-content" to auto-fix critical issues.');
    console.log('');
  }
  
  // Save simple report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: allFiles.length,
      filesWithErrors,
      totalErrors,
      totalWarnings,
      passRate: ((allFiles.length - filesWithErrors) / allFiles.length * 100).toFixed(1)
    },
    criticalIssues
  };
  
  fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));
  console.log(`📄 Report saved to: validation-report.json`);
  
  // Exit with error if critical issues found
  if (totalErrors > 0) {
    console.log('\n🛑 BUILD BLOCKED: Critical errors must be fixed before deployment');
    process.exit(1);
  } else {
    console.log('\n✅ VALIDATION PASSED: Content is deployment-ready');
    process.exit(0);
  }
}

// Run validation
validateAllContent().catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});