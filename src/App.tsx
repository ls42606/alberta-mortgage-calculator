import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import MortgageCalculator from './components/MortgageCalculator';
import CalculatorShowcase from './components/CalculatorShowcase';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy-loaded Calculator Pages
const MortgagePaymentCalculator = lazy(() => import('./pages/calculators/MortgagePaymentCalculator'));
const AffordabilityCalculator = lazy(() => import('./pages/calculators/AffordabilityCalculator'));
const RefinanceCalculator = lazy(() => import('./pages/calculators/RefinanceCalculator'));
const PrepaymentCalculator = lazy(() => import('./pages/calculators/PrepaymentCalculator'));
const DebtConsolidationCalculator = lazy(() => import('./pages/calculators/DebtConsolidationCalculator'));
const CommercialCalculator = lazy(() => import('./pages/calculators/CommercialCalculator'));
const HELOCCalculator = lazy(() => import('./pages/calculators/HELOCCalculator'));
const StressTestCalculator = lazy(() => import('./pages/calculators/StressTestCalculator'));
const LandTransferTaxCalculator = lazy(() => import('./pages/calculators/LandTransferTaxCalculator'));

// Lazy-loaded Blog Pages
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const CalgaryMortgageGuide = lazy(() => import('./pages/blog/calgary-mortgage-calculator-guide-2025'));
const EdmontonMortgageGuide = lazy(() => import('./pages/blog/edmonton-mortgage-calculator-guide-2025'));
const AffordabilityCalculatorGuide = lazy(() => import('./pages/blog/affordability-calculator-explained-guide'));
const StressTestCalculatorGuide = lazy(() => import('./pages/blog/stress-test-calculator-guide-2025'));

// Lazy-loaded Other Pages
const Contact = lazy(() => import('./pages/Contact'));

const NotFound = lazy(() => import('./pages/NotFound'));

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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main Funnel Page */}
      <Route path="/" element={<HomePage />} />
      
      {/* Calculator Pages - Wrapped with Suspense */}
      <Route 
        path="/calculators/mortgage-payment" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Mortgage Payment Calculator..." />}>
            <MortgagePaymentCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/affordability" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Affordability Calculator..." />}>
            <AffordabilityCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/refinance" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Refinance Calculator..." />}>
            <RefinanceCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/prepayment" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Prepayment Calculator..." />}>
            <PrepaymentCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/debt-consolidation" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Debt Consolidation Calculator..." />}>
            <DebtConsolidationCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/commercial" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Commercial Calculator..." />}>
            <CommercialCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/heloc" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading HELOC Calculator..." />}>
            <HELOCCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/stress-test" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Stress Test Calculator..." />}>
            <StressTestCalculator />
          </Suspense>
        } 
      />
      <Route 
        path="/calculators/land-transfer-tax" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Land Transfer Tax Calculator..." />}>
            <LandTransferTaxCalculator />
          </Suspense>
        } 
      />
      
      {/* Blog Pages - Wrapped with Suspense */}
      <Route 
        path="/blog" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Blog..." />}>
            <BlogIndex />
          </Suspense>
        } 
      />
      <Route 
        path="/blog/:slug" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Article..." />}>
            <BlogPost />
          </Suspense>
        } 
      />
      
      {/* Content Pages - Modern URL Structure */}
      <Route 
        path="/resources/calgary-mortgage-calculator-guide-2025" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Calgary Guide..." />}>
            <CalgaryMortgageGuide />
          </Suspense>
        } 
      />
      <Route 
        path="/resources/edmonton-mortgage-calculator-guide-2025" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Edmonton Guide..." />}>
            <EdmontonMortgageGuide />
          </Suspense>
        } 
      />
      <Route 
        path="/tools/affordability-calculator-explained" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Calculator Guide..." />}>
            <AffordabilityCalculatorGuide />
          </Suspense>
        } 
      />
      <Route 
        path="/resources/mortgage-stress-test-pass-guaranteed" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Stress Test Guide..." />}>
            <StressTestCalculatorGuide />
          </Suspense>
        } 
      />
      
      {/* Contact Page - Wrapped with Suspense */}
      <Route 
        path="/contact" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading Contact Page..." />}>
            <Contact />
          </Suspense>
        } 
      />
      
      {/* 404 Page - Wrapped with Suspense */}
      <Route 
        path="*" 
        element={
          <Suspense fallback={<LoadingSpinner size="lg" message="Loading..." />}>
            <NotFound />
          </Suspense>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}

export default App;