import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogIndex: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: 'Mortgage Myths Debunked',
      excerpt: 'Professional analysis of common mortgage misconceptions. Get accurate, current information about Canadian mortgage qualification and government programs.',
      date: '2025-01-20',
      readTime: '12 min read',
      slug: '/resources/mortgage-myths-debunked-2025',
      category: 'Education'
    },
    {
      id: 2,
      title: 'How Much Mortgage Can I Afford in Alberta',
      excerpt: 'Calculate your maximum mortgage amount using Canadian GDS and TDS ratios, including the stress test requirements.',
      date: '2024-07-10',
      readTime: '8 min read',
      slug: 'how-much-mortgage-can-i-afford-in-alberta',
      category: 'Affordability'
    },
    {
      id: 3,
      title: 'First Time Home Buyer Guide Alberta 2024',
      excerpt: 'Complete guide to home buying programs, down payment requirements, and qualification steps for Alberta first-time buyers.',
      date: '2024-07-08',
      readTime: '12 min read',
      slug: 'first-time-home-buyer-guide-alberta-2024',
      category: 'First-Time Buyers'
    },
    {
      id: 4,
      title: 'Understanding the Mortgage Stress Test',
      excerpt: 'How the federal stress test works, qualification rates, and strategies to meet the requirements.',
      date: '2024-07-05',
      readTime: '6 min read',
      slug: 'understanding-the-mortgage-stress-test',
      category: 'Qualification'
    },
    {
      id: 5,
      title: 'Fixed vs Variable Rate Mortgages',
      excerpt: 'Compare fixed and variable rate mortgages, understanding rate structures and making the right choice.',
      date: '2024-07-03',
      readTime: '10 min read',
      slug: 'fixed-vs-variable-rate-mortgages',
      category: 'Mortgage Types'
    },
    {
      id: 6,
      title: 'Mortgage Renewal vs Refinancing',
      excerpt: 'Understanding the differences between renewal and refinancing, when to consider each option.',
      date: '2024-07-01',
      readTime: '9 min read',
      slug: 'mortgage-renewal-vs-refinancing',
      category: 'Refinancing'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Simple, Clean Header */}
      <section className="pt-32 pb-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Educational Articles
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn about mortgage calculations, qualification requirements, and Alberta home buying processes.
          </p>
        </div>
      </section>

      {/* Clean Article List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {articles.map((article) => (
              <Link 
                key={article.id}
                to={`/blog/${article.slug}`}
                className="group block bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString('en-CA', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>

          {/* Simple Disclaimer */}
          <div className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-3">
              <BookOpen size={20} className="text-gray-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Educational Content</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  These articles provide educational information about mortgage calculations and processes in Alberta. 
                  For personalized advice specific to your situation, consult with qualified mortgage professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogIndex;