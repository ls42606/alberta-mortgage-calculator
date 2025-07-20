#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import ContentValidator from '../utils/contentValidator';

interface ValidationReport {
  timestamp: string;
  summary: {
    totalFiles: number;
    filesWithErrors: number;
    totalErrors: number;
    totalWarnings: number;
    passRate: number;
  };
  files: Array<{
    path: string;
    isValid: boolean;
    errors: number;
    warnings: number;
    details?: any;
  }>;
  criticalIssues: string[];
  recommendations: string[];
}

async function validateAllContent(): Promise<ValidationReport> {
  const validator = new ContentValidator();
  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: 0,
      filesWithErrors: 0,
      totalErrors: 0,
      totalWarnings: 0,
      passRate: 0
    },
    files: [],
    criticalIssues: [],
    recommendations: []
  };

  console.log('🔍 Starting content validation audit...\n');

  // Scan all content files
  const contentPatterns = [
    'src/pages/blog/**/*.tsx',
    'src/content/**/*.md',
    'src/components/ContentLayout.tsx'
  ];

  const allFiles: string[] = [];
  for (const pattern of contentPatterns) {
    const files = await glob(pattern);
    allFiles.push(...files);
  }

  report.summary.totalFiles = allFiles.length;
  console.log(`📁 Found ${allFiles.length} content files to validate\n`);

  let hasBlockingErrors = false;

  for (const file of allFiles) {
    console.log(`Validating: ${file}`);
    
    try {
      const validation = await validator.validateFile(file);
      
      report.files.push({
        path: file,
        isValid: validation.isValid,
        errors: validation.errors.length,
        warnings: validation.warnings.length,
        details: validation
      });

      report.summary.totalErrors += validation.errors.length;
      report.summary.totalWarnings += validation.warnings.length;

      if (!validation.isValid) {
        report.summary.filesWithErrors++;
        
        // Log errors
        validation.errors.forEach(error => {
          const message = `❌ ${file}:${error.line} - ${error.rule}: "${error.match}"`;
          console.log(message);
          
          if (error.severity === 'error') {
            report.criticalIssues.push(`${file}:${error.line} - ${error.rule}`);
            hasBlockingErrors = true;
          }
          
          if (error.suggestion) {
            console.log(`   💡 Suggestion: ${error.suggestion}`);
          }
        });

        // Log warnings
        validation.warnings.forEach(warning => {
          console.log(`⚠️  ${file}:${warning.line} - ${warning.rule}: "${warning.match}"`);
        });
      } else {
        console.log(`✅ PASS`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`❌ Error validating ${file}:`, error);
      hasBlockingErrors = true;
      
      report.files.push({
        path: file,
        isValid: false,
        errors: 1,
        warnings: 0
      });
      
      report.summary.totalErrors++;
      report.summary.filesWithErrors++;
    }
  }

  // Calculate pass rate
  report.summary.passRate = ((report.summary.totalFiles - report.summary.filesWithErrors) / report.summary.totalFiles) * 100;

  // Generate recommendations
  if (report.summary.totalErrors > 0) {
    report.recommendations.push('🚨 IMMEDIATE: Fix all critical errors before deployment');
    report.recommendations.push('📝 Run: npm run fix-content --auto-fix to auto-correct common issues');
    report.recommendations.push('🔧 Manual review required for guarantee claims and program references');
  }
  
  if (report.summary.totalWarnings > 0) {
    report.recommendations.push('⚠️  Review warnings - they indicate potential accuracy issues');
    report.recommendations.push('📅 Update date stamps to current year');
  }

  // Print summary
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Files Scanned: ${report.summary.totalFiles}`);
  console.log(`Files with Errors: ${report.summary.filesWithErrors}`);
  console.log(`Total Errors: ${report.summary.totalErrors}`);
  console.log(`Total Warnings: ${report.summary.totalWarnings}`);
  console.log(`Pass Rate: ${report.summary.passRate.toFixed(1)}%`);
  console.log('');

  if (report.criticalIssues.length > 0) {
    console.log('🚨 CRITICAL ISSUES FOUND:');
    report.criticalIssues.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
  }

  if (report.recommendations.length > 0) {
    console.log('💡 RECOMMENDATIONS:');
    report.recommendations.forEach(rec => console.log(`   ${rec}`));
    console.log('');
  }

  // Save detailed report
  const reportPath = path.join(process.cwd(), 'validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}`);

  // Generate markdown report
  const markdownReport = generateMarkdownReport(report);
  const markdownPath = path.join(process.cwd(), 'VALIDATION_REPORT.md');
  fs.writeFileSync(markdownPath, markdownReport);
  console.log(`📝 Markdown report saved to: ${markdownPath}`);

  // Exit with error code if blocking errors found
  if (hasBlockingErrors) {
    console.log('\n🛑 BUILD BLOCKED: Critical errors must be fixed before deployment');
    process.exit(1);
  } else if (report.summary.totalWarnings > 0) {
    console.log('\n⚠️  BUILD WARNING: Review warnings but deployment allowed');
    process.exit(0);
  } else {
    console.log('\n✅ ALL VALIDATION PASSED: Content is deployment-ready');
    process.exit(0);
  }

  return report;
}

function generateMarkdownReport(report: ValidationReport): string {
  let markdown = `# Content Validation Report\n\n`;
  markdown += `**Generated**: ${report.timestamp}\n\n`;
  
  markdown += `## 📊 Summary\n\n`;
  markdown += `| Metric | Value |\n`;
  markdown += `|--------|-------|\n`;
  markdown += `| Files Scanned | ${report.summary.totalFiles} |\n`;
  markdown += `| Files with Errors | ${report.summary.filesWithErrors} |\n`;
  markdown += `| Total Errors | ${report.summary.totalErrors} |\n`;
  markdown += `| Total Warnings | ${report.summary.totalWarnings} |\n`;
  markdown += `| Pass Rate | ${report.summary.passRate.toFixed(1)}% |\n\n`;

  if (report.criticalIssues.length > 0) {
    markdown += `## 🚨 Critical Issues (Must Fix)\n\n`;
    report.criticalIssues.forEach(issue => {
      markdown += `- ${issue}\n`;
    });
    markdown += `\n`;
  }

  if (report.summary.totalErrors > 0) {
    markdown += `## ❌ Files with Errors\n\n`;
    report.files
      .filter(f => f.errors > 0)
      .forEach(file => {
        markdown += `### ${file.path}\n`;
        markdown += `- **Errors**: ${file.errors}\n`;
        markdown += `- **Warnings**: ${file.warnings}\n\n`;
        
        if (file.details?.errors) {
          file.details.errors.forEach((error: any) => {
            markdown += `**Line ${error.line}**: ${error.rule}\n`;
            markdown += `- Found: \`${error.match}\`\n`;
            if (error.suggestion) {
              markdown += `- Fix: \`${error.suggestion}\`\n`;
            }
            markdown += `\n`;
          });
        }
      });
  }

  if (report.recommendations.length > 0) {
    markdown += `## 💡 Recommendations\n\n`;
    report.recommendations.forEach(rec => {
      markdown += `${rec}\n\n`;
    });
  }

  markdown += `## 🛠️ Quick Fixes\n\n`;
  markdown += `\`\`\`bash\n`;
  markdown += `# Auto-fix common issues\n`;
  markdown += `npm run fix-content\n\n`;
  markdown += `# Re-run validation\n`;
  markdown += `npm run validate\n\n`;
  markdown += `# Build with validation\n`;
  markdown += `npm run build\n`;
  markdown += `\`\`\`\n\n`;

  return markdown;
}

// Run validation if called directly
if (require.main === module) {
  validateAllContent().catch(console.error);
}

export { validateAllContent, ValidationReport };