import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Legacy interface - keeping for potential future use
// interface HeaderNavItem extends NavigationLink {
//   name: string;
//   type?: 'scroll' | 'link';
//   icon?: React.ElementType;
// }

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate(); // Commented out as we use Link components instead

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  // Legacy navItems - keeping for potential future use
  // const navItems = [
  //   { 
  //     name: 'Calculators', 
  //     href: '#calculators',
  //     type: 'scroll'
  //   },
  //   { 
  //     name: 'Resources', 
  //     href: '/blog', 
  //     type: 'link', 
  //     icon: BookOpen 
  //   },
  //   { 
  //     name: 'Contact', 
  //     href: '/contact',
  //     type: 'link'
  //   },
  // ];

  const calculatorItems = [
    { name: 'Mortgage Payment', href: '/calculators/mortgage-payment' },
    { name: 'Affordability', href: '/calculators/affordability' },
    { name: 'Stress Test', href: '/calculators/stress-test' },
    { name: 'Refinance', href: '/calculators/refinance' },
    { name: 'Prepayment', href: '/calculators/prepayment' },
    { name: 'HELOC', href: '/calculators/heloc' },
    { name: 'Commercial', href: '/calculators/commercial' },
    { name: 'Debt Consolidation', href: '/calculators/debt-consolidation' },
    { name: 'Land Transfer Tax', href: '/calculators/land-transfer-tax' }
  ];

  const resourceItems = [
    { name: 'Calgary Mortgage Guide', href: '/resources/calgary-mortgage-calculator-guide-2025' },
    { name: 'Edmonton Mortgage Guide', href: '/resources/edmonton-mortgage-calculator-guide-2025' },
    { name: 'Affordability Guide', href: '/tools/affordability-calculator-explained' },
    { name: 'Stress Test Guide', href: '/resources/mortgage-stress-test-pass-guaranteed' },
    { name: 'Blog Articles', href: '/blog' }
  ];

  const scrollToSection = (href: string) => {
    // Remove the hash to get the element ID
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    
    if (element) {
      // Calculate offset to account for fixed header
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Legacy handleNavClick - keeping for potential future use
  // const handleNavClick = (item: HeaderNavItem, e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setIsMobileMenuOpen(false);
  //   
  //   if (item.type === 'scroll') {
  //     if (isHomePage) {
  //       // On home page, scroll to section
  //       scrollToSection(item.href);
  //     } else {
  //       // On other pages, navigate to home first, then scroll
  //       navigate('/');
  //       setTimeout(() => {
  //         const elementId = item.href.replace('#', '');
  //         const element = document.getElementById(elementId);
  //         if (element) {
  //           const headerHeight = 80;
  //           const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  //           const offsetPosition = elementPosition - headerHeight;
  //           window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  //         }
  //       }, 100);
  //     }
  //   } else if (item.type === 'link') {
  //     if (item.href.startsWith('/')) {
  //       // Use React Router for internal links
  //       navigate(item.href);
  //     } else {
  //       // Open external links in new tab
  //       window.open(item.href, '_blank');
  //     }
  //   }
  // };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      window.location.href = '/';
    }
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (isHomePage) {
      scrollToSection('#calculator');
      // Trigger full screen mode after scroll
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ctaTriggerFullScreen'));
      }, 800);
    } else {
      window.location.href = '/#calculator';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Logo - Improved mobile responsiveness */}
          <a 
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group min-w-0 flex-1 mr-3 sm:mr-2"
            aria-label="Alberta Mortgage Calculator - Return to homepage"
          >
            <div className="relative flex-shrink-0">
              <img 
                src="/Screenshot 2025-06-16 163710.png" 
                alt="Alberta Mortgage Calculator logo - Professional mortgage services for Albertans" 
                className="h-12 sm:h-16 lg:h-18 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="block min-w-0 flex-1">
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-brand-navy leading-tight">
                <span className="block sm:hidden">Alberta Mortgage</span>
                <span className="hidden sm:block">Alberta Mortgage Calculator</span>
              </div>
              <div className="text-xs text-gray-600 font-medium">
                <span className="block sm:hidden">Trusted by Albertans</span>
                <span className="hidden sm:block">The mortgage desk Albertans trust</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation - Fixed */}
          <nav className="hidden lg:flex items-center space-x-2" role="navigation" aria-label="Main navigation">
            {/* Calculators Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative flex items-center space-x-2 px-3 py-2">
                <span>Calculators</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {calculatorItems.map((calc) => (
                    <Link
                      key={calc.name}
                      to={calc.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-navy transition-colors"
                    >
                      {calc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative flex items-center space-x-2 px-3 py-2">
                <BookOpen size={16} className="flex-shrink-0" />
                <span>Resources</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {resourceItems.map((resource) => (
                    <Link
                      key={resource.name}
                      to={resource.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-navy transition-colors"
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Link */}
            <Link
              to="/contact"
              className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative group flex items-center space-x-2 px-3 py-2"
            >
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-brand-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            

            {/* Updated CTA Button */}
            <button
              onClick={handleCTAClick}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald transform hover:scale-105 active:scale-95 text-sm"
              aria-label="Start mortgage application process"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile Menu Button - Improved touch target */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 text-gray-700 hover:text-brand-navy transition-colors duration-300 hover:bg-gray-100 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Improved with full navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-fade-in" id="mobile-menu" role="navigation" aria-label="Mobile navigation menu">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {/* Calculators Section */}
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2">Calculators</div>
                {calculatorItems.map((calc) => (
                  <Link
                    key={calc.name}
                    to={calc.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-medium py-3 px-6 hover:bg-gray-50 rounded-lg transition-all duration-300 min-h-[44px] text-sm"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>

              {/* Resources Section */}
              <div className="border-t border-gray-100 pt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2">Resources</div>
                {resourceItems.map((resource) => (
                  <Link
                    key={resource.name}
                    to={resource.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-medium py-3 px-6 hover:bg-gray-50 rounded-lg transition-all duration-300 min-h-[44px] text-sm"
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>

              {/* Contact */}
              <div className="border-t border-gray-100 pt-2">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-gray-700 hover:text-brand-navy font-semibold py-4 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 min-h-[48px] text-base"
                >
                  Contact
                </Link>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleCTAClick}
                  className="w-full px-4 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg text-center min-h-[48px] text-base"
                  aria-label="Start mortgage application process"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;