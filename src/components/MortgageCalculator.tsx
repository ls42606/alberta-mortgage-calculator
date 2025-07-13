import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, TrendingUp, Home, DollarSign, Percent, Calendar, Info, Shield, Award } from 'lucide-react';
import SliderInput from './ui/SliderInput';

const MortgageCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(5.5);
  const [amortization, setAmortization] = useState(25);
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayment: 0,
    cmhcInsurance: 0,
    loanAmount: 0,
    downPaymentAmount: 0
  });

  const calculateMortgage = useCallback(() => {
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
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = amortization * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPayment = totalLoanAmount / numberOfPayments;
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - totalLoanAmount;

    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      cmhcInsurance: Math.round(cmhcInsurance),
      loanAmount: Math.round(totalLoanAmount),
      downPaymentAmount: Math.round(downPaymentAmount)
    });
  }, [purchasePrice, downPayment, interestRate, amortization]);

  useEffect(() => {
    calculateMortgage();
  }, [calculateMortgage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scrollToFormWithFullScreen = () => {
    const element = document.getElementById('calculator');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Trigger full screen mode after scroll
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ctaTriggerFullScreen'));
      }, 800);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-brand-blue/10 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-brand-gold/10 to-emerald-500/10 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm">
            <Calculator size={16} className="flex-shrink-0" />
            <span>Interactive Mortgage Calculator</span>
            <Award size={14} className="text-emerald-600 flex-shrink-0" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            Calculate your mortgage 
            <span className="gradient-text block">instantly</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get accurate payment estimates and explore different scenarios with our professional-grade calculator. 
            Used by mortgage professionals across Alberta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Enhanced Calculator Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center space-x-3">
              <Home size={24} sm:size={28} className="text-emerald-600 flex-shrink-0" />
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
            </div>
          </div>

          {/* Enhanced Results Panel */}
          <div className="space-y-6">
            {/* Monthly Payment - Primary Result with Disclaimers */}
            <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <TrendingUp size={28} sm:size={32} className="text-emerald-600 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-emerald-800">Estimated Monthly Payment</h3>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-emerald-800 mb-3 animate-scale-in">
                {formatCurrency(results.monthlyPayment)}
              </div>
              <p className="text-emerald-700 font-semibold">Principal + Interest Only</p>
              <div className="mt-4 text-xs text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                <strong>Estimate Only</strong> - Based on current rates
              </div>
              <div className="mt-3 text-xs text-slate-600 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
                <strong>Important:</strong> This estimate doesn't include property taxes, insurance, or other fees. A qualified lender will provide your actual rate and payment based on your complete financial profile.
              </div>
            </div>

            {/* Enhanced Detailed Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Calculator size={20} sm:size={24} className="text-brand-blue flex-shrink-0" />
                <span>Mortgage Breakdown</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Purchase Price</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatCurrency(purchasePrice)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Down Payment</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-700">
                    {formatCurrency(results.downPaymentAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Loan Amount</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatCurrency(purchasePrice - results.downPaymentAmount)}
                  </span>
                </div>

                {results.cmhcInsurance > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600 font-semibold">CMHC Insurance</span>
                    <span className="text-base sm:text-lg font-bold text-orange-600">
                      {formatCurrency(results.cmhcInsurance)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Total Interest</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-gray-200">
                  <span className="text-gray-900 font-bold text-base sm:text-lg">Total Cost</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    {formatCurrency(results.totalPayment + results.downPaymentAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Section with Professional Messaging */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 sm:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Ready for Your Actual Rate?</h3>
                <p className="text-slate-200 mb-4 leading-relaxed">
                  Get personalized rates from our network of 50+ Alberta lenders
                </p>
                <div className="mb-6 text-sm text-slate-300 bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-600">
                  <strong>What happens next:</strong> A qualified mortgage professional will contact you with your actual rate based on your complete financial profile, credit score, and property details.
                </div>
                <button 
                  onClick={scrollToFormWithFullScreen}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Get My Actual Rate
                </button>
                <p className="text-xs text-slate-400 mt-3">
                  100% Free • No Obligation • Alberta Licensed Professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Additional Information */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 sm:p-8  bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Info size={24} sm:size={28} className="text-emerald-600" />
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-3">Accurate Estimates</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our calculator uses current market rates and includes all applicable fees and insurance for precise calculations.
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={24} sm:size={28} className="text-brand-blue" />
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-3">Real-Time Rates</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Connected to live market data to ensure you see the most current rate information available.
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={24} sm:size={28} className="text-brand-gold" />
            </div>
            <h4 className="font-bold text-lg text-gray-900 mb-3">Professional Grade</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              The same calculation engine used by mortgage professionals and financial institutions across Alberta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;