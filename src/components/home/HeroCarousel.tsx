import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}
const slides: Slide[] = [{
  id: 1,
  title: 'Professional Cleaning Services',
  description: 'Transform your space with our expert cleaning solutions, tailored to your needs.',
  image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  ctaText: 'Book Now',
  ctaLink: '/services'
}, {
  id: 2,
  title: 'Expert Landscaping',
  description: 'Create the garden of your dreams with our professional landscaping services.',
  image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  ctaText: 'Explore Services',
  ctaLink: '/services'
}, {
  id: 3,
  title: 'Quality Garden Products',
  description: 'Shop our curated selection of premium products for your home and garden.',
  image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  ctaText: 'Shop Now',
  ctaLink: '/shop'
}];
const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  }, []);
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  }, []);
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  return <div className="relative h-[600px] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div key={currentSlide} className="absolute inset-0" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 1
      }}>
          <div className="h-full w-full bg-cover bg-center" style={{
          backgroundImage: `url(${slides[currentSlide].image})`
        }}>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.2,
              duration: 0.8
            }}>
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-white mb-8 max-w-2xl" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4,
              duration: 0.8
            }}>
                {slides[currentSlide].description}
              </motion.p>
              <motion.div initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.6,
              duration: 0.8
            }}>
                <Button href={slides[currentSlide].ctaLink} size="lg">
                  {slides[currentSlide].ctaText}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all duration-300" onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => <button key={index} className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} />)}
      </div>
    </div>;
};
export default HeroCarousel;