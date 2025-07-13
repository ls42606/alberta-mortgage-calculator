// Calculator Types
export interface MortgageCalculation {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortizationPeriod: number;
  paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly';
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export interface CalculatorStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<Record<string, unknown>>;
  isCompleted: boolean;
  isActive: boolean;
}

// Blog Types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  lastModified: string;
  tags: string[];
  featuredImage?: string;
  readingTime: number;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  postCount: number;
}

// Common Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
} 