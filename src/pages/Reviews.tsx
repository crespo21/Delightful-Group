import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf, Send } from 'lucide-react';
import Button from '../components/ui/Button';
interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
  service: string;
}
const reviews: Review[] = [{
  id: 1,
  name: 'John Smith',
  rating: 5,
  date: '2023-05-15',
  comment: 'DelightfulGroup transformed my garden completely! Their landscaping team was professional, creative, and delivered beyond my expectations. I highly recommend their services.',
  service: 'Landscaping'
}, {
  id: 2,
  name: 'Sarah Johnson',
  rating: 4.5,
  date: '2023-06-22',
  comment: "I've been using their cleaning services for my office for over a year now, and they consistently deliver excellent results. The team is always punctual and thorough.",
  service: 'Cleaning'
}, {
  id: 3,
  name: 'Michael Brown',
  rating: 5,
  date: '2023-07-10',
  comment: "The quality of products from their online shop is outstanding. I purchased several garden tools and they're durable and well-designed. Fast shipping too!",
  service: 'Shop'
}, {
  id: 4,
  name: 'Emily Davis',
  rating: 4,
  date: '2023-08-05',
  comment: 'Their cleaning team did a wonderful job with our post-renovation cleanup. They were detailed and efficient. The only reason for 4 stars is that they arrived a bit late.',
  service: 'Cleaning'
}, {
  id: 5,
  name: 'Robert Wilson',
  rating: 5,
  date: '2023-09-18',
  comment: 'The landscaping design they created for our backyard is simply stunning. They listened to our needs and incorporated all our ideas while adding their expert touch.',
  service: 'Landscaping'
}];
const ReviewCard: React.FC<{
  review: Review;
}> = ({
  review
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={18} className="text-yellow-500 fill-yellow-500" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={18} className="text-yellow-500 fill-yellow-500" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={18} className="text-gray-300" />);
    }
    return stars;
  };
  return <motion.div className="bg-white rounded-lg shadow-md p-6" initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} viewport={{
    once: true
  }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{review.name}</h3>
          <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {review.service}
        </span>
      </div>
      <div className="flex mb-3">{renderStars(review.rating)}</div>
      <p className="text-gray-600">{review.comment}</p>
    </motion.div>;
};
const Reviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const filteredReviews = activeFilter ? reviews.filter(review => review.service === activeFilter) : reviews;
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
            Customer Reviews
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
            See what our customers have to say about our services and products.
          </motion.p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === null ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveFilter(null)}>
                All Reviews
              </button>
              <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'Cleaning' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveFilter('Cleaning')}>
                Cleaning
              </button>
              <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'Landscaping' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveFilter('Landscaping')}>
                Landscaping
              </button>
              <button className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === 'Shop' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`} onClick={() => setActiveFilter('Shop')}>
                Shop
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Leave a Review</h2>
              <p className="text-gray-600">
                We value your feedback! Share your experience with our services
                or products.
              </p>
            </div>
            <form className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="name" type="text" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="email" type="email" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Service Used
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-green-600" name="service" value="Cleaning" />
                    <span className="ml-2">Cleaning</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-green-600" name="service" value="Landscaping" />
                    <span className="ml-2">Landscaping</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-green-600" name="service" value="Shop" />
                    <span className="ml-2">Shop</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map(star => <button key={star} type="button" className="focus:outline-none">
                      <Star size={24} className="text-gray-300 hover:text-yellow-500" />
                    </button>)}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                  Your Review
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 h-32" id="comment" placeholder="Share your experience with us..."></textarea>
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit" className="flex items-center">
                  <Send size={18} className="mr-2" />
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>;
};
export default Reviews;