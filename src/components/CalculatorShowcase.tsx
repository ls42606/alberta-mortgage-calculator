import React from 'react';
import { 
  Calculator, Home, TrendingUp, PiggyBank, 
  Building, CreditCard, Percent, ChevronRight, Star
} from 'lucide-react';

const CalculatorShowcase: React.FC = () => {
  const calculators = [
    {
      id: 'mortgage-payment',
      title: 'Mortgage Payment Calculator',
      description: 'Calculate monthly payments, total interest, and amortization schedules',
      icon: Home,
      color: 'from-emerald-500 to-emerald-600',
      features: ['Monthly payments', 'Amortization schedule', 'CMHC insurance'],
      popular: true,
      href: '/calculators/mortgage-payment'
    },
    {
      id: 'affordability',
      title: 'Home Affordability Calculator',
      description: 'Determine how much house you can afford based on your income',
      icon: Home,
      color: 'from-brand-blue to-blue-600',
      features: ['Income analysis', 'Debt ratios', 'Maximum purchase price'],
      popular: true,
      href: '/calculators/affordability'
    },
    {
      id: 'heloc',
      title: 'HELOC Calculator',
      description: 'Calculate available credit and payments for home equity lines',
      icon: Percent,
      color: 'from-indigo-500 to-indigo-600',
      features: ['Available equity', 'Interest-only payments', 'Credit limits'],
      popular: true,
      href: '/calculators/heloc'
    },
    {
      id: 'refinance',
      title: 'Refinance Calculator',
      description: 'Compare your current mortgage with refinancing options',
      icon: TrendingUp,
      color: 'from-brand-gold to-yellow-600',
      features: ['Break-even analysis', 'Savings calculator', 'Cost comparison'],
      popular: false,
      href: '/calculators/refinance'
    },
    {
      id: 'prepayment',
      title: 'Prepayment Calculator',
      description: 'See how extra payments can save you thousands in interest',
      icon: PiggyBank,
      color: 'from-purple-500 to-purple-600',
      features: ['Interest savings', 'Time reduction', 'Payment strategies'],
      popular: false,
      href: '/calculators/prepayment'
    },
    {
      id: 'debt-consolidation',
      title: 'Debt Consolidation Calculator',
      description: 'Consolidate high-interest debt into your mortgage',
      icon: CreditCard,
      color: 'from-red-500 to-red-600',
      features: ['Interest comparison', 'Monthly savings', 'Total cost analysis'],
      popular: false,
      href: '/calculators/debt-consolidation'
    },
    {
      id: 'commercial',
      title: 'Commercial Mortgage Calculator',
      description: 'Calculate payments for investment and commercial properties',
      icon: Building,
      color: 'from-gray-600 to-gray-700',
      features: ['Investment analysis', 'Cash flow', 'ROI calculations'],
      popular: false,
      href: '/calculators/commercial'
    },
    {
      id: 'stress-test',
      title: 'Mortgage Stress Test',
      description: 'Test your mortgage qualification under Bank of Canada rules',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      features: ['Qualification rate', 'Stress test scenarios', 'Approval odds'],
      popular: true,
      href: '/calculators/stress-test'
    }
  ];

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
      
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ctaTriggerFullScreen'));
      }, 800);
    }
  };

  // Handle calculator link clicks to prevent jumping
  const handleCalculatorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Navigate directly without any scroll behavior
    window.location.href = href;
  };

  return (
    <section id="calculators" className="py-16 sm:py-24 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-brand-blue/10 rounded-full blur-3xl animate-float-gentle"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-brand-gold/10 to-purple-500/10 rounded-full blur-3xl animate-float-gentle" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Fixed text cutoff issue */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 text-emerald-800 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8 shadow-sm">
            <Calculator size={16} className="flex-shrink-0" />
            <span>Professional Calculator Suite</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight px-4">
            Explore all our
          </h2>
          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.2] pb-2">
            <span className="gradient-text">mortgage calculators</span>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-4 sm:mt-6 px-4">
            From basic payment calculations to advanced investment analysis - access the complete suite of 
            professional-grade calculators trusted by Alberta's mortgage professionals.
          </p>
        </div>

        {/* Calculator Grid - Enhanced mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {calculators.map((calc) => (
            <a
              key={calc.id}
              href={calc.href}
              onClick={(e) => handleCalculatorClick(e, calc.href)}
              className="group relative bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift cursor-pointer block"
            >
              {/* Popular Badge */}
              {calc.popular && (
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
                  <Star size={10} className="fill-current" />
                  <span>Popular</span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${calc.color} rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <calc.icon size={24} className="text-white" />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-emerald-700 transition-colors duration-300 leading-tight">
                {calc.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                {calc.description}
              </p>

              {/* Features */}
              <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                {calc.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-xs text-gray-700">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center justify-between text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                <span className="text-xs sm:text-sm font-semibold">Calculate Now</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Need a custom calculation?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Our mortgage professionals can create personalized scenarios and provide detailed analysis 
            for complex situations not covered by standard calculators.
          </p>
          <button
            onClick={scrollToFormWithFullScreen}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
          >
            Apply Here
          </button>
        </div>
      </div>
    </section>
  );
};

export default CalculatorShowcase;