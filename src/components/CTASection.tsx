import React from 'react';
import { CheckCircle, Shield, Clock, Award, Calendar, BookOpen } from 'lucide-react';

const CTASection: React.FC = () => {
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

  const benefits = [
    { icon: Shield, text: 'No credit impact', color: 'text-emerald-400' },
    { icon: Clock, text: '2-minute application', color: 'text-blue-400' },
    { icon: Award, text: 'Expert guidance', color: 'text-yellow-400' },
  ];

  const marketFactors = [
    'Market conditions are optimal for your mortgage type',
    'Exclusive lender promotions available this month',
    'Interest rate environment favoring borrowers'
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-brand-navy via-blue-900 to-brand-navy text-white relative overflow-hidden">
      {/* Professional background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-brand-gold/20"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 border border-white/10 rounded-full animate-float-gentle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/10 rounded-full animate-float-gentle" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-6xl mx-auto container-padding text-center space-y-professional">
        {/* Market Timing Indicators */}
        <div className="flex flex-wrap justify-center gap-4">
          {marketFactors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              <CheckCircle size={16} className="text-emerald-400" />
              <span>{factor}</span>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <h2 className="heading-xl text-white leading-[1.1]">
            Don't let opportunities
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-brand-gold bg-clip-text text-transparent">
              pass you by
            </span>
          </h2>
          
          <p className="body-lg opacity-90 max-w-4xl mx-auto">
            Join 15,000+ Albertans who've discovered better mortgage solutions through our platform. 
            Market conditions and exclusive opportunities change daily.
          </p>

          <div className="body-md opacity-75">
            <span className="inline-flex items-center space-x-3">
              <Shield size={20} className="text-emerald-400" />
              <span>Professional guidance • No obligation • Secure process</span>
            </span>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              <benefit.icon size={16} className={benefit.color} />
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={scrollToCalculatorWithFullScreen}
            className="group px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 hover:shadow-emerald hover:scale-105 transform"
            aria-label="Start mortgage application process"
          >
            <div className="flex items-center justify-center space-x-3">
              <Calendar size={24} />
              <span>Apply Here</span>
              <div className="group-hover:translate-x-1 transition-transform duration-300">→</div>
            </div>
          </button>
          
          <a
            href="/blog"
            className="group px-10 py-5 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center space-x-3"
            aria-label="Access educational resources and mortgage learning materials"
          >
            <BookOpen size={24} className="group-hover:animate-bounce-gentle" />
            <span>Learn More</span>
            <span className="text-sm opacity-75">(Educational Resources)</span>
          </a>
        </div>

        {/* Professional Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Shield, title: 'Licensed Professionals', desc: 'Certified mortgage experts', color: 'from-emerald-500 to-emerald-600' },
            { icon: Clock, title: '24hr Response', desc: 'Fastest service in Alberta', color: 'from-brand-blue to-blue-600' },
            { icon: Award, title: 'Bank-Level Security', desc: '256-bit encryption protection', color: 'from-brand-gold to-yellow-600' },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl text-center border border-white/10 hover:bg-white/10 transition-all duration-300 hover-lift"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <item.icon size={28} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm opacity-75 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Urgency Element */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse-professional"></div>
            <span>Current market opportunities are time-sensitive</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;