import React from 'react';
import { Shield, Phone, Mail, ExternalLink, CheckCircle, Star, Award } from 'lucide-react';

interface FooterSection {
  title: string;
  links: Array<{ name: string; href: string }>;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Purchase Mortgages', href: '#calculator', action: 'scroll' },
        { name: 'Refinancing Solutions', href: '#calculator', action: 'scroll' },
        { name: 'Mortgage Renewals', href: '#calculator', action: 'scroll' },
        { name: 'Investment Properties', href: '#calculator', action: 'scroll' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Mortgage Calculator', href: '#calculator', action: 'scroll' },
        { name: 'All Calculators', href: '#calculators', action: 'scroll' },
        { name: 'Market Analysis', href: '/blog', action: 'link' },
        { name: 'Professional Guidance', href: '#calculator', action: 'scroll' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Our Platform', href: '#about', action: 'scroll' },
        { name: 'Why Choose Us', href: '#about', action: 'scroll' },
        { name: 'Client Success Stories', href: '#about', action: 'scroll' },
        { name: 'Professional Standards', href: '#about', action: 'scroll' },
      ],
    },
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@albertamortgagecalculator.ca', href: 'mailto:info@albertamortgagecalculator.ca' },
  ];

  const certifications = [
    { name: '100% Free', icon: Shield },
    { name: 'Secure & Private', icon: CheckCircle },
    { name: 'Information Only', icon: Award },
    { name: 'Updated July 2024', icon: Star },
  ];

  const scrollToSection = (href: string) => {
    // Remove the hash to get the element ID
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      // Calculate offset to account for fixed header
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLinkClick = (link: any, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (link.action === 'scroll') {
      // Check if we're on the home page
      if (window.location.pathname === '/') {
        scrollToSection(link.href);
      } else {
        // Navigate to home page with hash
        window.location.href = `/${link.href}`;
      }
    } else if (link.action === 'link') {
      // Handle internal links
      if (link.href.startsWith('/')) {
        window.location.href = link.href;
      } else {
        window.open(link.href, '_blank');
      }
    }
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Privacy Policy: Alberta Mortgage Calculator is committed to protecting your privacy. We collect only necessary information for providing mortgage calculations and connecting you with certified professionals. Your data is never sold or shared without consent. All information is encrypted and securely stored.');
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Terms of Service: This website provides educational mortgage calculation tools only. All calculations are estimates for informational purposes. Alberta Mortgage Calculator is not a financial institution and does not provide financial advice. Users should consult with certified mortgage professionals for personalized guidance. No financial risk is assumed by this platform.');
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-brand-blue/20 to-brand-gold/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/10 rounded-full animate-float-gentle" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/10 rounded-full animate-float-gentle" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 border border-white/5 rounded-full animate-float-gentle" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Enhanced Brand Section - Logo made 25% bigger */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="/Screenshot 2025-06-16 163710.png" 
                alt="Alberta Mortgage Calculator" 
                className="h-20 w-auto hover:scale-105 transition-transform duration-300"
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-brand-blue to-brand-gold bg-clip-text text-transparent">
                  Alberta Mortgage Calculator
                </h3>
                <p className="text-xs text-gray-400 font-medium">The mortgage desk Albertans trust</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-8 text-sm">
              Professional mortgage information and calculators for Alberta residents. 
              Educational tools and resources to help you make informed mortgage decisions 
              with access to certified mortgage professionals.
            </p>
            
            {/* Enhanced Certifications */}
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className="flex items-center space-x-2 px-3 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-xs border border-white/10 hover:bg-white/10 transition-all duration-300 hover-lift cursor-pointer"
                >
                  <cert.icon size={14} className="text-emerald-400" />
                  <span className="text-gray-300 font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h4 className="text-lg font-bold mb-6 text-white">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={(e) => handleLinkClick(link, e)}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2 group hover:translate-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Enhanced Contact Information */}
        <div className="border-t border-gray-700 pt-12 mb-12">
          <h4 className="text-xl font-bold mb-6 text-white flex items-center space-x-3">
            <Phone size={24} className="text-emerald-400" />
            <span>Contact Our Professional Team</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover-lift"
              >
                <contact.icon size={18} className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                <span className="text-sm text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
                  {contact.text}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Enhanced Bottom Section with Disclaimer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h5 className="text-sm font-bold text-emerald-400 mb-2">Important Disclaimer</h5>
            <p className="text-xs text-gray-400 leading-relaxed">
              Alberta Mortgage Calculator provides educational information and calculation tools only. 
              We are not a financial institution and do not provide financial advice. All calculations 
              are estimates for informational purposes. Consult with certified mortgage professionals 
              for personalized advice. No financial risk is assumed by Alberta Mortgage Calculator.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-400 text-center lg:text-left">
              <p className="font-medium">&copy; {currentYear} Alberta Mortgage Calculator Inc. All rights reserved.</p>
              <p className="mt-2 flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={handlePrivacyClick}
                  className="hover:text-white transition-colors duration-300 underline"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button 
                  onClick={handleTermsClick}
                  className="hover:text-white transition-colors duration-300 underline"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Educational Use Only</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-xs text-gray-500 font-medium">
                Secured by 256-bit Encryption
              </div>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-brand-blue rounded-full animate-pulse-professional"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-brand-blue to-brand-gold rounded-full animate-pulse-professional" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-brand-gold to-emerald-400 rounded-full animate-pulse-professional" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;