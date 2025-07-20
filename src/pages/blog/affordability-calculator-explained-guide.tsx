import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calculator, DollarSign, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import LeadCaptureForm from '../../components/LeadCaptureForm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AffordabilityCalculatorGuide: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mortgage Affordability Calculator: Complete Guide + Interactive Tool</title>
        <meta 
          name="description" 
          content="Master our mortgage affordability calculator with step-by-step guide. Calculate your maximum home price, avoid common mistakes, and get pre-approved instantly." 
        />
        <meta name="keywords" content="mortgage affordability calculator, how much house can I afford, mortgage calculator guide, home affordability Alberta" />
        <link rel="canonical" href="https://albertamortgagecalculator.ca/tools/affordability-calculator-explained" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
        <Header />
        <div className="pt-20 sm:pt-24">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mortgage Affordability Calculator Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Professional guidance on using mortgage affordability calculators. Understand Canadian lending standards and qualification requirements.
            </p>
            <div className="bg-blue-100 border border-blue-400 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 font-semibold">
                Understanding affordability calculations helps you determine realistic home price ranges and prepare for mortgage qualification.
              </p>
            </div>
          </div>

          {/* What is Affordability Calculator */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Mortgage Affordability Calculator?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-purple-600 mb-4">When You Need This Calculator</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span>Planning to buy your first home</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span>Setting your house hunting budget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span>Checking if you qualify for stress test</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <span>Comparing different income scenarios</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Who Should Use This Tool</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
                    <span>First-time home buyers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
                    <span>Self-employed borrowers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
                    <span>Couples combining incomes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-500 mt-1" />
                    <span>Anyone upgrading homes</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calculator className="w-8 h-8 text-purple-600" />
              How to Use Our Affordability Calculator
            </h2>
            
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">Professional Affordability Calculator</h3>
              <p className="text-lg mb-4">
                Calculate your maximum home price using Canadian lending standards. Includes stress test requirements and Alberta market factors.
              </p>
              <a 
                href="/calculators/affordability" 
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Calculate My Maximum Home Price →
              </a>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Step-by-Step Instructions</h3>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <strong>Enter Your Gross Annual Income</strong>
                      <p className="text-gray-600 text-sm">Include all income sources: salary, bonuses, rental income, self-employment</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <strong>Add Your Monthly Debts</strong>
                      <p className="text-gray-600 text-sm">Car loans, credit cards, student loans, other mortgages</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <strong>Choose Your Down Payment</strong>
                      <p className="text-gray-600 text-sm">Minimum 5% for homes under $500K, 10% for portion over $500K</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    <div>
                      <strong>Select Mortgage Details</strong>
                      <p className="text-gray-600 text-sm">Interest rate, amortization period, payment frequency</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Understanding Your Results</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800">Maximum Home Price</h4>
                    <p className="text-green-700 text-sm">The highest price you can afford while passing the stress test</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Monthly Payment</h4>
                    <p className="text-blue-700 text-sm">Principal, interest, property taxes, and insurance (PITI)</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800">Debt Service Ratios</h4>
                    <p className="text-yellow-700 text-sm">GDS (housing costs) and TDS (total debt) percentages</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800">Stress Test Result</h4>
                    <p className="text-purple-700 text-sm">Whether you qualify at the qualifying rate</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Examples</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Scenario 1: First-Time Buyer</h3>
                <ul className="space-y-2 text-sm text-green-700 mb-4">
                  <li>• Income: $85,000</li>
                  <li>• Down Payment: $30,000</li>
                  <li>• Debts: $450/month</li>
                  <li>• Credit Score: 720</li>
                </ul>
                <div className="bg-green-200 p-3 rounded">
                  <p className="font-bold text-green-800">Result: $415,000 home</p>
                  <p className="text-green-700 text-sm">Monthly payment: $2,485</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Scenario 2: Couple Buying</h3>
                <ul className="space-y-2 text-sm text-blue-700 mb-4">
                  <li>• Combined Income: $135,000</li>
                  <li>• Down Payment: $75,000</li>
                  <li>• Debts: $890/month</li>
                  <li>• Credit Score: 750+</li>
                </ul>
                <div className="bg-blue-200 p-3 rounded">
                  <p className="font-bold text-blue-800">Result: $675,000 home</p>
                  <p className="text-blue-700 text-sm">Monthly payment: $3,650</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Scenario 3: Self-Employed</h3>
                <ul className="space-y-2 text-sm text-purple-700 mb-4">
                  <li>• Stated Income: $95,000</li>
                  <li>• Down Payment: $125,000 (25%)</li>
                  <li>• Debts: $320/month</li>
                  <li>• Alt-A Program</li>
                </ul>
                <div className="bg-purple-200 p-3 rounded">
                  <p className="font-bold text-purple-800">Result: $500,000 home</p>
                  <p className="text-purple-700 text-sm">Monthly payment: $2,875</p>
                </div>
              </div>
            </div>
          </section>

          {/* Advanced Tips */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Tips & Strategies</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">Optimization Techniques</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <strong>Pay down high-interest debt first</strong>
                      <p className="text-gray-600 text-sm">Every $100 monthly debt paid off increases buying power by ~$20,000</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <strong>Consider longer amortization</strong>
                      <p className="text-gray-600 text-sm">30-year vs 25-year can increase affordability by 15-20%</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <strong>Shop for better rates</strong>
                      <p className="text-gray-600 text-sm">0.25% rate improvement = $10,000+ more buying power</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Common Mistakes to Avoid</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <strong>Ignoring the stress test</strong>
                      <p className="text-gray-600 text-sm">Calculating at posted rate vs contract rate can be $100K difference</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <strong>Forgetting closing costs</strong>
                      <p className="text-gray-600 text-sm">Budget 1.5-3% of home price for legal fees, inspections, etc.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <strong>Using online pre-approvals</strong>
                      <p className="text-gray-600 text-sm">Get real pre-approval from a lender to avoid disappointment</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Lead Capture Form */}
          <section className="bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get Your Maximum Home Price + Pre-Approval</h2>
              <p className="text-xl mb-6">
                🔥 Free consultation includes: Affordability analysis, rate shopping, and instant pre-approval letter
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                <span>✓ Same-day pre-approval</span>
                <span>✓ Rate hold guarantee</span>
                <span>✓ No obligation</span>
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

export default AffordabilityCalculatorGuide;