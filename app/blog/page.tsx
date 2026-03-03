'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiBookOpen,
  HiTag,
  HiClock,
  HiArrowRight,
  HiMagnifyingGlass,
  HiSparkles,
  HiCheckBadge,
  HiFire,
  HiLightBulb,
  HiCurrencyDollar,
  HiUserGroup,
  HiRocketLaunch,
  HiGlobeAlt,
} from 'react-icons/hi2';

const CATEGORIES = [
  { id: 'all',         label: 'All',              icon: HiBookOpen     },
  { id: 'funding',     label: 'Funding',          icon: HiCurrencyDollar },
  { id: 'mindset',     label: 'Mindset',          icon: HiLightBulb    },
  { id: 'networking',  label: 'Networking',       icon: HiUserGroup    },
  { id: 'pitching',    label: 'Pitching',         icon: HiRocketLaunch },
  { id: 'growth',      label: 'Growth',           icon: HiGlobeAlt     },
];

const ARTICLES = [
  {
    id: '1',
    title: 'How to Write a Pitch That Investors Can\'t Ignore',
    excerpt: 'Most young entrepreneurs underestimate the power of storytelling in a pitch. Here\'s a proven 5-part framework that\'s helped 200+ YEN founders secure funding.',
    category: 'pitching',
    author: 'Amara Diallo',
    authorRole: 'CEO, YEN',
    date: 'Feb 12, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=90&auto=format&fit=crop',
    featured: true,
    tags: ['Pitching', 'Investors', 'Storytelling'],
  },
  {
    id: '2',
    title: 'Angel vs. VC Funding: What\'s Right for Your Stage?',
    excerpt: 'Understanding the difference between angel investors and venture capital can save you months of wasted meetings. Here\'s the honest breakdown.',
    category: 'funding',
    author: 'Priya Sharma',
    authorRole: 'Head of Investor Relations',
    date: 'Jan 28, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90&auto=format&fit=crop',
    featured: false,
    tags: ['Funding', 'Angel', 'VC'],
  },
  {
    id: '3',
    title: 'The Mentorship Advantage: How to Get the Most From Your Mentor',
    excerpt: 'Having a mentor is one thing. Building a productive mentorship relationship is another. Five habits that separate thriving mentees from passive ones.',
    category: 'networking',
    author: 'Luca Rossi',
    authorRole: 'Head of Community',
    date: 'Jan 14, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=90&auto=format&fit=crop',
    featured: false,
    tags: ['Mentorship', 'Networking'],
  },
  {
    id: '4',
    title: 'Failure Is Data: Reframing Setbacks as Strategic Insights',
    excerpt: 'Every failed pivot, rejected investor, and missed deadline is a lesson wrapped in frustration. Here\'s how to extract the signal from the noise.',
    category: 'mindset',
    author: 'Kwame Asante',
    authorRole: 'CTO, YEN',
    date: 'Dec 30, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=90&auto=format&fit=crop',
    featured: false,
    tags: ['Mindset', 'Resilience'],
  },
  {
    id: '5',
    title: 'From 0 to 10,000 Users: A YEN Entrepreneur\'s Growth Playbook',
    excerpt: 'Tariq Malik grew EduReach from a classroom experiment to 10,000 rural students in 12 months. He shares every growth tactic that worked — and the ones that didn\'t.',
    category: 'growth',
    author: 'Tariq Malik',
    authorRole: 'Founder, EduReach',
    date: 'Dec 12, 2024',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=90&auto=format&fit=crop',
    featured: false,
    tags: ['Growth', 'Case Study', 'EdTech'],
  },
  {
    id: '6',
    title: 'Networking Without Feeling Fake: Building Real Relationships',
    excerpt: 'Transactional networking puts people off. Here\'s how to show up authentically at events, online, and in your YEN connections so people actually want to help you.',
    category: 'networking',
    author: 'Lindiwe Nkosi',
    authorRole: 'Entrepreneur & YEN Alumni',
    date: 'Nov 25, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=90&auto=format&fit=crop',
    featured: false,
    tags: ['Networking', 'Community'],
  },
];

const CATEGORY_TAG_COLOR: Record<string, string> = {
  pitching:    'bg-blue-50   text-blue-600',
  funding:     'bg-teal-50   text-teal-600',
  networking:  'bg-cyan-50   text-cyan-600',
  mindset:     'bg-purple-50 text-purple-600',
  growth:      'bg-green-50  text-green-600',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const featured = ARTICLES.find(a => a.featured)!;
  const filtered = ARTICLES.filter(a => !a.featured)
    .filter(a => activeCategory === 'all' || a.category === activeCategory)
    .filter(a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-32 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiSparkles className="w-4 h-4 text-teal-300" />
            YEN Knowledge Hub
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Fuel Your{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Entrepreneurial Mind
            </span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            Practical guides, founder stories, and expert advice to help you pitch, raise, grow, and win.
          </p>
          <div className="relative max-w-md mx-auto">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white text-slate-700 placeholder-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,50L60,55C120,60,240,70,360,68C480,65,600,48,720,44C840,40,960,48,1080,52C1200,56,1320,50,1380,46L1440,42L1440,100H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Featured article ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-10 mb-14">
        <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                <HiFire className="w-3.5 h-3.5" />
                Featured
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${CATEGORY_TAG_COLOR[featured.category] ?? 'bg-slate-100 text-slate-600'}`}>
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <HiClock className="w-3.5 h-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-snug group-hover:text-teal-700 transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {featured.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      {featured.author}
                      <HiCheckBadge className="w-3.5 h-3.5 text-teal-500" />
                    </div>
                    <div className="text-xs text-slate-400">{featured.date}</div>
                  </div>
                </div>
                <Link
                  href={`/blog/${featured.id}`}
                  className="flex items-center gap-1.5 text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors"
                >
                  Read More <HiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30 px-6">
        <div className="max-w-7xl mx-auto py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Articles grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-14 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <HiBookOpen className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <p className="text-xl font-semibold text-slate-700 mb-2">No articles found</p>
            <p className="text-slate-400">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize bg-white/90 backdrop-blur-sm ${CATEGORY_TAG_COLOR[article.category] ?? 'text-slate-600'}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <HiClock className="w-3.5 h-3.5" />
                    {article.readTime}
                    <span className="text-slate-200">•</span>
                    {article.date}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        <HiTag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-700">{article.author}</div>
                        <div className="text-xs text-slate-400">{article.authorRole}</div>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${article.id}`}
                      className="flex items-center gap-1 text-teal-600 text-xs font-semibold hover:text-teal-700 transition-colors"
                    >
                      Read <HiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-10 md:p-14 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-2xl mx-auto text-center">
            <HiBookOpen className="w-10 h-10 text-teal-300 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Never Miss an Article</h2>
            <p className="text-blue-100 mb-8">
              Get the best entrepreneurship guides, funding tips, and success stories delivered to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-teal-300 transition-all"
              />
              <button className="px-6 py-3.5 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .animate-blob{animation:blob 7s infinite}
        .animation-delay-2000{animation-delay:2s}
        .animate-fade-in{animation:fade-in 0.8s ease-out}
        .animate-slide-up{animation:slide-up 0.6s ease-out backwards}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .scrollbar-none{scrollbar-width:none}
        .scrollbar-none::-webkit-scrollbar{display:none}
      `}</style>
    </div>
  );
}