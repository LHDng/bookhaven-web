
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bookstore-brown text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8" />
              <span className="ml-2 text-2xl font-serif font-bold">BookHaven</span>
            </Link>
            <p className="mt-4 text-sm opacity-80">
              Your destination for quality books at affordable prices. Discover new worlds through reading.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="hover:text-bookstore-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-bookstore-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-bookstore-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-bookstore-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-sm hover:text-bookstore-gold transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/category/fiction" className="text-sm hover:text-bookstore-gold transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link to="/category/non-fiction" className="text-sm hover:text-bookstore-gold transition-colors">
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-sm hover:text-bookstore-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-sm hover:text-bookstore-gold transition-colors">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-bookstore-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-bookstore-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-bookstore-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm hover:text-bookstore-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-bookstore-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to our newsletter for updates on new releases, exclusive offers, and reading recommendations.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 rounded-l text-gray-800 w-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-bookstore-gold text-bookstore-brown font-medium px-4 py-2 rounded-r hover:bg-opacity-90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-10 pt-6">
          <p className="text-sm text-center opacity-70">
            &copy; {new Date().getFullYear()} BookHaven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
