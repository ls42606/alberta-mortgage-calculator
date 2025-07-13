import React from 'react';
import { Shield, Award, Clock, TrendingUp } from 'lucide-react';
import FormStep from '../FormStep';
import { FormData } from '../MortgageForm';

interface FinancialStepProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const FinancialStep: React.FC<FinancialStepProps> = ({ formData, onChange, onNext, onPrev }) => {
  const isValid = formData.income !== '' && formData.employment !== '' && formData.credit !== '';

  return (
    <FormStep>
      <div className="mb-8 text-center">
        <h3 className="heading-md text-gray-900 mb-3">Financial snapshot</h3>
        <p className="body-md text-gray-600">Your information is protected by bank-level encryption</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Annual Household Income
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="$85,000"
            value={formData.income}
            onChange={(e) => onChange({ income: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Employment Type
            </label>
            <select
              className="form-input"
              value={formData.employment}
              onChange={(e) => onChange({ employment: e.target.value })}
              required
            >
              <option value="">Select type</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Credit Profile
            </label>
            <select
              className="form-input"
              value={formData.credit}
              onChange={(e) => onChange({ credit: e.target.value })}
              required
            >
              <option value="">Select range</option>
              <option value="excellent">Excellent (760+)</option>
              <option value="good">Good (660-759)</option>
              <option value="fair">Fair (580-659)</option>
              <option value="rebuilding">Rebuilding</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button
          type="button"
          className="btn-secondary"
          onClick={onPrev}
        >
          Back
        </button>
        <button
          type="button"
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </FormStep>
  );
};

export default FinancialStep;