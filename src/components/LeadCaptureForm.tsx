import React, { useState } from 'react';
import { User, Mail, Phone, DollarSign, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface LeadCaptureFormProps {
  source?: string;
  calculatorType?: string;
  calculationResults?: Record<string, any>;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
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
    phone: '',
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

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formatted
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
    
    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required');
      return false;
    }
    
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number');
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
        phone: formData.phone,
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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Connect with Mortgage Professionals</h3>
        <p className="text-gray-600">
          Get personalized calculations and educational guidance
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
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <User size={16} className="text-gray-600" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <Mail size={16} className="text-gray-600" />
            <span>Email Address *</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <Phone size={16} className="text-gray-600" />
            <span>Phone Number *</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="(555) 123-4567"
            required
          />
        </div>

        <div>
          <label htmlFor="mortgageAmount" className="block text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <DollarSign size={16} className="text-gray-600" />
            <span>Mortgage Amount (Optional)</span>
          </label>
          <input
            type="text"
            id="mortgageAmount"
            name="mortgageAmount"
            value={formData.mortgageAmount}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            placeholder="e.g., $500,000"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
            <MessageCircle size={16} className="text-gray-600" />
            <span>Message (Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
            placeholder="Tell us about your mortgage needs or any specific questions you have..."
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {status === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Connect with Professionals</span>
              </>
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            By submitting this form, you consent to be contacted by a licensed mortgage professional. 
            Your information is secure and will never be shared with third parties.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LeadCaptureForm;