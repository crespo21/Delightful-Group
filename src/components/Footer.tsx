import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from './ui/Logo';
const Footer: React.FC = () => {
  return <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo isFooter />
            </div>
            <p className="text-gray-400 mb-4">
              DelightfulGroup.africa offers premium cleaning and landscaping
              services, along with quality products for your home and garden
              needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-green-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-green-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-green-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Cleaning Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-green-500 transition-colors">
                  Landscaping
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-green-500 transition-colors">
                  Online Shop
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-green-500" />
                <span className="text-gray-400">
                  61 Andries Street, Rietvallei, Muldersrift, 1739
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-500" />
                <span className="text-gray-400">010 213 4575</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-500" />
                <span className="text-gray-400">
                  sales@delightfulgroup.africa
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DelightfulGroup.africa. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;