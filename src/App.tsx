import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import MortgageCalculator from './components/MortgageCalculator';
import CalculatorShowcase from './components/CalculatorShowcase';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

// Calculator Pages
import MortgagePaymentCalculator from './pages/calculators/MortgagePaymentCalculator';
import AffordabilityCalculator from './pages/calculators/AffordabilityCalculator';
import RefinanceCalculator from './pages/calculators/RefinanceCalculator';
import PrepaymentCalculator from './pages/calculators/PrepaymentCalculator';
import DebtConsolidationCalculator from './pages/calculators/DebtConsolidationCalculator';
import CommercialCalculator from './pages/calculators/CommercialCalculator';
import HELOCCalculator from './pages/calculators/HELOCCalculator';
import StressTestCalculator from './pages/calculators/StressTestCalculator';
import LandTransferTaxCalculator from './pages/calculators/LandTransferTaxCalculator';

// Blog Pages
import BlogIndex from './pages/blog/BlogIndex';
import BlogPost from './pages/blog/BlogPost';

// Admin Pages
import { ContentDashboard } from './components/admin/ContentDashboard';

// Component to handle hash navigation and scroll to top
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Always scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <MortgageCalculator />
      <CalculatorShowcase />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Funnel Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Calculator Pages */}
        <Route path="/calculators/mortgage-payment" element={<MortgagePaymentCalculator />} />
        <Route path="/calculators/affordability" element={<AffordabilityCalculator />} />
        <Route path="/calculators/refinance" element={<RefinanceCalculator />} />
        <Route path="/calculators/prepayment" element={<PrepaymentCalculator />} />
        <Route path="/calculators/debt-consolidation" element={<DebtConsolidationCalculator />} />
        <Route path="/calculators/commercial" element={<CommercialCalculator />} />
        <Route path="/calculators/heloc" element={<HELOCCalculator />} />
        <Route path="/calculators/stress-test" element={<StressTestCalculator />} />
        <Route path="/calculators/land-transfer-tax" element={<LandTransferTaxCalculator />} />
        
        {/* Blog Pages */}
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<ContentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;