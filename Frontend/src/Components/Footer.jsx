import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#111313] border-t border-gray-800 mt-auto shadow-inner-dark"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm"> 
          &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">TravelAI</span>. All rights reserved.
        </p>
        
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a
            href="#privacy"
            className="text-gray-400 hover:text-yellow-400 transition text-sm" 
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            className="text-gray-400 hover:text-yellow-400 transition text-sm" 
          >
            Terms of Service
          </a>
          <a
            href="#contact"
            className="text-gray-400 hover:text-yellow-400 transition text-sm" 
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;