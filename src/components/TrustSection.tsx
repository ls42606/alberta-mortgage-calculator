import React from 'react';
import { Building2, Shield, TrendingUp, Users, Award, Globe, Star, CheckCircle } from 'lucide-react';

const TrustSection: React.FC = () => {
  const scrollToCalculatorWithFullScreen = () => {
    const element = document.querySelector('#calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Trigger full screen mode after scroll
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ctaTriggerFullScreen'));
      }, 800);
    }
  };

  const features = [
    {
      icon: Building2,
      title: 'Extensive Lender Network',
      description: 'Exclusive access to major banks, credit unions, and alternative lenders means more options and competitive terms.',
    },
    {
      icon: Shield,
      title: 'Information & Education',
      description: 'Professional-grade calculators and educational resources to help you make informed mortgage decisions.',
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Real-time market data and proprietary analytics help identify the best opportunities for your situation.',
    }
  ];

  const testimonials = [
    {
      content: "They found us a solution our bank said was impossible. The team's knowledge of alternative lenders saved our purchase.",
      author: 'Jennifer Mitchell',
      role: 'Software Engineer, Calgary',
      initials: 'JM',
      rating: 5,
      highlight: 'Impossible made possible'
    },
    {
      content: "Professional service from start to finish. They explained every option clearly and helped us make the best decision for our family.",
      author: 'Robert Singh',
      role: 'Business Owner, Edmonton',
      initials: 'RS',
      rating: 5,
      highlight: 'Expert guidance'
    },
    {
      content: "The difference in service compared to our bank was night and day. Responsive, knowledgeable, and genuinely cared about our outcome.",
      author: 'Sarah Chen',
      role: 'Teacher, Red Deer',
      initials: 'SC',
      rating: 5,
      highlight: 'Outstanding service'
    }
  ];

  const stats = [
    { value: '$2.1B+', label: 'Mortgages Funded', icon: TrendingUp, color: 'text-emerald-600' },
    { value: '15,000+', label: 'Happy Clients', icon: Users, color: 'text-brand-blue' },
    { value: '4.9/5', label: 'Client Rating', icon: Award, color: 'text-brand-gold' },
    { value: '50+', label: 'Lender Partners', icon: Globe, color: 'text-brand-red' },
  ];

  const certifications = [
    'Information Only',
    'BBB A+ Rating', 
    'AMP Member',
    'Bonded & Insured'
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-sm font-medium mb-6">
            <Award size={16} />
            <span>Trusted by 15,000+ Albertans</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Why Alberta chooses us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional expertise. Proven results. Relationships that matter.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <stat.icon size={28} className={stat.color} />
              </div>
              <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                <feature.icon size={36} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              <CheckCircle size={16} className="text-emerald-600" />
              <span>{cert}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="pt-16 border-t border-gray-200">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Real Results from Real Clients
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg leading-relaxed mb-6 text-gray-900">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-brand-blue rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-semibold text-emerald-600">
                      {testimonial.highlight}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={scrollToCalculatorWithFullScreen}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
            >
              Join Our Success Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;