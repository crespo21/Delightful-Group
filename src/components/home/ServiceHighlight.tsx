import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}
const Service: React.FC<ServiceProps> = ({
  icon,
  title,
  description,
  link
}) => {
  return <motion.div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center" whileHover={{
    y: -5,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  }} transition={{
    duration: 0.3
  }}>
      <div className="bg-green-100 p-4 rounded-full mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mt-auto">
        <Button href={link} variant="outline" size="sm">
          Learn More
        </Button>
      </div>
    </motion.div>;
};
const ServiceHighlight: React.FC = () => {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide exceptional services tailored to meet your needs,
            ensuring quality and satisfaction in every aspect.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Service icon={<Sparkles size={28} className="text-green-600" />} title="Cleaning Services" description="Professional cleaning services for residential and commercial properties, ensuring spotless results every time." link="/services" />
          <Service icon={<Leaf size={28} className="text-green-600" />} title="Landscaping" description="Expert landscaping solutions to transform your outdoor space into a beautiful and functional environment." link="/services" />
          <Service icon={<ShoppingBag size={28} className="text-green-600" />} title="Online Shop" description="Quality products for your home and garden needs, available through our convenient online store." link="/shop" />
        </div>
      </div>
    </section>;
};
export default ServiceHighlight;