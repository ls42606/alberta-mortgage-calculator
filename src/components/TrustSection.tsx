import React from 'react';
import { Calculator, Shield, BookOpen, CheckCircle } from 'lucide-react';

const TrustSection: React.FC = () => {
  const scrollToCalculator = () => {
    const element = document.querySelector('#calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Calculator,
      title: 'Canadian Mortgage Math',
      description: 'Accurate calculations using Canadian semi-annual compounding and federal qualification standards.',
    },
    {
      icon: Shield,
      title: 'Educational Focus',
      description: 'Learn about mortgage processes, qualification requirements, and Alberta-specific regulations.',
    },
    {
      icon: BookOpen,
      title: 'Information Resource',
      description: 'Comprehensive guides covering affordability, stress tests, and home buying in Alberta.',
    }
  ];

  const tools = [
    'Mortgage Payment Calculator',
    'Affordability Calculator', 
    'Stress Test Calculator',
    'Refinance Calculator',
    'Land Transfer Tax Calculator',
    'Prepayment Calculator'
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-medium mb-6">
            <BookOpen size={16} />
            <span>Trusted by Alberta Homebuyers</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Alberta's Premier Mortgage Resource
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive suite of professional-grade calculators using accurate Canadian mortgage mathematics. 
            Built for Alberta homebuyers and industry professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <feature.icon size={36} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Calculator Tools */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Available Calculators
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Notice */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Professional Grade Tools
            </h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
              Our calculators are used by mortgage professionals across Alberta and built to the same standards 
              as industry-leading platforms. All calculations follow current Canadian federal regulations.
            </p>
            <button
              onClick={scrollToCalculator}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              Start Calculating
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;