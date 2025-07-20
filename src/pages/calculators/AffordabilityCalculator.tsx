import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DollarSign, Users, CreditCard, Home, Percent, Calendar } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const AffordabilityCalculator: React.FC = React.memo(() => {
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [heatingCosts, setHeatingCosts] = useState(150);
  const [condoFees, setCondoFees] = useState(0);
  
  const [results, setResults] = useState({
    maxPurchasePrice: 0,
    maxMortgageAmount: 0,
    monthlyPayment: 0,
    gdsRatio: 0,
    tdsRatio: 0,
    qualifyingRate: 0,
    cmhcPremium: 0,
    qualifies: false
  });

  const calculateAffordability = useCallback(() => {
    const grossMonthlyIncome = annualIncome / 12;
    if (grossMonthlyIncome <= 0) {
      setResults({
        maxPurchasePrice: 0,
        maxMortgageAmount: 0,
        monthlyPayment: 0,
        gdsRatio: 0,
        tdsRatio: 0,
        qualifyingRate: 0,
        cmhcPremium: 0,
        qualifies: false
      });
      return;
    }

    const stressTestRate = Math.max(interestRate + 2, 5.25);
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyHeating = heatingCosts;
    const monthlyCondoForRatio = condoFees * 0.5;
    const baseHousingCosts = monthlyPropertyTax + monthlyHeating + monthlyCondoForRatio;

    let maxPurchasePrice = 0;
    let lowerBound = 0;
    let upperBound = 3000000;

    for (let i = 0; i < 100; i++) {
      const priceGuess = (lowerBound + upperBound) / 2;
      if (upperBound - lowerBound < 100) break;

      let minRequiredDownPayment;
      if (priceGuess <= 500000) {
        minRequiredDownPayment = priceGuess * 0.05;
      } else if (priceGuess < 1000000) {
        minRequiredDownPayment = (500000 * 0.05) + ((priceGuess - 500000) * 0.10);
      } else {
        minRequiredDownPayment = priceGuess * 0.20;
      }

      if (downPayment < minRequiredDownPayment) {
        upperBound = priceGuess;
        continue;
      }

      const downPaymentRatio = downPayment / priceGuess;
      const isConventional = downPaymentRatio >= 0.20;
      
      const MAX_GDS_RATIO = isConventional ? 0.45 : 0.39;
      const MAX_TDS_RATIO = isConventional ? 0.50 : 0.44;

      let mortgageInsurancePremium = 0;
      const baseMortgageAmount = priceGuess - downPayment;

      if (!isConventional && priceGuess < 1000000) {
        const ltv = 1 - downPaymentRatio;
        let premiumRate = 0;
        if (ltv > 0.90) premiumRate = 0.0400;
        else if (ltv > 0.85) premiumRate = 0.0310;
        else if (ltv > 0.80) premiumRate = 0.0280;
        else if (ltv > 0.75) premiumRate = 0.0240;
        else premiumRate = 0.0180;
        mortgageInsurancePremium = baseMortgageAmount * premiumRate;
      }
      
      const totalMortgage = baseMortgageAmount + mortgageInsurancePremium;
      
      const i = Math.pow(1 + stressTestRate / 200, 1/6) - 1;
      const n = amortization * 12;
      const monthlyPayment = totalMortgage * i / (1 - Math.pow(1 + i, -n));

      const gdsPayment = monthlyPayment + baseHousingCosts;
      const tdsPayment = gdsPayment + monthlyDebts;

      const gdsRatio = gdsPayment / grossMonthlyIncome;
      const tdsRatio = tdsPayment / grossMonthlyIncome;

      if (gdsRatio <= MAX_GDS_RATIO && tdsRatio <= MAX_TDS_RATIO) {
        maxPurchasePrice = priceGuess;
        lowerBound = priceGuess;
      } else {
        upperBound = priceGuess;
      }
    }
    
    // Final calculation based on determined max purchase price
    const finalDownPaymentRatio = downPayment / maxPurchasePrice;
    const finalIsConventional = finalDownPaymentRatio >= 0.20;
    const finalBaseMortgageAmount = maxPurchasePrice > 0 ? maxPurchasePrice - downPayment : 0;

    let finalCmhcPremium = 0;
    if (!finalIsConventional && maxPurchasePrice < 1000000 && maxPurchasePrice > 0) {
        const ltv = 1 - finalDownPaymentRatio;
        let premiumRate = 0;
        if (ltv > 0.90) premiumRate = 0.0400;
        else if (ltv > 0.85) premiumRate = 0.0310;
        else if (ltv > 0.80) premiumRate = 0.0280;
        else if (ltv > 0.75) premiumRate = 0.0240;
        else premiumRate = 0.0180;
        finalCmhcPremium = finalBaseMortgageAmount * premiumRate;
    }

    const finalTotalMortgage = finalBaseMortgageAmount + finalCmhcPremium;
    const i = Math.pow(1 + stressTestRate / 200, 1/6) - 1;
    const n = amortization * 12;
    const finalMonthlyPayment = finalTotalMortgage > 0 ? finalTotalMortgage * i / (1 - Math.pow(1 + i, -n)) : 0;
    
    const finalGdsPayment = finalMonthlyPayment + baseHousingCosts;
    const finalTdsPayment = finalGdsPayment + monthlyDebts;

    const finalGdsRatio = grossMonthlyIncome > 0 ? (finalGdsPayment / grossMonthlyIncome) : 0;
    const finalTdsRatio = grossMonthlyIncome > 0 ? (finalTdsPayment / grossMonthlyIncome) : 0;
    
    const MAX_GDS = finalIsConventional ? 0.45 : 0.39;
    const MAX_TDS = finalIsConventional ? 0.50 : 0.44;

    const qualifies = finalGdsRatio <= MAX_GDS && finalTdsRatio <= MAX_TDS && maxPurchasePrice > 0;

    setResults({
      maxPurchasePrice: Math.round(maxPurchasePrice),
      maxMortgageAmount: Math.round(finalTotalMortgage),
      monthlyPayment: Math.round(finalMonthlyPayment),
      gdsRatio: parseFloat((finalGdsRatio * 100).toFixed(2)),
      tdsRatio: parseFloat((finalTdsRatio * 100).toFixed(2)),
      qualifyingRate: stressTestRate,
      cmhcPremium: Math.round(finalCmhcPremium),
      qualifies
    });
  }, [annualIncome, monthlyDebts, downPayment, interestRate, amortization, propertyTax, heatingCosts, condoFees]);

  useEffect(() => {
    calculateAffordability();
  }, [calculateAffordability]);

  // Memoize formatter to avoid recreating it on every render
  const formatCurrency = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return (amount: number) => formatter.format(amount);
  }, []);

  return (
    <CalculatorLayout
      title="Home Affordability Calculator"
      description="Determine how much house you can afford based on your income, debts, and down payment. Calculate GDS and TDS ratios to ensure you qualify for your mortgage."
      icon={DollarSign}
      color="from-brand-blue to-blue-600"
      canonicalPath="/calculators/affordability"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Income & Debts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Users size={24} className="text-brand-blue flex-shrink-0" />
              <span>Income & Debts</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Annual Household Income"
                value={annualIncome}
                min={30000}
                max={300000}
                step={5000}
                onChange={setAnnualIncome}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Monthly Debt Payments"
                value={monthlyDebts}
                min={0}
                max={3000}
                step={50}
                onChange={setMonthlyDebts}
                formatValue={(value) => formatCurrency(value)}
                icon={CreditCard}
              />
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Home size={24} className="text-emerald-600 flex-shrink-0" />
              <span>Property & Mortgage</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Down Payment"
                value={downPayment}
                min={25000}
                max={200000}
                step={5000}
                onChange={setDownPayment}
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
                min={5}
                max={30}
                step={5}
                onChange={setAmortization}
                formatValue={(value) => `${value} years`}
                icon={Calendar}
              />

              <SliderInput
                label="Annual Property Tax"
                value={propertyTax}
                min={1000}
                max={10000}
                step={250}
                onChange={setPropertyTax}
                formatValue={(value) => formatCurrency(value)}
                icon={Home}
              />

              <SliderInput
                label="Monthly Heating"
                value={heatingCosts}
                min={50}
                max={400}
                step={25}
                onChange={setHeatingCosts}
                formatValue={(value) => formatCurrency(value)}
                icon={Home}
              />

              <SliderInput
                label="Monthly Condo Fees"
                value={condoFees}
                min={0}
                max={800}
                step={25}
                onChange={setCondoFees}
                formatValue={(value) => formatCurrency(value)}
                icon={Home}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Affordability Results */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.qualifies 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <div className={`text-4xl sm:text-5xl font-bold mb-3 ${
                results.qualifies ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {formatCurrency(results.maxPurchasePrice)}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${
                results.qualifies ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Maximum Purchase Price
              </h3>
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                results.qualifies 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.qualifies ? '✓ Qualifies' : '✗ May Not Qualify'}
              </div>
            </div>
          </div>

          {/* Debt Service Ratios */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Debt Service Ratios</h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">GDS Ratio</span>
                  <span className={`font-bold text-sm sm:text-base ${results.gdsRatio <= (downPayment / results.maxPurchasePrice >= 0.2 ? 45 : 39) ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.gdsRatio}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                  <div 
                    className={`h-3 sm:h-4 rounded-full transition-all duration-500 ${
                      results.gdsRatio <= (downPayment / results.maxPurchasePrice >= 0.2 ? 45 : 39) ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.gdsRatio / (downPayment / results.maxPurchasePrice >= 0.2 ? 45 : 39) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">Maximum: {downPayment / results.maxPurchasePrice >= 0.2 ? '45%' : '39%'}</div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                  <span className="font-semibold text-gray-700 text-sm sm:text-base">TDS Ratio</span>
                  <span className={`font-bold text-sm sm:text-base ${results.tdsRatio <= (downPayment / results.maxPurchasePrice >= 0.2 ? 50 : 44) ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.tdsRatio}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                  <div 
                    className={`h-3 sm:h-4 rounded-full transition-all duration-500 ${
                      results.tdsRatio <= (downPayment / results.maxPurchasePrice >= 0.2 ? 50 : 44) ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.tdsRatio / (downPayment / results.maxPurchasePrice >= 0.2 ? 50 : 44) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">Maximum: {downPayment / results.maxPurchasePrice >= 0.2 ? '50%' : '44%'}</div>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Affordability Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Maximum Mortgage</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.maxMortgageAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Down Payment</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(downPayment)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">CMHC Insurance</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.cmhcPremium)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Qualifying Rate</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{results.qualifyingRate.toFixed(2)}%</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Monthly Payment</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.monthlyPayment)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Monthly Income</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(annualIncome / 12)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Max Purchase Price</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(results.maxPurchasePrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Understanding Debt Service Ratios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-lg font-bold text-emerald-600 mb-3">GDS Ratio (Gross Debt Service)</h4>
            <p className="text-gray-600 leading-relaxed">
              The percentage of your gross monthly income that goes toward housing costs. This includes the mortgage payment (calculated at the stress test rate), property taxes, heating, and 50% of condo fees. Lenders want to see this below 39% for insured mortgages and 45% for uninsured.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="text-lg font-bold text-brand-blue mb-3">TDS Ratio (Total Debt Service)</h4>
            <p className="text-gray-600 leading-relaxed">
              The percentage of your gross monthly income that goes toward all of your debt obligations. This includes all housing costs from GDS, plus other debts like car loans, credit cards, and lines of credit. Lenders want this below 44% for insured mortgages and 50% for uninsured.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
});

AffordabilityCalculator.displayName = 'AffordabilityCalculator';

export default AffordabilityCalculator;