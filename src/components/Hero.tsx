import React, { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Users, Star, Shield, Calculator } from 'lucide-react';
import MortgageForm from './MortgageForm';

const Hero: React.FC = () => {
  const [isFormFullScreen, setIsFormFullScreen] = useState(false);

  // Listen for CTA triggers from other components
  useEffect(() => {
    const handleCTATrigger = () => {
      setIsFormFullScreen(true);
    };

    window.addEventListener('ctaTriggerFullScreen', handleCTATrigger);
    return () => window.removeEventListener('ctaTriggerFullScreen', handleCTATrigger);
  }, []);

  const toggleFormFullScreen = () => {
    setIsFormFullScreen(!isFormFullScreen);
  };

  return (
    <>
      <section id="calculator" className="section-padding pt-24 sm:pt-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Modern geometric background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[24rem] h-[24rem] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`grid transition-all duration-700 ease-in-out ${
            isFormFullScreen 
              ? 'grid-cols-1 text-center' 
              : 'grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'
          }`}>
            
            {/* Content Section - Morphs beautifully around form */}
            <div className={`transition-all duration-700 ease-in-out ${
              isFormFullScreen 
                ? 'max-w-5xl mx-auto space-y-8 mb-12' 
                : 'max-w-2xl space-y-professional'
            }`}>
              {/* Trust Indicator - Modern professional design */}
              <div className="inline-flex items-center space-x-3 px-5 sm:px-7 py-3 sm:py-4 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-xl text-sm sm:text-base font-semibold shadow-lg shadow-slate-500/10">
                <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                <span>Used by 10,000+ Albertans Monthly</span>
              </div>
              
              {/* Main Headline - Modern typography */}
              <h1 className={`text-slate-900 leading-[1.1] transition-all duration-700 ${
                isFormFullScreen 
                  ? 'text-4xl sm:text-5xl lg:text-7xl font-bold' 
                  : 'text-4xl sm:text-5xl lg:text-6xl font-bold'
              }`}>
                Alberta's Most Accurate
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Mortgage Calculator
                </span>
              </h1>
              
              {/* Subtitle - Enhanced messaging */}
              <p className={`text-slate-600 transition-all duration-700 ${
                isFormFullScreen 
                  ? 'text-xl sm:text-2xl max-w-4xl mx-auto font-medium' 
                  : 'text-lg sm:text-xl max-w-xl font-medium'
              }`}>
                Calculate accurate mortgage payments using Canadian semi-annual compounding mathematics. 
                <span className="text-slate-700 font-semibold">Connect with mortgage professionals</span> for personalized calculations and guidance.
              </p>

              {/* Feature Pills - Modern design */}
              <div className={`flex gap-3 sm:gap-4 transition-all duration-700 ${
                isFormFullScreen ? 'flex-wrap justify-center' : 'flex-wrap'
              }`}>
                <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm sm:text-base font-semibold text-slate-700 shadow-lg shadow-slate-500/10 hover:shadow-xl transition-all duration-300">
                  <Shield size={16} className="text-emerald-600 flex-shrink-0" />
                  <span>100% Free & Secure</span>
                </div>
                <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm sm:text-base font-semibold text-slate-700 shadow-lg shadow-slate-500/10 hover:shadow-xl transition-all duration-300">
                  <TrendingUp size={16} className="text-blue-600 flex-shrink-0" />
                <span>Canadian Mortgage Math</span>
                </div>
                <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl text-sm sm:text-base font-semibold text-slate-700 shadow-lg shadow-slate-500/10 hover:shadow-xl transition-all duration-300">
                  <Users size={16} className="text-indigo-600 flex-shrink-0" />
                  <span>Professional Support</span>
                </div>
              </div>

              {/* Stats with enhanced visual hierarchy */}
              <div className={`grid grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-gray-200 transition-all duration-700 ${
                isFormFullScreen ? 'max-w-3xl mx-auto' : ''
              }`}>
                <div className={`transition-all duration-700 ${
                  isFormFullScreen ? 'text-center' : 'text-center lg:text-left'
                }`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Calculations Monthly</div>
                </div>
                <div className={`transition-all duration-700 ${
                  isFormFullScreen ? 'text-center' : 'text-center lg:text-left'
                }`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-blue to-brand-gold bg-clip-text text-transparent mb-2">99.9%</div>
                  <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Accuracy Rate</div>
                </div>
                <div className={`transition-all duration-700 ${
                  isFormFullScreen ? 'text-center' : 'text-center lg:text-left'
                }`}>
                  <div className={`flex items-center space-x-1 mb-2 transition-all duration-700 ${
                    isFormFullScreen ? 'justify-center' : 'justify-center lg:justify-start'
                  }`}>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-brand-gold to-emerald-600 bg-clip-text text-transparent">4.9</div>
                    <Star size={16} sm:size={20} className="text-brand-gold fill-current flex-shrink-0" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">User Rating</div>
                </div>
              </div>
            </div>

            {/* Form Section - Enhanced positioning */}
            <div className={`transition-all duration-700 ease-in-out ${
              isFormFullScreen 
                ? 'w-full max-w-5xl mx-auto' 
                : 'w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto'
            }`}>
              <MortgageForm 
                isFullScreen={isFormFullScreen}
                onToggleFullScreen={toggleFormFullScreen}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Overlay */}
      {isFormFullScreen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={toggleFormFullScreen}
        />
      )}
    </>
  );
};

export default Hero;