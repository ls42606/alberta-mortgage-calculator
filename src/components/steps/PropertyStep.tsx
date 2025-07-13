import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';
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
        <h3 className="heading-md text-gray-900 mb-3">Property details</h3>
        <p className="body-md text-gray-600">Help us understand your needs</p>
      </div>
      
      <div className="space-y-8">
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
          value={formData.downPayment}
          min={5}
          max={50}
          step={5}
          formatValue={(value) => `${value}%`}
          onChange={(downPayment) => onChange({ downPayment })}
        />

        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Property Location
          </label>
          <select
            className="form-input"
            value={formData.location}
            onChange={(e) => onChange({ location: e.target.value })}
            required
          >
            <option value="">Select city or region</option>
            <option value="calgary">Calgary</option>
            <option value="edmonton">Edmonton</option>
            <option value="red-deer">Red Deer</option>
            <option value="lethbridge">Lethbridge</option>
            <option value="other">Other Alberta Location</option>
          </select>
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

export default PropertyStep;