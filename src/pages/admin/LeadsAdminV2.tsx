import React from 'react';
import { useAuth } from '../../components/auth';
import { Mail, Shield, CheckCircle, AlertCircle, ArrowRight, Copy } from 'lucide-react';

const LeadsAdminV2: React.FC = () => {
  const { authState, logout } = useAuth();
  const basinFormId = import.meta.env.VITE_BASIN_FORM_ID;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
              <p className="text-gray-600">Secure email-based lead tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{authState.user?.username}</span>
              </div>
              <button
                onClick={logout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Basin.io Status */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <Mail className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Email Integration Status</h2>
            </div>
            
            {basinFormId ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">Basin.io is configured</p>
                    <p className="text-green-700 text-sm mt-1">
                      All leads are being sent securely to your email address.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">Basin.io not configured</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Follow the setup instructions below to start receiving leads via email.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Setup Instructions */}
        {!basinFormId && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basin.io Setup Instructions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Step 1: Create Basin Account</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                    <li>Go to <a href="https://usebasin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">usebasin.com</a></li>
                    <li>Sign up for a free account</li>
                    <li>Verify your email address</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Step 2: Create a Form</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                    <li>Click "Create Form" in your Basin dashboard</li>
                    <li>Name it "Alberta Mortgage Calculator Leads"</li>
                    <li>Set the email recipient (your email will be kept private)</li>
                    <li>Copy the form ID from the form endpoint URL</li>
                  </ol>
                  
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">Example Basin endpoint:</p>
                    <code className="text-sm text-gray-700">https://usebasin.com/f/abc123def456</code>
                    <p className="text-xs text-gray-500 mt-1">Your form ID would be: <strong>abc123def456</strong></p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Step 3: Add to Environment</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Add this to your .env file:</p>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-3 flex items-center justify-between">
                      <code className="text-sm">VITE_BASIN_FORM_ID=your-form-id-here</code>
                      <button
                        onClick={() => copyToClipboard('VITE_BASIN_FORM_ID=your-form-id-here')}
                        className="ml-3 text-gray-400 hover:text-white"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Step 4: Deploy</h3>
                  <p className="text-sm text-gray-600">
                    Add the environment variable to your Netlify deployment and redeploy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current System Info */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Lead Tracking Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">What Gets Captured</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Full name and email address</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Mortgage amount (if provided)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Custom message from user</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Calculator type used</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Page URL and timestamp</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Calculation results (if from calculator)</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Security Features</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>No email addresses stored in code</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>SSL encrypted transmission</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Rate limiting protection</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Input validation and sanitization</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>No local storage of sensitive data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Future Enhancements */}
        <div className="bg-blue-50 rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Future Enhancements</h2>
            <p className="text-gray-700 mb-4">
              The system is designed for easy upgrades when you're ready to scale:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  Database Integration
                </h3>
                <p className="text-sm text-gray-600">
                  Easily add Supabase or Firebase for lead storage and analytics
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  CRM Integration
                </h3>
                <p className="text-sm text-gray-600">
                  Connect to HubSpot, Salesforce, or other CRM systems
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  Advanced Analytics
                </h3>
                <p className="text-sm text-gray-600">
                  Track conversion rates, lead sources, and ROI
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  Automated Follow-ups
                </h3>
                <p className="text-sm text-gray-600">
                  Set up email sequences and lead nurturing workflows
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsAdminV2;