import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
const Gallery: React.FC = () => {
  useEffect(() => {
    // In a real implementation, this would redirect to the social media page
    // window.location.href = "https://www.instagram.com/delightfulgroup.africa";
  }, []);
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
            Our Gallery
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
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h2 className="text-3xl font-bold mb-6">
                Visit Our Social Media
              </h2>
              <p className="text-gray-600 mb-8">
                Check out our complete project gallery on our social media
                pages, where we regularly share our latest work and
                transformations.
              </p>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                <ExternalLink size={20} className="mr-2" />
                Visit Our Instagram
              </a>
            </motion.div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
              {['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', 'https://images.unsplash.com/photo-1585421514284-efb74320d624?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'].map((image, index) => <motion.div key={index} className="overflow-hidden rounded-lg" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }} whileHover={{
              scale: 1.05
            }}>
                  <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-48 object-cover" />
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Gallery;