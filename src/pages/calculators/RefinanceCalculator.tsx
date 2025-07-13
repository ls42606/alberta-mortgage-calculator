import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Percent, Calendar, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const RefinanceCalculator: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(6.5);
  const [currentPayment, setCurrentPayment] = useState(2200);
  const [mortgageType, setMortgageType] = useState('fixed');
  const [monthsRemaining, setMonthsRemaining] = useState(36);
  const [lenderCurrentRate, setLenderCurrentRate] = useState(5.2);
  const [newRate, setNewRate] = useState(5.0);
  const [newAmortization, setNewAmortization] = useState(25);
  const [refinanceCosts, setRefinanceCosts] = useState(1500);
  const [cashOut, setCashOut] = useState(0);
  const [grossAnnualIncome, setGrossAnnualIncome] = useState(120000);
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState(800);
  const [propertyTaxes, setPropertyTaxes] = useState(4000);
  const [heatingCosts, setHeatingCosts] = useState(180);
  
  const [results, setResults] = useState({
    newPayment: 0,
    monthlySavings: 0,
    breakEvenMonths: 0,
    newLoanAmount: 0,
    prepaymentPenalty: 0,
    totalRefinanceCosts: 0,
    gdsRatio: 0,
    tdsRatio: 0,
    qualifies: false,
  });

  useEffect(() => {
    calculateRefinance();
  }, [currentBalance, currentRate, currentPayment, newRate, newAmortization, refinanceCosts, cashOut, mortgageType, monthsRemaining, lenderCurrentRate, grossAnnualIncome, monthlyDebtPayments, propertyTaxes, heatingCosts]);

  const calculateRefinance = () => {
    // 1. Calculate Prepayment Penalty
    let prepaymentPenalty = 0;
    const threeMonthsInterest = (currentBalance * (currentRate / 100)) / 4;

    if (mortgageType === 'variable') {
      prepaymentPenalty = threeMonthsInterest;
    } else { // Fixed mortgage, calculate IRD
      const rateDifferenceForIRD = (currentRate - lenderCurrentRate) / 100;
      let irdPenalty = 0;
      if (rateDifferenceForIRD > 0) {
        irdPenalty = (rateDifferenceForIRD * currentBalance * monthsRemaining) / 12;
      }
      prepaymentPenalty = Math.max(threeMonthsInterest, irdPenalty);
    }
    
    const totalRefinanceCosts = refinanceCosts + Math.max(0, prepaymentPenalty);

    // 2. Calculate New Mortgage Payment
    const newLoanAmount = currentBalance + cashOut;
    const nominalNewRate = newRate / 100;
    const effectiveMonthlyRate = Math.pow(1 + nominalNewRate / 2, 2 / 12) - 1;
    const numberOfPayments = newAmortization * 12;
    
    let newPayment = 0;
    if (numberOfPayments > 0 && effectiveMonthlyRate > 0) {
      newPayment = (newLoanAmount * effectiveMonthlyRate) / (1 - Math.pow(1 + effectiveMonthlyRate, -numberOfPayments));
    } else if (numberOfPayments > 0) {
      newPayment = newLoanAmount / numberOfPayments;
    }

    // 3. Calculate GDS/TDS Ratios for Refinance Qualification
    const grossMonthlyIncome = grossAnnualIncome / 12;
    const monthlyPropertyTax = propertyTaxes / 12;
    const monthlyHeating = heatingCosts;
    
    // Use stress test rate for qualification
    const stressTestRate = Math.max(newRate + 2, 5.25);
    const effectiveStressRate = Math.pow(1 + stressTestRate / 200, 1/6) - 1;
    const stressTestPayment = newLoanAmount > 0 ? 
      (newLoanAmount * effectiveStressRate) / (1 - Math.pow(1 + effectiveStressRate, -numberOfPayments)) : 0;
    
    const gdsPayment = stressTestPayment + monthlyPropertyTax + monthlyHeating;
    const tdsPayment = gdsPayment + monthlyDebtPayments;
    
    const gdsRatio = grossMonthlyIncome > 0 ? (gdsPayment / grossMonthlyIncome) * 100 : 0;
    const tdsRatio = grossMonthlyIncome > 0 ? (tdsPayment / grossMonthlyIncome) * 100 : 0;
    
    // Refinance qualification limits (conventional mortgage - 45% GDSR, 50% TDSR)
    const qualifies = gdsRatio <= 45 && tdsRatio <= 50;

    // 4. Calculate Savings and Break-Even
    const monthlySavings = currentPayment - newPayment;
    let breakEvenMonths = 0;
    if (monthlySavings > 0) {
      breakEvenMonths = totalRefinanceCosts / monthlySavings;
    }
    
    setResults({
      newPayment: Math.round(newPayment),
      monthlySavings: Math.round(monthlySavings),
      breakEvenMonths: breakEvenMonths > 0 && isFinite(breakEvenMonths) ? parseFloat(breakEvenMonths.toFixed(1)) : 0,
      newLoanAmount: Math.round(newLoanAmount),
      prepaymentPenalty: Math.round(prepaymentPenalty),
      totalRefinanceCosts: Math.round(totalRefinanceCosts),
      gdsRatio: parseFloat(gdsRatio.toFixed(2)),
      tdsRatio: parseFloat(tdsRatio.toFixed(2)),
      qualifies,
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
      title="Refinance Calculator"
      description="Compare your current mortgage with refinancing options. Calculate potential savings, break-even points, and determine if refinancing makes financial sense."
      icon={TrendingUp}
      color="from-brand-gold to-yellow-600"
      canonicalPath="/calculators/refinance"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Current Mortgage */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Calculator size={24} className="text-red-600 flex-shrink-0" />
              <span>Current Mortgage</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Current Balance"
                value={currentBalance}
                min={50000}
                max={1000000}
                step={10000}
                onChange={setCurrentBalance}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Current Interest Rate"
                value={currentRate}
                min={2.0}
                max={10.0}
                step={0.1}
                onChange={setCurrentRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="Current Monthly Payment"
                value={currentPayment}
                min={1000}
                max={5000}
                step={50}
                onChange={setCurrentPayment}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />
            </div>
          </div>

          {/* Penalty Calculation Inputs */}
           <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
             <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
               <Calculator size={24} className="text-red-600 flex-shrink-0" />
               <span>Penalty Calculation</span>
             </h3>
             <div className="space-y-6">
                <div className="space-y-3">
                    <label htmlFor="mortgage-type" className="text-sm font-bold text-gray-900">Mortgage Type</label>
                    <select id="mortgage-type" value={mortgageType} onChange={(e) => setMortgageType(e.target.value)} className="form-input w-full">
                        <option value="fixed">Fixed Rate</option>
                        <option value="variable">Variable Rate</option>
                    </select>
                </div>
                <SliderInput
                    label="Months Remaining in Term"
                    value={monthsRemaining}
                    min={1} max={60} step={1}
                    onChange={setMonthsRemaining}
                    formatValue={(val) => `${val} months`}
                    icon={Calendar}
                />
                {mortgageType === 'fixed' && (
                    <SliderInput
                        label="Lender's Current Rate for Similar Term"
                        value={lenderCurrentRate}
                        min={2.0} max={8.0} step={0.1}
                        onChange={setLenderCurrentRate}
                        formatValue={(val) => `${val.toFixed(1)}%`}
                        icon={Percent}
                    />
                )}
             </div>
           </div>

          {/* Income & Qualification */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <DollarSign size={24} className="text-brand-blue flex-shrink-0" />
              <span>Income & Qualification</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Gross Annual Income"
                value={grossAnnualIncome}
                min={50000}
                max={500000}
                step={5000}
                onChange={setGrossAnnualIncome}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Monthly Debt Payments"
                value={monthlyDebtPayments}
                min={0}
                max={5000}
                step={50}
                onChange={setMonthlyDebtPayments}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Annual Property Taxes"
                value={propertyTaxes}
                min={1000}
                max={15000}
                step={250}
                onChange={setPropertyTaxes}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Monthly Heating Costs"
                value={heatingCosts}
                min={50}
                max={500}
                step={25}
                onChange={setHeatingCosts}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />
            </div>
          </div>

          {/* New Mortgage */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <TrendingUp size={24} className="text-emerald-600 flex-shrink-0" />
              <span>New Mortgage</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="New Interest Rate"
                value={newRate}
                min={2.0}
                max={8.0}
                step={0.1}
                onChange={setNewRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="New Amortization"
                value={newAmortization}
                min={15}
                max={30}
                step={1}
                onChange={setNewAmortization}
                formatValue={(value) => `${value} years`}
                icon={Calendar}
              />

              <SliderInput
                label="Refinance Costs"
                value={refinanceCosts}
                min={1000}
                max={10000}
                step={250}
                onChange={setRefinanceCosts}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Cash Out Amount"
                value={cashOut}
                min={0}
                max={100000}
                step={5000}
                onChange={setCashOut}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Savings Summary */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.monthlySavings > 0 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <div className={`text-4xl sm:text-5xl font-bold mb-3 ${
                results.monthlySavings > 0 ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {results.monthlySavings > 0 ? '+' : ''}{formatCurrency(Math.abs(results.monthlySavings))}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${
                results.monthlySavings > 0 ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Monthly {results.monthlySavings > 0 ? 'Savings' : 'Increase'}
              </h3>
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                results.monthlySavings > 0 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.monthlySavings > 0 ? '✓ Saves Money' : '✗ Costs More'}
              </div>
            </div>
          </div>

          {/* Qualification Status */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.qualifies 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <h3 className={`text-lg sm:text-xl font-bold mb-4 ${
                results.qualifies ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Refinance Qualification
              </h3>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                results.qualifies 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.qualifies ? '✓ Likely to Qualify' : '✗ May Not Qualify'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${results.gdsRatio <= 45 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {results.gdsRatio}%
                </div>
                <div className="text-sm text-gray-600">GDS Ratio</div>
                <div className="text-xs text-gray-500">Max: 45%</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${results.tdsRatio <= 50 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {results.tdsRatio}%
                </div>
                <div className="text-sm text-gray-600">TDS Ratio</div>
                <div className="text-xs text-gray-500">Max: 50%</div>
              </div>
            </div>
          </div>

          {/* Payment Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Payment Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-200">
                <span className="font-semibold text-gray-700">Current Payment</span>
                <span className="text-xl sm:text-2xl font-bold text-red-700">{formatCurrency(currentPayment)}</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="font-semibold text-gray-700">New Payment</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-700">{formatCurrency(results.newPayment)}</span>
              </div>
              
              <div className={`flex justify-between items-center p-4 rounded-lg border ${
                results.monthlySavings > 0 
                  ? 'bg-emerald-100 border-emerald-300' 
                  : 'bg-red-100 border-red-300'
              }`}>
                <span className="font-semibold text-gray-700">Difference</span>
                <span className={`text-xl sm:text-2xl font-bold ${
                  results.monthlySavings > 0 ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {results.monthlySavings > 0 ? '-' : '+'}{formatCurrency(Math.abs(results.monthlySavings))}
                </span>
              </div>
            </div>
          </div>

          {/* Break-Even Analysis */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Break-Even Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Refinance Costs (Fees)</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(refinanceCosts)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Estimated Prepayment Penalty</span>
                <span className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(results.prepaymentPenalty)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Total Cost to Refinance</span>
                <span className="text-base sm:text-lg font-bold text-red-700">{formatCurrency(results.totalRefinanceCosts)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Monthly Savings</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(Math.abs(results.monthlySavings))}</span>
              </div>

              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Break-Even Point</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  {results.breakEvenMonths > 0
                    ? `${results.breakEvenMonths} months` 
                    : 'N/A'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">New Loan Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Current Balance</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(currentBalance)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Cash Out</span>
                <span className="text-base sm:text-lg font-bold text-brand-gold">{formatCurrency(cashOut)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">New Loan Amount</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.newLoanAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Total Cost</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(results.newLoanAmount + results.totalRefinanceCosts)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">When to Consider Refinancing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Rate Reduction</h4>
            <p className="text-gray-600 leading-relaxed">
              Interest rates have dropped significantly since you got your current mortgage.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-brand-blue" />
            </div>
            <h4 className="text-lg font-bold text-brand-blue mb-3">Cash Out</h4>
            <p className="text-gray-600 leading-relaxed">
              You need to access your home's equity for renovations, investments, or debt consolidation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-brand-gold" />
            </div>
            <h4 className="text-lg font-bold text-brand-gold mb-3">Term Change</h4>
            <p className="text-gray-600 leading-relaxed">
              You want to change your amortization period to pay off your mortgage faster or reduce payments.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default RefinanceCalculator;