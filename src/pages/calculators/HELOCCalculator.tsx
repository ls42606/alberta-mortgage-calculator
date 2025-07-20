import React, { useState, useEffect, useCallback } from 'react';
import { Percent, DollarSign, TrendingUp, Calculator, Home } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const HELOCCalculator: React.FC = () => {
  const [homeValue, setHomeValue] = useState(600000);
  const [mortgageBalance, setMortgageBalance] = useState(350000);
  const [helocRate, setHelocRate] = useState(7.5);
  const [drawAmount, setDrawAmount] = useState(50000);
  const [paymentType, setPaymentType] = useState('interest-only');
  const [repaymentPeriod, setRepaymentPeriod] = useState(10);
  
  const [results, setResults] = useState({
    availableCredit: 0,
    maxHelocLimit: 0,
    monthlyPayment: 0,
    interestOnlyPayment: 0,
    principalAndInterest: 0,
    totalInterestCost: 0,
    remainingEquity: 0
  });

  const calculateHELOC = useCallback(() => {
    // A HELOC is constrained by two rules.
    // 1. The total of the mortgage + HELOC cannot exceed 80% of home value.
    const maxFrom80Rule = (homeValue * 0.80) - mortgageBalance;
    // 2. The HELOC portion itself cannot exceed 65% of home value.
    const maxFrom65Rule = homeValue * 0.65;
    
    // The true maximum limit is the LESSER of these two values.
    const maxHelocLimit = Math.max(0, Math.min(maxFrom80Rule, maxFrom65Rule));

    // Ensure the user's intended draw amount does not exceed the actual limit
    const actualDrawAmount = Math.min(drawAmount, maxHelocLimit);
    
    const availableCredit = Math.max(0, maxHelocLimit - actualDrawAmount);
    
    // Calculate payments based on the actual (capped) draw amount
    const monthlyRate = helocRate / 100 / 12;
    
    const interestOnlyPayment = actualDrawAmount * monthlyRate;
    
    let principalAndInterest = 0;
    if (paymentType === 'principal-interest' && repaymentPeriod > 0) {
      const numberOfPayments = repaymentPeriod * 12;
      if (monthlyRate > 0) {
        principalAndInterest = (actualDrawAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                             (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        principalAndInterest = actualDrawAmount / numberOfPayments;
      }
    }
    
    const monthlyPayment = paymentType === 'interest-only' ? interestOnlyPayment : principalAndInterest;
    
    // CORRECTED: Total interest cost should use the repayment period for both scenarios
    const totalPaymentsOverPeriod = repaymentPeriod * 12;
    let totalInterestCost = 0;
    if (paymentType === 'interest-only') {
      // This is an ESTIMATE assuming interest-only for the full repayment period
      totalInterestCost = interestOnlyPayment * totalPaymentsOverPeriod;
    } else {
      totalInterestCost = (principalAndInterest * totalPaymentsOverPeriod) - actualDrawAmount;
    }
    
    const remainingEquity = homeValue - mortgageBalance - actualDrawAmount;
    
    setResults({
      availableCredit: Math.round(availableCredit),
      maxHelocLimit: Math.round(maxHelocLimit),
      monthlyPayment: Math.round(monthlyPayment),
      interestOnlyPayment: Math.round(interestOnlyPayment),
      principalAndInterest: Math.round(principalAndInterest),
      totalInterestCost: Math.round(totalInterestCost),
      remainingEquity: Math.round(remainingEquity)
    });
  }, [homeValue, mortgageBalance, helocRate, drawAmount, paymentType, repaymentPeriod]);

  useEffect(() => {
    calculateHELOC();
  }, [calculateHELOC]);

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
      title="HELOC Calculator"
      description="Calculate your Home Equity Line of Credit limit, available credit, and payment options. Understand how much equity you can access and what it will cost."
      icon={Percent}
      color="from-indigo-500 to-indigo-600"
      canonicalPath="/calculators/heloc"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Property Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Home size={24} className="text-indigo-600 flex-shrink-0" />
              <span>Property Information</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Home Value"
                value={homeValue}
                min={300000}
                max={1500000}
                step={25000}
                onChange={setHomeValue}
                formatValue={(value) => formatCurrency(value)}
                icon={Home}
              />

              <SliderInput
                label="Existing Mortgage Balance"
                value={mortgageBalance}
                min={0}
                max={1000000}
                step={10000}
                onChange={setMortgageBalance}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />
            </div>
          </div>

          {/* HELOC Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Percent size={24} className="text-emerald-600 flex-shrink-0" />
              <span>HELOC Details</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="HELOC Interest Rate"
                value={helocRate}
                min={5.0}
                max={12.0}
                step={0.1}
                onChange={setHelocRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="Amount to Draw"
                value={drawAmount}
                min={10000}
                max={Math.max(200000, Math.min((homeValue * 0.80) - mortgageBalance, homeValue * 0.65))}
                step={5000}
                onChange={setDrawAmount}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <div className="space-y-3">
                <label htmlFor="heloc-payment-type" className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                  <Calculator size={20} className="text-emerald-600 flex-shrink-0" />
                  <span>Payment Type</span>
                </label>
                <select
                  id="heloc-payment-type"
                  name="heloc-payment-type"
                  className="form-input w-full"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  <option value="interest-only">Interest Only</option>
                  <option value="principal-interest">Principal + Interest</option>
                </select>
              </div>

              {paymentType === 'principal-interest' && (
                <SliderInput
                  label="Repayment Period"
                  value={repaymentPeriod}
                  min={5}
                  max={20}
                  step={1}
                  onChange={setRepaymentPeriod}
                  formatValue={(value) => `${value} years`}
                  icon={TrendingUp}
                />
              )}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Credit Availability */}
          <div className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-50 rounded-2xl border-2 border-indigo-200 p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-4xl sm:text-5xl font-bold text-indigo-800 mb-3">
                {formatCurrency(results.availableCredit)}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-indigo-800">Available Credit</h3>
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-200 text-indigo-800 rounded-full text-sm font-bold">
                After {formatCurrency(Math.min(drawAmount, results.maxHelocLimit))} draw
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Payment Information</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="text-sm font-semibold text-gray-600 mb-2">
                  {paymentType === 'interest-only' ? 'Interest Only Payment' : 'Principal + Interest Payment'}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-indigo-700">
                  {formatCurrency(results.monthlyPayment)}
                </div>
                <div className="text-xs text-gray-600 mt-1">Monthly payment</div>
              </div>
              
              {paymentType === 'principal-interest' && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-sm font-semibold text-gray-600 mb-2">Interest Only Alternative</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-700">
                    {formatCurrency(results.interestOnlyPayment)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">If you chose interest-only</div>
                </div>
              )}
            </div>
          </div>

          {/* Credit Limits */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Credit Limits</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Home Value</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(homeValue)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">80% of Home Value</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(homeValue * 0.8)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Existing Mortgage</span>
                <span className="text-base sm:text-lg font-bold text-red-600">-{formatCurrency(mortgageBalance)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Maximum HELOC Limit</span>
                <span className="text-base sm:text-lg font-bold text-indigo-700">{formatCurrency(results.maxHelocLimit)}</span>
              </div>
              <div className="text-xs text-gray-500 pl-4 -mt-3">
                (Lesser of 65% of home value or 80% minus mortgage)
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Amount Drawn</span>
                <span className="text-base sm:text-lg font-bold text-orange-600">-{formatCurrency(Math.min(drawAmount, results.maxHelocLimit))}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Remaining Available</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(results.availableCredit)}</span>
              </div>
            </div>
          </div>

          {/* Cost Analysis */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Cost Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Amount Borrowed</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(Math.min(drawAmount, results.maxHelocLimit))}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Interest Rate</span>
                <span className="text-base sm:text-lg font-bold text-indigo-700">{helocRate.toFixed(1)}%</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">
                  {paymentType === 'interest-only' ? 'Est. Total Interest (10 yrs)' : `Total Interest (${repaymentPeriod} yrs)`}
                </span>
                <span className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(results.totalInterestCost)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Remaining Home Equity</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(results.remainingEquity)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">HELOC vs Traditional Loan</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-indigo-600" />
            </div>
            <h4 className="text-lg font-bold text-indigo-600 mb-3">Flexible Access</h4>
            <p className="text-gray-600 leading-relaxed">
              Draw funds as needed up to your credit limit, only pay interest on what you use.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Variable Rates</h4>
            <p className="text-gray-600 leading-relaxed">
              Interest rates are typically variable and tied to prime rate, often lower than credit cards.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-brand-gold" />
            </div>
            <h4 className="text-lg font-bold text-brand-gold mb-3">Interest Only Option</h4>
            <p className="text-gray-600 leading-relaxed">
              Many HELOCs offer interest-only payments during the draw period for maximum flexibility.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default HELOCCalculator;