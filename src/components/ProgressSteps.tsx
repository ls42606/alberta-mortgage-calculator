import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: number;
  steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const stepsArray = [
    { number: 1, label: 'Purpose' },
    { number: 2, label: 'Property' },
    { number: 3, label: 'Finances' },
    { number: 4, label: 'Contact' }
  ];

  return (
    <div className="flex px-6 pt-6 mb-6">
      {stepsArray.map((step, index) => (
        <div key={step.number} className="flex-1 relative text-center">
          {index < stepsArray.length - 1 && (
            <div 
              className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${
                currentStep > step.number ? 'bg-emerald-800' : 'bg-gray-200'
              }`}
            />
          )}
          
          <div 
            className={`w-8 h-8 rounded-full border-2 inline-flex items-center justify-center text-sm font-semibold relative z-10 ${
              currentStep > step.number
                ? 'bg-emerald-800 border-emerald-800 text-white'
                : currentStep === step.number
                ? 'border-emerald-800 text-emerald-800 bg-white'
                : 'border-gray-200 text-gray-500 bg-white'
            }`}
          >
            {currentStep > step.number ? (
              <Check size={16} />
            ) : (
              step.number
            )}
          </div>
          
          <span className="block mt-2 text-xs font-medium text-gray-600">
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressSteps;