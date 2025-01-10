import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../Logo';
import ContributorsLink from '../contributors/contributorsLink';

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
    <footer className="relative bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Empowering developers and tech enthusiasts with the latest insights and knowledge.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md 
                border border-black dark:border-gray-700 
                group-hover:shadow-lg transition-all duration-300 
                transform group-hover:-translate-y-1">
                  <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-400 
                  group-hover:text-[#1876f2] transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md 
                border border-black dark:border-gray-700 
                group-hover:shadow-lg transition-all duration-300 
                transform group-hover:-translate-y-1">
                  <Twitter className="w-5 h-5 text-gray-600 dark:text-gray-400 
                  group-hover:text-[#1876f2] transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md 
                border border-black dark:border-gray-700 
                group-hover:shadow-lg transition-all duration-300 
                transform group-hover:-translate-y-1">
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 
                  group-hover:text-[#1876f2] transition-colors duration-300" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md 
                border border-black dark:border-gray-700 
                group-hover:shadow-lg transition-all duration-300 
                transform group-hover:-translate-y-1">
                  <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 
                  group-hover:text-[#1876f2] transition-colors duration-300" />
                </div>
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold dark:text-gray-200 transition-colors duration-300">Contributors</h3>
              <ContributorsLink />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold dark:text-gray-200 transition-colors duration-300">Company</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Affiliate Program'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center text-gray-600 dark:text-gray-400 
                    hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 
                    opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold dark:text-gray-200 transition-colors duration-300">
              Support
            </h3>
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
            <h3 className="text-lg font-bold dark:text-gray-200 transition-colors duration-300">
              Contact Info
            </h3>
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
            <div className="w-full border-t border-gray-300 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 px-4 dark:from-gray-800">
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
    </footer>
  );
};

export default Footer;