'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import IdeaCard from '@/components/ideas/IdeaCard';
import { useIdeas } from '@/hooks/useIdeas';
import {
  HiLightBulb,
  HiMagnifyingGlass,
  HiPlusCircle,
  HiCheckBadge,
  HiFire,
  HiArrowTrendingUp,
  HiClock,
} from 'react-icons/hi2';

const CATEGORIES = ['all', 'Technology', 'Agriculture', 'Healthcare', 'Education', 'Finance', 'E-commerce', 'Sustainability'];

const CATEGORY_ICONS: Record<string, string> = {
  all: '🌐',
  Technology: '💻',
  Agriculture: '🌱',
  Healthcare: '🏥',
  Education: '🎓',
  Finance: '💳',
  'E-commerce': '🛒',
  Sustainability: '♻️',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest', icon: HiClock },
  { value: 'popular', label: 'Most Liked', icon: HiFire },
  { value: 'trending', label: 'Trending', icon: HiArrowTrendingUp },
];

export default function Ideas() {
  const { ideas, loading, likeIdea } = useIdeas();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');

  const filteredIdeas = ideas
    .filter(idea => filter === 'all' || idea.category === filter)
    .filter(idea =>
      idea.title?.toLowerCase().includes(search.toLowerCase()) ||
      idea.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'popular') return (b.likes ?? 0) - (a.likes ?? 0);
      return 0; // default: keep API order (newest)
    });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-300 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <HiCheckBadge className="w-4 h-4 text-teal-300" />
            {ideas.length}+ Ideas from Young Entrepreneurs
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Explore{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Business Ideas
            </span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover innovative ideas from young entrepreneurs worldwide and connect with the ones that inspire you
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ideas by title or keyword…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white text-slate-700 placeholder-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
            />
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L48,45C96,50,192,60,288,58C384,55,480,38,576,34C672,30,768,38,864,42C960,46,1056,46,1152,42C1248,38,1344,30,1392,26L1440,22L1440,80H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Filters + Sort bar ── */}
      <section className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30 px-6">
        <div className="max-w-7xl mx-auto py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category chips */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Sort + result count */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-sm text-slate-400">
              {filteredIdeas.length} idea{filteredIdeas.length !== 1 ? 's' : ''}
            </span>
            <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSort(opt.value)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    sort === opt.value
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <opt.icon className="w-3.5 h-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ideas Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
                <div className="flex gap-2 mb-4">
                  <div className="h-5 w-16 bg-slate-200 rounded-full" />
                  <div className="h-5 w-12 bg-slate-200 rounded-full" />
                </div>
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-slate-200 rounded" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                  <div className="h-3 bg-slate-200 rounded w-4/6" />
                </div>
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredIdeas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiLightBulb className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-2">
              {search
                ? `No ideas match "${search}"`
                : `No ideas in ${filter === 'all' ? 'this category' : filter} yet`}
            </p>
            <p className="text-slate-400 mb-6">Be the first to pitch an idea in this space!</p>
            <Link
              href="/pitch"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <HiPlusCircle className="w-5 h-5" />
              Pitch Your Idea
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} onLike={likeIdea} />
            ))}
          </div>
        )}
      </section>

      {/* ── Pitch CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-10 md:p-14 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Have a Business Idea?
              </h2>
              <p className="text-blue-100 max-w-lg">
                Join thousands of young entrepreneurs and pitch your idea to investors and mentors from around the world.
              </p>
            </div>
            <Link
              href="/pitch"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              <HiPlusCircle className="w-5 h-5" />
              Pitch Your Idea
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(30px,-50px) scale(1.1); }
          66%      { transform:translate(-20px,20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}