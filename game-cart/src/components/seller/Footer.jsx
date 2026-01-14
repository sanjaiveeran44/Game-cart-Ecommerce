import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiExternalLink, FiShield, FiClock, FiStar } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Facebook', icon: assets.facebook_icon, href: '#' },
    { name: 'Twitter', icon: assets.twitter_icon, href: '#' },
    { name: 'Instagram', icon: assets.instagram_icon, href: '#' },
    { name: 'GitHub', icon: '/github-mark.svg', href: 'https://github.com' },
  ];

  const quickLinks = [
    { name: 'Documentation', icon: FiExternalLink, href: '/docs' },
    { name: 'API Status', icon: FiExternalLink, href: '/api-status' },
    { name: 'Support', icon: FiMail, href: 'mailto:support@gamecart.com' },
  ];

  const features = [
    { name: 'Secure Payments', icon: FiShield },
    { name: '24/7 Support', icon: FiClock },
    { name: 'Top Rated', icon: FiStar },
  ];

  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between w-full px-6 md:px-10 py-6 bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
      {/* Left Side - Logo and Copyright */}
      <div className="flex items-center gap-4">
        <Image 
          className="hidden md:block w-24 hover:opacity-80 transition-opacity duration-200 cursor-pointer" 
          src={assets.logo} 
          alt="GameCart Logo" 
        />
        <div className="hidden md:block h-7 w-px bg-gray-300"></div>
        <div className="text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-600">
            Copyright {currentYear} © greatstack.dev All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <FiMapPin className="w-3 h-3" />
            <span>Built with ❤️ in India</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-1 text-xs text-gray-500">
                <feature.icon className="w-3 h-3" />
                <span className="hidden sm:inline">{feature.name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-indigo-600 font-medium mt-2">Seller Dashboard v2.1</p>
        </div>
      </div>

      {/* Right Side - Social Links */}
      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-gray-600 mr-2">Connect:</span>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.href} 
              className="group relative p-2 rounded-full bg-gray-100 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 hover:shadow-md hover:scale-110"
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image 
                src={social.icon} 
                alt={social.name}
                className="w-5 h-5 filter brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-300" 
              />
              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                {social.name}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Only - Quick Links */}
      <div className="md:hidden text-center mt-6">
        <p className="text-xs text-gray-500 mb-3">Quick Links:</p>
        <div className="flex flex-col gap-2">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-2 text-xs text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-1 text-xs text-gray-500">
              <feature.icon className="w-3 h-3" />
              <span>{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;