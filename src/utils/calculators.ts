// Common Calculator Utilities
export interface MortgageInputs {
  principal: number;
  annualRate: number;
  amortizationYears: number;
  paymentFrequency?: number;
}

export interface CalculatorResults {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  cmhcInsurance?: number;
}

/**
 * Calculate mortgage payment for different frequencies
 */
export function calculatePaymentByFrequency(
  principal: number,
  annualRate: number,
  amortizationYears: number,
  frequency: number
): number {
  const periodicRate = annualRate / 100 / frequency;
  const totalPayments = amortizationYears * frequency;
  
  if (periodicRate === 0) {
    return principal / totalPayments;
  }
  
  const payment = (principal * periodicRate * Math.pow(1 + periodicRate, totalPayments)) /
                 (Math.pow(1 + periodicRate, totalPayments) - 1);
  
  return Math.round(payment * 100) / 100;
}

/**
 * Generate amortization schedule for a given number of periods
 */
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  payment: number,
  periods: number = 12
): Array<{
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}> {
  const schedule = [];
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  
  for (let period = 1; period <= periods; period++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = payment - interestPayment;
    balance -= principalPayment;
    
    schedule.push({
      period,
      payment: Math.round(payment),
      principal: Math.round(principalPayment),
      interest: Math.round(interestPayment),
      balance: Math.round(balance)
    });
  }
  
  return schedule;
}

/**
 * Calculate savings from accelerated payments
 */
export function calculateAcceleratedPaymentSavings(
  principal: number,
  annualRate: number,
  amortizationYears: number,
  extraPayment: number
): {
  timeSaved: number;
  interestSaved: number;
} {
  const monthlyRate = annualRate / 100 / 12;
  const regularPayment = calculatePaymentByFrequency(principal, annualRate, amortizationYears, 12);
  const acceleratedPayment = regularPayment + extraPayment;
  
  // Calculate payoff time with extra payments
  let balance = principal;
  let months = 0;
  
  while (balance > 0 && months < amortizationYears * 12) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(acceleratedPayment - interestPayment, balance);
    balance -= principalPayment;
    months++;
  }
  
  const originalTotalInterest = (regularPayment * amortizationYears * 12) - principal;
  const newTotalInterest = (acceleratedPayment * months) - principal;
  
  return {
    timeSaved: (amortizationYears * 12) - months,
    interestSaved: originalTotalInterest - newTotalInterest
  };
} 