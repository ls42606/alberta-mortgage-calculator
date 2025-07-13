import { MORTGAGE_CONSTANTS } from '../constants';

// Mortgage Calculation Utilities
export function calculateMortgagePayment(
  principal: number,
  annualRate: number,
  amortizationYears: number,
  paymentFrequency: number = 12
): number {
  const periodicRate = annualRate / 100 / paymentFrequency;
  const totalPayments = amortizationYears * paymentFrequency;
  
  if (periodicRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = (principal * periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
                 (Math.pow(1 + periodicRate, totalPayments) - 1);
  
  return Math.round(payment * 100) / 100;
}

export function calculateCMHCInsurance(homePrice: number, downPayment: number): number {
  const loanAmount = homePrice - downPayment;
  const downPaymentPercent = (downPayment / homePrice) * 100;
  
  if (downPaymentPercent >= 20) return 0;
  
  let rate = 0;
  if (downPaymentPercent >= 20) rate = 0;
  else if (downPaymentPercent >= 15) rate = 2.8;
  else if (downPaymentPercent >= 10) rate = 3.1;
  else rate = 4.0;
  
  return Math.round(loanAmount * (rate / 100) * 100) / 100;
}

export function calculateAffordability(
  grossIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number,
  amortizationYears: number = 25
): number {
  const maxMonthlyPayment = (grossIncome * 0.32) - monthlyDebts;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = amortizationYears * 12;
  
  if (monthlyRate === 0) {
    return maxMonthlyPayment * totalPayments + downPayment;
  }
  
  const maxLoan = maxMonthlyPayment * (Math.pow(1 + monthlyRate, totalPayments) - 1) /
                 (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));
  
  return Math.round((maxLoan + downPayment) * 100) / 100;
}

// Formatting Utilities
export function formatCurrency(amount: number, locale = 'en-CA', currency = 'CAD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('en-CA', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// Validation Utilities
export function validateHomePrice(price: number): string | null {
  if (price <= 0) return 'Home price must be greater than 0';
  if (price < 50000) return 'Home price seems too low';
  if (price > 10000000) return 'Home price seems too high';
  return null;
}

export function validateDownPayment(downPayment: number, homePrice: number): string | null {
  if (downPayment <= 0) return 'Down payment must be greater than 0';
  if (downPayment >= homePrice) return 'Down payment cannot exceed home price';
  
  const percentage = (downPayment / homePrice) * 100;
  if (percentage < MORTGAGE_CONSTANTS.MIN_DOWN_PAYMENT_PERCENT) {
    return `Minimum down payment is ${MORTGAGE_CONSTANTS.MIN_DOWN_PAYMENT_PERCENT}%`;
  }
  
  return null;
}

export function validateInterestRate(rate: number): string | null {
  if (rate <= 0) return 'Interest rate must be greater than 0';
  if (rate > 20) return 'Interest rate seems too high';
  return null;
}

// Date Utilities
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return dateObj.toLocaleDateString('en-CA', { ...defaultOptions, ...options });
}

export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// URL and SEO Utilities
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateMetaDescription(content: string, maxLength = 160): string {
  const cleaned = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return cleaned.length > maxLength 
    ? cleaned.substring(0, maxLength - 3) + '...'
    : cleaned;
} 