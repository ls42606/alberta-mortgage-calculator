import React from 'react';
import { Shield, Phone, Mail, ExternalLink, CheckCircle, Star, Award } from 'lucide-react';
import { NavigationLink } from '../types/services';

interface FooterLink extends NavigationLink {
  name: string;
  action?: 'scroll' | 'link';
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
        { name: 'All Calculators', href: '#calculators', action: 'scroll' },
        { name: 'Calgary Guide', href: '/resources/calgary-mortgage-calculator-guide-2025', action: 'link' },
        { name: 'Edmonton Guide', href: '/resources/edmonton-mortgage-calculator-guide-2025', action: 'link' },
        { name: 'Affordability Guide', href: '/tools/affordability-calculator-explained', action: 'link' },
        { name: 'Stress Test Guide', href: '/resources/mortgage-stress-test-pass-guaranteed', action: 'link' },
        { name: 'Blog Articles', href: '/blog', action: 'link' },
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
    { name: 'Professional Analysis', icon: Award },
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

  const handleLinkClick = (link: FooterLink, e: React.MouseEvent) => {
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14 lg:mb-16">
          {/* Enhanced Brand Section - Mobile responsive */}
          <div className="lg:col-span-1">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <img 
                src="/Screenshot 2025-06-16 163710.png" 
                alt="Alberta Mortgage Calculator logo - Professional mortgage services for Albertans" 
                className="h-16 sm:h-20 w-auto hover:scale-105 transition-transform duration-300 mx-auto sm:mx-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-400 via-brand-blue to-brand-gold bg-clip-text text-transparent">
                  Alberta Mortgage Calculator
                </h3>
                <p className="text-xs text-gray-400 font-medium">The mortgage desk Albertans trust</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 sm:mb-8 text-sm text-center sm:text-left">
              Professional mortgage calculators and educational resources for Alberta homebuyers. 
              Trusted by thousands of Albertans for accurate calculations and expert guidance. 
              Connect with certified mortgage professionals for personalized service.
            </p>
            
            {/* Enhanced Certifications - Mobile responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center space-x-2 px-3 py-2.5 bg-white/5 backdrop-blur-sm rounded-lg text-xs border border-white/10 hover:bg-white/10 transition-all duration-300 hover-lift cursor-pointer justify-center sm:justify-start"
                >
                  <cert.icon size={14} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300 font-medium">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Links Sections - Mobile responsive */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1 text-center lg:text-left">
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">{section.title}</h4>
              <ul className="space-y-3 sm:space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={(e) => handleLinkClick(link, e)}
                      className="text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center space-x-2 group hover:translate-x-1 mx-auto lg:mx-0 min-h-[32px]"
                    >
                      <span>{link.name}</span>
                      <ExternalLink 
                        size={12} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0" 
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Enhanced Contact Information - Mobile responsive */}
        <div className="border-t border-gray-700 pt-8 sm:pt-12 mb-8 sm:mb-12">
          <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-white flex flex-col sm:flex-row items-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <Phone size={20} sm:size={24} className="text-emerald-400 flex-shrink-0" />
            <span>Contact Our Professional Team</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="flex items-center justify-center sm:justify-start space-x-3 p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 group border border-white/10 hover-lift min-h-[48px]"
              >
                <contact.icon size={16} sm:size={18} className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white font-medium transition-colors duration-300 break-words">
                  {contact.text}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Enhanced Bottom Section with Disclaimer - Mobile responsive */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
            <h5 className="text-sm font-bold text-emerald-400 mb-2 text-center sm:text-left">Important Disclaimer</h5>
            <p className="text-xs text-gray-400 leading-relaxed text-center sm:text-left">
              Alberta Mortgage Calculator provides educational information and calculation tools only. 
              We are not a financial institution and do not provide financial advice. All calculations 
              are estimates for informational purposes. Consult with certified mortgage professionals 
              for personalized advice. No financial risk is assumed by Alberta Mortgage Calculator.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-xs sm:text-sm text-gray-400 text-center lg:text-left">
              <p className="font-medium">&copy; {currentYear} Alberta Mortgage Calculator Inc. All rights reserved.</p>
              <div className="mt-2 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-2 sm:gap-4">
                <button 
                  onClick={handlePrivacyClick}
                  className="hover:text-white transition-colors duration-300 underline min-h-[32px] flex items-center justify-center"
                >
                  Privacy Policy
                </button>
                <span className="hidden sm:inline">•</span>
                <button 
                  onClick={handleTermsClick}
                  className="hover:text-white transition-colors duration-300 underline min-h-[32px] flex items-center justify-center"
                >
                  Terms of Service
                </button>
                <span className="hidden sm:inline">•</span>
                <span className="text-emerald-400 font-semibold">Educational Use Only</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="text-xs text-gray-500 font-medium text-center">
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