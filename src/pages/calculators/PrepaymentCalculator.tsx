import React, { useState, useEffect } from 'react';
import { PiggyBank, DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const PrepaymentCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [extraPayment, setExtraPayment] = useState(200);
  const [paymentType, setPaymentType] = useState('monthly');
  const [startMonth, setStartMonth] = useState(1);
  const [lumpSumPrivilege, setLumpSumPrivilege] = useState(15);
  const [paymentIncreasePrivilege, setPaymentIncreasePrivilege] = useState(15);
  
  const [results, setResults] = useState({
    originalPayment: 0,
    newPayment: 0,
    originalTotalInterest: 0,
    newTotalInterest: 0,
    interestSavings: 0,
    timeSavings: 0,
    originalPayoffDate: '',
    newPayoffDate: ''
  });

  useEffect(() => {
    calculatePrepayment();
  }, [loanAmount, interestRate, amortization, extraPayment, paymentType, startMonth, lumpSumPrivilege, paymentIncreasePrivilege]);

  const calculatePrepayment = () => {
    const nominalAnnualRate = interestRate / 100;
    const effectiveMonthlyRate = Math.pow(1 + nominalAnnualRate / 2, 2 / 12) - 1;
    const numberOfPayments = amortization * 12;
    
    // Calculate original mortgage payment
    let originalPayment = 0;
    if (effectiveMonthlyRate > 0) {
      originalPayment = (loanAmount * effectiveMonthlyRate) / (1 - Math.pow(1 + effectiveMonthlyRate, -numberOfPayments));
    } else {
      originalPayment = loanAmount / numberOfPayments;
    }
    
    // Calculate original total interest
    const originalTotalPayment = originalPayment * numberOfPayments;
    const originalTotalInterest = originalTotalPayment - loanAmount;
    
    // Calculate with extra payments
    let balance = loanAmount;
    let month = 0;
    let totalInterestPaid = 0;
    
    // Cap the extra payment based on privileges
    let cappedExtraPayment = extraPayment;
    if (paymentType === 'monthly') {
        const maxExtra = originalPayment * (paymentIncreasePrivilege / 100);
        cappedExtraPayment = Math.min(extraPayment, maxExtra);
    } else if (paymentType === 'annually' || paymentType === 'lump-sum') {
        const maxExtra = loanAmount * (lumpSumPrivilege / 100);
        cappedExtraPayment = Math.min(extraPayment, maxExtra);
    }

    while (balance > 0.01 && month < numberOfPayments * 2) { // Safety limit
      month++;
      
      const interestPayment = balance * effectiveMonthlyRate;
      totalInterestPaid += interestPayment;
      
      let principalPayment = originalPayment - interestPayment;
      
      let currentExtraPayment = 0;
      if (month >= startMonth) {
        if (paymentType === 'monthly') {
          currentExtraPayment = cappedExtraPayment;
        } else if (paymentType === 'annually' && month % 12 === 0) {
          currentExtraPayment = cappedExtraPayment;
        } else if (paymentType === 'lump-sum' && month === startMonth) {
          currentExtraPayment = cappedExtraPayment;
        }
      }
      
      principalPayment += currentExtraPayment;
      
      if (principalPayment > balance) {
        principalPayment = balance;
      }
      
      balance -= principalPayment;
    }
    
    const newTotalInterest = totalInterestPaid;
    const interestSavings = originalTotalInterest - newTotalInterest;
    const timeSavings = numberOfPayments - month;
    const newPayment = originalPayment + (paymentType === 'monthly' ? cappedExtraPayment : 0);
    
    // Calculate payoff dates
    const today = new Date();
    const originalPayoffDate = new Date(today.getFullYear(), today.getMonth() + numberOfPayments, today.getDate());
    const newPayoffDate = new Date(today.getFullYear(), today.getMonth() + month, today.getDate());
    
    setResults({
      originalPayment: Math.round(originalPayment),
      newPayment: Math.round(newPayment),
      originalTotalInterest: Math.round(originalTotalInterest),
      newTotalInterest: Math.round(newTotalInterest),
      interestSavings: Math.round(interestSavings),
      timeSavings: Math.round(timeSavings),
      originalPayoffDate: originalPayoffDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long' }),
      newPayoffDate: newPayoffDate.toLocaleDateString('en-CA', { year: 'numeric', month: 'long' })
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <CalculatorLayout
      title="Prepayment Calculator"
      description="See how extra mortgage payments can save you thousands in interest and help you pay off your mortgage years earlier. Explore different prepayment strategies."
      icon={PiggyBank}
      color="from-purple-500 to-purple-600"
      canonicalPath="/calculators/prepayment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Mortgage Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <DollarSign size={24} className="text-purple-600 flex-shrink-0" />
              <span>Mortgage Details</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Loan Amount"
                value={loanAmount}
                min={100000}
                max={1000000}
                step={10000}
                onChange={setLoanAmount}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Interest Rate"
                value={interestRate}
                min={2.0}
                max={8.0}
                step={0.1}
                onChange={setInterestRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="Amortization Period"
                value={amortization}
                min={15}
                max={30}
                step={1}
                onChange={setAmortization}
                formatValue={(value) => `${value} years`}
                icon={Calendar}
              />
            </div>
          </div>

          {/* Prepayment Privileges */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Percent size={24} className="text-purple-600 flex-shrink-0" />
              <span>Lender Prepayment Privileges</span>
            </h3>
            <div className="space-y-6">
              <SliderInput
                  label="Annual Lump Sum Privilege"
                  value={lumpSumPrivilege}
                  min={5} max={25} step={5}
                  onChange={setLumpSumPrivilege}
                  formatValue={(val) => `${val}% of original principal`}
                  icon={Percent}
              />
              <SliderInput
                  label="Payment Increase Privilege"
                  value={paymentIncreasePrivilege}
                  min={5} max={100} step={5}
                  onChange={setPaymentIncreasePrivilege}
                  formatValue={(val) => `${val}% of regular payment`}
                  icon={Percent}
              />
            </div>
          </div>

          {/* Prepayment Strategy */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <PiggyBank size={24} className="text-emerald-600 flex-shrink-0" />
              <span>Prepayment Strategy</span>
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="payment-type" className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                  <TrendingUp size={20} className="text-emerald-600 flex-shrink-0" />
                  <span>Payment Type</span>
                </label>
                <select
                  id="payment-type"
                  name="payment-type"
                  className="form-input w-full"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="monthly">Increase Monthly Payment</option>
                  <option value="annually">Make Annual Lump-Sum Payment</option>
                  <option value="lump-sum">Make One-Time Lump-Sum Payment</option>
                </select>
              </div>

              <SliderInput
                label={`Extra Payment Amount`}
                value={extraPayment}
                min={paymentType === 'monthly' ? 50 : paymentType === 'annually' ? 1000 : 5000}
                max={paymentType === 'monthly' ? Math.max(1000, results.originalPayment * (paymentIncreasePrivilege/100)) : Math.max(5000, loanAmount * (lumpSumPrivilege/100))}
                step={paymentType === 'monthly' ? 25 : paymentType === 'annually' ? 500 : 1000}
                onChange={setExtraPayment}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Start Month"
                value={startMonth}
                min={1}
                max={60}
                step={1}
                onChange={setStartMonth}
                formatValue={(value) => `Month ${value}`}
                icon={Calendar}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Savings Summary */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-4xl sm:text-5xl font-bold text-emerald-800 mb-3">
                {formatCurrency(results.interestSavings)}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-emerald-800">Total Interest Savings</h3>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-emerald-200 text-emerald-800 rounded-full text-sm font-bold">
                ✓ Save {Math.round(results.timeSavings / 12 * 10) / 10} Years
              </div>
            </div>
          </div>

          {/* Payment Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Payment Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="font-semibold text-gray-700">Original Payment</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-700">{formatCurrency(results.originalPayment)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="font-semibold text-gray-700">
                  {paymentType === 'monthly' ? 'New Payment' : 'Regular Payment'}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-700">
                  {formatCurrency(paymentType === 'monthly' ? results.newPayment : results.originalPayment)}
                </span>
              </div>
              
              {paymentType !== 'monthly' && (
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="font-semibold text-gray-700">
                    {paymentType === 'annually' ? 'Annual Lump Sum' : 'One-Time Lump Sum'}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">{formatCurrency(Math.min(extraPayment, loanAmount * (lumpSumPrivilege/100)))}</span>
                </div>
              )}
            </div>
          </div>

          {/* Time Savings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Payoff Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Original Payoff</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{results.originalPayoffDate}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">New Payoff</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{results.newPayoffDate}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Time Saved</span>
                <span className="text-base sm:text-lg font-bold text-purple-700">
                  {Math.floor(results.timeSavings / 12)} years, {results.timeSavings % 12} months
                </span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Interest Saved</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(results.interestSavings)}</span>
              </div>
            </div>
          </div>

          {/* Interest Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Interest Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Original Total Interest</span>
                <span className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(results.originalTotalInterest)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">New Total Interest</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(results.newTotalInterest)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Total Savings</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(results.interestSavings)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Comparison */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Prepayment Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Monthly Extra</h4>
            <p className="text-gray-600 leading-relaxed">
              Consistent monthly extra payments provide steady progress and are easy to budget for.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-purple-600 mb-3">Annual Lump Sum</h4>
            <p className="text-gray-600 leading-relaxed">
              Use tax refunds, bonuses, or annual windfalls to make larger yearly prepayments.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-brand-gold" />
            </div>
            <h4 className="text-lg font-bold text-brand-gold mb-3">One-Time Lump Sum</h4>
            <p className="text-gray-600 leading-relaxed">
              One-time large payments from inheritance, investments, or major windfalls.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default PrepaymentCalculator;