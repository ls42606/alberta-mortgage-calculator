import fs from 'fs';
import path from 'path';

interface ValidationRule {
  pattern: RegExp;
  validator: (match: string) => Promise<ValidationResult>;
  severity: 'error' | 'warning' | 'info';
  description: string;
}

interface ValidationResult {
  isValid: boolean;
  correctValue?: string;
  source?: string;
  confidence: number; // 0-1
  lastVerified: Date;
  message?: string;
}

interface ContentValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  stats: {
    totalClaims: number;
    validatedClaims: number;
    errorRate: number;
  };
}

interface ValidationError {
  rule: string;
  match: string;
  line: number;
  severity: 'error' | 'warning' | 'info';
  suggestion?: string;
  source?: string;
}

interface ValidationWarning extends ValidationError {}

const VALIDATION_RULES: ValidationRule[] = [
  {
    // Kill any specific rate predictions
    pattern: /\d+\.?\d*%\s*(interest|mortgage|rate|fixed|variable)/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: '[current rates vary - contact for quote]',
      source: 'Content policy violation - specific rates forbidden',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'Specific rate predictions are prohibited and cause Google penalties'
    }),
    severity: 'error',
    description: 'Specific mortgage rate predictions'
  },
  {
    // Validate CMHC insurance rates - only allow official ranges
    pattern: /(CMHC|mortgage)\s+insurance:?\s*(\d+\.?\d*)%/gi,
    validator: async (match) => {
      const validRanges = ['0.6% to 4.5%', '0.6% - 4.5%'];
      const isValidRange = validRanges.some(range => match.toLowerCase().includes(range.toLowerCase()));
      
      return {
        isValid: isValidRange,
        correctValue: isValidRange ? match : 'CMHC insurance premiums range from 0.6% to 4.5%',
        source: 'https://www.cmhc-schl.gc.ca/en/consumers/home-buying/mortgage-loan-insurance-for-consumers/cmhc-mortgage-loan-insurance-cost',
        confidence: 1.0,
        lastVerified: new Date(),
        message: 'Only official CMHC rate ranges allowed'
      };
    },
    severity: 'error',
    description: 'CMHC insurance rate validation'
  },
  {
    // Flag any "First Time Home Buyer Program" claims - DANGEROUS
    pattern: /first[\s-]?time\s+home\s+buyer\s+(program|incentive)\s*(?!.*discontinued)/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: 'First-Time Home Buyer Incentive (discontinued March 2024)',
      source: 'Federal program discontinued - major liability if claimed as active',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'CRITICAL: Program discontinued - must specify discontinuation'
    }),
    severity: 'error',
    description: 'Discontinued FTHB program references'
  },
  {
    // Flag specific property value claims
    pattern: /average\s+home\s+price:?\s*\$[\d,]+/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: 'Home prices vary by location and market conditions',
      source: 'Specific price claims without date stamps cause accuracy issues',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'Use price ranges with recent date stamps only'
    }),
    severity: 'warning',
    description: 'Specific property value claims'
  },
  {
    // Validate stress test rate claims
    pattern: /stress\s+test\s+rate:?\s*(\d+\.?\d*)%/gi,
    validator: async (match) => {
      // Only allow references to "Bank of Canada qualifying rate" or "current qualifying rate"
      return {
        isValid: false,
        correctValue: 'Bank of Canada qualifying rate (updated weekly)',
        source: 'Stress test rates change weekly - use dynamic references only',
        confidence: 1.0,
        lastVerified: new Date(),
        message: 'Use "Bank of Canada qualifying rate" instead of specific percentages'
      };
    },
    severity: 'error',
    description: 'Stress test rate specificity'
  },
  {
    // Flag "guaranteed" or "guaranteed approval" claims
    pattern: /(guaranteed|guarantee)\s+(approval|qualification|rate)/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: 'Subject to qualification and approval',
      source: 'Guaranteed claims violate lending regulations',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'LEGAL RISK: Remove all guarantee claims immediately'
    }),
    severity: 'error',
    description: 'Illegal guarantee claims'
  },
  {
    // Flag Alberta provincial program claims (none exist)
    pattern: /alberta\s+(government|provincial)\s+(?:mortgage|housing|first.time|down.payment)\s+program/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: 'No provincial mortgage programs in Alberta',
      source: 'Alberta has no provincial mortgage assistance programs',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'Alberta has minimal municipal programs only - no provincial programs'
    }),
    severity: 'error',
    description: 'Non-existent Alberta provincial programs'
  },
  {
    // Flag outdated date references
    pattern: /(?:as of|updated|current as of)\s+(?:20(?:1[5-9]|2[0-2]))/gi,
    validator: async (match) => ({
      isValid: false,
      correctValue: `Updated ${new Date().toLocaleDateString('en-CA')}`,
      source: 'Outdated content timestamps',
      confidence: 1.0,
      lastVerified: new Date(),
      message: 'Update date stamps to current year'
    }),
    severity: 'warning',
    description: 'Outdated date references'
  }
];

class ContentValidator {
  private factRegistry: any = null;

  constructor() {
    this.loadFactRegistry();
  }

  private loadFactRegistry() {
    try {
      const registryPath = path.join(process.cwd(), 'src/data/factRegistry.json');
      if (fs.existsSync(registryPath)) {
        this.factRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      }
    } catch (error) {
      console.warn('Fact registry not found - validation will be limited');
    }
  }

  async validateContent(content: string): Promise<ContentValidationResult> {
    const lines = content.split('\n');
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let totalClaims = 0;
    let validatedClaims = 0;

    for (const rule of VALIDATION_RULES) {
      const matches = content.match(rule.pattern);
      if (matches) {
        totalClaims += matches.length;
        
        for (const match of matches) {
          const result = await rule.validator(match);
          const lineNumber = this.findLineNumber(content, match);
          
          const validationItem = {
            rule: rule.description,
            match,
            line: lineNumber,
            severity: rule.severity,
            suggestion: result.correctValue,
            source: result.source
          };

          if (!result.isValid) {
            if (rule.severity === 'error') {
              errors.push(validationItem);
            } else {
              warnings.push(validationItem);
            }
          } else {
            validatedClaims++;
          }
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      stats: {
        totalClaims,
        validatedClaims,
        errorRate: totalClaims > 0 ? (errors.length / totalClaims) : 0
      }
    };
  }

  async sanitizeContent(content: string): Promise<{ content: string; warnings: ValidationWarning[] }> {
    let sanitized = content;
    const warnings: ValidationWarning[] = [];

    for (const rule of VALIDATION_RULES) {
      if (rule.severity === 'error') {
        const matches = content.match(rule.pattern);
        if (matches) {
          for (const match of matches) {
            const result = await rule.validator(match);
            if (!result.isValid && result.correctValue) {
              sanitized = sanitized.replace(match, result.correctValue);
              warnings.push({
                rule: rule.description,
                match,
                line: this.findLineNumber(content, match),
                severity: 'warning' as const,
                suggestion: result.correctValue,
                source: result.source
              });
            }
          }
        }
      }
    }

    return { content: sanitized, warnings };
  }

  private findLineNumber(content: string, searchText: string): number {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchText)) {
        return i + 1;
      }
    }
    return 1;
  }

  async validateFile(filePath: string): Promise<ContentValidationResult> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return await this.validateContent(content);
    } catch (error) {
      return {
        isValid: false,
        errors: [{
          rule: 'File access error',
          match: filePath,
          line: 0,
          severity: 'error',
          suggestion: 'Check file path and permissions'
        }],
        warnings: [],
        stats: { totalClaims: 0, validatedClaims: 0, errorRate: 1.0 }
      };
    }
  }

  generateReport(results: ContentValidationResult[]): string {
    const totalFiles = results.length;
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
    const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
    const filesWithErrors = results.filter(r => r.errors.length > 0).length;

    let report = `# Content Validation Report\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n\n`;
    report += `## Summary\n`;
    report += `- **Files Scanned**: ${totalFiles}\n`;
    report += `- **Files with Errors**: ${filesWithErrors}\n`;
    report += `- **Total Errors**: ${totalErrors}\n`;
    report += `- **Total Warnings**: ${totalWarnings}\n`;
    report += `- **Pass Rate**: ${((totalFiles - filesWithErrors) / totalFiles * 100).toFixed(1)}%\n\n`;

    if (totalErrors > 0) {
      report += `## ❌ CRITICAL ERRORS (Must Fix Before Deploy)\n\n`;
      results.forEach((result, index) => {
        if (result.errors.length > 0) {
          report += `### File ${index + 1}: ${result.errors.length} errors\n`;
          result.errors.forEach(error => {
            report += `- **Line ${error.line}**: ${error.rule}\n`;
            report += `  - Found: \`${error.match}\`\n`;
            report += `  - Fix: \`${error.suggestion || 'See guidelines'}\`\n`;
            if (error.source) {
              report += `  - Source: ${error.source}\n`;
            }
            report += `\n`;
          });
        }
      });
    }

    return report;
  }
}

export default ContentValidator;
export { ValidationRule, ValidationResult, ContentValidationResult, ValidationError };