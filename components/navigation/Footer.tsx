'use client';

import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

// YEN Logo Component
const YENLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-lg"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Y letter with sparkle */}
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="white">
          {/* Y shape */}
          <path d="M12 8 L20 20 L28 8 L24 8 L20 14 L16 8 Z" />
          <rect x="18" y="20" width="4" height="12" />
        </svg>
        {/* Sparkle accent */}
        <HiSparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-200" />
      </div>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <YENLogo />
              <span className="text-2xl font-bold">YEN</span>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Empowering young entrepreneurs to transform ideas into sustainable businesses.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-teal-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ideas" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Explore Ideas
                </Link>
              </li>
              <li>
                <Link href="/find-mentor" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Find Mentor
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/invest" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Invest
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-teal-300">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-blue-200 hover:text-teal-300 transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">
              © 2026 Youth Entrepreneur Network. All rights reserved.
            </p>
            <p className="text-blue-200 text-sm">
              Stop job seeking, start job creating.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}