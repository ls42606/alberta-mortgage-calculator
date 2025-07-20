import React from 'react';
import { X } from 'lucide-react';
import LeadCaptureForm from './LeadCaptureForm';
import { CalculationResults } from '../types/services';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  calculatorType?: string;
  calculationResults?: CalculationResults;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  source,
  calculatorType,
  calculationResults
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal positioning */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        {/* Modal content */}
        <div className="inline-block w-full max-w-lg mx-auto my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Close button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form content */}
          <div className="p-6">
            <LeadCaptureForm
              source={source}
              calculatorType={calculatorType}
              calculationResults={calculationResults}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;