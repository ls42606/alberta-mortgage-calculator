import React, { useState } from 'react';
import { Home, DollarSign, Percent, Calculator, ArrowRight, Shield } from 'lucide-react';
import { TrendingUp, CheckCircle, Loader2, Sparkles, Award, X, Maximize2 } from 'lucide-react';
import ProgressSteps from './ProgressSteps';
import PurposeStep from './steps/PurposeStep';
import PropertyStep from './steps/PropertyStep';
import FinancialStep from './steps/FinancialStep';
import ContactStep from './steps/ContactStep';
import ResultsStep from './steps/ResultsStep';

export interface FormData {
  purpose: string;
  purchasePrice: number;
  downPayment: number;
  location: string;
  income: string;
  employment: string;
  credit: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialFormData: FormData = {
  purpose: '',
  purchasePrice: 500000,
  downPayment: 20,
  location: '',
  income: '',
  employment: '',
  credit: '',
  firstName: '',
  lastName: '',
  email: ''
};

interface MortgageFormProps {
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
}

const MortgageForm: React.FC<MortgageFormProps> = ({ 
  isFullScreen = false, 
  onToggleFullScreen 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  const totalSteps = 4;

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Realistic processing stages
    const stages = [
      'Analyzing your profile...',
      'Matching with 50+ lenders...',
      'Calculating optimal scenarios...',
      'Generating recommendations...'
    ];
    
    for (let i = 0; i < stages.length; i++) {
      setProcessingStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 900));
    }
    
    setIsSubmitting(false);
    setShowResults(true);
  };

  const renderStep = () => {
    if (showResults) {
      return <ResultsStep formData={formData} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <PurposeStep
            value={formData.purpose}
            onChange={(purpose) => updateFormData({ purpose })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <PropertyStep
            formData={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <FinancialStep
            formData={formData}
            onChange={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <ContactStep
            formData={formData}
            onChange={updateFormData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`professional-card overflow-hidden transition-all duration-700 ease-in-out ${
      isFullScreen 
        ? 'fixed inset-4 z-50 shadow-2xl animate-scale-in' 
        : 'shadow-lg hover:shadow-xl'
    }`}>
      {/* Enhanced Header with professional gradient */}
      <div className="relative bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/95 to-emerald-900/95" />
        <div className="relative z-10 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <Sparkles size={18} className="animate-pulse-professional flex-shrink-0" />
            <h2 className={`font-bold tracking-tight transition-all duration-500 ${
              isFullScreen ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl lg:text-3xl'
            }`}>
              Professional Mortgage Analysis
            </h2>
            <Sparkles size={18} className="animate-pulse-professional flex-shrink-0" />
          </div>
          <div className="text-emerald-100 text-xs sm:text-sm font-semibold">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="flex items-center space-x-1">
                <Shield size={14} className="flex-shrink-0" />
                <span>No credit impact</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>Secure process</span>
              <span className="hidden sm:inline">•</span>
              <span>Expert guidance</span>
            </div>
          </div>
        </div>
        
        {/* Full Screen Toggle Button */}
        {onToggleFullScreen && (
          <button
            onClick={onToggleFullScreen}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 group"
            title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
            aria-label={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
          >
            {isFullScreen ? (
              <X size={18} className="text-white group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <Maximize2 size={18} className="text-white group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        )}
        
        {/* Subtle animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-4 left-8 w-16 h-0.5 bg-white/20 rounded-full animate-pulse-professional" />
          <div className="absolute bottom-4 right-8 w-12 h-0.5 bg-white/20 rounded-full animate-pulse-professional" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {!showResults && (
        <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
      )}

      <div className={`transition-all duration-500 ${
        isFullScreen && !showResults 
          ? 'p-6 sm:p-8 lg:p-12 max-h-[calc(100vh-200px)] overflow-y-auto' 
          : isFullScreen && showResults 
          ? 'p-4 sm:p-6 lg:p-8 max-h-[calc(100vh-180px)] overflow-y-auto' 
          : 'p-6 sm:p-8 lg:p-10'
      }`}>
        {isSubmitting ? (
          <div className="text-center py-12 sm:py-16 space-y-6">
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 mx-auto">
              <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                <Loader2 size={32} className="text-emerald-600 animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {processingStage}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                We're analyzing your profile with our network of 50+ lenders to find your optimal solution
              </p>
            </div>
            <div className="w-64 sm:w-80 mx-auto bg-gray-200 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full animate-pulse-professional transition-all duration-1000" style={{ width: '85%' }} />
            </div>
          </div>
        ) : (
          <div className="transition-all duration-500 ease-smooth">
            {renderStep()}
          </div>
        )}
      </div>

      {/* Enhanced Trust Indicators - Updated */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gradient-to-r from-gray-50 via-blue-50/30 to-emerald-50/30 border-t border-gray-200 text-xs font-bold text-gray-600">
        <div className="flex items-center space-x-2">
          <Shield size={14} className="text-emerald-600 flex-shrink-0" />
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp size={14} className="text-brand-blue flex-shrink-0" />
          <span>Live Market Data</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award size={14} className="text-brand-gold flex-shrink-0" />
          <span>Information Only</span>
        </div>
      </div>
    </div>
  );
};

export default MortgageForm;