'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiLightBulb, HiHeart, HiCurrencyDollar, HiPlusCircle,
  HiMagnifyingGlass, HiPaperAirplane, HiCheckBadge, HiClock,
  HiArrowTrendingUp, HiSparkles, HiBell, HiTag, HiEllipsisHorizontal,
  HiUserGroup, HiAcademicCap, HiChevronRight, HiRocketLaunch,
} from 'react-icons/hi2';

interface Idea {
  id: string;
  title: string;
  category: string;
  likes: number;
  currentFunding: number;
  fundingGoal: number;
  status: string;
}

interface Connection {
  id: string;
  type: string;
  status: string;
}

interface Props {
  user: any;
  ideas: Idea[];
  ideasLoading: boolean;
  connections: Connection[];
  connectionsLoading: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  accepted: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  pending:  'bg-amber-100 text-amber-700 border border-amber-200',
  rejected: 'bg-red-100 text-red-600 border border-red-200',
};

function FundingBar({ current, goal }: { current: number; goal: number }) {
  const pct = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
        <span className="font-medium text-teal-600">${current.toLocaleString()} raised</span>
        <span className="font-bold text-slate-700">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-slate-400 mt-1">Goal: ${goal.toLocaleString()}</div>
    </div>
  );
}

export default function EntrepreneurDashboard({ user, ideas, ideasLoading, connections, connectionsLoading }: Props) {
  const [suggestedMentors, setSuggestedMentors]   = useState<any[]>([]);
  const [suggestedInvestors, setSuggestedInvestors] = useState<any[]>([]);
  const [suggTab, setSuggTab] = useState<'mentors' | 'investors'>('mentors');

  const totalLikes    = ideas.reduce((s, i) => s + (i.likes ?? 0), 0);
  const totalFunding  = ideas.reduce((s, i) => s + (i.currentFunding ?? 0), 0);
  const pendingConns  = connections.filter(c => c.status === 'pending');
  const acceptedConns = connections.filter(c => c.status === 'accepted');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    Promise.all([
      fetch(`${base}/mentors`).then(r => r.json()),
      fetch(`${base}/investors`).then(r => r.json()),
    ]).then(([m, inv]) => {
      setSuggestedMentors(Array.isArray(m) ? m.slice(0, 4) : []);
      setSuggestedInvestors(Array.isArray(inv) ? inv.slice(0, 4) : []);
    }).catch(() => {});
  }, []);

  const suggList = suggTab === 'mentors' ? suggestedMentors : suggestedInvestors;

  return (
    <div className="min-h-screen bg-slate-50 pt-20">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-32 px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
        </div>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-teal-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                      {user.name.split(' ')[0]}'s Workspace
                    </h1>
                    <HiSparkles className="w-5 h-5 text-teal-300 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-widest">
                    Entrepreneur
                  </span>
                </div>
              </div>
              <p className="text-slate-400 max-w-md text-sm">
                Track your pitches, connect with mentors and investors, and grow your venture.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/ideas"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all">
                <HiMagnifyingGlass className="w-4 h-4" /> Browse Ideas
              </Link>
              <Link href="/pitch"
                className="flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:-translate-y-0.5 transition-all">
                <HiPlusCircle className="w-4 h-4" /> New Pitch
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
            { icon: HiLightBulb,      label: 'My Pitches',       value: ideas.length,                         color: 'from-blue-500 to-blue-600',   shadow: 'shadow-blue-200' },
            { icon: HiHeart,          label: 'Total Likes',       value: totalLikes,                           color: 'from-rose-400 to-pink-500',    shadow: 'shadow-rose-200' },
            { icon: HiCurrencyDollar, label: 'Funding Raised',    value: `$${totalFunding.toLocaleString()}`,  color: 'from-teal-500 to-emerald-500', shadow: 'shadow-teal-200' },
            { icon: HiUserGroup,      label: 'Connections',       value: acceptedConns.length,                 color: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200' },
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

        {/* LEFT: My Pitches + Performance ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* My Pitched Ideas */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HiLightBulb className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="font-black text-slate-800 text-lg">My Pitched Ideas</h2>
              </div>
              <Link href="/pitch"
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 px-3 py-2 rounded-lg hover:-translate-y-0.5 transition-all shadow-sm">
                <HiPlusCircle className="w-3.5 h-3.5" /> New Pitch
              </Link>
            </div>
            <div className="p-6">
              {ideasLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-2/3" />
                      <div className="h-2 bg-slate-100 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : ideas.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <HiRocketLaunch className="w-8 h-8 text-blue-300" />
                  </div>
                  <p className="text-slate-500 text-sm mb-4">No pitches yet — share your first idea!</p>
                  <Link href="/pitch"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <HiPaperAirplane className="w-4 h-4" /> Create Your First Pitch
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {ideas.map(idea => (
                    <div key={idea.id}
                      className="group p-4 rounded-xl border-2 border-slate-100 hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors text-sm leading-snug flex-1 pr-3">
                          {idea.title}
                        </h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <HiTag className="w-3 h-3" />{idea.category}
                          </span>
                          <span className="text-xs font-semibold bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <HiHeart className="w-3 h-3" />{idea.likes ?? 0}
                          </span>
                        </div>
                      </div>
                      <FundingBar current={idea.currentFunding ?? 0} goal={idea.fundingGoal ?? 1} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pitch Performance Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-slate-100">
              <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                <HiArrowTrendingUp className="w-4 h-4 text-rose-500" />
              </div>
              <h2 className="font-black text-slate-800 text-lg">Pitch Performance</h2>
            </div>
            <div className="p-6">
              {ideas.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">Submit pitches to see performance data</div>
              ) : (
                <div className="space-y-3">
                  {ideas.map((idea, i) => {
                    const maxLikes = Math.max(...ideas.map(d => d.likes ?? 0), 1);
                    const pct = ((idea.likes ?? 0) / maxLikes) * 100;
                    const colors = [
                      'from-teal-500 to-cyan-400',
                      'from-blue-500 to-blue-400',
                      'from-violet-500 to-purple-400',
                      'from-rose-500 to-pink-400',
                      'from-amber-500 to-orange-400',
                    ];
                    return (
                      <div key={idea.id}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="font-semibold text-slate-700 truncate max-w-[200px]">{idea.title}</span>
                          <span className="font-bold text-slate-500 flex items-center gap-1">
                            <HiHeart className="w-3 h-3 text-rose-400" />{idea.likes ?? 0} likes
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${colors[i % colors.length]} rounded-full transition-all duration-1000`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Suggestions + Connections ── */}
        <div className="space-y-6">

          {/* Suggested Mentors / Investors */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <HiUserGroup className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="font-black text-slate-800 text-base">Connect With</h2>
              </div>
              <Link href="/mentors" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-0.5">
                See all <HiChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {/* Tab toggle */}
            <div className="px-4 pt-3 pb-2 flex gap-2">
              {(['mentors', 'investors'] as const).map(tab => (
                <button key={tab} onClick={() => setSuggTab(tab)}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                    suggTab === tab
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}>
                  {tab === 'mentors' ? '🎓 Mentors' : '💰 Investors'}
                </button>
              ))}
            </div>
            <div className="p-4 space-y-3">
              {suggList.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No {suggTab} available yet</p>
              ) : suggList.map((person, i) => {
                const gradients = ['from-blue-500 to-teal-500', 'from-teal-500 to-cyan-500', 'from-violet-500 to-blue-500', 'from-rose-400 to-pink-500'];
                return (
                  <div key={person.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className={`w-9 h-9 bg-gradient-to-br ${gradients[i % gradients.length]} rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-800 text-sm truncate">{person.name}</div>
                      <div className="text-xs text-slate-400 truncate">
                        {suggTab === 'mentors' ? person.expertise || 'Mentor' : person.investorType || 'Investor'}
                      </div>
                    </div>
                    <HiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 transition-colors flex-shrink-0" />
                  </div>
                );
              })}
              <Link href="/mentors"
                className="block text-center text-xs font-bold text-teal-600 hover:text-teal-700 py-2 border-2 border-dashed border-teal-200 rounded-xl hover:border-teal-400 transition-all">
                Browse all {suggTab} →
              </Link>
            </div>
          </div>

          {/* Connection Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <HiBell className="w-4 h-4 text-amber-500" />
                </div>
                <h2 className="font-black text-slate-800 text-base">Requests</h2>
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
                    <div key={i} className="animate-pulse flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full" />
                      <div className="flex-1 h-3 bg-slate-100 rounded" />
                    </div>
                  ))}
                </div>
              ) : connections.length === 0 ? (
                <div className="text-center py-6">
                  <HiUserGroup className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">No connections yet</p>
                  <Link href="/mentors" className="text-xs text-teal-600 font-bold hover:underline mt-1 block">
                    Find mentors &amp; investors
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {connections.slice(0, 5).map(conn => (
                    <div key={conn.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          {conn.type === 'mentor' ? '🎓' : '💰'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-700 capitalize">{conn.type}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <HiClock className="w-3 h-3" /> Requested
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
      </div>
    </div>
  );
}