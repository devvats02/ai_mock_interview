import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0F] text-white py-10 px-6 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Logo and Tagline */}
        <div>
          <div className="text-2xl font-bold mb-2 text-white">PrepWise</div>
          <p className="text-gray-400">Get interview-ready with AI-powered practice and feedback.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/"><span className="hover:text-purple-400">Home</span></Link></li>
            <li><Link href="/interview"><span className="hover:text-purple-400">My Interviews</span></Link></li>
            <li><Link href="/about"><span className="hover:text-purple-400">About</span></Link></li>
            <li><Link href="/contact"><span className="hover:text-purple-400">Contact</span></Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>
          <ul className="space-y-2">
            <li><a href="https://x.com/?lang=en" className="hover:text-purple-400">Twitter</a></li>
            <li><a href="https://www.linkedin.com/" className="hover:text-purple-400">LinkedIn</a></li>
            <li><a href="https://github.com/" className="hover:text-purple-400">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} PrepWise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
