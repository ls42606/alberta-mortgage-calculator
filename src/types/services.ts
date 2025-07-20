// Service Types for better type safety

// Automation Service Types
export interface AutomationTriggerConfig {
  cron?: string;
  metric?: string;
  threshold?: number;
  operator?: 'greater_than' | 'less_than' | 'equals';
  action?: string;
}

export interface AutomationActionConfig {
  count?: number;
  categories?: string[];
  action?: string;
  criteria?: string;
  target?: string;
  type?: string;
  subject?: string;
  message?: string;
  component?: string;
}

export interface AutomationLogDetails {
  actions?: number;
  errorMessage?: string;
  executionTime?: number;
  triggeredBy?: string;
}

// Content Management Service Types
export interface CompetitorAnalysis {
  [domain: string]: {
    topContent: string[];
    avgContentLength: number;
    updateFrequency: string;
  };
}

export interface DesignSystemColors {
  primary: string[];
  secondary: string[];
  accent: string[];
  neutral: string[];
}

export interface DesignSystemTypography {
  headings: string[];
  body: string[];
  sizes: Record<string, string>;
}

export interface DesignSystemSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface DesignSystemComponents {
  button: {
    borderRadius: string;
    padding: string;
    fontWeight: string;
  };
  card: {
    borderRadius: string;
    padding: string;
    shadow: string;
  };
}

export interface LandingPageMetadata {
  keywords: string[];
  topic: string;
  generated: string;
}

export interface ABTestResult {
  winner: 'A' | 'B';
  metrics: Record<string, number>;
  confidence: number;
}

// Analytics Service Types
export interface ConversionEventMetadata {
  calculatorType?: string;
  leadValue?: number;
  userAgent?: string;
  referrer?: string;
  sessionId?: string;
}

export interface CalculatorUsageInputs {
  homePrice?: number;
  downPayment?: number;
  interestRate?: number;
  amortizationPeriod?: number;
  paymentFrequency?: string;
  propertyType?: string;
  location?: string;
}

export interface BlogAnalyticsData {
  views: number;
  timeOnPage: number;
  bounceRate: number;
  shares: number;
  conversions: number;
  topReferrers: string[];
}

export interface AnalyticsReportMetadata {
  generatedBy?: string;
  reportType?: string;
  dateRange?: string;
  filters?: Record<string, string>;
}

// Design Service Types
export interface ComponentProps {
  variant?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}

export interface VariantTestConfig {
  testName: string;
  trafficSplit: number;
  duration: number;
  successMetric: string;
}

// Blog Service Types
export interface ClaudeResponse {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
}

export interface SEOAnalysisResult {
  titleSuggestion?: string;
  metaDescriptionSuggestion?: string;
  keywordSuggestions?: string[];
  score?: number;
  recommendations?: string[];
}

// General Service Types
export interface ServiceError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: ServiceError;
}

// Calculator Types for Lead Capture
export interface CalculationResults {
  monthlyPayment?: number;
  totalInterest?: number;
  totalAmount?: number;
  amortizationSchedule?: AmortizationPayment[];
  affordabilityMetrics?: {
    maxHomePrice: number;
    maxMonthlyPayment: number;
    debtServiceRatio: number;
    grossDebtServiceRatio: number;
  };
}

export interface AmortizationPayment {
  paymentNumber: number;
  paymentDate: Date;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  remainingBalance: number;
}

// Navigation and Link Types
export interface NavigationLink {
  label: string;
  href: string;
  icon?: string;
  target?: '_blank' | '_self';
  children?: NavigationLink[];
}

export interface ExternalLink {
  url: string;
  label: string;
  isExternal: boolean;
}

// Simple form types for Netlify Forms
export interface SimpleLeadForm {
  name: string;
  email: string;
  'mortgage-amount'?: string;
  message?: string;
  source?: string;
  'calculator-type'?: string;
  'calculation-results'?: string;
}

export interface SimpleContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}