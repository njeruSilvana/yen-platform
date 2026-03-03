'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiEnvelope,
  HiAcademicCap,
  HiCurrencyDollar,
  HiBriefcase,
  HiClock,
  HiUserPlus,
  HiMagnifyingGlass,
  HiCheckBadge,
  HiFunnel,
  HiMapPin,
  HiChartBar,
  HiBuildingOffice2,
} from 'react-icons/hi2';

// ── Real shape returned by the API (matches formatUser in users.controller.js) ─
interface UserProfile {
  id:              string;
  name:            string;
  email:           string;
  role:            string;
  bio:             string;
  location:        string;
  company:         string;
  website:         string;
  // Mentor fields
  expertise:       string;
  experience:      string;
  // Investor fields
  investmentRange: string;
  investmentFocus: string;
  investorType:    string;
  verified:        boolean;
}

const AVATAR_GRADIENTS = [
  'from-blue-500 to-teal-500',
  'from-teal-500 to-cyan-500',
  'from-blue-600 to-blue-400',
  'from-cyan-500 to-teal-600',
  'from-blue-500 to-cyan-400',
  'from-teal-600 to-blue-500',
];

export default function Mentors() {
  const [mentors,   setMentors]   = useState<UserProfile[]>([]);
  const [investors, setInvestors] = useState<UserProfile[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState<'mentors' | 'investors'>('mentors');
  const [user,      setUser]      = useState<any>(null);
  const [search,    setSearch]    = useState('');
  const [connectedIds, setConnectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mentorsRes, investorsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentors`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/investors`),
      ]);
      const mentorsData   = await mentorsRes.json();
      const investorsData = await investorsRes.json();
      setMentors(Array.isArray(mentorsData)   ? mentorsData   : []);
      setInvestors(Array.isArray(investorsData) ? investorsData : []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (targetUserId: string, type: 'mentor' | 'investor') => {
    if (!user) {
      alert('Please login to connect with mentors and investors');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/connections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fromUserId: user.id, toUserId: targetUserId, type }),
      });
      if (response.ok) {
        setConnectedIds(prev => new Set(prev).add(targetUserId));
      }
    } catch (err) {
      console.error('Error connecting:', err);
    }
  };

  const displayList = (activeTab === 'mentors' ? mentors : investors).filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.expertise?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <HiCheckBadge className="w-4 h-4 text-teal-300" />
            Verified Experts Network
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Connect With{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Experts
            </span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Find experienced mentors and investors ready to guide your entrepreneurial journey
          </p>

          <div className="relative max-w-md mx-auto">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={activeTab === 'mentors' ? 'Search by name or expertise…' : 'Search by name or focus…'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-white text-slate-700 placeholder-slate-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L48,45C96,50,192,60,288,58C384,55,480,38,576,34C672,30,768,38,864,42C960,46,1056,46,1152,42C1248,38,1344,30,1392,26L1440,22L1440,80H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Tab Strip ── */}
      <section className="bg-white border-b border-slate-100 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 gap-6 flex-wrap">
          <div className="flex gap-2">
            {(['mentors', 'investors'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setSearch(''); }}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {tab === 'mentors'
                  ? <HiAcademicCap className="w-4 h-4" />
                  : <HiCurrencyDollar className="w-4 h-4" />
                }
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab === 'mentors' ? mentors.length : investors.length}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <HiFunnel className="w-4 h-4" />
            <span>{displayList.length} result{displayList.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      {/* ── Cards Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 rounded" />
                  <div className="h-3 bg-slate-200 rounded w-5/6" />
                </div>
                <div className="mt-4 h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'mentors'
                ? <HiAcademicCap className="w-10 h-10 text-blue-400" />
                : <HiCurrencyDollar className="w-10 h-10 text-teal-400" />}
            </div>
            <p className="text-xl font-semibold text-slate-700 mb-2">
              {search ? `No ${activeTab} match "${search}"` : `No ${activeTab} yet`}
            </p>
            <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Be the first to join as a {activeTab === 'mentors' ? 'mentor' : 'investor'}!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayList.map((person, index) => {
              const gradient   = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
              const isConnected = connectedIds.has(person.id);

              return (
                <div
                  key={person.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Avatar + name */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg`}>
                        {person.name.charAt(0).toUpperCase()}
                        {person.verified && (
                          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <HiCheckBadge className="w-4 h-4 text-teal-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-slate-800 truncate">{person.name}</h3>
                        <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full capitalize">
                          {person.role}
                        </span>
                      </div>
                    </div>

                    {/* ── Mentor detail rows (real data) ── */}
                    {activeTab === 'mentors' && (
                      <div className="space-y-2 mb-4">
                        {person.expertise && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiBriefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="font-medium">{person.expertise}</span>
                          </div>
                        )}
                        {person.experience && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiClock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span>{person.experience} Experience</span>
                          </div>
                        )}
                        {person.company && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiBuildingOffice2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{person.company}</span>
                          </div>
                        )}
                        {person.location && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiMapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{person.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <HiEnvelope className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate text-slate-500">{person.email}</span>
                        </div>
                        {/* Bio preview */}
                        {person.bio && (
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {person.bio}
                          </p>
                        )}
                      </div>
                    )}

                    {/* ── Investor detail rows (real data) ── */}
                    {activeTab === 'investors' && (
                      <div className="space-y-2 mb-4">
                        {person.investmentRange && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiCurrencyDollar className="w-4 h-4 text-teal-400 flex-shrink-0" />
                            <span className="font-semibold text-teal-700">{person.investmentRange}</span>
                          </div>
                        )}
                        {person.investorType && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiBriefcase className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span>{person.investorType}</span>
                          </div>
                        )}
                        {person.investmentFocus && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiChartBar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                              {person.investmentFocus}
                            </span>
                          </div>
                        )}
                        {person.company && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiBuildingOffice2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{person.company}</span>
                          </div>
                        )}
                        {person.location && (
                          <div className="flex items-center gap-2 text-slate-600 text-sm">
                            <HiMapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{person.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                          <HiEnvelope className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span className="truncate text-slate-500">{person.email}</span>
                        </div>
                        {person.bio && (
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                            {person.bio}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Connect button */}
                    <div className="mt-auto">
                      <button
                        onClick={() => handleConnect(person.id, activeTab === 'mentors' ? 'mentor' : 'investor')}
                        disabled={isConnected}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isConnected
                            ? 'bg-green-50 text-green-600 border-2 border-green-200 cursor-default'
                            : `bg-gradient-to-r ${gradient} text-white shadow hover:shadow-lg hover:brightness-105 transform hover:-translate-y-0.5`
                        }`}
                      >
                        {isConnected ? (
                          <><HiCheckBadge className="w-4 h-4" /> Request Sent</>
                        ) : (
                          <><HiUserPlus className="w-4 h-4" /> Connect</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-10 text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Want to Become a {activeTab === 'mentors' ? 'Mentor' : 'Investor'}?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Share your expertise and help young entrepreneurs build the next generation of sustainable businesses.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <HiUserPlus className="w-5 h-5" />
              Join as {activeTab === 'mentors' ? 'Mentor' : 'Investor'}
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
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
      `}</style>
    </div>
  );
}