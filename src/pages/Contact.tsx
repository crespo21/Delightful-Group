import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:sales@delightfulgroup.africa?subject=Contact Form: ${encodeURIComponent(subject || 'Enquiry')}&body=${body}`;
    setSubmitted(true);
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
            Contact Us
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
            Have questions or ready to get started? Reach out to us today.
          </motion.p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                We're here to answer any questions you have about our services
                or products. Fill out the form and we'll get back to you as soon
                as possible.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-gray-600">
                      61 Andries Street, Rietvallei, Muldersrift, 1739
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Phone size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone & WhatsApp</h3>
                    <p className="text-gray-600">010 213 4575</p>
                    <p className="text-gray-600">063 335 5126 (WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Mail size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">
                      sales@delightfulgroup.africa
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Clock size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{
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
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h3>
                {submitted ? (
                  <div className="text-center py-8">
                    <p className="text-green-600 font-semibold text-lg">Thank you! Your message is ready to send.</p>
                    <p className="text-gray-500 mt-2 text-sm">Your email client should have opened. If not, please email us directly at sales@delightfulgroup.africa</p>
                    <button className="mt-4 text-green-600 underline text-sm" onClick={() => setSubmitted(false)}>Send another message</button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="phone" type="tel" placeholder="Your Phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                      Subject
                    </label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="subject" value={formData.subject} onChange={handleChange}>
                      <option value="">Select a subject</option>
                      <option value="cleaning">Cleaning Services</option>
                      <option value="landscaping">Landscaping Services</option>
                      <option value="shop">Product Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 h-32" id="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button type="submit">Send Message</Button>
                  </div>
                </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.0380067382!2d27.929413!3d-26.098765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9574c7f8f6f0d3%3A0x5c1c8c86c5f5b9a!2s61%20Andries%20St%2C%20Rietvallei%2C%20Krugersdorp%2C%201739!5e0!3m2!1sen!2sza!4v1623432789012!5m2!1sen!2sza" width="100%" height="450" style={{
            border: 0
          }} allowFullScreen={true} loading="lazy" title="DelightfulGroup.africa location"></iframe>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;