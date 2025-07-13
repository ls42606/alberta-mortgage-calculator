import { SiteConfig, NavigationItem } from '../types';

// Site Configuration
export const SITE_CONFIG: SiteConfig = {
  name: 'Alberta Mortgage Calculator',
  description: 'Comprehensive mortgage calculators and financial tools for Alberta homebuyers and real estate professionals.',
  url: 'https://alberta-mortgage-calculator.com',
  contact: {
    email: 'info@alberta-mortgage-calculator.com',
    phone: '+1 (403) 555-0123',
    address: 'Calgary, Alberta, Canada'
  },
  social: {
    facebook: 'https://facebook.com/alberta-mortgage-calc',
    twitter: 'https://twitter.com/alberta_mortgage',
    linkedin: 'https://linkedin.com/company/alberta-mortgage-calc'
  }
};

// Navigation Menu
export const NAVIGATION: NavigationItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Calculators',
    href: '/calculators',
    children: [
      { label: 'Mortgage Payment', href: '/calculators/mortgage-payment' },
      { label: 'Affordability', href: '/calculators/affordability' },
      { label: 'Refinance', href: '/calculators/refinance' },
      { label: 'Prepayment', href: '/calculators/prepayment' },
      { label: 'Debt Consolidation', href: '/calculators/debt-consolidation' },
      { label: 'Commercial', href: '/calculators/commercial' },
      { label: 'HELOC', href: '/calculators/heloc' },
      { label: 'Stress Test', href: '/calculators/stress-test' }
    ]
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

// Calculator Constants
export const MORTGAGE_CONSTANTS = {
  MIN_DOWN_PAYMENT_PERCENT: 5,
  MAX_AMORTIZATION_YEARS: 30,
  MIN_AMORTIZATION_YEARS: 5,
  CMHC_THRESHOLD: 500000,
  CMHC_RATES: {
    '5-9.99': 4.0,
    '10-14.99': 3.1,
    '15-19.99': 2.8,
    '20+': 0
  },
  PAYMENT_FREQUENCIES: {
    monthly: { value: 12, label: 'Monthly' },
    'bi-weekly': { value: 26, label: 'Bi-weekly' },
    weekly: { value: 52, label: 'Weekly' }
  }
};

// Blog Constants
export const BLOG_CONSTANTS = {
  POSTS_PER_PAGE: 12,
  READING_SPEED_WPM: 200,
  DEFAULT_AUTHOR: 'Alberta Mortgage Team',
  CATEGORIES: [
    'First Time Buyers',
    'Investment Properties',
    'Refinancing',
    'Market Updates',
    'Tips & Guides'
  ]
};

// SEO Constants
export const SEO_DEFAULTS = {
  title: 'Alberta Mortgage Calculator - Free Mortgage Tools',
  description: 'Free mortgage calculators for Alberta homebuyers. Calculate payments, affordability, refinancing options and more. Professional tools for real estate decisions.',
  keywords: [
    'mortgage calculator',
    'alberta mortgage',
    'home affordability',
    'mortgage payment',
    'refinance calculator',
    'cmhc calculator',
    'alberta real estate'
  ],
  image: '/og-image.png',
  url: 'https://alberta-mortgage-calculator.com'
}; 