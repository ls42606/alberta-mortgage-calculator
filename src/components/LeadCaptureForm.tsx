import React, { useState } from 'react';
import { User, Mail, DollarSign, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  source?: string;
  calculatorType?: string;
  calculationResults?: Record<string, any>;
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

  const saveLead = async (leadData: any): Promise<void> => {
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
      // Fallback: save to localStorage if Netlify function fails
      console.warn('Netlify function save failed, using localStorage fallback', error);
      
      const existingLeads = JSON.parse(localStorage.getItem('mortgage-leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('mortgage-leads', JSON.stringify(existingLeads));
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
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Get Expert Guidance</h3>
        <p className="text-gray-600 text-sm">
          Connect with licensed mortgage professionals for personalized advice
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {status === 'error' && errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-800 text-sm">{errorMessage}</p>
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
          />
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
          />
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
          />
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
          />
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg shadow-emerald-600/25"
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