import React from 'react';
import { BookOpen, Calendar, User, ArrowRight, TrendingUp, Home, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogIndex: React.FC = () => {
  const featuredPosts = [
    {
      id: 1,
      title: 'Alberta Mortgage Market Outlook 2025: What Homebuyers Need to Know',
      excerpt: 'Comprehensive analysis of current market trends, interest rate forecasts, and opportunities for Alberta homebuyers in the coming year.',
      author: 'Sarah Mitchell',
      date: '2024-12-15',
      category: 'Market Analysis',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
      slug: 'alberta-mortgage-market-outlook-2025',
      featured: true
    },
    {
      id: 2,
      title: 'First-Time Homebuyer Programs in Alberta: Complete Guide',
      excerpt: 'Everything you need to know about government programs, incentives, and strategies for first-time buyers in Alberta.',
      author: 'Michael Chen',
      date: '2024-12-10',
      category: 'First-Time Buyers',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      slug: 'first-time-homebuyer-programs-alberta',
      featured: true
    },
    {
      id: 3,
      title: 'Mortgage Stress Test 2025: How to Prepare and Qualify',
      excerpt: 'Understanding the latest stress test requirements and proven strategies to improve your qualification chances.',
      author: 'Jennifer Walsh',
      date: '2024-12-08',
      category: 'Qualification Tips',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
      slug: 'mortgage-stress-test-2025-guide',
      featured: false
    }
  ];

  const recentPosts = [
    {
      id: 4,
      title: 'Fixed vs Variable Mortgages: Making the Right Choice in 2025',
      excerpt: 'Compare the pros and cons of fixed and variable rate mortgages in the current market environment.',
      author: 'David Thompson',
      date: '2024-12-05',
      category: 'Mortgage Types',
      readTime: '7 min read',
      slug: 'fixed-vs-variable-mortgages-2025'
    },
    {
      id: 5,
      title: 'Refinancing Your Mortgage: When and How to Do It Right',
      excerpt: 'Strategic guide to mortgage refinancing, including timing, costs, and potential savings.',
      author: 'Lisa Rodriguez',
      date: '2024-12-03',
      category: 'Refinancing',
      readTime: '9 min read',
      slug: 'mortgage-refinancing-guide'
    },
    {
      id: 6,
      title: 'Investment Property Mortgages: What Alberta Investors Should Know',
      excerpt: 'Essential information for real estate investors looking to finance rental properties in Alberta.',
      author: 'Robert Kim',
      date: '2024-12-01',
      category: 'Investment',
      readTime: '10 min read',
      slug: 'investment-property-mortgages-alberta'
    }
  ];

  const categories = [
    { name: 'Market Analysis', count: 12, icon: TrendingUp, color: 'text-emerald-600' },
    { name: 'First-Time Buyers', count: 8, icon: Home, color: 'text-brand-blue' },
    { name: 'Qualification Tips', count: 15, icon: DollarSign, color: 'text-brand-gold' },
    { name: 'Mortgage Types', count: 6, icon: BookOpen, color: 'text-purple-600' },
    { name: 'Refinancing', count: 9, icon: TrendingUp, color: 'text-red-600' },
    { name: 'Investment', count: 7, icon: Home, color: 'text-indigo-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-white via-blue-50/20 to-emerald-50/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-brand-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-brand-gold/5 to-emerald-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-bold shadow-sm mb-8">
            <BookOpen size={18} className="text-emerald-600" />
            <span>Expert Mortgage Insights</span>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Alberta Mortgage
            <span className="gradient-text block">News & Insights</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Stay informed with expert insights, market analysis, and practical advice from Alberta's 
            most trusted mortgage professionals. Your guide to making smart mortgage decisions.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Articles</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Main Featured Post */}
            <Link 
              to={`/blog/${featuredPosts[0].slug}`}
              className="group lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={featuredPosts[0].image} 
                    alt={featuredPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-bold">
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                      {featuredPosts[0].category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(featuredPosts[0].date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {featuredPosts[0].title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-brand-blue rounded-full flex items-center justify-center text-white font-bold">
                        {featuredPosts[0].author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{featuredPosts[0].author}</div>
                        <div className="text-sm text-gray-600">{featuredPosts[0].readTime}</div>
                      </div>
                    </div>
                    
                    <ArrowRight size={20} className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Featured Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.slice(1).map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover-lift"
              >
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-brand-blue text-white rounded-full text-xs font-bold">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">{post.author}</span>
                    </div>
                    
                    <ArrowRight size={16} className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts & Categories */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Articles</h2>
              
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <Link 
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group block bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold">
                            {post.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{new Date(post.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm font-semibold text-gray-700">{post.author}</span>
                        </div>
                      </div>
                      
                      <ArrowRight size={20} className="text-emerald-600 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0 mt-2" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Sidebar */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Categories</h3>
              
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover-lift"
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon size={20} className={category.color} />
                      <span className="font-semibold text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-12 p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                <h4 className="text-lg font-bold text-emerald-800 mb-3">Stay Updated</h4>
                <p className="text-emerald-700 text-sm mb-4">
                  Get the latest mortgage insights and market updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
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