import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../Logo';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600">
              Empowering developers and tech enthusiasts with the latest insights and knowledge.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-black group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <Facebook className="w-5 h-5 text-gray-600 group-hover:text-[#1876f2] " />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-black group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <Twitter className="w-5 h-5 text-gray-600 group-hover:text-[#0F1419]" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-black group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-[#0077B5]" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white p-2 rounded-lg shadow-md border border-black group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <Instagram className="w-5 h-5 text-gray-600 group-hover:text-[#E1306C]" />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Affiliate Program'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Support</h3>
            <ul className="space-y-4">
              {['Account', 'Help', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>123 Tech Street, Digital City</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>support@techieblog.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with Animation */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 px-4">
              <Logo className="h-8 w-auto" />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8">
          <p className="text-center text-gray-600">
            © Copyright {new Date().getFullYear()}. All Rights Reserved by TechieBlog.
          </p>
        </div>
      </div>

      {/* Enhanced Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
};

export default Footer;