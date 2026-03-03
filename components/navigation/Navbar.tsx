'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiSparkles } from 'react-icons/hi2';

// YEN Logo Component
const YENLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Y letter with sparkle */}
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="white">
          {/* Y shape */}
          <path d="M12 8 L20 20 L28 8 L24 8 L20 14 L16 8 Z" />
          <rect x="18" y="20" width="4" height="12" />
        </svg>
        {/* Sparkle accent */}
        <HiSparkles className="absolute -top-1 -right-1 w-3 h-3 text-teal-300" />
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="transform group-hover:scale-110 transition-transform duration-300">
              <YENLogo />
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-300 ${
                isScrolled
                  ? 'text-slate-800'
                  : 'text-white'
              }`}
            >
              YEN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
             <Link
              href="/"
              className={`font-medium transition-colors duration-300 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              Home
            </Link>

            
            <Link
              href="/ideas"
              className={`font-medium transition-colors duration-300 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              Explore Ideas
            </Link>
            <Link
              href="/mentors"
              className={`font-medium transition-colors duration-300 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              Find Mentor
            </Link>
            <Link
              href="/dashboard"
              className={`font-medium transition-colors duration-300 hover:text-teal-500 ${
                isScrolled ? 'text-slate-600' : 'text-white'
              }`}
            >
              Dashboard
            </Link>
            <Link href="/login">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:-translate-y-0.5 transition-all duration-300">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? 'text-slate-800 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fade-in">
            <Link
              href="/ideas"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore Ideas
            </Link>
            <Link
              href="/mentors"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Find Mentor
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
}