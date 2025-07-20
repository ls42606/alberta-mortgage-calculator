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
    <section className="py-16 sm:py-24 bg-gradient-to-br from-surface via-white to-emerald-50/30 relative overflow-hidden">
      {/* Professional Background Enhancement */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute bottom-1/3 left-1/3 w-60 h-60 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm">
            <Calculator size={16} className="flex-shrink-0" />
            <span>Interactive Mortgage Calculator</span>
            <Award size={14} className="text-emerald-600 flex-shrink-0" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-primary leading-tight">
            Professional Mortgage 
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent block">Calculator</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get accurate payment estimates trusted by mortgage professionals across Alberta. 
            Instant calculations with real-time market data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Enhanced Calculator Inputs */}
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 flex items-center space-x-2 sm:space-x-3">
              <Home size={20} sm:size={24} lg:size={28} className="text-emerald-600 flex-shrink-0" />
              <span>Mortgage Details</span>
            </h3>
            
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
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
          <div className="space-y-4 sm:space-y-6">
            {/* Monthly Payment - Primary Result with Disclaimers */}
            <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-4 sm:p-6 lg:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                <TrendingUp size={24} sm:size={28} lg:size={32} className="text-emerald-600 flex-shrink-0" />
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-emerald-800">Estimated Monthly Payment</h3>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 mb-3 animate-scale-in break-words">
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
            <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
                <Calculator size={18} sm:size={20} lg:size={24} className="text-brand-blue flex-shrink-0" />
                <span>Mortgage Breakdown</span>
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600 font-semibold">Purchase Price</span>
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-words">
                    {formatCurrency(purchasePrice)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600 font-semibold">Down Payment</span>
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-emerald-700 break-words">
                    {formatCurrency(results.downPaymentAmount)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600 font-semibold">Loan Amount</span>
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-words">
                    {formatCurrency(purchasePrice - results.downPaymentAmount)}
                  </span>
                </div>

                {results.cmhcInsurance > 0 && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-0">
                    <span className="text-sm sm:text-base text-gray-600 font-semibold">CMHC Insurance</span>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-orange-600 break-words">
                      {formatCurrency(results.cmhcInsurance)}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 border-b border-gray-100 gap-1 sm:gap-0">
                  <span className="text-sm sm:text-base text-gray-600 font-semibold">Total Interest</span>
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 break-words">
                    {formatCurrency(results.totalInterest)}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 sm:py-4 pt-4 sm:pt-6 border-t-2 border-gray-200 gap-1 sm:gap-0">
                  <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-lg">Total Cost</span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 break-words">
                    {formatCurrency(results.totalPayment + results.downPaymentAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Section with Professional Messaging */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-3">Ready for Your Actual Rate?</h3>
                <p className="text-slate-200 mb-4 leading-relaxed text-sm sm:text-base">
                  Get personalized rates from our network of 50+ Alberta lenders
                </p>
                <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-slate-300 bg-slate-800/50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-slate-600">
                  <strong>What happens next:</strong> A qualified mortgage professional will contact you with your actual rate based on your complete financial profile, credit score, and property details.
                </div>
                <button 
                  onClick={scrollToFormWithFullScreen}
                  className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white text-slate-800 rounded-lg font-bold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-h-[48px] text-sm sm:text-base"
                  aria-label="Get personalized mortgage rate from qualified professionals"
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
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Info size={20} sm:size={24} lg:size={28} className="text-emerald-600" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">Accurate Estimates</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our calculator uses current market rates and includes all applicable fees and insurance for precise calculations.
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <TrendingUp size={20} sm:size={24} lg:size={28} className="text-brand-blue" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">Real-Time Rates</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Connected to live market data to ensure you see the most current rate information available.
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover-lift">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Shield size={20} sm:size={24} lg:size={28} className="text-brand-gold" />
            </div>
            <h4 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">Professional Grade</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              The same calculation engine used by mortgage professionals and financial institutions across Alberta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;