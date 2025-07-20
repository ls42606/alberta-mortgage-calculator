#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const AUTO_FIXES = [
  {
    name: 'Fix discontinued FTHB program references',
    pattern: /(first[\s-]?time\s+home\s+buyer\s+(?:program|incentive))(?!\s*.*discontinued)/gi,
    replacement: '$1 (discontinued March 2024)',
    critical: true
  },
  {
    name: 'Remove guarantee claims',
    pattern: /(guaranteed|guarantee)\s+(approval|qualification|rate)/gi,
    replacement: 'subject to $2',
    critical: true
  },
  {
    name: 'Fix specific stress test rates',
    pattern: /stress\s+test\s+rate:?\s*\d+\.?\d*%/gi,
    replacement: 'stress test rate (Bank of Canada qualifying rate)',
    critical: true
  },
  {
    name: 'Remove specific rate predictions',
    pattern: /\d+\.?\d*%\s*(interest|mortgage|rate|fixed|variable)(?!\s*-\s*\d+\.?\d*%)/gi,
    replacement: '[current rates vary - contact for quote]',
    critical: true
  },
  {
    name: 'Fix Alberta provincial program claims',
    pattern: /alberta\s+(government|provincial)\s+(?:mortgage|housing|first.time|down.payment)\s+program/gi,
    replacement: 'federal and municipal programs (no provincial programs in Alberta)',
    critical: true
  },
  {
    name: 'Fix outdated 32% GDS ratio',
    pattern: /(?:gds|gross\s+debt\s+service).*?32%|32%.*?(?:gds|gross\s+debt\s+service)/gi,
    replacement: 'GDS maximum: 39% (CMHC insured) or 45% (conventional)',
    critical: true
  },
  {
    name: 'Fix outdated 40% TDS ratio',
    pattern: /(?:tds|total\s+debt\s+service).*?40%|40%.*?(?:tds|total\s+debt\s+service)/gi,
    replacement: 'TDS maximum: 44% (CMHC insured) or 50% (conventional)',
    critical: true
  },
  {
    name: 'Fix old CMHC 35% GDS',
    pattern: /(?:cmhc|insured).{0,30}35%/gi,
    replacement: 'CMHC maximum 39% GDS (updated July 2021)',
    critical: true
  },
  {
    name: 'Fix old CMHC 42% TDS',
    pattern: /(?:cmhc|insured).{0,30}42%/gi,
    replacement: 'CMHC maximum 44% TDS (updated July 2021)',
    critical: true
  },
  {
    name: 'Fix generic 32% maximum claims',
    pattern: /maximum\s+32%/gi,
    replacement: 'maximum varies: CMHC 39%, conventional 45% (GDS)',
    critical: true
  },
  {
    name: 'Fix generic 40% maximum claims', 
    pattern: /maximum\s+40%/gi,
    replacement: 'maximum varies: CMHC 44%, conventional 50% (TDS)',
    critical: true
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

async function autoFixFile(filePath) {
  console.log(`🔧 Processing: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const fixesApplied = [];
    
    // Create backup
    const backupPath = `${filePath}.backup.${Date.now()}`;
    fs.writeFileSync(backupPath, content);
    
    // Apply critical fixes
    for (const fix of AUTO_FIXES) {
      if (fix.critical) {
        const matches = content.match(fix.pattern);
        if (matches) {
          console.log(`   ⚡ Applying: ${fix.name} (${matches.length} instances)`);
          content = content.replace(fix.pattern, fix.replacement);
          fixesApplied.push(`${fix.name}: ${matches.length} fixes`);
          modified = true;
        }
      }
    }
    
    // Add disclaimer if needed and missing
    if (content.includes('*Rates and information subject to qualification') === false && 
        (content.includes('rate') || content.includes('program'))) {
      
      const disclaimer = `\n\n---\n\n*Rates and information subject to qualification and market conditions. This content is for educational purposes only. Consult with qualified mortgage professionals for personalized advice.*`;
      
      if (filePath.endsWith('.tsx')) {
        // Add before closing ContentLayout tag
        content = content.replace(/(\s+<\/ContentLayout>)/, `${disclaimer}$1`);
      } else if (filePath.endsWith('.md')) {
        // Add at end of markdown
        content += disclaimer;
      }
      
      if (content.includes(disclaimer)) {
        fixesApplied.push('Added compliance disclaimer');
        modified = true;
      }
    }
    
    // Save if modified
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`   ✅ Fixed! Applied ${fixesApplied.length} corrections`);
      console.log(`   💾 Backup: ${backupPath}`);
      
      fixesApplied.forEach(fix => console.log(`      - ${fix}`));
    } else {
      console.log(`   ✅ No fixes needed`);
      // Remove backup if no changes
      fs.unlinkSync(backupPath);
    }
    
    return { modified, fixesApplied };
    
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return { modified: false, fixesApplied: [] };
  }
}

async function autoFixAllContent() {
  console.log('🔧 Starting automatic content fixes...\n');
  
  // Find content files
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
  
  console.log(`📁 Found ${allFiles.length} files to process\n`);
  
  let filesModified = 0;
  let totalFixes = 0;
  
  for (const filePath of allFiles) {
    const result = await autoFixFile(filePath);
    if (result.modified) {
      filesModified++;
      totalFixes += result.fixesApplied.length;
    }
    console.log('');
  }
  
  // Summary
  console.log('📊 AUTO-FIX SUMMARY');
  console.log('='.repeat(50));
  console.log(`Files Processed: ${allFiles.length}`);
  console.log(`Files Modified: ${filesModified}`);
  console.log(`Total Fixes Applied: ${totalFixes}`);
  console.log('');
  
  if (filesModified > 0) {
    console.log('✅ Critical accuracy issues have been auto-fixed!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run "npm run validate" to confirm all issues are resolved');
    console.log('2. Review the changes in your editor');
    console.log('3. Run "npm run build" to build with validation');
    console.log('');
  } else {
    console.log('ℹ️  No critical issues found to auto-fix.');
  }
  
  console.log('💡 Backup files created - delete them after confirming fixes are correct.');
}

// Run auto-fix
autoFixAllContent().catch(error => {
  console.error('Auto-fix failed:', error);
  process.exit(1);
});