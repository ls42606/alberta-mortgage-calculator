import React, { useState, useEffect } from 'react';
import { CheckCircle2, Calendar, Phone, TrendingUp, Award, Star, Shield, Clock } from 'lucide-react';
import FormStep from '../FormStep';
import { FormData } from '../MortgageForm';

interface ResultsStepProps {
  formData: FormData;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ formData }) => {
  const [animatedValues, setAnimatedValues] = useState({
    monthlyPayment: 0,
    maxPurchase: 0,
  });

  // Calculate mortgage details with professional precision
  const loanAmount = formData.purchasePrice * (1 - formData.downPayment / 100);
  const monthlyRate = 0.0489 / 12;
  const numPayments = 25 * 12;
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

  const annualIncome = parseInt(formData.income.replace(/[^0-9]/g, '')) || 85000;
  const maxPurchase = Math.min(annualIncome * 5.5, 2500000);

  useEffect(() => {
    // Professional number animation
    const animateValue = (key: keyof typeof animatedValues, target: number, duration: number) => {
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: Math.floor(start) }));
      }, 16);
    };

    setTimeout(() => {
      animateValue('monthlyPayment', Math.round(monthlyPayment), 2200);
      animateValue('maxPurchase', Math.round(maxPurchase / 1000), 2800);
    }, 600);
  }, [monthlyPayment, maxPurchase]);

  const recommendations = [
    {
      icon: TrendingUp,
      title: 'Market Timing Advantage',
      description: 'Current market conditions are favorable for your mortgage type and credit profile.',
      impact: 'Optimal timing',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Award,
      title: 'Premium Lender Match',
      description: 'Your profile qualifies for our exclusive lender partnerships with enhanced terms.',
      impact: 'Best available terms',
      color: 'from-brand-blue to-blue-600'
    },
    {
      icon: Clock,
      title: 'Fast-Track Approval',
      description: 'Your credit profile and documentation qualify for expedited processing.',
      impact: '24-hour approval',
      color: 'from-brand-gold to-yellow-600'
    }
  ];

  return (
    <FormStep>
      <div className="text-center space-y-professional">
        {/* Success Animation with enhanced styling */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 size={44} className="text-emerald-600" />
          </div>
          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-full flex items-center justify-center">
            <Star size={14} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="heading-md gradient-text">
            Congratulations {formData.firstName}!
          </h2>
          
          <p className="body-lg text-gray-600 max-w-lg mx-auto">
            Based on your profile, here's your personalized mortgage analysis from our professional team:
          </p>
        </div>
        
        {/* Results Grid with enhanced visual hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl border border-emerald-200 hover-lift">
            <div className="text-4xl font-bold text-emerald-800 mb-2">
              ${animatedValues.monthlyPayment.toLocaleString()}
            </div>
            <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wide mb-1">
              Monthly Payment
            </div>
            <div className="text-xs text-emerald-600 font-medium">
              Based on current market conditions
            </div>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover-lift">
            <div className="text-4xl font-bold text-brand-blue mb-2">Competitive</div>
            <div className="text-sm font-semibold text-brand-blue uppercase tracking-wide mb-1">
              Rate Available
            </div>
            <div className="text-xs text-blue-600 font-medium">
              From our premium lender network
            </div>
          </div>
          
          <div className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border border-yellow-200 hover-lift">
            <div className="text-4xl font-bold text-brand-gold mb-2">
              ${animatedValues.maxPurchase}K
            </div>
            <div className="text-sm font-semibold text-brand-gold uppercase tracking-wide mb-1">
              Max Purchase Power
            </div>
            <div className="text-xs text-yellow-600 font-medium">
              Enhanced qualification analysis
            </div>
          </div>
        </div>

        {/* Professional Recommendations */}
        <div className="space-y-6">
          <h3 className="heading-md text-gray-900">
            Personalized Professional Recommendations
          </h3>
          
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border border-gray-200 text-left hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="flex items-start space-x-5">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${rec.color} flex-shrink-0 shadow-md`}>
                    <rec.icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold text-lg text-gray-900">
                      {rec.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {rec.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      <TrendingUp size={14} />
                      <span>{rec.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps with professional styling */}
        <div className="bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/30 p-8 rounded-2xl border border-gray-200">
          <h3 className="heading-md text-gray-900 mb-6">
            What happens next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">1</div>
              <span className="text-gray-700 font-medium leading-relaxed">Expert review of your application and lender matching</span>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">2</div>
              <span className="text-gray-700 font-medium leading-relaxed">Mortgage specialist contacts you within 2 business hours</span>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">3</div>
              <span className="text-gray-700 font-medium leading-relaxed">Pre-approval and rate guarantee within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary flex items-center justify-center space-x-3 shadow-emerald hover:shadow-2xl">
            <Calendar size={20} />
            <span>Schedule Expert Consultation</span>
          </button>
          
          <a
            href="tel:1-800-ALBERTA"
            className="btn-secondary flex items-center justify-center space-x-3 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
          >
            <Phone size={20} />
            <span>Call 1-800-ALBERTA</span>
          </a>
        </div>

        {/* Trust Badge with enhanced styling */}
        <div className="flex items-center justify-center space-x-3 text-sm text-gray-500 bg-gray-50 px-6 py-3 rounded-full border border-gray-200">
          <Shield size={16} className="text-emerald-600" />
          <span className="font-medium">Your information is secure and will never be shared without explicit consent</span>
        </div>
      </div>
    </FormStep>
  );
};

export default ResultsStep;