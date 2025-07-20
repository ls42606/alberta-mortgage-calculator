import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ContentLayout from '../../components/ContentLayout';

const MortgageMythsDebunked: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Mortgage Myths Debunked | Alberta Mortgage Calculator</title>
        <meta 
          name="description" 
          content="Professional analysis of common mortgage misconceptions. Get accurate, current information about Canadian mortgage qualification, government programs, and lending standards." 
        />
        <meta name="keywords" content="mortgage myths, mortgage misinformation, Canadian mortgage facts, first time buyer programs, stress test facts" />
        <link rel="canonical" href="https://albertamortgagecalculator.ca/resources/mortgage-myths-debunked-2025" />
      </Helmet>

      <ContentLayout
        title="Mortgage Myths Debunked"
        description="Professional analysis of common mortgage misconceptions. Accurate, current information about Canadian mortgage qualification, government programs, and lending standards."
        category="Mortgage Education"
        backLink="/blog"
        backText="Back to Resources"
      >
        {/* Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mortgage Misconceptions</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-yellow-900 mb-3">Why Accurate Information Matters</h3>
            <p className="text-yellow-800 mb-4">
              Misinformation about mortgages can cost you thousands of dollars and delay homeownership. 
              This guide provides current, accurate information about Canadian mortgage lending.
            </p>
            <Link 
              to="/calculators/affordability" 
              className="inline-block bg-yellow-600 text-white px-6 py-3 rounded font-semibold hover:bg-yellow-700 transition-colors"
            >
              Calculate Your Real Affordability
            </Link>
          </div>

          <p className="text-gray-700 mb-6">
            The mortgage industry evolves continuously, with government programs changing and lending standards updating. 
            Unfortunately, outdated information continues to circulate online, leading to confusion and poor financial decisions.
          </p>
        </section>

        {/* Government Program Myths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Government Program Myths</h2>
          
          <div className="space-y-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Government provides 10% equity loans for all first-time buyers</h3>
                  <p className="text-red-800 mb-3">
                    This widespread misconception refers to the federal First-Time Home Buyer Incentive program.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Program discontinued for new applications</h4>
                    <p className="text-green-800 text-sm">
                      The First-Time Home Buyer Incentive closed to new applications in March 2024. 
                      Only existing participants can still benefit from this shared equity program.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Alberta offers provincial down payment assistance</h3>
                  <p className="text-red-800 mb-3">
                    Many believe Alberta provides provincial mortgage assistance programs similar to other provinces.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Limited municipal programs only</h4>
                    <p className="text-green-800 text-sm">
                      Alberta doesn't offer provincial mortgage assistance. Some municipalities like Calgary and Edmonton 
                      have small-scale down payment loan programs with limited funding and strict eligibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qualification Myths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Qualification and Stress Test Myths</h2>
          
          <div className="space-y-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Credit unions don't require stress test</h3>
                  <p className="text-red-800 mb-3">
                    Many believe credit unions offer easier qualification without federal stress test requirements.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: All federally regulated lenders must apply stress test</h4>
                    <p className="text-green-800 text-sm">
                      The federal stress test applies to all mortgages from federally regulated institutions, 
                      including most credit unions. Only small, provincially regulated lenders may have different criteria.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: You need perfect credit for mortgage approval</h3>
                  <p className="text-red-800 mb-3">
                    Some believe only borrowers with credit scores above 750 can qualify for mortgages.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Minimum 650 credit score for most lenders</h4>
                    <p className="text-green-800 text-sm">
                      Most federally regulated lenders require minimum 650 credit score. Scores of 700+ access 
                      better rates, but qualification is possible with lower scores through specialized programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rate and Payment Myths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interest Rate and Payment Myths</h2>
          
          <div className="space-y-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Variable rates always save money</h3>
                  <p className="text-red-800 mb-3">
                    Historical data suggests variable rates outperform fixed rates, leading to blanket recommendations.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Rate choice depends on current market conditions</h4>
                    <p className="text-green-800 text-sm">
                      Current market conditions show fixed and variable rates very close. 
                      Your risk tolerance and payment flexibility matter more than historical trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Banks offer the best mortgage rates</h3>
                  <p className="text-red-800 mb-3">
                    Many assume major banks automatically provide the most competitive mortgage rates.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Mortgage brokers often access better rates</h4>
                    <p className="text-green-800 text-sm">
                      Mortgage brokers work with multiple lenders and can often secure better rates than 
                      banks offer directly. They also provide access to specialized lenders and programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Myths */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market and Timing Myths</h2>
          
          <div className="space-y-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">MYTH: Wait for rates to drop before buying</h3>
                  <p className="text-red-800 mb-3">
                    Many potential buyers delay purchases waiting for lower interest rates.
                  </p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">FACT: Time in market beats timing the market</h4>
                    <p className="text-green-800 text-sm">
                      Mortgage rates are unpredictable. The cost of waiting (rising home prices, rent payments) 
                      often exceeds the benefit of potentially lower rates. You can refinance when rates improve.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Accurate Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Get Accurate Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reliable Sources</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Bank of Canada:</strong>
                    <p className="text-gray-700 text-sm">Official qualifying rates and policy updates</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">CMHC Website:</strong>
                    <p className="text-gray-700 text-sm">Current government programs and requirements</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Licensed Mortgage Professionals:</strong>
                    <p className="text-gray-700 text-sm">Current market conditions and qualification requirements</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Warning Signs of Misinformation</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Guaranteed approvals:</strong>
                    <p className="text-gray-700 text-sm">No legitimate lender guarantees approval</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Outdated program information:</strong>
                    <p className="text-gray-700 text-sm">Always verify current program availability</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-gray-900">Too-good-to-be-true offers:</strong>
                    <p className="text-gray-700 text-sm">Extremely low rates or easy qualification claims</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Professional Guidance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Mortgage Guidance</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Mortgage misinformation costs Canadians millions annually through poor decisions, missed opportunities, and inadequate preparation. 
              Professional mortgage advisors provide current, accurate information tailored to your specific situation.
            </p>
            <p className="text-gray-700 mb-6">
              Use reliable calculators and consult with licensed professionals who stay current with changing regulations and market conditions.
            </p>
            
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Protect Yourself From Misinformation</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Verify information with multiple reliable sources</li>
                <li>• Check publication dates on financial advice articles</li>
                <li>• Consult with licensed mortgage professionals</li>
                <li>• Use current government and bank websites for program details</li>
              </ul>
            </div>
          </div>
        </section>

      </ContentLayout>
    </>
  );
};

export default MortgageMythsDebunked;