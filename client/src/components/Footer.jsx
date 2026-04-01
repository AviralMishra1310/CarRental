import React from 'react';
import { assets } from '../assets/assets.js';
import { motion } from 'framer-motion';

const Footer = () => {
  const sections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Browse Cars', 'List Your Cars', 'About Us'],
    },
    {
      title: 'Resources',
      links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Insurance'],
    },
    {
      title: 'Contact',
      links: [
        '1234 Luxury Drive',
        'San Francisco, CA 94107',
        '+1 234567890',
        'info@example.com',
      ],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor border-b"
      >
        {/* Logo & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <img src={assets.logo} alt="logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles to suit your needs.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={assets.facebook_logo}
                className="w-5 h-5"
                alt="facebook"
              />
            </a>
            <a href="#">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={assets.instagram_logo}
                className="w-5 h-5"
                alt="instagram"
              />
            </a>
            <a href="#">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={assets.twitter_logo}
                className="w-5 h-5"
                alt="twitter"
              />
            </a>
            <a href="#">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={assets.gmail_logo}
                className="w-5 h-5"
                alt="gmail"
              />
            </a>
          </div>
        </motion.div>

        {/* Footer Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-medium text-gray-800 uppercase">
              {section.title}
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <motion.hr
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="border-gray-300 mt-8 origin-left"
      />

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>
          © {new Date().getFullYear()}{' '}
          <a href="https://prebuiltui.com" className="text-primary hover:underline">
            Brand
          </a>
          . All rights reserved.
        </p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Footer;
