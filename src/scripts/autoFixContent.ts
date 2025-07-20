#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import ContentValidator from '../utils/contentValidator';

interface FixResult {
  file: string;
  originalErrors: number;
  fixedErrors: number;
  remainingErrors: number;
  fixesApplied: string[];
  manualReviewRequired: string[];
}

interface AutoFixReport {
  timestamp: string;
  summary: {
    filesProcessed: number;
    filesModified: number;
    totalFixesApplied: number;
    manualReviewRequired: number;
  };
  results: FixResult[];
  criticalRemaining: string[];
}

const AUTO_FIXES = [
  {
    name: 'Remove specific rate predictions',
    pattern: /\d+\.?\d*%\s*(interest|mortgage|rate|fixed|variable)/gi,
    replacement: '[current rates vary - contact for quote]',
    severity: 'critical'
  },
  {
    name: 'Fix discontinued FTHB program references',
    pattern: /(first[\s-]?time\s+home\s+buyer\s+(?:program|incentive))(?!\s*.*discontinued)/gi,
    replacement: '$1 (discontinued March 2024)',
    severity: 'critical'
  },
  {
    name: 'Replace specific stress test rates',
    pattern: /stress\s+test\s+rate:?\s*\d+\.?\d*%/gi,
    replacement: 'stress test rate (Bank of Canada qualifying rate)',
    severity: 'critical'
  },
  {
    name: 'Remove guarantee claims',
    pattern: /(guaranteed|guarantee)\s+(approval|qualification|rate)/gi,
    replacement: 'subject to $2',
    severity: 'critical'
  },
  {
    name: 'Fix Alberta provincial program claims',
    pattern: /alberta\s+(government|provincial)\s+(?:mortgage|housing|first.time|down.payment)\s+program/gi,
    replacement: 'federal and municipal programs (no provincial programs in Alberta)',
    severity: 'critical'
  },
  {
    name: 'Update date references to current year',
    pattern: /(?:as of|updated|current as of)\s+(?:20(?:1[5-9]|2[0-2]))/gi,
    replacement: `as of ${new Date().getFullYear()}`,
    severity: 'warning'
  },
  {
    name: 'Replace specific property values',
    pattern: /average\s+home\s+price:?\s*\$[\d,]+(?!\s*-\s*\$[\d,]+)/gi,
    replacement: 'average home prices vary by location',
    severity: 'warning'
  },
  {
    name: 'Add disclaimers to rate mentions',
    pattern: /(\d+\.?\d*%\s*-\s*\d+\.?\d*%)/g,
    replacement: '$1*',
    severity: 'info',
    addDisclaimer: '*Rates subject to qualification and market conditions'
  }
];

async function autoFixContent(): Promise<AutoFixReport> {
  const validator = new ContentValidator();
  const report: AutoFixReport = {
    timestamp: new Date().toISOString(),
    summary: {
      filesProcessed: 0,
      filesModified: 0,
      totalFixesApplied: 0,
      manualReviewRequired: 0
    },
    results: [],
    criticalRemaining: []
  };

  console.log('🔧 Starting automatic content fixes...\n');

  // Find all content files
  const contentPatterns = [
    'src/pages/blog/**/*.tsx',
    'src/content/**/*.md'
  ];

  const allFiles: string[] = [];
  for (const pattern of contentPatterns) {
    const files = await glob(pattern);
    allFiles.push(...files);
  }

  console.log(`📁 Found ${allFiles.length} files to process\n`);

  for (const filePath of allFiles) {
    console.log(`Processing: ${filePath}`);
    
    try {
      // Get original validation results
      const originalValidation = await validator.validateFile(filePath);
      const originalErrors = originalValidation.errors.length;
      
      if (originalErrors === 0) {
        console.log(`✅ No fixes needed`);
        continue;
      }

      // Read file content
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      const fixesApplied: string[] = [];
      const manualReviewRequired: string[] = [];

      // Apply auto-fixes
      for (const fix of AUTO_FIXES) {
        const matches = content.match(fix.pattern);
        if (matches) {
          console.log(`   🔧 Applying: ${fix.name} (${matches.length} instances)`);
          
          if (fix.severity === 'critical') {
            content = content.replace(fix.pattern, fix.replacement);
            fixesApplied.push(`${fix.name}: ${matches.length} fixes`);
            modified = true;
          } else {
            // For non-critical fixes, just log what would be changed
            console.log(`   ⚠️  Manual review needed: ${fix.name}`);
            manualReviewRequired.push(fix.name);
          }
        }
      }

      // Add disclaimers if needed
      if (content.includes('*Rates subject to qualification') === false && 
          content.match(/\d+\.?\d*%/)) {
        const disclaimerSection = `\n\n---\n\n*Rates and information subject to qualification and market conditions. This content is for educational purposes only. Consult with qualified mortgage professionals for personalized advice.*`;
        
        // Add disclaimer before closing tags in TSX files
        if (filePath.endsWith('.tsx')) {
          content = content.replace(/(\s+<\/ContentLayout>)/, `${disclaimerSection}$1`);
        } else {
          content += disclaimerSection;
        }
        fixesApplied.push('Added compliance disclaimer');
        modified = true;
      }

      // Save modified content
      if (modified) {
        // Create backup
        const backupPath = `${filePath}.backup.${Date.now()}`;
        fs.writeFileSync(backupPath, fs.readFileSync(filePath));
        console.log(`   💾 Backup saved: ${backupPath}`);
        
        // Write fixed content
        fs.writeFileSync(filePath, content);
        report.summary.filesModified++;
        console.log(`   ✅ File updated with ${fixesApplied.length} fixes`);
      }

      // Re-validate to check remaining errors
      const newValidation = await validator.validateFile(filePath);
      const remainingErrors = newValidation.errors.length;

      // Log remaining critical issues
      if (remainingErrors > 0) {
        console.log(`   ⚠️  ${remainingErrors} errors still require manual review`);
        newValidation.errors.forEach(error => {
          if (error.severity === 'error') {
            const issue = `${filePath}:${error.line} - ${error.rule}`;
            report.criticalRemaining.push(issue);
            console.log(`      - ${error.rule}: "${error.match}"`);
          }
        });
        report.summary.manualReviewRequired++;
      } else {
        console.log(`   ✅ All errors fixed!`);
      }

      // Add to results
      report.results.push({
        file: filePath,
        originalErrors,
        fixedErrors: originalErrors - remainingErrors,
        remainingErrors,
        fixesApplied,
        manualReviewRequired
      });

      report.summary.totalFixesApplied += fixesApplied.length;
      
    } catch (error) {
      console.error(`   ❌ Error processing ${filePath}:`, error);
    }

    report.summary.filesProcessed++;
    console.log('');
  }

  // Print summary
  console.log('📊 AUTO-FIX SUMMARY');
  console.log('='.repeat(50));
  console.log(`Files Processed: ${report.summary.filesProcessed}`);
  console.log(`Files Modified: ${report.summary.filesModified}`);
  console.log(`Total Fixes Applied: ${report.summary.totalFixesApplied}`);
  console.log(`Files Needing Manual Review: ${report.summary.manualReviewRequired}`);
  console.log('');

  if (report.criticalRemaining.length > 0) {
    console.log('🚨 MANUAL REVIEW REQUIRED:');
    report.criticalRemaining.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
    console.log('These issues require human judgment and cannot be auto-fixed.');
    console.log('Run "npm run validate" to see detailed suggestions.');
    console.log('');
  } else {
    console.log('✅ All critical errors have been auto-fixed!');
    console.log('Run "npm run validate" to confirm all issues are resolved.');
    console.log('');
  }

  // Save report
  const reportPath = path.join(process.cwd(), 'auto-fix-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Auto-fix report saved to: ${reportPath}`);

  return report;
}

// Run auto-fix if called directly
if (require.main === module) {
  autoFixContent().catch(console.error);
}

export { autoFixContent, AutoFixReport };