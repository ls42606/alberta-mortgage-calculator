import React from 'react';
import { Home, RefreshCw, TrendingUp, Users, Shield, Award, Clock, Calculator } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const scrollToCalculatorWithFullScreen = () => {
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

  const services = [
    {
      icon: Home,
      title: 'Purchase Mortgages',
      description: 'First-time buyers to luxury properties - we find the perfect financing solution for your dream home.',
      features: ['First-time buyer programs', 'Luxury property specialists', 'New construction financing'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: RefreshCw,
      title: 'Refinancing',
      description: 'Unlock your home\'s equity or secure better terms with our refinancing expertise.',
      features: ['Lower monthly payments', 'Cash-out refinancing', 'Debt consolidation'],
      color: 'from-brand-blue to-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Renewals',
      description: 'Don\'t auto-renew. Let us negotiate better terms and explore all your options.',
      features: ['Rate negotiation', 'Term optimization', 'Lender switching'],
      color: 'from-brand-gold to-yellow-600'
    },
    {
      icon: Users,
      title: 'Investment Properties',
      description: 'Build your real estate portfolio with specialized investment property financing.',
      features: ['Multi-unit properties', 'Commercial mortgages', 'Portfolio optimization'],
      color: 'from-brand-red to-red-600'
    }
  ];

  const advantages = [
    {
      icon: Calculator,
      title: 'Advanced Analytics',
      description: 'Proprietary tools analyze your situation across 50+ lenders to find optimal solutions.',
    },
    {
      icon: Clock,
      title: 'Speed & Efficiency',
      description: 'Streamlined processes and digital tools mean faster approvals and less paperwork.',
    },
    {
      icon: Shield,
      title: 'Regulatory Expertise',
      description: 'Navigate complex regulations with confidence. We ensure full compliance every step.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of securing better rates and terms than traditional bank offerings.',
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Comprehensive Mortgage Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From first-time purchases to complex refinancing, we provide expert guidance 
            and access to exclusive lending opportunities you won't find elsewhere.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToCalculatorWithFullScreen}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              The Alberta Mortgage Calculator Advantage
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Why thousands of Albertans choose our platform over traditional banks and other brokers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <advantage.icon size={28} className="text-emerald-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{advantage.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={scrollToCalculatorWithFullScreen}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              Experience the Difference
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;