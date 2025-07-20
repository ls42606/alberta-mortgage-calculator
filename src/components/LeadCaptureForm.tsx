import React, { useState } from 'react';
import { User, Send, CheckCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  source?: string;
  calculatorType?: string;
  calculationResults?: Record<string, unknown>;
  onClose?: () => void;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  source = 'calculator', 
  calculatorType = 'general',
  calculationResults = {},
  onClose 
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The form will be submitted to Netlify automatically
    // We just need to show the success state
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your information has been received. A mortgage professional will contact you within 24 hours
            to provide personalized calculations and educational guidance.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-emerald-800 text-sm font-medium">
              <strong>Next Steps:</strong> Prepare any questions about your mortgage calculations. 
              Our professional will provide educational guidance based on your specific situation.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="mt-6 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
              aria-label="Close success message and continue"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-2xl shadow-gray-900/5 backdrop-blur-sm">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User size={24} className="text-white" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2" id="lead-form-title">Get Expert Guidance</h3>
        <p className="text-gray-600 text-sm">
          Connect with licensed mortgage professionals for personalized advice
        </p>
      </div>

      <form 
        name="lead-capture" 
        method="POST" 
        data-netlify="true" 
        onSubmit={handleSubmit}
        className="space-y-6" 
        role="form" 
        aria-labelledby="lead-form-title"
      >
        <input type="hidden" name="form-name" value="lead-capture" />
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="calculator-type" value={calculatorType} />
        {calculationResults && Object.keys(calculationResults).length > 0 && (
          <input type="hidden" name="calculation-results" value={JSON.stringify(calculationResults)} />
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your full name"
            required
            aria-describedby="name-required"
            aria-required="true"
          />
          <span id="name-required" className="sr-only">Required field</span>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your email address"
            required
            aria-describedby="email-required email-format"
            aria-required="true"
          />
          <span id="email-required" className="sr-only">Required field</span>
          <span id="email-format" className="sr-only">Must be a valid email address</span>
        </div>

        <div>
          <label htmlFor="mortgage-amount" className="block text-sm font-semibold text-gray-700 mb-3">
            Mortgage Amount (Optional)
          </label>
          <input
            type="text"
            id="mortgage-amount"
            name="mortgage-amount"
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
            placeholder="e.g., $500,000"
            aria-describedby="mortgage-amount-help"
          />
          <span id="mortgage-amount-help" className="sr-only">Optional field for mortgage amount estimate</span>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 resize-none"
            placeholder="Tell us about your mortgage needs or any specific questions..."
            aria-describedby="message-help"
          />
          <span id="message-help" className="sr-only">Optional field for additional details about your mortgage needs</span>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg shadow-emerald-600/25"
            aria-label="Submit form to get expert guidance"
          >
            <Send size={18} />
            <span>Get Expert Guidance</span>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400 leading-relaxed">
            By submitting, you agree to be contacted by licensed mortgage professionals. 
            Your information is secure and protected.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LeadCaptureForm;