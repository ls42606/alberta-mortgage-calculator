import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Calculator, Shield, Award, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './ui/SEO';
import LeadCaptureModal from './LeadCaptureModal';

interface CalculatorLayoutProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  canonicalPath: string;
  children: React.ReactNode;
  calculationResults?: Record<string, any>;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  title,
  description,
  icon: Icon,
  color,
  canonicalPath,
  children,
  calculationResults = {}
}) => {
  const navigate = useNavigate();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // The ScrollToTop component in App.tsx handles this globally.
  // This useEffect is redundant.
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const handleBackClick = () => {
    navigate('/#calculators');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <SEO 
        title={`${title} | Alberta Mortgage Calculator`}
        description={description}
        canonicalPath={canonicalPath}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-brand-blue/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-brand-gold/5 to-emerald-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb - Fixed */}
            <div className="flex flex-wrap items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <button
                onClick={handleHomeClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300 group"
              >
                <Home size={16} className="flex-shrink-0" />
                <span className="text-sm font-medium">Home</span>
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300"
              >
                <Calculator size={16} className="flex-shrink-0" />
                <span className="text-sm font-medium">Calculators</span>
              </button>
              <span className="text-gray-400">/</span>
              <span className="text-sm font-medium text-emerald-600 truncate max-w-[200px] sm:max-w-none">{title}</span>
            </div>

            <div className="text-center max-w-4xl mx-auto">
              {/* Trust Badge */}
              <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs sm:text-sm font-bold shadow-sm mb-6 sm:mb-8">
                <Shield size={16} className="text-emerald-600 flex-shrink-0" />
                <span>Professional Grade Calculator</span>
                <Award size={14} className="text-emerald-600 flex-shrink-0" />
              </div>

              {/* Icon */}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r ${color} rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl hover:scale-105 transition-transform duration-300`}>
                <Icon size={40} className="text-white" />
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight px-4">
                {title}
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Content */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {children}
          </div>
        </section>

        {/* Expert Advice CTA */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Get Expert Mortgage Advice
            </h3>
            <p className="text-emerald-100 mb-8 text-lg leading-relaxed">
              Let our professional mortgage experts help you find the best rates and options for your situation. 
              Free consultation with no obligations.
            </p>
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-50 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <MessageCircle size={24} />
              <span>Speak with an Expert</span>
            </button>
            <div className="mt-6 text-emerald-100 text-sm">
              <p>A mortgage professional will contact you within 24 hours</p>
            </div>
          </div>
        </section>

        {/* Back to Calculators CTA - Fixed */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Explore More Calculators
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Access our complete suite of professional mortgage calculators
            </p>
            <button
              onClick={handleBackClick}
              className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              <ArrowLeft size={20} className="flex-shrink-0" />
              <span>View All Calculators</span>
            </button>
          </div>
        </section>

        <Footer />
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        source="calculator"
        calculatorType={title.toLowerCase().replace(/\s+/g, '-')}
        calculationResults={calculationResults}
      />
    </>
  );
};

export default CalculatorLayout;