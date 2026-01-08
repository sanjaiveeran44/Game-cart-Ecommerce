import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Facebook', icon: assets.facebook_icon, href: '#' },
    { name: 'Twitter', icon: assets.twitter_icon, href: '#' },
    { name: 'Instagram', icon: assets.instagram_icon, href: '#' },
  ];

  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-6 md:px-10 py-6 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
      {/* Left Side - Logo and Copyright */}
      <div className="flex items-center gap-4">
        <Image 
          className="hidden md:block w-24 hover:opacity-80 transition-opacity duration-200 cursor-pointer" 
          src={assets.logo} 
          alt="QuickCart Logo" 
        />
        <div className="hidden md:block h-7 w-px bg-gray-300"></div>
        <div className="text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-600">
            Copyright {currentYear} © greatstack.dev All Rights Reserved.
          </p>
          <p className="text-xs text-gray-500 mt-1">Seller Dashboard v1.0</p>
        </div>
      </div>

      {/* Right Side - Social Links */}
      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-gray-600 mr-2">Follow us:</span>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.href} 
              className="group relative p-2 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 hover:shadow-md"
              aria-label={social.name}
            >
              <Image 
                src={social.icon} 
                alt={social.name}
                className="w-5 h-5 filter brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-300" 
              />
              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {social.name}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Only - Centered Info */}
      <div className="md:hidden text-center mt-4">
        <p className="text-xs text-gray-500">
          Made with ❤️ by greatstack.dev
        </p>
      </div>
    </div>
  );
};

export default Footer;