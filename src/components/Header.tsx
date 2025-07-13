import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, BookOpen, Calculator, ChevronDown, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const handleNavClick = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (item.type === 'scroll') {
      if (isHomePage) {
        // On home page, scroll to section
        scrollToSection(item.href);
      } else {
        // On other pages, navigate to home with hash
        window.location.href = `/${item.href}`;
      }
    } else {
      setIsMobileMenuOpen(false);
      // For external links, use React Router navigation
      if (item.href.startsWith('/')) {
        // Let React Router handle the navigation
        return;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - Made 25% bigger and improved mobile */}
          <a 
            href="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group"
          >
            <div className="relative flex-shrink-0">
              <img 
                src="/Screenshot 2025-06-16 163710.png" 
                alt="Alberta Mortgage Calculator" 
                className="h-14 sm:h-16 lg:h-18 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="hidden sm:block">
              <div className="text-base sm:text-lg lg:text-xl font-bold text-brand-navy leading-tight">
                Alberta Mortgage Calculator
              </div>
              <div className="text-xs text-gray-600 font-medium">
                The mortgage desk Alberta trusts
              </div>
            </div>
          </a>

          {/* Desktop Navigation - Fixed */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map((item) => (
              item.type === 'scroll' ? (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(item, e)}
                  className="text-gray-700 hover:text-brand-navy font-semibold transition-all duration-300 relative group flex items-center space-x-2 px-3 py-2"
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
            
            {/* Updated Security Badge */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-full">
              <Shield size={14} className="text-emerald-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-emerald-700">Information Only</span>
            </div>

            {/* Updated CTA Button */}
            <button
              onClick={handleCTAClick}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-emerald transform hover:scale-105 active:scale-95 text-sm"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-brand-navy transition-colors duration-300 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Fixed */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => (
                item.type === 'scroll' ? (
                  <button
                    key={item.name}
                    onClick={(e) => handleNavClick(item, e)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-semibold py-3 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    {item.icon && <item.icon size={16} className="flex-shrink-0" />}
                    <span>{item.name}</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left text-gray-700 hover:text-brand-navy font-semibold py-3 px-4 hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center space-x-2"
                  >
                    {item.icon && <item.icon size={16} className="flex-shrink-0" />}
                    <span>{item.name}</span>
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleCTAClick}
                  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg text-center"
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