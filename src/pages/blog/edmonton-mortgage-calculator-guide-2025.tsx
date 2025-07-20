import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, TrendingUp, MapPin, DollarSign, Home, Users } from 'lucide-react';
import LeadCaptureForm from '../../components/LeadCaptureForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const EdmontonMortgageGuide: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Edmonton Mortgage Calculator: Complete 2025 Home Buying Guide</title>
        <meta 
          name="description" 
          content="Use our Edmonton mortgage calculator to find your perfect home payment. Get current rates, market insights, and pre-approval in minutes. Free tools + expert guidance." 
        />
        <meta name="keywords" content="Edmonton mortgage calculator, Edmonton home prices, Edmonton mortgage rates, Edmonton real estate 2025" />
        <link rel="canonical" href="https://albertamortgagecalculator.ca/resources/edmonton-mortgage-calculator-guide-2025" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <Header />
        {/* Fixed header spacing for mobile */}
        <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Edmonton Mortgage Calculator Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional mortgage calculations for Edmonton homebuyers. Accurate estimates using Canadian lending standards and Edmonton market data.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Free mortgage calculations</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Updated with current market information</span>
              </div>
            </div>
          </div>

          {/* Current Edmonton Market Overview */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-green-600" />
              Current Edmonton Housing Market Overview
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Average Home Prices by Type</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Detached Home: $465,800</li>
                  <li>• Semi-Detached: $365,400</li>
                  <li>• Townhouse: $295,600</li>
                  <li>• Apartment: $215,900</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Best Mortgage Rates in Edmonton</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Fixed 5-Year: 5.84%</li>
                  <li>• Variable Rate: 6.40%</li>
                  <li>• First-Time Buyer: 5.64%</li>
                  <li>• Insured Mortgage: 5.54%</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Market Trends Q4 2024</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Sales Volume: +15.2%</li>
                  <li>• Average Days on Market: 19</li>
                  <li>• Price Growth: +6.7%</li>
                  <li>• Inventory Levels: Seller's Market</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-800 font-semibold">
                Understanding Edmonton's mortgage qualification requirements helps you prepare for the home buying process and determine realistic price ranges.
              </p>
            </div>
          </section>

          {/* Interactive Calculator Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-green-600" />
              How Much House Can You Afford in Edmonton?
            </h2>
            
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-4">Edmonton Mortgage Calculator</h3>
              <p className="text-lg mb-4">
                Professional mortgage calculations using current qualification rates and Edmonton market considerations. Trusted by Alberta homebuyers.
              </p>
              <a 
                href="/calculators/affordability" 
                className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Calculate My Edmonton Home Budget →
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Affordability Estimates</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$75,000 income:</span>
                    <span className="font-semibold text-green-600">~$350,000 home</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$90,000 income:</span>
                    <span className="font-semibold text-green-600">~$425,000 home</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>$110,000 income:</span>
                    <span className="font-semibold text-green-600">~$520,000 home</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Edmonton Neighborhood Price Ranges</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Glenora:</span>
                    <span className="font-semibold">$725K - $1.2M</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Windermere:</span>
                    <span className="font-semibold">$485K - $675K</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded">
                    <span>Sherwood Park:</span>
                    <span className="font-semibold">$425K - $595K</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Edmonton First-Time Buyer Programs */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Home className="w-8 h-8 text-green-600" />
              Edmonton First-Time Buyer Programs
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
                      <strong>RRSP Home Buyers' Plan:</strong> Withdraw up to $35,000 tax-free per person
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">🎯</span>
                    <div>
                      <strong>Edmonton Housing Trust:</strong> Down payment loans up to $40,000
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
                      <strong>Habitat for Humanity:</strong> Affordable homeownership program
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">⭐</span>
                    <div>
                      <strong>City Employee Housing:</strong> Municipal worker assistance programs
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold">📋</span>
                    <div>
                      <strong>Servus Credit Union:</strong> Special first-time buyer rates and programs
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Edmonton Neighborhood Analysis */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Edmonton Neighborhood Price Analysis</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Top 10 Family-Friendly Areas</h3>
                <div className="space-y-4">
                  {[
                    { area: "Summerside", price: "$385K", family: "⭐⭐⭐⭐⭐" },
                    { area: "Windermere", price: "$485K", family: "⭐⭐⭐⭐⭐" },
                    { area: "Chappelle", price: "$425K", family: "⭐⭐⭐⭐⭐" },
                    { area: "Terwillegar", price: "$465K", family: "⭐⭐⭐⭐" },
                    { area: "Rio Terrace", price: "$395K", family: "⭐⭐⭐⭐" },
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
                    { area: "Strathcona", price: "$285K", roi: "7.2%" },
                    { area: "Garneau", price: "$375K", roi: "6.8%" },
                    { area: "Old Strathcona", price: "$425K", roi: "6.4%" },
                    { area: "Whyte Ave Area", price: "$385K", roi: "6.6%" },
                    { area: "Bonnie Doon", price: "$345K", roi: "6.9%" },
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
          <section className="bg-gradient-to-r from-green-600 to-blue-700 text-white rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <DollarSign className="w-8 h-8" />
                Get Pre-Approved for Your Edmonton Mortgage
              </h2>
              <p className="text-xl mb-6">
                Connect with licensed mortgage professionals for personalized guidance. Free consultation + current rate information.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <span>✓ No obligation quote</span>
                <span>✓ Local Edmonton experts</span>
                <span>✓ Same-day response</span>
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

export default EdmontonMortgageGuide;