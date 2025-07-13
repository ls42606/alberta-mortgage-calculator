import React, { useState, useEffect } from 'react';
import { Building2, DollarSign, Percent, TrendingUp, Calculator } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const CommercialCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [downPayment, setDownPayment] = useState(25);
  const [interestRate, setInterestRate] = useState(6.5);
  const [amortization, setAmortization] = useState(20);
  const [annualRent, setAnnualRent] = useState(120000);
  const [operatingExpenses, setOperatingExpenses] = useState(30000);
  const [vacancyRate, setVacancyRate] = useState(5);
  
  const [results, setResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    grossRentalYield: 0,
    netRentalYield: 0,
    cashFlow: 0,
    capRate: 0,
    dscr: 0,
    roi: 0,
    effectiveRent: 0,
    noi: 0
  });

  useEffect(() => {
    calculateCommercial();
  }, [propertyValue, downPayment, interestRate, amortization, annualRent, operatingExpenses, vacancyRate]);

  const calculateCommercial = () => {
    const downPaymentAmount = propertyValue * (downPayment / 100);
    const loanAmount = propertyValue - downPaymentAmount;
    
    // CORRECTED: Calculate mortgage payment with semi-annual compounding
    const nominalAnnualRate = interestRate / 100;
    const effectiveMonthlyRate = Math.pow(1 + nominalAnnualRate / 2, 2 / 12) - 1;
    const numberOfPayments = amortization * 12;
    
    let monthlyPayment = 0;
    if (effectiveMonthlyRate > 0 && loanAmount > 0) {
      monthlyPayment = (loanAmount * effectiveMonthlyRate) / (1 - Math.pow(1 + effectiveMonthlyRate, -numberOfPayments));
    } else if (loanAmount > 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    }
    
    // Calculate rental income metrics
    const effectiveRent = annualRent * (1 - vacancyRate / 100);
    const noi = effectiveRent - operatingExpenses; // Net Operating Income
    const annualDebtService = monthlyPayment * 12;
    const cashFlow = noi - annualDebtService;
    
    // Calculate ratios
    const grossRentalYield = (annualRent / propertyValue) * 100;
    const netRentalYield = (noi / propertyValue) * 100;
    const capRate = (noi / propertyValue) * 100;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0; // Debt Service Coverage Ratio
    const roi = downPaymentAmount > 0 ? (cashFlow / downPaymentAmount) * 100 : 0; // Return on Investment
    
    setResults({
      loanAmount: Math.round(loanAmount),
      monthlyPayment: Math.round(monthlyPayment),
      grossRentalYield: Math.round(grossRentalYield * 100) / 100,
      netRentalYield: Math.round(netRentalYield * 100) / 100,
      cashFlow: Math.round(cashFlow),
      capRate: Math.round(capRate * 100) / 100,
      dscr: Math.round(dscr * 100) / 100,
      roi: Math.round(roi * 100) / 100,
      effectiveRent: Math.round(effectiveRent),
      noi: Math.round(noi)
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
      title="Commercial Mortgage Calculator"
      description="Calculate payments and analyze investment returns for commercial and investment properties. Evaluate cash flow, cap rates, and debt service coverage ratios."
      icon={Building2}
      color="from-gray-600 to-gray-700"
      canonicalPath="/calculators/commercial"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Property & Financing */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Building2 size={24} className="text-gray-600 flex-shrink-0" />
              <span>Property & Financing</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Property Value"
                value={propertyValue}
                min={500000}
                max={5000000}
                step={50000}
                onChange={setPropertyValue}
                formatValue={(value) => formatCurrency(value)}
                icon={Building2}
              />

              <SliderInput
                label="Down Payment"
                value={downPayment}
                min={20}
                max={50}
                step={5}
                onChange={setDownPayment}
                formatValue={(value) => `${value}%`}
                icon={DollarSign}
              />

              <SliderInput
                label="Interest Rate"
                value={interestRate}
                min={4.0}
                max={10.0}
                step={0.1}
                onChange={setInterestRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />

              <SliderInput
                label="Amortization Period"
                value={amortization}
                min={15}
                max={25}
                step={1}
                onChange={setAmortization}
                formatValue={(value) => `${value} years`}
                icon={Calculator}
              />
            </div>
          </div>

          {/* Income & Expenses */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <TrendingUp size={24} className="text-emerald-600 flex-shrink-0" />
              <span>Income & Expenses</span>
            </h3>
            
            <div className="space-y-6">
              <SliderInput
                label="Annual Rental Income"
                value={annualRent}
                min={50000}
                max={500000}
                step={5000}
                onChange={setAnnualRent}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Annual Operating Expenses"
                value={operatingExpenses}
                min={10000}
                max={150000}
                step={2500}
                onChange={setOperatingExpenses}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Vacancy Rate"
                value={vacancyRate}
                min={0}
                max={20}
                step={1}
                onChange={setVacancyRate}
                formatValue={(value) => `${value}%`}
                icon={Percent}
              />
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Cash Flow Summary */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.cashFlow > 0 
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <div className={`text-4xl sm:text-5xl font-bold mb-3 ${
                results.cashFlow > 0 ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {formatCurrency(results.cashFlow)}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${
                results.cashFlow > 0 ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Annual Cash Flow
              </h3>
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                results.cashFlow > 0 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.cashFlow > 0 ? '✓ Positive Cash Flow' : '✗ Negative Cash Flow'}
              </div>
            </div>
          </div>

          {/* Investment Metrics */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Investment Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{results.capRate.toFixed(2)}%</div>
                <div className="text-sm font-semibold text-gray-600">Cap Rate</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{results.roi.toFixed(2)}%</div>
                <div className="text-sm font-semibold text-gray-600">ROI</div>
              </div>
              
              <div className={`p-4 rounded-lg text-center ${results.dscr >= 1.2 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                <div className={`text-xl sm:text-2xl font-bold ${results.dscr >= 1.2 ? 'text-emerald-700' : 'text-red-700'}`}>{results.dscr.toFixed(2)}</div>
                <div className="text-sm font-semibold text-gray-600">DSCR</div>
                <div className="text-xs text-gray-500 mt-1">(Lenders require &gt; 1.2)</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{results.netRentalYield.toFixed(2)}%</div>
                <div className="text-sm font-semibold text-gray-600">Net Yield</div>
              </div>
            </div>
          </div>

          {/* Financing Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Financing Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Property Value</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(propertyValue)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Down Payment</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(propertyValue * (downPayment / 100))}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Loan Amount</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Monthly Payment</span>
                <span className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(results.monthlyPayment)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Annual Debt Service</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(results.monthlyPayment * 12)}</span>
              </div>
            </div>
          </div>

          {/* Income Analysis */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Income Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Gross Rental Income</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(annualRent)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Vacancy Loss</span>
                <span className="text-base sm:text-lg font-bold text-red-600">-{formatCurrency(annualRent * (vacancyRate / 100))}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Effective Rental Income</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(results.effectiveRent)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Operating Expenses</span>
                <span className="text-base sm:text-lg font-bold text-red-600">-{formatCurrency(operatingExpenses)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Net Operating Income</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(results.noi)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Key Investment Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Cap Rate</h4>
            <p className="text-gray-600 leading-relaxed">
              Net Operating Income divided by property value. Higher cap rates indicate better returns.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-brand-blue" />
            </div>
            <h4 className="text-lg font-bold text-brand-blue mb-3">DSCR</h4>
            <p className="text-gray-600 leading-relaxed">
              Debt Service Coverage Ratio. Lenders typically require DSCR of 1.2 or higher for approval.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-brand-gold" />
            </div>
            <h4 className="text-lg font-bold text-brand-gold mb-3">Cash Flow</h4>
            <p className="text-gray-600 leading-relaxed">
              Net income after all expenses and debt service. Positive cash flow is essential for sustainability.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default CommercialCalculator;