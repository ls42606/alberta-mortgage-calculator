import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Percent, AlertTriangle } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const StressTestCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState(85000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(100000);
  const [contractRate, setContractRate] = useState(5.5);
  const [amortization] = useState(25);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [heatingCosts, setHeatingCosts] = useState(150);
  
  const [results, setResults] = useState({
    stressTestRate: 0,
    maxPurchasePriceContract: 0,
    maxPurchasePriceStress: 0,
    monthlyPaymentContract: 0,
    monthlyPaymentStress: 0,
    gdsRatioContract: 0,
    gdsRatioStress: 0,
    tdsRatioContract: 0,
    tdsRatioStress: 0,
    passesStressTest: false,
    qualificationGap: 0
  });

  useEffect(() => {
    calculateStressTest();
  }, [annualIncome, monthlyDebts, downPayment, contractRate, amortization, propertyTax, heatingCosts]);

  const calculateStressTest = () => {
    const grossMonthlyIncome = annualIncome / 12;
    if (grossMonthlyIncome <= 0) {
      setResults({
        stressTestRate: Math.max(contractRate + 2, 5.25),
        maxPurchasePriceContract: 0,
        maxPurchasePriceStress: 0,
        monthlyPaymentContract: 0,
        monthlyPaymentStress: 0,
        gdsRatioContract: 0,
        gdsRatioStress: 0,
        tdsRatioContract: 0,
        tdsRatioStress: 0,
        passesStressTest: false,
        qualificationGap: 0
      });
      return;
    }
    
    const stressTestRate = Math.max(contractRate + 2, 5.25);
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyHeating = heatingCosts;
    const baseHousingCosts = monthlyPropertyTax + monthlyHeating;

    // The single, true max purchase price is determined by the stress test.
    // We use the same iterative logic from the affordability calculator.
    let maxPurchasePrice = 0;
    let lowerBound = 0;
    let upperBound = 3000000;

    for (let i = 0; i < 100; i++) {
        const priceGuess = (lowerBound + upperBound) / 2;
        if (upperBound - lowerBound < 100) break;

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
            mortgageInsurancePremium = baseMortgageAmount * premiumRate;
        }

        const totalMortgageAmount = baseMortgageAmount + mortgageInsurancePremium;
        const numberOfPayments = amortization * 12;
        const effectiveMonthlyRate = Math.pow(1 + (stressTestRate / 100) / 2, 2 / 12) - 1;
        
        let qualifyingPAndI = 0;
        if (totalMortgageAmount > 0 && effectiveMonthlyRate > 0) {
            qualifyingPAndI = (totalMortgageAmount * effectiveMonthlyRate) / (1 - Math.pow(1 + effectiveMonthlyRate, -numberOfPayments));
        }

        const totalMonthlyHousingCosts = qualifyingPAndI + baseHousingCosts;
        const gds = totalMonthlyHousingCosts / grossMonthlyIncome;
        const tds = (totalMonthlyHousingCosts + monthlyDebts) / grossMonthlyIncome;

        if (gds <= MAX_GDS_RATIO && tds <= MAX_TDS_RATIO) {
            maxPurchasePrice = priceGuess;
            lowerBound = priceGuess;
        } else {
            upperBound = priceGuess;
        }
    }

    // Now, calculate the display values based on the *one* true max purchase price.
    const finalDownPaymentRatio = maxPurchasePrice > 0 ? downPayment / maxPurchasePrice : 0;
    const finalIsConventional = finalDownPaymentRatio >= 0.20;

    let finalCmhcPremium = 0;
    const finalBaseMortgage = maxPurchasePrice - downPayment;
     if (!finalIsConventional && maxPurchasePrice < 1000000 && finalBaseMortgage > 0) {
        const ltv = 1 - finalDownPaymentRatio;
        let premiumRate = 0;
        if (ltv > 0.90) premiumRate = 0.0400;
        else if (ltv > 0.85) premiumRate = 0.0310;
        else if (ltv > 0.80) premiumRate = 0.0280;
        finalCmhcPremium = finalBaseMortgage * premiumRate;
    }
    const finalLoanAmount = finalBaseMortgage + finalCmhcPremium;

    const calculatePayment = (loan: number, rate: number, amort: number) => {
      if (loan <= 0) return 0;
      const effectiveRate = Math.pow(1 + (rate / 100) / 2, 2 / 12) - 1;
      const numPayments = amort * 12;
      return (loan * effectiveRate) / (1 - Math.pow(1 + effectiveRate, -numPayments));
    };

    const monthlyPaymentContract = calculatePayment(finalLoanAmount, contractRate, amortization);
    const monthlyPaymentStress = calculatePayment(finalLoanAmount, stressTestRate, amortization);
    
    const finalTotalHousingCosts = monthlyPaymentStress + baseHousingCosts;
    const gdsRatioStress = grossMonthlyIncome > 0 ? finalTotalHousingCosts / grossMonthlyIncome * 100 : 0;
    const tdsRatioStress = grossMonthlyIncome > 0 ? (finalTotalHousingCosts + monthlyDebts) / grossMonthlyIncome * 100 : 0;
    
    const maxGdsFinal = finalIsConventional ? 45 : 39;
    const maxTdsFinal = finalIsConventional ? 50 : 44;
    const passesStressTest = gdsRatioStress <= maxGdsFinal && tdsRatioStress <= maxTdsFinal && maxPurchasePrice > 0;
    
    setResults({
      stressTestRate: parseFloat(stressTestRate.toFixed(2)),
      maxPurchasePriceContract: 0, // This is now irrelevant
      maxPurchasePriceStress: Math.round(maxPurchasePrice),
      monthlyPaymentContract: Math.round(monthlyPaymentContract),
      monthlyPaymentStress: Math.round(monthlyPaymentStress),
      gdsRatioContract: 0, // Irrelevant
      gdsRatioStress: parseFloat(gdsRatioStress.toFixed(1)),
      tdsRatioContract: 0, // Irrelevant
      tdsRatioStress: parseFloat(tdsRatioStress.toFixed(1)),
      passesStressTest,
      qualificationGap: Math.round(monthlyPaymentStress - monthlyPaymentContract)
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
      title="Mortgage Stress Test"
      description="Test your mortgage qualification under Bank of Canada stress test rules. See how higher interest rates affect your borrowing capacity and ensure you can handle rate increases."
      icon={Calculator}
      color="from-orange-500 to-orange-600"
      canonicalPath="/calculators/stress-test"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Income & Debts */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <DollarSign size={24} className="text-orange-600 flex-shrink-0" />
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
                icon={DollarSign}
              />
            </div>
          </div>

          {/* Mortgage Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Calculator size={24} className="text-emerald-600 flex-shrink-0" />
              <span>Mortgage Details</span>
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
                label="Contract Interest Rate"
                value={contractRate}
                min={2.0}
                max={8.0}
                step={0.1}
                onChange={setContractRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="Annual Property Tax"
                value={propertyTax}
                min={1000}
                max={10000}
                step={250}
                onChange={setPropertyTax}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Monthly Heating"
                value={heatingCosts}
                min={50}
                max={400}
                step={25}
                onChange={setHeatingCosts}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Stress Test Status */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.passesStressTest 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertTriangle size={28} className={results.passesStressTest ? 'text-emerald-600' : 'text-red-600'} />
                <h3 className={`text-xl sm:text-2xl font-bold ${
                  results.passesStressTest ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  Stress Test Rate: {results.stressTestRate}%
                </h3>
              </div>
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-base sm:text-lg font-bold ${
                results.passesStressTest 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.passesStressTest ? '✓ Passes Stress Test' : '✗ Fails Stress Test'}
              </div>
            </div>
          </div>

          {/* Purchase Price Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Maximum Purchase Price</h3>
            
            <div className="space-y-4 text-center">
               <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-sm font-semibold text-gray-600 mb-2">You Qualify For a Max Purchase Price of:</div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-700">
                  {formatCurrency(results.maxPurchasePriceStress)}
                </div>
                <div className="text-xs text-gray-600 mt-1">This is the most you can afford under the stress test.</div>
              </div>
            </div>
          </div>

          {/* Debt Service Ratios */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Debt Service Ratios</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">GDS Ratio (Stress Test)</span>
                  <span className={`font-bold ${results.gdsRatioStress <= (downPayment / results.maxPurchasePriceStress >= 0.20 ? 45 : 39) ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.gdsRatioStress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      results.gdsRatioStress <= (downPayment / results.maxPurchasePriceStress >= 0.20 ? 45 : 39) ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.gdsRatioStress / (downPayment / results.maxPurchasePriceStress >= 0.20 ? 45 : 39) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">Maximum: {downPayment / results.maxPurchasePriceStress >= 0.20 ? '45%' : '39%'}</div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">TDS Ratio (Stress Test)</span>
                  <span className={`font-bold ${results.tdsRatioStress <= (downPayment / results.maxPurchasePriceStress >= 0.20 ? 50 : 44) ? 'text-emerald-600' : 'text-red-600'}`}>
                    {results.tdsRatioStress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      results.tdsRatioStress <= (downPayment / results.maxPurchasePriceStress >= 0.20 ? 50 : 44) ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(results.tdsRatioStress / (downPayment / results.maxPurchasePriceStress >= 0.20 ? 50 : 44) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">Maximum: {downPayment / results.maxPurchasePriceStress >= 0.20 ? '50%' : '44%'}</div>
              </div>
            </div>
          </div>

          {/* Payment Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Monthly Payment Comparison</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">At Contract Rate</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(results.monthlyPaymentContract)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">At Stress Test Rate</span>
                <span className="text-base sm:text-lg font-bold text-orange-700">{formatCurrency(results.monthlyPaymentStress)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Payment Buffer</span>
                <span className="text-lg sm:text-xl font-bold text-red-700">
                  +{formatCurrency(results.qualificationGap)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Understanding the Stress Test</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} className="text-orange-600" />
            </div>
            <h4 className="text-lg font-bold text-orange-600 mb-3">Purpose</h4>
            <p className="text-gray-600 leading-relaxed">
              Ensures borrowers can handle higher interest rates and economic stress without defaulting.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent size={24} className="text-brand-blue" />
            </div>
            <h4 className="text-lg font-bold text-brand-blue mb-3">Rate Calculation</h4>
            <p className="text-gray-600 leading-relaxed">
              Higher of your contract rate + 2% or the Bank of Canada's minimum qualifying rate (currently 5.25%).
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Impact</h4>
            <p className="text-gray-600 leading-relaxed">
              Reduces borrowing capacity by 15-20% on average, promoting responsible lending and borrowing.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default StressTestCalculator;