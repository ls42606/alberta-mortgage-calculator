import React from 'react';
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
        <h3 className="heading-md text-gray-900 mb-3" id="financial-step-title">Financial snapshot</h3>
        <p className="body-md text-gray-600">Your information is protected by bank-level encryption</p>
      </div>
      
      <fieldset className="space-y-6" aria-labelledby="financial-step-title">
        <legend className="sr-only">Financial information</legend>
        <div>
          <label htmlFor="income" className="block text-sm font-bold text-gray-900 mb-3">
            Annual Household Income
          </label>
          <input
            type="text"
            id="income"
            className="form-input"
            placeholder="$85,000"
            value={formData.income}
            onChange={(e) => onChange({ income: e.target.value })}
            required
            aria-describedby="income-required"
            aria-required="true"
          />
          <span id="income-required" className="sr-only">Required field</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="employment" className="block text-sm font-bold text-gray-900 mb-3">
              Employment Type
            </label>
            <select
              id="employment"
              className="form-input"
              value={formData.employment}
              onChange={(e) => onChange({ employment: e.target.value })}
              required
              aria-describedby="employment-required"
              aria-required="true"
            >
              <option value="">Select type</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="other">Other</option>
            </select>
            <span id="employment-required" className="sr-only">Required field</span>
          </div>
          
          <div>
            <label htmlFor="credit" className="block text-sm font-bold text-gray-900 mb-3">
              Credit Profile
            </label>
            <select
              id="credit"
              className="form-input"
              value={formData.credit}
              onChange={(e) => onChange({ credit: e.target.value })}
              required
              aria-describedby="credit-required"
              aria-required="true"
            >
              <option value="">Select range</option>
              <option value="excellent">Excellent (760+)</option>
              <option value="good">Good (660-759)</option>
              <option value="fair">Fair (580-659)</option>
              <option value="rebuilding">Rebuilding</option>
            </select>
            <span id="credit-required" className="sr-only">Required field</span>
          </div>
        </div>
      </fieldset>

      <div className="flex justify-between pt-8">
        <button
          type="button"
          className="btn-secondary"
          onClick={onPrev}
          aria-label="Go back to previous step"
        >
          Back
        </button>
        <button
          type="button"
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!isValid}
          aria-label={isValid ? "Continue to contact information step" : "Please complete financial information to continue"}
        >
          Continue
        </button>
      </div>
    </FormStep>
  );
};

export default FinancialStep;