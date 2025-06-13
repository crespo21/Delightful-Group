import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
const TopBar: React.FC = () => {
  return <div className="w-full bg-green-600 text-white py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-6 mb-2 md:mb-0">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">
              61 Andries Street, Rietvallei, Muldersrift, 1739
            </span>
          </div>
          <div className="hidden md:flex items-center">
            <Phone size={16} className="mr-1" />
            <span className="text-sm">010 213 4575</span>
          </div>
          <div className="hidden md:flex items-center">
            <Mail size={16} className="mr-1" />
            <span className="text-sm">sales@delightfulgroup.africa</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" aria-label="Facebook" className="hover:text-green-200 transition-colors">
            <Facebook size={18} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-green-200 transition-colors">
            <Twitter size={18} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-green-200 transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-green-200 transition-colors">
            <Youtube size={18} />
          </a>
        </div>
      </div>
    </div>;
};
export default TopBar;