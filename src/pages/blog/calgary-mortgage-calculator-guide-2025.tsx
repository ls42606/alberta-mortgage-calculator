import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, TrendingUp, MapPin, DollarSign, Home, Users } from 'lucide-react';
import LeadCaptureForm from '../../components/LeadCaptureForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CalgaryMortgageGuide: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Calgary Mortgage Calculator: Complete 2025 Home Buying Guide</title>
        <meta 
          name="description" 
          content="Use our Calgary mortgage calculator to find your perfect home payment. Get current rates, market insights, and pre-approval in minutes. Free tools + expert guidance." 
        />
        <meta name="keywords" content="Calgary mortgage calculator, Calgary home prices, Calgary mortgage rates, Calgary real estate 2025" />
        <link rel="canonical" href="https://albertamortgagecalculator.ca/resources/calgary-mortgage-calculator-guide-2025" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        {/* Fixed header spacing for mobile */}
        <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Calgary Mortgage Calculator: Complete 2025 Home Buying Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Calculate your Calgary home affordability with our comprehensive mortgage calculator. Get accurate estimates for your home buying budget.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Free mortgage calculations</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Updated with current market data</span>
              </div>
            </div>
          </div>

          {/* Current Calgary Market Overview */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600" />
              Current Calgary Housing Market Overview
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Average Home Prices by Type</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Detached Home: $587,500</li>
                  <li>• Semi-Detached: $445,200</li>
                  <li>• Townhouse: $385,900</li>
                  <li>• Apartment: $285,400</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Best Mortgage Rates in Calgary</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Fixed 5-Year: 5.89%</li>
                  <li>• Variable Rate: 6.45%</li>
                  <li>• First-Time Buyer: 5.69%</li>
                  <li>• Insured Mortgage: 5.59%</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Market Trends Q4 2024</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Sales Volume: +12.5%</li>
                  <li>• Average Days on Market: 23</li>
                  <li>• Price Growth: +8.3%</li>
                  <li>• Inventory Levels: Balanced</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 font-semibold">
                💡 TIP: Understanding your maximum buying power helps you house hunt more effectively and make competitive offers when you find the right home.
              </p>
            </div>
          </section>

          {/* Interactive Calculator Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              How Much House Can You Afford in Calgary?
            </h2>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-4">🚀 Interactive Calgary Mortgage Calculator</h3>
              <p className="text-lg mb-4">
                Get instant results with current market data and qualifying rates. Accurate calculations based on Canadian mortgage rules.
              </p>
              <a 
                href="/calculators/affordability" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Calculate My Calgary Home Budget →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Affordability Estimates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$80,000 income:</span>
                    <span className="font-semibold text-green-600">~$375,000 home</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$100,000 income:</span>
                    <span className="font-semibold text-green-600">~$475,000 home</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$120,000 income:</span>
                    <span className="font-semibold text-green-600">~$570,000 home</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Calgary Neighborhood Price Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Kensington:</span>
                    <span className="font-semibold">$650K - $950K</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Marda Loop:</span>
                    <span className="font-semibold">$550K - $750K</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Airdrie:</span>
                    <span className="font-semibold">$425K - $625K</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calgary First-Time Buyer Programs */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600" />
              Calgary First-Time Buyer Programs
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Government Incentives Available</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">💰</span>
                    <div>
                      <strong>First-Time Home Buyer Incentive:</strong> Up to 10% of home price shared equity loan
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">🏦</span>
                    <div>
                      <strong>RRSP Home Buyers' Plan:</strong> Withdraw up to $35,000 tax-free
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">🎯</span>
                    <div>
                      <strong>Calgary Housing Programs:</strong> Down payment assistance up to $30,000
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Down Payment Assistance Programs</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">🏡</span>
                    <div>
                      <strong>Calgary Attainable Housing:</strong> Shared equity program for qualified buyers
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">⭐</span>
                    <div>
                      <strong>Employer Programs:</strong> Many Calgary employers offer housing assistance
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">📋</span>
                    <div>
                      <strong>Credit Union Programs:</strong> Special rates and down payment help available
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Calgary Neighborhood Analysis */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Calgary Neighborhood Price Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Top 10 Family-Friendly Areas</h3>
                <div className="space-y-4">
                  {[
                    { area: "Auburn Bay", price: "$515K", family: "⭐⭐⭐⭐⭐" },
                    { area: "Cranston", price: "$485K", family: "⭐⭐⭐⭐⭐" },
                    { area: "Silverado", price: "$525K", family: "⭐⭐⭐⭐⭐" },
                    { area: "McKenzie Towne", price: "$475K", family: "⭐⭐⭐⭐" },
                    { area: "Copperfield", price: "$465K", family: "⭐⭐⭐⭐" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div>
                        <span className="font-semibold">{item.area}</span>
                        <div className="text-sm text-gray-600">{item.family}</div>
                      </div>
                      <span className="font-bold text-green-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Investment Property Hotspots</h3>
                <div className="space-y-4">
                  {[
                    { area: "Beltline", price: "$385K", roi: "6.8%" },
                    { area: "Eau Claire", price: "$425K", roi: "6.2%" },
                    { area: "Hillhurst", price: "$565K", roi: "5.9%" },
                    { area: "Mission", price: "$485K", roi: "6.1%" },
                    { area: "Kensington", price: "$695K", roi: "5.4%" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div>
                        <span className="font-semibold">{item.area}</span>
                        <div className="text-sm text-gray-600">ROI: {item.roi}</div>
                      </div>
                      <span className="font-bold text-blue-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Lead Capture Form */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <DollarSign className="w-8 h-8" />
                Get Pre-Approved for Your Calgary Mortgage
              </h2>
              <p className="text-xl mb-6">
                Connect with licensed mortgage professionals for personalized advice. Free consultation + current rate information.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <span>✓ No credit check required</span>
                <span>✓ Same-day pre-approval</span>
                <span>✓ Rate hold for 120 days</span>
              </div>
            </div>
            <LeadCaptureForm />
          </section>
        </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CalgaryMortgageGuide;