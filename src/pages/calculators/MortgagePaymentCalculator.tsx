import React, { useState, useEffect } from 'react';
import { Home, DollarSign, Percent, Calendar, Info, TrendingUp, Calculator, Award, Shield } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const MortgagePaymentCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  
  const [results, setResults] = useState({
    monthlyPayment: 0,
    biWeeklyPayment: 0,
    weeklyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
    cmhcInsurance: 0,
    loanAmount: 0,
    downPaymentAmount: 0
  });

  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);

  useEffect(() => {
    calculateMortgage();
  }, [purchasePrice, downPayment, interestRate, amortization, paymentFrequency]);

  useEffect(() => {
    if(results.loanAmount > 0) {
       generateAmortizationSchedule(results.loanAmount);
    }
  }, [results]);

  const calculateMortgage = () => {
    const downPaymentAmount = purchasePrice * (downPayment / 100);
    const principalAmount = purchasePrice - downPaymentAmount;
    
    // CMHC Insurance calculation (accurate Canadian rates)
    let cmhcInsurance = 0;
    if (downPayment < 20) {
      if (downPayment >= 15) {
        cmhcInsurance = principalAmount * 0.028; // 2.8%
      } else if (downPayment >= 10) {
        cmhcInsurance = principalAmount * 0.031; // 3.1%
      } else if (downPayment >= 5) {
        cmhcInsurance = principalAmount * 0.04; // 4.0%
      }
    }

    const totalLoanAmount = principalAmount + cmhcInsurance;
    const nominalAnnualRate = interestRate / 100;
    
    // CORRECTED: Calculate effective periodic rates from the semi-annual compounded rate
    const getEffectiveRate = (periodsPerYear: number) => {
        return Math.pow(1 + nominalAnnualRate / 2, 2 / periodsPerYear) - 1;
    };

    const effectiveMonthlyRate = getEffectiveRate(12);
    const effectiveBiWeeklyRate = getEffectiveRate(26);
    const effectiveWeeklyRate = getEffectiveRate(52);

    const monthlyPaymentsTotal = amortization * 12;
    const biWeeklyPaymentsTotal = amortization * 26;
    const weeklyPaymentsTotal = amortization * 52;

    const calculatePayment = (rate: number, numPayments: number) => {
        if (rate <= 0 || !isFinite(rate)) return totalLoanAmount / numPayments;
        if (totalLoanAmount <= 0) return 0;
        return (totalLoanAmount * rate) / (1 - Math.pow(1 + rate, -numPayments));
    };

    const monthlyPayment = calculatePayment(effectiveMonthlyRate, monthlyPaymentsTotal);
    const biWeeklyPayment = calculatePayment(effectiveBiWeeklyRate, biWeeklyPaymentsTotal);
    const weeklyPayment = calculatePayment(effectiveWeeklyRate, weeklyPaymentsTotal);
    
    // CORRECTED: Calculate total payment and interest based on selected frequency
    let actualPayment = monthlyPayment;
    let totalNumberOfPayments = monthlyPaymentsTotal;

    if (paymentFrequency === 'bi-weekly') {
        actualPayment = biWeeklyPayment;
        totalNumberOfPayments = biWeeklyPaymentsTotal;
    } else if (paymentFrequency === 'weekly') {
        actualPayment = weeklyPayment;
        totalNumberOfPayments = weeklyPaymentsTotal;
    }

    const totalPayment = actualPayment * totalNumberOfPayments;
    const totalInterest = totalPayment - totalLoanAmount;

    setResults({
      monthlyPayment, // Keep it as a float for amortization accuracy
      biWeeklyPayment,
      weeklyPayment,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      cmhcInsurance: Math.round(cmhcInsurance),
      loanAmount: Math.round(totalLoanAmount),
      downPaymentAmount: Math.round(downPaymentAmount)
    });

    // Amortization schedule generation is now handled by the new useEffect hook
  };

  const generateAmortizationSchedule = (principal: number) => {
    const schedule = [];
    let balance = principal;
    
    const nominalAnnualRate = interestRate / 100;
    const getEffectiveRate = (periodsPerYear: number) => {
        return Math.pow(1 + nominalAnnualRate / 2, 2 / periodsPerYear) - 1;
    };

    let periodicRate = 0;
    let periodicPayment = 0;
    
    switch (paymentFrequency) {
        case 'weekly':
            periodicRate = getEffectiveRate(52);
            periodicPayment = results.weeklyPayment;
            break;
        case 'bi-weekly':
            periodicRate = getEffectiveRate(26);
            periodicPayment = results.biWeeklyPayment;
            break;
        case 'monthly':
        default:
            periodicRate = getEffectiveRate(12);
            periodicPayment = results.monthlyPayment;
            break;
    }
    
    if (periodicPayment <= 0 || periodicRate < 0 || !isFinite(periodicPayment)) {
      setAmortizationSchedule([]);
      return;
    };

    for (let period = 1; period <= 12; period++) { // Show first 12 periods
      const interestPayment = balance * periodicRate;
      const principalPayment = periodicPayment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month: period, // month still used as key, but represents period
        payment: Math.round(periodicPayment),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(balance < 0 ? 0 : balance)
      });
    }
    
    setAmortizationSchedule(schedule);
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
      title="Mortgage Payment Calculator"
      description="Calculate your monthly mortgage payments, explore different payment frequencies, and view detailed amortization schedules with professional accuracy."
      icon={Home}
      color="from-emerald-500 to-emerald-600"
      canonicalPath="/calculators/mortgage-payment"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center space-x-3">
            <Calculator size={24} sm:size={28} className="text-emerald-600 flex-shrink-0" />
            <span>Mortgage Details</span>
          </h3>
          
          <div className="space-y-6 sm:space-y-8">
            <SliderInput
              label="Purchase Price"
              value={purchasePrice}
              min={150000}
              max={2000000}
              step={25000}
              onChange={setPurchasePrice}
              formatValue={(value) => formatCurrency(value)}
              icon={Home}
              info="Total price of the property you're purchasing"
            />

            <SliderInput
              label="Down Payment"
              value={downPayment}
              min={5}
              max={50}
              step={1}
              onChange={setDownPayment}
              formatValue={(value) => `${value}%`}
              icon={DollarSign}
              info="Minimum 5% required. 20%+ avoids CMHC insurance"
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
              info="Annual interest rate for your mortgage"
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
              info="Total time to pay off your mortgage"
            />

            <div className="space-y-3">
              <label htmlFor="payment-frequency" className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                <TrendingUp size={20} className="text-emerald-600" />
                <span>Payment Frequency</span>
              </label>
              <select
                id="payment-frequency"
                name="payment-frequency"
                className="form-input w-full"
                value={paymentFrequency}
                onChange={(e) => setPaymentFrequency(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Payment Results */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-6 text-center">Payment Options</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-emerald-200">
                <span className="font-semibold text-gray-700">Monthly</span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-800">{formatCurrency(Math.round(results.monthlyPayment))}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-emerald-200">
                <span className="font-semibold text-gray-700">Bi-Weekly</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(Math.round(results.biWeeklyPayment))}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-emerald-200">
                <span className="font-semibold text-gray-700">Weekly</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">{formatCurrency(Math.round(results.weeklyPayment))}</span>
              </div>
            </div>
          </div>

          {/* Mortgage Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Mortgage Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Purchase Price</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(purchasePrice)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Down Payment</span>
                <span className="text-base sm:text-lg font-bold text-emerald-700">{formatCurrency(results.downPaymentAmount)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Loan Amount</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(purchasePrice - results.downPaymentAmount)}</span>
              </div>

              {results.cmhcInsurance > 0 && (
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">CMHC Insurance</span>
                  <span className="text-base sm:text-lg font-bold text-orange-600">{formatCurrency(results.cmhcInsurance)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 font-semibold">Total Interest</span>
                <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(results.totalInterest)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">Total Cost</span>
                <span className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(results.totalPayment + results.downPaymentAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div className="mt-12 sm:mt-16 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Amortization Schedule (First Year)</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 sm:px-4 font-bold text-gray-900">Period</th>
                <th className="text-right py-3 px-2 sm:px-4 font-bold text-gray-900">Payment</th>
                <th className="text-right py-3 px-2 sm:px-4 font-bold text-gray-900">Principal</th>
                <th className="text-right py-3 px-2 sm:px-4 font-bold text-gray-900">Interest</th>
                <th className="text-right py-3 px-2 sm:px-4 font-bold text-gray-900">Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-3 px-2 sm:px-4 font-semibold text-gray-700">{row.month}</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-semibold text-gray-900 text-sm sm:text-base">{formatCurrency(row.payment)}</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-semibold text-emerald-600 text-sm sm:text-base">{formatCurrency(row.principal)}</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-semibold text-orange-600 text-sm sm:text-base">{formatCurrency(row.interest)}</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-semibold text-gray-900 text-sm sm:text-base">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default MortgagePaymentCalculator;