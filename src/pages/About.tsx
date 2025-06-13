import React from 'react';
import { motion } from 'framer-motion';
import Scene from '../components/ThreeD/Scene';
const About: React.FC = () => {
  return <div className="min-h-screen">
      <section className="relative py-20 bg-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Scene />
        </div>
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
            About DelightfulGroup.africa
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }}>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                DelightfulGroup.africa was founded with a vision to provide
                exceptional cleaning and landscaping services, along with
                quality products for homes and gardens across Africa.
              </p>
              <p className="text-gray-600 mb-4">
                Our journey began with a small team passionate about creating
                beautiful spaces. Today, we've grown into a trusted provider of
                comprehensive services that enhance living environments.
              </p>
              <p className="text-gray-600">
                We take pride in our commitment to excellence, sustainable
                practices, and customer satisfaction. Every project we undertake
                reflects our dedication to transforming spaces into delightful
                environments.
              </p>
            </motion.div>
            <motion.div className="relative h-96 rounded-lg overflow-hidden shadow-xl" initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }}>
              <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" alt="Beautiful landscape" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
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
            <h2 className="text-3xl font-bold mb-2">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At DelightfulGroup.africa, we are guided by core values that shape
              our approach to every service we provide.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Excellence',
            description: 'We strive for excellence in every aspect of our work, ensuring the highest quality in our services and products.'
          }, {
            title: 'Integrity',
            description: 'We conduct our business with honesty and transparency, building trust with our clients and partners.'
          }, {
            title: 'Sustainability',
            description: 'We are committed to environmentally responsible practices that preserve and enhance natural beauty.'
          }].map((value, index) => <motion.div key={index} className="bg-white rounded-lg p-6 shadow-md" initial={{
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
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
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
            <h2 className="text-3xl font-bold mb-2">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a comprehensive range of services designed to meet all
              your cleaning, landscaping, and product needs.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="bg-cover bg-center h-80 rounded-lg overflow-hidden relative shadow-lg" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
          }} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} whileHover={{
            scale: 1.03
          }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  Cleaning Services
                </h3>
                <p className="text-gray-200">
                  Professional cleaning solutions for homes and businesses.
                </p>
              </div>
            </motion.div>
            <motion.div className="bg-cover bg-center h-80 rounded-lg overflow-hidden relative shadow-lg" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
          }} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.1
          }} viewport={{
            once: true
          }} whileHover={{
            scale: 1.03
          }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  Landscaping
                </h3>
                <p className="text-gray-200">
                  Expert garden design and maintenance services.
                </p>
              </div>
            </motion.div>
            <motion.div className="bg-cover bg-center h-80 rounded-lg overflow-hidden relative shadow-lg" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
          }} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} viewport={{
            once: true
          }} whileHover={{
            scale: 1.03
          }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-2">
                  Product Shop
                </h3>
                <p className="text-gray-200">
                  Quality products for your home and garden needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;