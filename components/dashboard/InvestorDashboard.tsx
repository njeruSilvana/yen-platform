'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Link from 'next/link';
import {
  HiCurrencyDollar, HiUserGroup, HiCheckBadge, HiClock,
  HiEnvelope, HiMapPin, HiBuildingOffice2, HiSparkles,
  HiLightBulb, HiChevronRight, HiBell, HiTag, HiHeart,
  HiChartBar, HiGlobeAlt, HiArrowTrendingUp, HiFire,
} from 'react-icons/hi2';

interface Connection { id: string; type: string; status: string; }
interface Props { user: any; connections: Connection[]; connectionsLoading: boolean; }

const STATUS_STYLE: Record<string, string> = {
  accepted: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  pending:  'bg-amber-100 text-amber-700 border border-amber-200',
  rejected: 'bg-red-100 text-red-600 border border-red-200',
};

const CATEGORY_COLORS: Record<string, string> = {
  Technology:    'bg-blue-100 text-blue-700',
  Agriculture:   'bg-green-100 text-green-700',
  Healthcare:    'bg-rose-100 text-rose-700',
  Education:     'bg-violet-100 text-violet-700',
  Finance:       'bg-amber-100 text-amber-700',
  'E-commerce':  'bg-orange-100 text-orange-700',
  Sustainability:'bg-teal-100 text-teal-700',
};

export default function InvestorDashboard({ user, connections, connectionsLoading }: Props) {
  const [ideas, setIdeas]           = useState<any[]>([]);
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [activeTab, setActiveTab]   = useState<'browse' | 'portfolio'>('browse');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const pendingConns   = connections.filter(c => c.status === 'pending');
  const acceptedConns  = connections.filter(c => c.status === 'accepted');

  // Ideas connected to this investor = "portfolio"
  const portfolioIdeas = ideas.filter(idea =>
    acceptedConns.some(c => c.type === 'investor')
  );

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${base}/ideas`)
      .then(r => r.json())
      .then(data => setIdeas(Array.isArray(data) ? data : []))
      .catch(() => setIdeas([]))
      .finally(() => setIdeasLoading(false));
  }, []);

  const categories = ['all', ...Array.from(new Set(ideas.map(i => i.category).filter(Boolean)))];
  const filteredIdeas = categoryFilter === 'all'
    ? ideas
    : ideas.filter(i => i.category === categoryFilter);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
         <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-32 px-6">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%)', backgroundSize: '20px 20px' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-emerald-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight">{user.name}</h1>
                    <HiSparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
                    💰 {user.investorType || 'Investor'}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Discover high-potential pitches, track your portfolio, and manage connections.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/ideas"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all">
                <HiLightBulb className="w-4 h-4" /> Browse All Pitches
              </Link>
              <Link href="/mentors"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg hover:-translate-y-0.5 transition-all">
                <HiUserGroup className="w-4 h-4" /> Network
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L60,45C120,50,240,60,360,58C480,55,600,42,720,38C840,34,960,42,1080,46C1200,50,1320,46,1380,42L1440,40L1440,80H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Stat Cards ── */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: HiLightBulb,      label: 'Available Pitches',    value: ideas.length,          color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200' },
            { icon: HiCheckBadge,     label: 'Portfolio Connections', value: acceptedConns.length,  color: 'from-emerald-500 to-teal-500',  shadow: 'shadow-emerald-200' },
            { icon: HiBell,           label: 'Pending Requests',      value: pendingConns.length,   color: 'from-amber-400 to-orange-500',  shadow: 'shadow-amber-200' },
            { icon: HiUserGroup,      label: 'Total Connections',     value: connections.length,    color: 'from-blue-500 to-cyan-500',     shadow: 'shadow-blue-200' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-2xl p-5 shadow-lg ${stat.shadow} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-md`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-black text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Profile + Pending Requests ── */}
        <div className="space-y-6">

          {/* Investor Profile Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 border border-white/30">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-black text-lg">{user.name}</h3>
              <p className="text-emerald-100 text-sm mt-0.5">
                {user.investorType || 'Investor'}
              </p>
            </div>
            <div className="p-5 space-y-3">
              {user.investmentRange && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiCurrencyDollar className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Investment Range</div>
                    <div className="text-sm font-bold text-emerald-700">{user.investmentRange}</div>
                  </div>
                </div>
              )}
              {user.investmentFocus && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiChartBar className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Focus Stage</div>
                    <div className="text-sm font-bold text-teal-700">{user.investmentFocus}</div>
                  </div>
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <HiBuildingOffice2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <HiMapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <HiEnvelope className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
              {user.bio && (
                <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {user.bio}
                </p>
              )}
              {!user.investmentRange && !user.investmentFocus && (
                <p className="text-xs text-slate-400 text-center py-2">
                  Complete your investor profile to attract entrepreneurs.
                </p>
              )}
            </div>
          </div>

          {/* Pending Connection Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <HiBell className="w-4 h-4 text-amber-500" />
                </div>
                <h2 className="font-black text-slate-800 text-base">Connection Requests</h2>
              </div>
              {pendingConns.length > 0 && (
                <span className="text-xs font-black bg-amber-500 text-white px-2 py-0.5 rounded-full">
                  {pendingConns.length}
                </span>
              )}
            </div>
            <div className="p-4">
              {connectionsLoading ? (
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse flex gap-3 items-center">
                      <div className="w-9 h-9 bg-slate-100 rounded-full" />
                      <div className="flex-1 h-3 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : connections.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-5">No requests yet</p>
              ) : (
                <div className="space-y-2">
                  {connections.slice(0, 6).map(conn => (
                    <div key={conn.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          E
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-700">Entrepreneur</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <HiClock className="w-3 h-3" /> Wants to connect
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[conn.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {conn.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Browse Pitches + Portfolio ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Tab Toggle */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100">
              {([
                { key: 'browse',    label: '🔍 Browse Pitches',   icon: HiLightBulb },
                { key: 'portfolio', label: '📊 My Portfolio',      icon: HiChartBar },
              ] as const).map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-black transition-all ${
                    activeTab === tab.key
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── Browse Pitches ── */}
            {activeTab === 'browse' && (
              <div className="p-5">
                {/* Category filter chips */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {categories.slice(0, 8).map(cat => (
                    <button key={cat} onClick={() => setCategoryFilter(cat)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                        categoryFilter === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}>
                      {cat === 'all' ? '🌐 All' : cat}
                    </button>
                  ))}
                </div>

                {ideasLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse space-y-2 p-4 bg-slate-50 rounded-xl">
                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 rounded w-full" />
                      </div>
                    ))}
                  </div>
                ) : filteredIdeas.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-10">No pitches in this category yet</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredIdeas.slice(0, 6).map(idea => {
                      const fundingPct = idea.fundingGoal > 0
                        ? Math.min((idea.currentFunding / idea.fundingGoal) * 100, 100)
                        : 0;
                      return (
                        <div key={idea.id}
                          className="group p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200">
                          <div className="flex items-start justify-between mb-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[idea.category] ?? 'bg-slate-100 text-slate-600'}`}>
                              {idea.category}
                            </span>
                            <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                              <HiHeart className="w-3 h-3" />{idea.likes ?? 0}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-emerald-700 transition-colors mb-1 line-clamp-2">
                            {idea.title}
                          </h3>
                          {/* Mini funding bar */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span className="font-medium text-emerald-600">${(idea.currentFunding ?? 0).toLocaleString()}</span>
                              <span>{Math.round(fundingPct)}% funded</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                style={{ width: `${fundingPct}%` }}
                              />
                            </div>
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              Goal: ${(idea.fundingGoal ?? 0).toLocaleString()}
                            </span>
                            <Link href={`/ideas/${idea.id}`}
                              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5">
                              View <HiChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {filteredIdeas.length > 6 && (
                  <div className="mt-4 text-center">
                    <Link href="/ideas"
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 border-2 border-dashed border-emerald-200 px-5 py-2.5 rounded-xl hover:border-emerald-400 transition-all">
                      View all {filteredIdeas.length} pitches →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ── Portfolio ── */}
            {activeTab === 'portfolio' && (
              <div className="p-5">
                {acceptedConns.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <HiChartBar className="w-8 h-8 text-emerald-300" />
                    </div>
                    <p className="text-slate-500 text-sm mb-2 font-semibold">Your portfolio is empty</p>
                    <p className="text-slate-400 text-xs mb-4">Connect with entrepreneurs to build your portfolio</p>
                    <button onClick={() => setActiveTab('browse')}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <HiLightBulb className="w-4 h-4" /> Browse Pitches
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-500 font-semibold mb-3">
                      {acceptedConns.length} active investment connection{acceptedConns.length !== 1 ? 's' : ''}
                    </p>
                    {acceptedConns.map((conn, i) => (
                      <div key={conn.id} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-sm font-black">
                            {i + 1}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800">Portfolio Investment #{i + 1}</div>
                            <div className="text-xs text-emerald-600 font-semibold">Active connection</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                          ✓ Accepted
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}