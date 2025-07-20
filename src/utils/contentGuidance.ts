/**
 * AI Content Guidance System
 * Professional mortgage industry standards and accuracy guidelines
 * for preventing common errors in AI-generated content
 */

export interface ContentGuidance {
  category: string;
  guidance: string[];
  commonErrors: string[];
  correctUsage: string[];
  sources: string[];
}

export const MORTGAGE_CONTENT_GUIDANCE: ContentGuidance[] = [
  {
    category: "Debt Service Ratios",
    guidance: [
      "ALWAYS specify mortgage type when mentioning debt service ratios",
      "CMHC insured mortgages: 39% GDS maximum, 44% TDS maximum (as of July 2021)",
      "Conventional mortgages (20%+ down): 45% GDS maximum, 50% TDS maximum",
      "Some banks use conservative internal guidelines (30-32% GDS, 37-40% TDS)",
      "Never use generic ratios without context - always specify CMHC vs conventional"
    ],
    commonErrors: [
      "Stating '32% GDS maximum' without specifying mortgage type",
      "Stating '40% TDS maximum' without specifying mortgage type", 
      "Using old CMHC ratios (35% GDS, 42% TDS) from pre-2021",
      "Not distinguishing between insured and uninsured mortgages",
      "Calling conservative bank guidelines 'industry standards'"
    ],
    correctUsage: [
      "CMHC insured mortgages have a maximum 39% GDS and 44% TDS ratio",
      "Conventional mortgages allow higher ratios: up to 45% GDS and 50% TDS",
      "Some lenders use conservative internal guidelines of 30-32% GDS",
      "Debt service ratio requirements depend on mortgage type and lender"
    ],
    sources: [
      "CMHC underwriting guidelines (July 2021 update)",
      "Bank lending standards for uninsured mortgages",
      "Individual bank internal policies (RBC, BMO, Scotia)"
    ]
  },
  {
    category: "Government Programs",
    guidance: [
      "First-Time Home Buyer Incentive was DISCONTINUED in March 2024",
      "ALWAYS specify program status and dates",
      "Alberta has NO provincial mortgage assistance programs",
      "Only federal programs and limited municipal programs exist",
      "Verify all program information with official government sources"
    ],
    commonErrors: [
      "Referring to FTHB Incentive as currently available",
      "Claiming Alberta has provincial mortgage programs",
      "Using outdated program benefits or eligibility",
      "Not specifying program discontinuation dates",
      "Confusing federal vs provincial vs municipal programs"
    ],
    correctUsage: [
      "First-Time Home Buyer Incentive (discontinued March 2024)",
      "Home Buyers' Amount: $1,500 federal tax credit (current)",
      "RRSP Home Buyers' Plan: $35,000 withdrawal limit per person",
      "Alberta: No provincial programs, limited municipal assistance only"
    ],
    sources: [
      "CMHC official announcements",
      "Canada Revenue Agency",
      "Alberta Housing Corporation",
      "Municipal housing authorities (Calgary, Edmonton)"
    ]
  },
  {
    category: "Interest Rates and Predictions",
    guidance: [
      "NEVER make specific rate predictions or quotes",
      "Use 'current rates vary' or 'contact for quote' instead",
      "Reference Bank of Canada qualifying rate for stress test",
      "Always include rate disclaimers",
      "Focus on rate structures, not specific numbers"
    ],
    commonErrors: [
      "Stating specific rates (e.g., '5.79% fixed')",
      "Making rate predictions or forecasts",
      "Using outdated rate examples",
      "Claiming specific rates without disclaimers",
      "Confusing contract rates with qualifying rates"
    ],
    correctUsage: [
      "Rates vary by lender and qualification - contact for current quotes",
      "Stress test rate: Bank of Canada qualifying rate (updated weekly)", 
      "Fixed and variable rates both subject to qualification",
      "Rate ranges depend on term, lender, and borrower profile"
    ],
    sources: [
      "Bank of Canada benchmark rates",
      "OSFI B-20 Guidelines", 
      "Individual lender rate sheets (not for publication)"
    ]
  },
  {
    category: "Legal and Compliance",
    guidance: [
      "NEVER use 'guaranteed' for anything mortgage-related",
      "Include appropriate disclaimers on all content",
      "Specify information is for educational purposes",
      "Recommend consulting qualified professionals",
      "Avoid giving specific financial advice"
    ],
    commonErrors: [
      "Using 'guaranteed approval' or similar claims",
      "Providing specific financial advice",
      "Missing compliance disclaimers",
      "Overstating program benefits",
      "Not recommending professional consultation"
    ],
    correctUsage: [
      "Subject to qualification and approval",
      "This information is for educational purposes only",
      "Consult with qualified mortgage professionals",
      "Rates and programs subject to change",
      "Individual circumstances may vary"
    ],
    sources: [
      "Financial industry regulations",
      "Professional licensing requirements",
      "Legal compliance best practices"
    ]
  },
  {
    category: "Market Data and Statistics",
    guidance: [
      "Use recent data with clear date stamps",
      "Provide price ranges, not specific values",
      "Include location and market condition disclaimers",
      "Reference official sources for all statistics",
      "Update market data regularly (monthly/quarterly)"
    ],
    commonErrors: [
      "Using outdated market statistics",
      "Providing specific property values without context",
      "Making broad market predictions",
      "Using unofficial or questionable data sources",
      "Not specifying data collection dates"
    ],
    correctUsage: [
      "Market data as of [specific date]",
      "Prices vary by location, condition, and market timing",
      "Average home prices range from $X to $Y (Q4 2024)",
      "Source: [Official real estate board/government agency]"
    ],
    sources: [
      "CREA (Canadian Real Estate Association)",
      "Local real estate boards",
      "Statistics Canada",
      "CMHC Housing Market Reports"
    ]
  }
];

/**
 * Content validation against professional guidance
 */
export function validateContentAgainstGuidance(content: string): {
  violations: Array<{
    category: string;
    issue: string;
    suggestion: string;
    severity: 'error' | 'warning';
  }>;
  score: number;
} {
  const violations = [];
  let score = 100;

  for (const guidance of MORTGAGE_CONTENT_GUIDANCE) {
    // Check for common errors specific to each category
    if (guidance.category === "Debt Service Ratios") {
      if (content.match(/32%.*(?:gds|gross debt service|maximum)/gi)) {
        violations.push({
          category: guidance.category,
          issue: "Uses outdated 32% GDS without specifying mortgage type",
          suggestion: "Specify: 39% for CMHC insured, 45% for conventional",
          severity: 'error'
        });
        score -= 15;
      }
      
      if (content.match(/40%.*(?:tds|total debt service|maximum)/gi)) {
        violations.push({
          category: guidance.category,
          issue: "Uses outdated 40% TDS without specifying mortgage type", 
          suggestion: "Specify: 44% for CMHC insured, 50% for conventional",
          severity: 'error'
        });
        score -= 15;
      }
    }

    if (guidance.category === "Government Programs") {
      if (content.match(/first.time.*(?:program|incentive)(?!.*discontinued)/gi)) {
        violations.push({
          category: guidance.category,
          issue: "References FTHB program without discontinuation notice",
          suggestion: "Add: (discontinued March 2024)",
          severity: 'error'
        });
        score -= 20;
      }
    }

    if (guidance.category === "Legal and Compliance") {
      if (content.match(/guaranteed?\s+(?:approval|rate|qualification)/gi)) {
        violations.push({
          category: guidance.category,
          issue: "Uses prohibited guarantee language",
          suggestion: "Replace with 'subject to qualification'",
          severity: 'error'
        });
        score -= 25;
      }
    }
  }

  return { violations, score };
}

/**
 * Generate content guidelines for AI systems
 */
export function generateAIContentPrompt(): string {
  let prompt = `# MORTGAGE CONTENT ACCURACY GUIDELINES\n\n`;
  prompt += `You are writing professional mortgage content. Follow these guidelines to ensure accuracy:\n\n`;

  for (const guidance of MORTGAGE_CONTENT_GUIDANCE) {
    prompt += `## ${guidance.category.toUpperCase()}\n`;
    prompt += `### Rules:\n`;
    guidance.guidance.forEach(rule => {
      prompt += `- ${rule}\n`;
    });
    
    prompt += `### NEVER Write:\n`;
    guidance.commonErrors.forEach(error => {
      prompt += `- ❌ ${error}\n`;
    });
    
    prompt += `### ALWAYS Write:\n`;
    guidance.correctUsage.forEach(correct => {
      prompt += `- ✅ ${correct}\n`;
    });
    
    prompt += `\n`;
  }

  prompt += `## VERIFICATION CHECKLIST\n`;
  prompt += `Before publishing, verify:\n`;
  prompt += `- [ ] All debt service ratios specify mortgage type (CMHC vs conventional)\n`;
  prompt += `- [ ] All government programs include current status\n`;
  prompt += `- [ ] No specific rate predictions or guarantees\n`;
  prompt += `- [ ] All claims have verified sources\n`;
  prompt += `- [ ] Compliance disclaimers included\n\n`;
  
  prompt += `Remember: Accuracy violations cause Google penalties and legal issues.`;

  return prompt;
}

export default {
  MORTGAGE_CONTENT_GUIDANCE,
  validateContentAgainstGuidance,
  generateAIContentPrompt
};