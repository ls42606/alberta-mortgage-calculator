import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calculator } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="py-16">
            <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to calculating your mortgage options.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              
              <Link
                to="/#calculator"
                className="inline-flex items-center px-6 py-3 border border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Try Calculator
              </Link>
            </div>
            
            <div className="mt-12 text-sm text-gray-500">
              <p>Need help? Contact us at <a href="mailto:info@albertamortgagecalculator.ca" className="text-emerald-600 hover:underline">info@albertamortgagecalculator.ca</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;