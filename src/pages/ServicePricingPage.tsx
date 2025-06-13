import React from 'react';
import ServicePricing from '../components/documents/ServicePricing';
const ServicePricingPage: React.FC = () => {
  return <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <ServicePricing />
        <div className="mt-8 text-center">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors" onClick={() => window.print()}>
            Print Pricing Document
          </button>
        </div>
      </div>
    </div>;
};
export default ServicePricingPage;