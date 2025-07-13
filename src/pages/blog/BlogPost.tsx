import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, TrendingUp } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogPost: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract slug from URL path
  const slug = location.pathname.split('/').pop() || '';

  // Sample blog post data - in a real app, this would come from an API
  const post = {
    title: 'Alberta Mortgage Market Outlook 2025: What Homebuyers Need to Know',
    content: `
      <p>The Alberta mortgage market is experiencing significant shifts as we head into 2025, with new opportunities and challenges emerging for homebuyers across the province. Understanding these trends is crucial for making informed decisions about your mortgage strategy.</p>

      <h2>Current Market Conditions</h2>
      <p>Interest rates have stabilized after a period of volatility, creating a more predictable environment for both buyers and lenders. The Bank of Canada's recent policy decisions have provided clarity on the direction of monetary policy, allowing for better long-term planning.</p>

      <p>Key factors influencing the Alberta market include:</p>
      <ul>
        <li>Economic diversification beyond oil and gas</li>
        <li>Population growth from interprovincial migration</li>
        <li>Infrastructure investments in major urban centers</li>
        <li>Technology sector expansion</li>
      </ul>

      <h2>Regional Variations</h2>
      <p>Different regions across Alberta are experiencing varying market conditions:</p>

      <h3>Calgary</h3>
      <p>Calgary's market remains robust with steady price appreciation and strong demand. The city's economic diversification has created stability in the housing market, with particular strength in the technology and financial services sectors.</p>

      <h3>Edmonton</h3>
      <p>Edmonton continues to offer excellent value for homebuyers, with more affordable pricing compared to other major Canadian cities. Government employment and the university sector provide market stability.</p>

      <h3>Smaller Centers</h3>
      <p>Communities like Red Deer, Lethbridge, and Fort McMurray are seeing renewed interest as remote work options expand and quality of life factors become more important to buyers.</p>

      <h2>Mortgage Rate Outlook</h2>
      <p>Based on current economic indicators and Bank of Canada guidance, we anticipate:</p>
      <ul>
        <li>Continued rate stability through the first half of 2025</li>
        <li>Potential for modest decreases in the latter half of the year</li>
        <li>Variable rate mortgages becoming more attractive</li>
        <li>Increased competition among lenders</li>
      </ul>

      <h2>Opportunities for Homebuyers</h2>
      <p>Several factors are creating opportunities for Alberta homebuyers:</p>

      <h3>First-Time Buyer Programs</h3>
      <p>Enhanced government programs and lender incentives are making homeownership more accessible. The Alberta Home Ownership Program continues to provide valuable support for qualifying buyers.</p>

      <h3>Competitive Lending Environment</h3>
      <p>Lenders are competing aggressively for quality borrowers, resulting in better rates and terms. This includes:</p>
      <ul>
        <li>Reduced qualification requirements for some programs</li>
        <li>Cashback incentives</li>
        <li>Flexible payment options</li>
        <li>Waived fees and charges</li>
      </ul>

      <h2>Challenges to Consider</h2>
      <p>While opportunities exist, buyers should be aware of potential challenges:</p>

      <h3>Stress Test Requirements</h3>
      <p>The federal stress test continues to limit borrowing capacity for some buyers. Understanding how to optimize your financial profile is crucial for qualification.</p>

      <h3>Inventory Levels</h3>
      <p>In some market segments and locations, inventory remains tight, creating competition among buyers and potential for bidding wars.</p>

      <h2>Strategic Recommendations</h2>
      <p>Based on current market conditions, we recommend:</p>

      <ol>
        <li><strong>Get Pre-Approved Early:</strong> Secure your financing before house hunting to understand your true buying power.</li>
        <li><strong>Consider Variable Rates:</strong> With potential for rate decreases, variable rate mortgages may offer savings.</li>
        <li><strong>Explore All Options:</strong> Work with a mortgage broker to access the full range of lender products and programs.</li>
        <li><strong>Plan for the Long Term:</strong> Consider your 5-10 year plans when choosing mortgage terms and property locations.</li>
      </ol>

      <h2>Looking Ahead</h2>
      <p>The Alberta mortgage market in 2025 presents a balanced environment with opportunities for well-prepared buyers. Success will depend on understanding the market dynamics, working with experienced professionals, and making informed decisions based on your specific circumstances.</p>

      <p>For personalized advice on navigating the Alberta mortgage market, consider consulting with a licensed mortgage professional who can provide guidance tailored to your situation.</p>
    `,
    author: 'Sarah Mitchell',
    date: '2024-12-15',
    category: 'Market Analysis',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200'
  };

  const relatedPosts = [
    {
      title: 'First-Time Homebuyer Programs in Alberta: Complete Guide',
      slug: 'first-time-homebuyer-programs-alberta',
      category: 'First-Time Buyers'
    },
    {
      title: 'Mortgage Stress Test 2025: How to Prepare and Qualify',
      slug: 'mortgage-stress-test-2025-guide',
      category: 'Qualification Tips'
    },
    {
      title: 'Fixed vs Variable Mortgages: Making the Right Choice in 2025',
      slug: 'fixed-vs-variable-mortgages-2025',
      category: 'Mortgage Types'
    }
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

        <div className="relative max-w-4xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-3 mb-8">
            <Link 
              to="/blog" 
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-300 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Back to Blog</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm font-medium text-emerald-600">{post.category}</span>
          </div>

          {/* Article Header */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-bold shadow-sm mb-6">
              <BookOpen size={16} />
              <span>{post.category}</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <span className="font-semibold">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>{new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Share Button */}
            <button className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <Share2 size={16} />
              <span className="font-semibold">Share Article</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Featured Image */}
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-8 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50 rounded-2xl border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-brand-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h4>
                <p className="text-gray-600 leading-relaxed">
                  Sarah is a senior mortgage specialist with over 10 years of experience in the Alberta market. 
                  She specializes in helping first-time buyers and has facilitated over $500M in mortgage transactions. 
                  Sarah holds her AMP designation and is a regular contributor to industry publications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-blue-50/50 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, index) => (
              <Link 
                key={index}
                to={`/blog/${relatedPost.slug}`}
                className="group bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-300 hover-lift"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                  <TrendingUp size={14} />
                  <span className="font-semibold">{relatedPost.category}</span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
                  {relatedPost.title}
                </h4>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-emerald-600">Read More</span>
                  <ArrowLeft size={16} className="text-emerald-600 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;