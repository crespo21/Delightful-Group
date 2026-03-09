import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Shop = lazy(() => import('./pages/Shop'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const MarketingStrategyPage = lazy(() => import('./pages/MarketingStrategyPage'));
const ServicePricingPage = lazy(() => import('./pages/ServicePricingPage'));
export function App() {
  return <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/marketing-strategy" element={<MarketingStrategyPage />} />
            <Route path="/service-pricing" element={<ServicePricingPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>;
}