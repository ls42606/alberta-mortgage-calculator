import React, { useState } from 'react';
import { Mail, Clock, MapPin, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The form will be submitted to Netlify automatically
    // We just need to show the success state
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your message has been received. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about mortgage calculations or need personalized assistance? 
              We're here to help Alberta homebuyers make informed financial decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@albertamortgagecalculator.ca</p>
                      <p className="text-sm text-gray-500">Professional response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Response Time</h3>
                      <p className="text-gray-600">Within 24 hours</p>
                      <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM MST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Service Area</h3>
                      <p className="text-gray-600">Alberta, Canada</p>
                      <p className="text-sm text-gray-500">Calgary, Edmonton, and surrounding areas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Are your calculators accurate?</h4>
                    <p className="text-sm text-gray-600">Yes, our calculators use official Canadian mortgage formulas with semi-annual compounding.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Is this service free?</h4>
                    <p className="text-sm text-gray-600">All our educational tools and calculators are completely free to use.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Do you provide mortgage advice?</h4>
                    <p className="text-sm text-gray-600">We provide educational information only. For personalized advice, consult a qualified mortgage professional.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" id="contact-form-title">Send us a Message</h2>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true" 
                onSubmit={handleSubmit}
                className="space-y-6" 
                role="form" 
                aria-labelledby="contact-form-title"
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby="name-required"
                    aria-required="true"
                  />
                  <span id="name-required" className="sr-only">Required field</span>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby="email-required email-format"
                    aria-required="true"
                  />
                  <span id="email-required" className="sr-only">Required field</span>
                  <span id="email-format" className="sr-only">Must be a valid email address</span>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby="subject-required"
                    aria-required="true"
                  />
                  <span id="subject-required" className="sr-only">Required field</span>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-describedby="message-required message-instructions"
                    aria-required="true"
                  />
                  <span id="message-required" className="sr-only">Required field</span>
                  <span id="message-instructions" className="sr-only">Please provide details about your inquiry</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  aria-label="Submit contact form"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;