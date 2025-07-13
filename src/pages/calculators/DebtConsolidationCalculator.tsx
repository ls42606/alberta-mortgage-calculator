import React, { useState, useEffect, useCallback } from 'react';
import { CreditCard, DollarSign, Percent, TrendingDown, Plus, Trash2 } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

interface Debt {
  id: number;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

const DebtConsolidationCalculator: React.FC = () => {
  const [homeValue, setHomeValue] = useState(600000);
  const [mortgageBalance, setMortgageBalance] = useState(400000);
  const [currentMortgagePayment, setCurrentMortgagePayment] = useState(2500);
  const [newMortgageRate, setNewMortgageRate] = useState(5.8);
  const [amortization, setAmortization] = useState(25);
  const [annualIncome, setAnnualIncome] = useState(95000);
  const [propertyTaxes, setPropertyTaxes] = useState(4000);
  const [heatingCosts, setHeatingCosts] = useState(150);
  const [otherDebts, setOtherDebts] = useState(0);
  const [refinanceCosts, setRefinanceCosts] = useState(2000);
  
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: 'Credit Card 1', balance: 15000, rate: 19.99, minPayment: 450 },
    { id: 2, name: 'Credit Card 2', balance: 8000, rate: 22.99, minPayment: 240 },
    { id: 3, name: 'Personal Loan', balance: 12000, rate: 12.99, minPayment: 350 }
  ]);
  
  const [results, setResults] = useState({
    totalDebtBalance: 0,
    currentMonthlyPayments: 0,
    newMortgageAmount: 0,
    newMortgagePayment: 0,
    monthlySavings: 0,
    availableEquity: 0,
    canConsolidate: false,
    qualifiesForNewLoan: false,
    newTDS: 0,
  });

  const calculateConsolidation = useCallback(() => {
    const totalDebtBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const currentDebtPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    const availableEquity = homeValue * 0.8 - mortgageBalance;
    const canCoverDebts = availableEquity >= totalDebtBalance;
    
    // Include refinance costs
    const newMortgageAmount = mortgageBalance + totalDebtBalance + refinanceCosts;
    
    // Correct new mortgage payment calculation with semi-annual compounding
    const nominalNewRate = newMortgageRate / 100;
    const effectiveMonthlyRate = Math.pow(1 + nominalNewRate / 2, 2 / 12) - 1;
    const numberOfPayments = amortization * 12;

    let newMortgagePayment = 0;
    if (newMortgageAmount > 0 && effectiveMonthlyRate > 0) {
      newMortgagePayment = (newMortgageAmount * effectiveMonthlyRate) / (1 - Math.pow(1 + effectiveMonthlyRate, -numberOfPayments));
    }
    
    // Qualification Check (TDS)
    const monthlyIncome = annualIncome / 12;
    const monthlyHousingCosts = newMortgagePayment + (propertyTaxes / 12) + heatingCosts;
    let newTDS = 0;
    if (monthlyIncome > 0) {
        newTDS = (monthlyHousingCosts + otherDebts) / monthlyIncome;
    }
    const qualifiesForNewLoan = newTDS <= 0.50 && canCoverDebts; // Using 50% TDS limit for conventional refi
    
    // Cash Flow Savings
    const totalOldPayments = currentMortgagePayment + currentDebtPayments;
    const monthlySavings = totalOldPayments - newMortgagePayment;
    
    setResults({
      totalDebtBalance,
      currentMonthlyPayments: currentDebtPayments,
      newMortgageAmount,
      newMortgagePayment: Math.round(newMortgagePayment),
      monthlySavings: Math.round(monthlySavings),
      availableEquity: Math.round(availableEquity),
      canConsolidate: canCoverDebts,
      qualifiesForNewLoan,
      newTDS: parseFloat((newTDS * 100).toFixed(1)),
    });
  }, [debts, homeValue, mortgageBalance, newMortgageRate, amortization, annualIncome, propertyTaxes, heatingCosts, otherDebts, refinanceCosts, currentMortgagePayment]);

  useEffect(() => {
    calculateConsolidation();
  }, [calculateConsolidation]);

  const addDebt = () => {
    const newId = Math.max(...debts.map(d => d.id), 0) + 1;
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: 5000,
      rate: 15.99,
      minPayment: 150
    }]);
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
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
      title="Debt Consolidation Calculator"
      description="Consolidate high-interest debt into your mortgage to potentially save thousands in interest and reduce your monthly payments."
      icon={CreditCard}
      color="from-red-500 to-red-600"
      canonicalPath="/calculators/debt-consolidation"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="space-y-8">
          {/* Home & Mortgage */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <DollarSign size={24} className="text-emerald-600 flex-shrink-0" />
              <span>Home & Mortgage</span>
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
                icon={DollarSign}
              />

              <SliderInput
                label="Current Mortgage Balance"
                value={mortgageBalance}
                min={100000}
                max={1000000}
                step={10000}
                onChange={setMortgageBalance}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="Current Monthly Mortgage Payment"
                value={currentMortgagePayment}
                min={500}
                max={5000}
                step={50}
                onChange={setCurrentMortgagePayment}
                formatValue={(value) => formatCurrency(value)}
                icon={DollarSign}
              />

              <SliderInput
                label="New Mortgage Rate"
                value={newMortgageRate}
                min={2.0}
                max={8.0}
                step={0.1}
                onChange={setNewMortgageRate}
                formatValue={(value) => `${value.toFixed(1)}%`}
                icon={Percent}
              />
            </div>
          </div>

          {/* Qualification Details */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Qualification Details</h3>
             <div className="space-y-6">
                <SliderInput
                    label="Annual Household Income"
                    value={annualIncome}
                    min={30000} max={300000} step={5000}
                    onChange={setAnnualIncome}
                    formatValue={formatCurrency}
                    icon={DollarSign}
                />
                 <SliderInput
                    label="Annual Property Taxes"
                    value={propertyTaxes}
                    min={1000} max={10000} step={250}
                    onChange={setPropertyTaxes}
                    formatValue={formatCurrency}
                    icon={DollarSign}
                />
                 <SliderInput
                    label="Monthly Heating Costs"
                    value={heatingCosts}
                    min={50} max={400} step={25}
                    onChange={setHeatingCosts}
                    formatValue={formatCurrency}
                    icon={DollarSign}
                />
                <SliderInput
                    label="Other Monthly Debt Payments (Not Consolidated)"
                    value={otherDebts}
                    min={0} max={3000} step={50}
                    onChange={setOtherDebts}
                    formatValue={formatCurrency}
                    icon={DollarSign}
                />
                <SliderInput
                    label="Estimated Refinance Costs (Fees, Penalties)"
                    value={refinanceCosts}
                    min={0} max={10000} step={250}
                    onChange={setRefinanceCosts}
                    formatValue={formatCurrency}
                    icon={DollarSign}
                />
             </div>
          </div>

          {/* Debts to Consolidate */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-3">
                <CreditCard size={24} className="text-red-600 flex-shrink-0" />
                <span>Debts to Consolidate</span>
              </h3>
              <button
                onClick={addDebt}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300"
              >
                <Plus size={16} />
                <span>Add Debt</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {debts.map((debt) => (
                <div key={debt.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                      className="font-semibold text-gray-900 bg-transparent border-none focus:outline-none"
                      aria-label="Debt Name"
                    />
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-300"
                      aria-label="Remove Debt"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor={`debt-balance-${debt.id}`} className="text-xs font-semibold text-gray-600">Balance</label>
                      <input
                        id={`debt-balance-${debt.id}`}
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                        className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`debt-rate-${debt.id}`} className="text-xs font-semibold text-gray-600">Rate (%)</label>
                      <input
                        id={`debt-rate-${debt.id}`}
                        type="number"
                        step="0.1"
                        value={debt.rate}
                        onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                        className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`debt-min-payment-${debt.id}`} className="text-xs font-semibold text-gray-600">Min Payment</label>
                      <input
                        id={`debt-min-payment-${debt.id}`}
                        type="number"
                        value={debt.minPayment}
                        onChange={(e) => updateDebt(debt.id, 'minPayment', Number(e.target.value))}
                        className="w-full text-sm p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Consolidation Status */}
          <div className={`rounded-2xl border-2 p-6 sm:p-8 shadow-lg ${
            results.qualifiesForNewLoan
              ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border-emerald-200' 
              : 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border-red-200'
          }`}>
            <div className="text-center mb-6">
              <div className={`text-4xl sm:text-5xl font-bold mb-3 ${
                results.qualifiesForNewLoan ? 'text-emerald-800' : 'text-red-800'
              }`}>
                {formatCurrency(Math.abs(results.monthlySavings))}
              </div>
              <h3 className={`text-lg sm:text-xl font-bold ${
                results.qualifiesForNewLoan ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Monthly Cash Flow {results.monthlySavings > 0 ? 'Increase' : 'Decrease'}
              </h3>
              <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                results.qualifiesForNewLoan 
                  ? 'bg-emerald-200 text-emerald-800' 
                  : 'bg-red-200 text-red-800'
              }`}>
                {results.qualifiesForNewLoan ? '✓ Likely to Qualify' : '✗ May Not Qualify'}
              </div>
            </div>
          </div>

          {/* Equity Analysis */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Equity Analysis</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Home Value</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(homeValue)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Current Mortgage</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(mortgageBalance)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Available Equity (80%)</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(results.availableEquity)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Total Debt to Consolidate</span>
                <span className="text-base sm:text-lg font-bold text-red-600">{formatCurrency(results.totalDebtBalance)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Remaining Equity</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  {results.canConsolidate ? formatCurrency(results.availableEquity - results.totalDebtBalance) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Comparison */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Cash Flow Comparison</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm font-semibold text-gray-600 mb-2">Current Total Monthly Payments</div>
                <div className="text-xl sm:text-2xl font-bold text-red-700">
                  {formatCurrency(results.currentMonthlyPayments + currentMortgagePayment)}
                </div>
                <div className="text-xs text-gray-600 mt-1">Mortgage + All Debts</div>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-sm font-semibold text-gray-600 mb-2">New Consolidated Payment</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                  {formatCurrency(results.newMortgagePayment)}
                </div>
                <div className="text-xs text-gray-600 mt-1">New mortgage only</div>
              </div>
              
              <div className={`p-4 rounded-lg border ${
                results.monthlySavings > 0 
                  ? 'bg-emerald-100 border-emerald-300' 
                  : 'bg-red-100 border-red-300'
              }`}>
                <div className="text-sm font-semibold text-gray-600 mb-2">Monthly Difference</div>
                <div className={`text-xl sm:text-2xl font-bold ${
                  results.monthlySavings > 0 ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {results.monthlySavings >= 0 ? '+' : '-'}{formatCurrency(Math.abs(results.monthlySavings))}
                </div>
              </div>
            </div>
          </div>

          {/* Interest Savings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Qualification Check</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">New Mortgage Amount</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.newMortgageAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">New Total Debt Service (TDS) Ratio</span>
                <span className={`text-base sm:text-lg font-bold ${results.newTDS <= 50 ? 'text-emerald-700' : 'text-red-600'}`}>
                  {results.newTDS}%
                </span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Qualification Status</span>
                <span className={`text-lg sm:text-xl font-bold ${results.qualifiesForNewLoan ? 'text-emerald-800' : 'text-red-800'}`}>
                    {results.qualifiesForNewLoan ? 'Passes' : 'Fails'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Debt Consolidation Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown size={24} className="text-emerald-600" />
            </div>
            <h4 className="text-lg font-bold text-emerald-600 mb-3">Lower Interest Rates</h4>
            <p className="text-gray-600 leading-relaxed">
              Mortgage rates are typically much lower than credit card and personal loan rates.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-brand-blue" />
            </div>
            <h4 className="text-lg font-bold text-brand-blue mb-3">Simplified Payments</h4>
            <p className="text-gray-600 leading-relaxed">
              Combine multiple debt payments into one convenient monthly mortgage payment.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Percent size={24} className="text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-red-600 mb-3">Tax Benefits</h4>
            <p className="text-gray-600 leading-relaxed">
              Mortgage interest may be tax-deductible for investment properties or business use.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default DebtConsolidationCalculator;