import React from 'react';
import FormStep from '../FormStep';
import { FormData } from '../MortgageForm';
import PriceSlider from '../PriceSlider';

interface PropertyStepProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PropertyStep: React.FC<PropertyStepProps> = ({ formData, onChange, onNext, onPrev }) => {
  const isValid = formData.location !== '';

  return (
    <FormStep>
      <div className="mb-8 text-center">
        <h3 className="heading-md text-gray-900 mb-3" id="property-step-title">Property details</h3>
        <p className="body-md text-gray-600">Help us understand your needs</p>
      </div>
      
      <fieldset className="space-y-8" aria-labelledby="property-step-title">
        <legend className="sr-only">Property information</legend>
        <PriceSlider
          label="Purchase Price"
          value={formData.purchasePrice}
          min={150000}
          max={2000000}
          step={25000}
          formatValue={(value) => `$${value.toLocaleString()}`}
          onChange={(purchasePrice) => onChange({ purchasePrice })}
        />

        <PriceSlider
          label="Down Payment"
          value={Math.round((formData.downPayment / 100) * formData.purchasePrice)}
          min={Math.round(0.05 * formData.purchasePrice)}
          max={Math.round(0.5 * formData.purchasePrice)}
          step={5000}
          formatValue={(value) => `$${value.toLocaleString()} (${Math.round((value / formData.purchasePrice) * 100)}%)`}
          onChange={(dollarAmount) => onChange({ downPayment: Math.round((dollarAmount / formData.purchasePrice) * 100) })}
        />

        <div>
          <label htmlFor="location" className="block text-sm font-bold text-gray-900 mb-3">
            Property Location
          </label>
          <select
            id="location"
            className="form-input"
            value={formData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            required
            aria-describedby="location-required"
            aria-required="true"
          >
            <option value="">Select city or region</option>
            <option value="calgary">Calgary</option>
            <option value="edmonton">Edmonton</option>
            <option value="red-deer">Red Deer</option>
            <option value="lethbridge">Lethbridge</option>
            <option value="other">Other Alberta Location</option>
          </select>
          <span id="location-required" className="sr-only">Required field</span>
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
          aria-label={isValid ? "Continue to financial information step" : "Please complete property details to continue"}
        >
          Continue
        </button>
      </div>
    </FormStep>
  );
};

export default PropertyStep;