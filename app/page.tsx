'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { HiUsers, HiCurrencyDollar, HiAcademicCap } from 'react-icons/hi2';

export default function Home() {
  const [email, setEmail] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for your interest! We'll contact you at ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section - Enhanced with visual appeal */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center md:text-left space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Transform Your Ideas Into{' '}
                <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Sustainable Businesses
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                Youth Entrepreneur Network empowers young innovators to connect with
                investors, mentors, and partners. Stop job seeking, start job creating.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/register">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <span className="relative z-10">Join as Entrepreneur</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-cyan-300 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <Link href="/ideas">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
                    Explore Ideas
                  </button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-delay">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=90&auto=format&fit=crop"
                  alt="Young entrepreneurs collaborating"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-400/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#f8fafc"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Statistics - Redesigned with cards and React Icons */}
      <section className="py-16 md:py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                number: '10,000+', 
                label: 'Young Entrepreneurs', 
                color: 'from-blue-500 to-blue-600', 
                icon: HiUsers,
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-600'
              },
              { 
                number: '$5M+', 
                label: 'Funding Secured', 
                color: 'from-teal-500 to-teal-600', 
                icon: HiCurrencyDollar,
                bgColor: 'bg-teal-100',
                iconColor: 'text-teal-600'
              },
              { 
                number: '500+', 
                label: 'Active Mentors', 
                color: 'from-cyan-500 to-cyan-600', 
                icon: HiAcademicCap,
                bgColor: 'bg-cyan-100',
                iconColor: 'text-cyan-600'
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color} rounded-l-2xl`}></div>
                  <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${stat.iconColor}`} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced visual design with better images */}
      <section className="py-16 md:py-24 px-6 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
              How YEN Works
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Three simple steps to launch your entrepreneurial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: 'Pitch Your Idea',
                description: 'Share your innovative business concept with our global community of investors and mentors.',
                image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=90&auto=format&fit=crop',
                color: 'from-blue-500 to-blue-600',
              },
              {
                step: 2,
                title: 'Connect & Collaborate',
                description: 'Network with experienced mentors, potential investors, and like-minded entrepreneurs.',
                image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=90&auto=format&fit=crop',
                color: 'from-teal-500 to-teal-600',
              },
              {
                step: 3,
                title: 'Launch & Grow',
                description: 'Access funding, resources, and guidance to turn your vision into a thriving business.',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90&auto=format&fit=crop',
                color: 'from-cyan-500 to-cyan-600',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60`}></div>
                    {/* Step number */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className={`text-2xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className={`h-1 bg-gradient-to-r ${item.color}`}></div>
                </div>

                {/* Connecting line (hidden on mobile) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-24 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-300 to-teal-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Success Stories
            </h2>
            <p className="text-slate-600 text-lg">
              Real entrepreneurs, real impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "YEN connected me with investors who believed in my vision. Now my eco-friendly packaging startup serves 200+ businesses.",
                name: "Sarah M.",
                role: "Founder, EcoPack Solutions",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=90&auto=format&fit=crop&faces=1",
              },
              {
                quote: "The mentorship I received was invaluable. From idea to launch in just 6 months!",
                name: "James K.",
                role: "CEO, AgriTech Innovations",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90&auto=format&fit=crop&faces=1",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-teal-100"
                  />
                  <div className="flex-1">
                    <p className="text-slate-700 italic mb-4 text-lg">"{story.quote}"</p>
                    <div>
                      <div className="font-bold text-blue-600">{story.name}</div>
                      <div className="text-slate-500 text-sm">{story.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="relative py-16 md:py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ready to Start Your Entrepreneurial Journey?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of young innovators turning their dreams into reality
          </p>
          <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-in-delay">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-teal-300 focus:bg-white/20 transition-all duration-300"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Early Access
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s backwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}