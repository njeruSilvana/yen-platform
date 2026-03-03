'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Link from 'next/link';
import {
  HiAcademicCap, HiUserGroup, HiCheckBadge, HiClock,
  HiEnvelope, HiMapPin, HiBuildingOffice2, HiSparkles,
  HiLightBulb, HiChevronRight, HiBell, HiXMark,
  HiGlobeAlt, HiTag, HiHeart,
} from 'react-icons/hi2';

interface Connection { id: string; type: string; status: string; fromUserId?: string; toUserId?: string; }
interface Props { user: any; connections: Connection[]; connectionsLoading: boolean; }

const STATUS_STYLE: Record<string, string> = {
  accepted: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  pending:  'bg-amber-100 text-amber-700 border border-amber-200',
  rejected: 'bg-red-100 text-red-600 border border-red-200',
};

export default function MentorDashboard({ user, connections, connectionsLoading }: Props) {
  const [ideas, setIdeas]           = useState<any[]>([]);
  const [ideasLoading, setIdeasLoading] = useState(true);
  const [activeIdeasTab, setActiveIdeasTab] = useState<'latest' | 'popular'>('latest');

  const pendingConns  = connections.filter(c => c.status === 'pending');
  const acceptedConns = connections.filter(c => c.status === 'accepted');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${base}/ideas`)
      .then(r => r.json())
      .then(data => setIdeas(Array.isArray(data) ? data : []))
      .catch(() => setIdeas([]))
      .finally(() => setIdeasLoading(false));
  }, []);

  const displayIdeas = activeIdeasTab === 'latest'
    ? [...ideas].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6)
    : [...ideas].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
         <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-32 px-6">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-400 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-cyan-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight">{user.name}</h1>
                    <HiSparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
                    🎓 Mentor
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                Guide entrepreneurs, review pitches, and manage your connections from here.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/ideas"
                className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all">
                <HiLightBulb className="w-4 h-4" /> Browse Pitches
              </Link>
              <Link href="/mentors"
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 px-4 py-2.5 rounded-xl text-sm font-black shadow-lg hover:-translate-y-0.5 transition-all">
                <HiUserGroup className="w-4 h-4" /> Find Network
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
            { icon: HiUserGroup,   label: 'Entrepreneurs Connected', value: acceptedConns.length,  color: 'from-cyan-500 to-blue-500',    shadow: 'shadow-cyan-200' },
            { icon: HiBell,        label: 'Pending Requests',         value: pendingConns.length,   color: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-200' },
            { icon: HiLightBulb,   label: 'Pitches to Review',        value: ideas.length,          color: 'from-violet-500 to-purple-600',shadow: 'shadow-violet-200' },
            { icon: HiCheckBadge,  label: 'Total Connections',        value: connections.length,    color: 'from-emerald-500 to-teal-500', shadow: 'shadow-emerald-200' },
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

          {/* Profile Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 border border-white/30">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-black text-lg">{user.name}</h3>
              {user.expertise && (
                <p className="text-cyan-100 text-sm mt-0.5">{user.expertise}</p>
              )}
            </div>
            <div className="p-5 space-y-3">
              {user.experience && (
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <HiClock className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                  <span>{user.experience} Experience</span>
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
              {user.website && (
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <HiGlobeAlt className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <a href={user.website} target="_blank" rel="noreferrer"
                    className="text-cyan-600 hover:underline truncate">{user.website}</a>
                </div>
              )}
              {user.bio && (
                <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-100">
                  {user.bio}
                </p>
              )}
              {!user.expertise && !user.experience && !user.bio && (
                <p className="text-xs text-slate-400 text-center py-2">
                  Complete your profile to attract entrepreneurs.
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
                  {pendingConns.length} new
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
                <p className="text-xs text-slate-400 text-center py-5">No connection requests yet</p>
              ) : (
                <div className="space-y-2">
                  {connections.slice(0, 6).map(conn => (
                    <div key={conn.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-black">
                          E
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-700">Entrepreneur</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <HiClock className="w-3 h-3" /> Connection request
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

        {/* RIGHT: Browse Pitches ── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <HiLightBulb className="w-4 h-4 text-violet-600" />
                </div>
                <h2 className="font-black text-slate-800 text-lg">Pitches to Advise On</h2>
              </div>
              <Link href="/ideas" className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5">
                View all <HiChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tab toggle */}
            <div className="px-5 pt-3 pb-2 flex gap-2">
              {(['latest', 'popular'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveIdeasTab(tab)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeIdeasTab === tab
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}>
                  {tab === 'latest' ? '🕐 Latest' : '🔥 Popular'}
                </button>
              ))}
            </div>

            <div className="p-5">
              {ideasLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2 p-4 bg-slate-50 rounded-xl">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : displayIdeas.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-10">No pitches available yet</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {displayIdeas.map(idea => (
                    <div key={idea.id}
                      className="group p-4 rounded-xl border-2 border-slate-100 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all duration-200 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-bold bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <HiTag className="w-3 h-3" />{idea.category}
                        </span>
                        <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                          <HiHeart className="w-3 h-3" />{idea.likes ?? 0}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-cyan-700 transition-colors mb-1 line-clamp-2">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {idea.description}
                      </p>
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          by {idea.userId?.name || idea.userName || 'Entrepreneur'}
                        </span>
                        <Link href={`/ideas/${idea.id}`}
                          className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5">
                          View <HiChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
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