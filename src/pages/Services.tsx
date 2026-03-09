import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, ShoppingBag, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  image,
  onClick
}) => {
  return <motion.div className="bg-white rounded-lg overflow-hidden shadow-lg" whileHover={{
    y: -5
  }} transition={{
    duration: 0.3
  }} onClick={onClick}>
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-100 p-3 rounded-full mr-4">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <Button onClick={onClick} variant="outline" className="w-full">
          <span>Learn More</span>
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </motion.div>;
};
interface ServiceFormProps {
  service: string;
  onClose: () => void;
}
const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name') as string;
    const email = fd.get('email') as string;
    const phone = fd.get('phone') as string;
    const message = fd.get('message') as string;
    const body = encodeURIComponent(
      `Service Request: ${service}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sales@delightfulgroup.africa?subject=Service Request: ${encodeURIComponent(service)}&body=${body}`;
    onClose();
  };
  return <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }}>
      <motion.div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden" initial={{
      scale: 0.9,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} exit={{
      scale: 0.9,
      opacity: 0
    }}>
        <div className="bg-green-600 text-white p-4">
          <h3 className="text-xl font-semibold">Request {service} Service</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder="Your Name" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Your Email" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" name="phone" type="tel" placeholder="Your Phone" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" id="message" name="message" placeholder="Tell us about your requirements"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit">Submit Request</Button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>;
};
const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const openServiceForm = (service: string) => {
    setActiveService(service);
    document.body.style.overflow = 'hidden';
  };
  const closeServiceForm = () => {
    setActiveService(null);
    document.body.style.overflow = 'auto';
  };
  return <div className="min-h-screen">
      <section className="relative py-20 bg-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 text-center" initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            Our Services
          </motion.h1>
          <motion.div className="w-24 h-1 bg-white mx-auto mb-8" initial={{
          opacity: 0,
          scaleX: 0
        }} animate={{
          opacity: 1,
          scaleX: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}></motion.div>
          <motion.p className="text-center max-w-2xl mx-auto text-lg" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.5
        }}>
            Explore our comprehensive range of services designed to enhance your
            living spaces.
          </motion.p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard icon={<Sparkles size={24} className="text-green-600" />} title="Cleaning Services" description="Professional cleaning solutions for residential and commercial properties, ensuring spotless and hygienic environments." image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" onClick={() => openServiceForm('Cleaning')} />
            <ServiceCard icon={<Leaf size={24} className="text-green-600" />} title="Landscaping Services" description="Expert landscaping and garden design services to transform your outdoor spaces into beautiful, functional environments." image="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" onClick={() => openServiceForm('Landscaping')} />
            <ServiceCard icon={<ShoppingBag size={24} className="text-green-600" />} title="Online Shop" description="Quality products for your home and garden needs, available through our convenient online store." image="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" onClick={() => window.location.href = '/shop'} />
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Our Cleaning Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of cleaning services to meet your
              specific needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            title: 'Residential Cleaning',
            description: 'Thorough cleaning services for homes, ensuring a clean and comfortable living environment.'
          }, {
            title: 'Commercial Cleaning',
            description: 'Professional cleaning solutions for offices, retail spaces, and commercial properties.'
          }, {
            title: 'Deep Cleaning',
            description: 'Intensive cleaning services that target hard-to-reach areas and stubborn dirt.'
          }, {
            title: 'Move-In/Move-Out Cleaning',
            description: 'Specialized cleaning services for properties being vacated or occupied.'
          }, {
            title: 'Window Cleaning',
            description: 'Professional window cleaning for crystal clear views and enhanced natural light.'
          }, {
            title: 'Carpet Cleaning',
            description: 'Deep carpet cleaning services to remove stains, dirt, and allergens.'
          }].map((service, index) => <motion.div key={index} className="bg-white p-6 rounded-lg shadow" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} whileHover={{
            y: -5
          }}>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-green-600 font-medium flex items-center hover:text-green-800 transition-colors" onClick={() => openServiceForm('Cleaning')}>
                  Request Service <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>)}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Our Landscaping Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Transform your outdoor spaces with our professional landscaping
              services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            title: 'Garden Design',
            description: 'Creative garden design services tailored to your preferences and property.'
          }, {
            title: 'Lawn Care',
            description: 'Comprehensive lawn maintenance services to keep your grass healthy and beautiful.'
          }, {
            title: 'Plant Installation',
            description: 'Expert plant selection and installation to enhance your landscape.'
          }, {
            title: 'Irrigation Systems',
            description: 'Efficient irrigation system design and installation for optimal water usage.'
          }, {
            title: 'Hardscaping',
            description: 'Quality hardscaping services including patios, walkways, and retaining walls.'
          }, {
            title: 'Landscape Lighting',
            description: 'Enhance the beauty and security of your property with landscape lighting.'
          }].map((service, index) => <motion.div key={index} className="bg-white p-6 rounded-lg shadow" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} whileHover={{
            y: -5
          }}>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-green-600 font-medium flex items-center hover:text-green-800 transition-colors" onClick={() => openServiceForm('Landscaping')}>
                  Request Service <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>)}
          </div>
        </div>
      </section>
      {activeService && <ServiceForm service={activeService} onClose={closeServiceForm} />}
    </div>;
};
export default Services;