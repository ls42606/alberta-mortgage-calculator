import React, { useState } from 'react';
import { User, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { CalculationResults, LeadFormSubmission } from '../types/services';

interface LeadCaptureFormProps {
  source?: string;
  calculatorType?: string;
  calculationResults?: CalculationResults;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  mortgageAmount: string;
  message: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ 
  source = 'calculator', 
  calculatorType = 'general',
  calculationResults = {},
  onClose 
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mortgageAmount: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const saveLead = async (leadData: LeadFormSubmission): Promise<void> => {
    // Use Basin.io if configured, otherwise fall back to Netlify function
    const basinFormId = import.meta.env.VITE_BASIN_FORM_ID;
    
    if (basinFormId) {
      // Basin.io integration for secure email delivery
      const formData = new FormData();
      
      // Add all lead data to form
      formData.append('name', leadData.name);
      formData.append('email', leadData.email);
      formData.append('mortgage_amount', leadData.mortgageAmount || '');
      formData.append('message', leadData.message || '');
      formData.append('source', leadData.source);
      formData.append('calculator_type', leadData.calculatorType);
      formData.append('timestamp', leadData.timestamp);
      formData.append('page_url', window.location.href);
      
      // Add calculation results if available
      if (leadData.calculationResults && Object.keys(leadData.calculationResults).length > 0) {
        formData.append('calculation_results', JSON.stringify(leadData.calculationResults));
      }
      
      const response = await fetch(`https://usebasin.com/f/${basinFormId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit to Basin');
      }
      
      return;
    }
    
    // Fallback to Netlify function if Basin not configured
    try {
      const response = await fetch('/.netlify/functions/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to save lead');
      }
    } catch (error) {
      // Remove localStorage fallback for security - leads should only go through proper channels
      console.error('Lead submission failed', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    try {
      const leadData = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        source,
        calculatorType,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        mortgageAmount: formData.mortgageAmount,
        message: formData.message.trim(),
        calculationResults,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        currentUrl: window.location.href,
      };

      await saveLead(leadData);
      setStatus('success');
    } catch (error) {
      console.error('Error saving lead:', error);
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
    }
  };

  if (status === 'success') {
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

      <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-labelledby="lead-form-title">
        {status === 'error' && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3" role="alert" aria-live="polite">
            <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-red-800 text-sm" id="form-error">{errorMessage}</p>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your full name"
            required
            aria-describedby="name-required"
            aria-required="true"
            aria-invalid={status === 'error' && !formData.name.trim()}
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
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
            placeholder="Enter your email address"
            required
            aria-describedby="email-required email-format"
            aria-required="true"
            aria-invalid={status === 'error' && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
          />
          <span id="email-required" className="sr-only">Required field</span>
          <span id="email-format" className="sr-only">Must be a valid email address</span>
        </div>


        <div>
          <label htmlFor="mortgageAmount" className="block text-sm font-semibold text-gray-700 mb-3">
            Mortgage Amount (Optional)
          </label>
          <input
            type="text"
            id="mortgageAmount"
            name="mortgageAmount"
            value={formData.mortgageAmount}
            onChange={handleInputChange}
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
            value={formData.message}
            onChange={handleInputChange}
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
            disabled={status === 'submitting'}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg shadow-emerald-600/25"
            aria-label={status === 'submitting' ? "Submitting your request, please wait" : "Submit form to get expert guidance"}
            aria-describedby={status === 'error' && errorMessage ? 'form-error' : undefined}
          >
            {status === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Get Expert Guidance</span>
              </>
            )}
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