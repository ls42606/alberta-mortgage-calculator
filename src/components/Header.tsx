import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavigationLink } from '../types/services';

interface HeaderNavItem extends NavigationLink {
  name: string;
  type?: 'scroll' | 'link';
  icon?: React.ElementType;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const navItems = [
    { 
      name: 'Calculators', 
      href: '#calculators',
      type: 'scroll'
    },
    { 
      name: 'News', 
      href: '/blog', 
      type: 'link', 
      icon: BookOpen 
    },
    { 
      name: 'Contact', 
      href: '#contact',
      type: 'scroll'
    },
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

  const handleNavClick = (item: HeaderNavItem, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (item.type === 'scroll') {
      if (isHomePage) {
        // On home page, scroll to section
        scrollToSection(item.href);
      } else {
        // On other pages, navigate to home first, then scroll
        navigate('/');
        setTimeout(() => {
          const elementId = item.href.replace('#', '');
          const element = document.getElementById(elementId);
          if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 100);
      }
    } else if (item.type === 'link') {
      if (item.href.startsWith('/')) {
        // Use React Router for internal links
        navigate(item.href);
      } else {
        // Open external links in new tab
        window.open(item.href, '_blank');
      }
    }
  };

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
          <nav className="hidden lg:flex items-center space-x-4" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              item.type === 'scroll' ? (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative group flex items-center space-x-2 px-3 py-2"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.icon && <item.icon size={16} className="flex-shrink-0" />}
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative group flex items-center space-x-2 px-3 py-2"
                >
                  {item.icon && <item.icon size={16} className="flex-shrink-0" />}
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-600 to-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
            

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

        {/* Mobile Menu - Improved touch targets */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-fade-in" id="mobile-menu" role="navigation" aria-label="Mobile navigation menu">
            <div className="space-y-2">
              {navItems.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(item, e)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-semibold py-4 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center space-x-3 min-h-[48px]"
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.icon && <item.icon size={18} className="flex-shrink-0" />}
                    <span className="text-base">{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-semibold py-4 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center space-x-3 min-h-[48px]"
                  >
                    {item.icon && <item.icon size={18} className="flex-shrink-0" />}
                    <span className="text-base">{item.name}</span>
                  </Link>
                )
              ))}
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