import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import ServiceHighlight from '../components/home/ServiceHighlight';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Scene from '../components/ThreeD/Scene';
import { motion } from 'framer-motion';
const Home: React.FC = () => {
  return <div className="min-h-screen">
      <HeroCarousel />
      <ServiceHighlight />
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Scene />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl font-bold mb-2">
              Why Choose DelightfulGroup.africa
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional services and products
              that enhance your living spaces.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Professional Excellence',
            description: 'Our team of experts ensures the highest quality in every project we undertake.'
          }, {
            title: 'Customer Satisfaction',
            description: 'We prioritize your needs and work diligently to exceed your expectations.'
          }, {
            title: 'Sustainable Practices',
            description: 'We are committed to environmentally friendly methods and products.'
          }].map((item, index) => <motion.div key={index} className="bg-gray-50 rounded-lg p-6 text-center" initial={{
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
          }}>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>
      <FeaturedProducts />
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">
                Ready to Transform Your Space?
              </h2>
              <p className="text-green-100">
                Contact us today for a consultation or quote.
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.button className="bg-white text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition-colors" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                Get a Quote
              </motion.button>
              <motion.button className="bg-transparent border-2 border-white text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;