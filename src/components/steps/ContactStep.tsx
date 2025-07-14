import React from 'react';
import { Shield, Award, Clock } from 'lucide-react';
import FormStep from '../FormStep';
import { FormData } from '../MortgageForm';

interface ContactStepProps {
  formData: FormData;
  onChange: (updates: Partial<FormData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const ContactStep: React.FC<ContactStepProps> = ({ 
  formData, 
  onChange, 
  onPrev, 
  onSubmit, 
  isSubmitting 
}) => {
  const isValid = formData.firstName !== '' && formData.lastName !== '' && 
                 formData.email !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && !isSubmitting) {
      onSubmit();
    }
  };

  return (
    <FormStep>
      <div className="space-y-professional">
        <div className="text-center space-y-4">
          <h3 className="heading-md text-gray-900">Final step</h3>
          <p className="body-md text-gray-600 max-w-md mx-auto">
            Where should we send your personalized mortgage analysis?
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700">
              <Award size={14} />
              <span>Professional Analysis Ready</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
              <Clock size={14} />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-700">
              <Shield size={14} />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                First Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.firstName}
                onChange={(e) => onChange({ firstName: e.target.value })}
                required
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Last Name
              </label>
              <input
                type="text"
                className="form-input"
                value={formData.lastName}
                onChange={(e) => onChange({ lastName: e.target.value })}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-900">
              Email Address
            </label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll send your personalized mortgage report here
            </p>
          </div>

          {/* Enhanced Privacy Notice */}
          <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border border-gray-200">
            <div className="flex items-start space-x-4">
              <Shield size={24} className="text-emerald-600 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900">Your Privacy is Protected</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use bank-level encryption and never share your information without explicit consent. 
                  A mortgage professional will contact you within 24 hours to provide personalized guidance and complete your application.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              className="btn-secondary"
              onClick={onPrev}
              disabled={isSubmitting}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Award size={20} />
                  <span>Get My Professional Analysis</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </FormStep>
  );
};

export default ContactStep;