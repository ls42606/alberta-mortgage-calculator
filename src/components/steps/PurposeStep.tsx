import React from 'react';
import { Home, RefreshCw, RotateCcw, CheckCircle } from 'lucide-react';
import FormStep from '../FormStep';

interface PurposeStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
}

const PurposeStep: React.FC<PurposeStepProps> = ({ value, onChange, onNext }) => {
  const options = [
    {
      value: 'purchase',
      title: 'Purchase',
      description: 'Buying a new property',
      icon: Home,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      value: 'refinance',
      title: 'Refinance',
      description: 'Access equity or better rate',
      icon: RefreshCw,
      color: 'from-brand-blue to-blue-600'
    },
    {
      value: 'renewal',
      title: 'Renewal',
      description: 'Term ending soon',
      icon: RotateCcw,
      color: 'from-brand-gold to-yellow-600'
    },
    {
      value: 'preapproval',
      title: 'Pre-Approval',
      description: 'Planning ahead',
      icon: CheckCircle,
      color: 'from-brand-red to-red-600'
    }
  ];

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
  };

  return (
    <FormStep>
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3" id="purpose-step-title">Your mortgage goals</h3>
        <p className="text-gray-600 leading-relaxed">Tell us what you're looking to accomplish</p>
      </div>
      
      <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" aria-labelledby="purpose-step-title">
        <legend className="sr-only">Select your mortgage purpose</legend>
        {options.map((option) => (
          <div
            key={option.value}
            className={`form-button-glow p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover-lift ${
              value === option.value
                ? 'border-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg'
                : 'border-gray-200 hover:border-emerald-300 bg-white hover:bg-gray-50'
            }`}
            onClick={() => handleOptionSelect(option.value)}
            role="button"
            tabIndex={0}
            aria-pressed={value === option.value}
            aria-label={`Select ${option.title}: ${option.description}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOptionSelect(option.value);
              }
            }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-xl ${
                value === option.value 
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg` 
                  : 'bg-gray-100 text-gray-600'
              } transition-all duration-300`}>
                <option.icon size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{option.title}</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{option.description}</p>
            {value === option.value && (
              <div className="mt-4 flex items-center space-x-2 text-emerald-600">
                <CheckCircle size={16} />
                <span className="text-sm font-semibold">Selected</span>
              </div>
            )}
          </div>
        ))}
      </fieldset>

      <div className="flex justify-end">
        <button
          type="button"
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!value}
          aria-label={value ? "Continue to property details step" : "Please select a mortgage purpose to continue"}
        >
          Continue to Property Details
        </button>
      </div>
    </FormStep>
  );
};

export default PurposeStep;