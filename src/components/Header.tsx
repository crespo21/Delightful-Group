import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';
import Logo from './ui/Logo';
import TopBar from './TopBar';
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  const navLinks = [{
    name: 'HOME',
    path: '/'
  }, {
    name: 'ABOUT',
    path: '/about'
  }, {
    name: 'SERVICES',
    path: '/services'
  }, {
    name: 'SHOP',
    path: '/shop'
  }, {
    name: 'REVIEWS',
    path: '/reviews'
  }, {
    name: 'GALLERY',
    path: '/gallery'
  }, {
    name: 'CONTACT US',
    path: '/contact'
  }];
  return <>
      <TopBar />
      <header className={`w-full bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md sticky top-0' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <Link key={link.name} to={link.path} className={`text-gray-800 hover:text-green-600 font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-green-600' : ''}`}>
                {link.name}
              </Link>)}
          </nav>
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col py-4">
              {navLinks.map(link => <Link key={link.name} to={link.path} className={`px-6 py-3 text-gray-800 hover:bg-green-50 hover:text-green-600 transition-colors duration-300 ${location.pathname === link.path ? 'text-green-600 bg-green-50' : ''}`}>
                  {link.name}
                </Link>)}
            </nav>
          </div>}
      </header>
    </>;
};
export default Header;