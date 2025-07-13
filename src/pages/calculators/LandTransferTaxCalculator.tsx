import React, { useState } from 'react';
import { Building, DollarSign, AlertCircle, MapPin } from 'lucide-react';
import CalculatorLayout from '../../components/CalculatorLayout';
import SliderInput from '../../components/ui/SliderInput';

const LandTransferTaxCalculator: React.FC = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [isFirstTime, setIsFirstTime] = useState(false);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate what the tax would be in other provinces for comparison
  const calculateOtherProvinceTax = (price: number) => {
    // Ontario example calculation
    let ontarioTax = 0;
    if (price <= 55000) {
      ontarioTax = price * 0.005;
    } else if (price <= 250000) {
      ontarioTax = 275 + (price - 55000) * 0.01;
    } else if (price <= 400000) {
      ontarioTax = 2225 + (price - 250000) * 0.015;
    } else {
      ontarioTax = 4475 + (price - 400000) * 0.02;
    }
    
    // BC example calculation
    let bcTax = 0;
    if (price <= 200000) {
      bcTax = price * 0.01;
    } else if (price <= 2000000) {
      bcTax = 2000 + (price - 200000) * 0.02;
    } else {
      bcTax = 38000 + (price - 2000000) * 0.03;
    }
    
    return { ontario: ontarioTax, bc: bcTax };
  };

  const otherProvinceTaxes = calculateOtherProvinceTax(purchasePrice);

  return (
    <CalculatorLayout
      title="Alberta Land Transfer Tax Calculator"
      description="Calculate land transfer tax in Alberta. Great news - Alberta has NO land transfer tax, saving you thousands compared to other provinces!"
      icon={Building}
      color="from-emerald-500 to-emerald-600"
      canonicalPath="/calculators/land-transfer-tax"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Calculator Inputs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center space-x-3">
            <Building size={24} className="text-emerald-600 flex-shrink-0" />
            <span>Property Details</span>
          </h3>
          
          <div className="space-y-6 sm:space-y-8">
            <SliderInput
              label="Purchase Price"
              value={purchasePrice}
              min={150000}
              max={2000000}
              step={25000}
              onChange={setPurchasePrice}
              formatValue={(value) => formatCurrency(value)}
              icon={DollarSign}
              info="Total purchase price of the property"
            />

            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900 flex items-center space-x-2">
                <MapPin size={20} className="text-emerald-600" />
                <span>Buyer Type</span>
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="buyerType"
                    checked={!isFirstTime}
                    onChange={() => setIsFirstTime(false)}
                    className="text-emerald-600"
                  />
                  <span className="text-gray-700">General Buyer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="buyerType"
                    checked={isFirstTime}
                    onChange={() => setIsFirstTime(true)}
                    className="text-emerald-600"
                  />
                  <span className="text-gray-700">First-Time Buyer</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          {/* Alberta Tax Result */}
          <div className="bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 rounded-2xl border-2 border-emerald-200 p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="text-6xl sm:text-7xl font-bold text-emerald-800 mb-3">
                $0
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4">
                Alberta Land Transfer Tax
              </h3>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-emerald-200 text-emerald-800">
                ✓ No Tax Required
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-emerald-200">
              <div className="flex items-start space-x-3">
                <AlertCircle size={20} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 mb-2">Alberta Advantage</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Alberta is one of the few provinces in Canada with NO land transfer tax. 
                    This can save you thousands of dollars when purchasing property!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison with Other Provinces */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Savings Comparison</h3>
            
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                What you would pay in other provinces for a {formatCurrency(purchasePrice)} property:
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Alberta</span>
                  <div className="text-xs text-emerald-600">No Land Transfer Tax</div>
                </div>
                <span className="text-lg font-bold text-emerald-600">$0</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Ontario</span>
                  <div className="text-xs text-gray-500">Provincial Land Transfer Tax</div>
                </div>
                <span className="text-lg font-bold text-red-600">{formatCurrency(otherProvinceTaxes.ontario)}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">British Columbia</span>
                  <div className="text-xs text-gray-500">Property Transfer Tax</div>
                </div>
                <span className="text-lg font-bold text-red-600">{formatCurrency(otherProvinceTaxes.bc)}</span>
              </div>
              
              <div className="flex justify-between items-center py-4 pt-6 border-t-2 border-emerald-200 bg-emerald-50 rounded-lg px-4">
                <span className="text-emerald-800 font-bold text-base sm:text-lg">Your Savings in Alberta</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-800">
                  Up to {formatCurrency(Math.max(otherProvinceTaxes.ontario, otherProvinceTaxes.bc))}
                </span>
              </div>
            </div>
          </div>

          {/* Additional Costs to Consider */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Other Closing Costs in Alberta</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Legal Fees</span>
                  <div className="text-xs text-gray-500">Lawyer/Notary fees</div>
                </div>
                <span className="text-base font-semibold text-gray-900">$1,500 - $3,000</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Home Inspection</span>
                  <div className="text-xs text-gray-500">Professional property inspection</div>
                </div>
                <span className="text-base font-semibold text-gray-900">$400 - $800</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Property Appraisal</span>
                  <div className="text-xs text-gray-500">Required by lender</div>
                </div>
                <span className="text-base font-semibold text-gray-900">$300 - $500</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Title Insurance</span>
                  <div className="text-xs text-gray-500">Property title protection</div>
                </div>
                <span className="text-base font-semibold text-gray-900">$200 - $400</span>
              </div>
              
              <div className="flex justify-between items-center py-3">
                <div>
                  <span className="font-semibold text-gray-700">Moving Costs</span>
                  <div className="text-xs text-gray-500">Professional movers</div>
                </div>
                <span className="text-base font-semibold text-gray-900">$800 - $2,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Expert Advice CTA */}
      <div className="mt-12 sm:mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12 text-white">
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Connect with Mortgage Professionals</h3>
          <p className="text-emerald-100 mb-8 text-lg leading-relaxed max-w-3xl mx-auto">
            Take advantage of Alberta's no land transfer tax policy! Mortgage professionals can provide 
            educational guidance on the complete home buying process and accurate calculations.
          </p>
          <button className="bg-white text-emerald-600 font-bold py-4 px-8 rounded-xl hover:bg-emerald-50 transition-colors duration-300 text-lg shadow-lg">
            Connect with Professionals
          </button>
        </div>
      </div>
    </CalculatorLayout>
  );
};

export default LandTransferTaxCalculator;