'use client';

import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiGlobeAlt,
  HiLightBulb,
  HiUserGroup,
  HiRocketLaunch,
  HiHeart,
  HiShieldCheck,
  HiSparkles,
  HiArrowRight,
  HiCheckBadge,
  HiStar,
} from 'react-icons/hi2';

const VALUES = [
  {
    icon: HiLightBulb,
    title: 'Innovation First',
    desc: 'We believe every young person carries a world-changing idea. Our platform exists to help those ideas find their wings.',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: HiUserGroup,
    title: 'Community Driven',
    desc: 'Entrepreneurship is never a solo journey. YEN connects you with mentors, investors, and peers who genuinely care about your success.',
    gradient: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: HiGlobeAlt,
    title: 'Globally Inclusive',
    desc: 'Great ideas come from everywhere. We are intentionally building a platform that welcomes entrepreneurs from every continent.',
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: HiShieldCheck,
    title: 'Trust & Transparency',
    desc: 'Every investor, mentor, and entrepreneur on YEN is verified. We safeguard your ideas and your connections.',
    gradient: 'from-blue-600 to-teal-500',
    bg: 'bg-blue-50',
  },
  {
    icon: HiHeart,
    title: 'Sustainability Focus',
    desc: 'We actively prioritise ideas that create positive environmental and social impact — profit and purpose together.',
    gradient: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50',
  },
  {
    icon: HiRocketLaunch,
    title: 'Growth Obsessed',
    desc: 'From your first pitch to your Series A, YEN evolves with you — offering resources for every stage of your journey.',
    gradient: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
  },
];

const TEAM = [
  {
    name: 'Silvana Njeru',
    role: 'Founder & Front-End Developer',
    bio: 'Final year student and creator of YEN. Designed, developed, and deployed the entire platform independently as a passion-driven project focused on empowering young entrepreneurs.',
    image: '/profile.jpg', // replace with your actual image path
  },
];

const MILESTONES = [
  {
    year: '2026',
    event:
      'YEN conceptualised and developed as a final year university project focused on empowering young entrepreneurs.',
  },
  {
    year: '2026',
    event:
      'Core platform features designed and implemented independently; including user authentication, investor matching, and mentorship flow.',
  },
  {
    year: '2026',
    event:
      'Platform refined with scalability, security, and real-world usability in mind.',
  },
  {
    year: 'Future Vision',
    event:
      'YEN aims to evolve into a fully operational ecosystem connecting youth entrepreneurs to funding and mentorship opportunities globally.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-32 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-300 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiSparkles className="w-4 h-4 text-teal-300" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            We Exist to Turn{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Dreamers
            </span>{' '}
            Into Builders
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Youth Entrepreneur Network was born from one belief: that geography, background, and age
            should never limit a great idea. We are the infrastructure for the next generation of business.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,50L60,55C120,60,240,70,360,68C480,65,600,48,720,44C840,40,960,48,1080,52C1200,56,1320,50,1380,46L1440,42L1440,100H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Mission Statement ── */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6 leading-snug">
          Our mission is simple:{' '}
          <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            stop job seeking, start job creating.
          </span>
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
          We built YEN because too many brilliant young minds are funnelled into jobs that suppress their
          creativity. The world needs more builders, not more applicants. Every entrepreneur on this platform
          is creating jobs, solving real problems, and proving that youth is not a limitation — it's a superpower.
        </p>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '10,000+', label: 'Entrepreneurs', icon: HiUserGroup },
            { number: '60+', label: 'Countries', icon: HiGlobeAlt },
            { number: '$5M+', label: 'Funding Raised', icon: HiRocketLaunch },
            { number: '500+', label: 'Mentors & Investors', icon: HiStar },
          ].map((s, i) => (
            <div key={i} className="group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <s.icon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-1">
                {s.number}
              </div>
              <div className="text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            What We Stand For
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Six principles that shape every decision we make at YEN
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className={`group ${v.bg} rounded-2xl p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-white`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${v.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <v.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Project Development Journey
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-teal-300" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="relative flex items-start gap-6 pl-4">
                  <div className="relative z-10 w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <HiCheckBadge className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 flex-1 border border-slate-100 hover:border-teal-200 transition-colors duration-300">
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{m.year}</span>
                    <p className="text-slate-700 mt-2 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Meet the Team
          </h2>
          <p className="text-slate-500 text-lg">The people building the future of youth entrepreneurship</p>
        </div>
        <div className="flex justify-center">
          {TEAM.map((member, i) => (
            <div key={i} className="group text-center">
              <div className="relative mb-4 inline-block">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-2xl object-cover mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center shadow-md">
                  <HiCheckBadge className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
              <p className="text-teal-600 text-sm font-medium mb-2">{member.role}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-2xl p-12 text-white text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Be Part of the Story?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Join 10,000+ entrepreneurs who are building the future. Your idea could be the next big thing.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Join YEN Today
              <HiArrowRight className="w-5 h-5" />
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
        @keyframes fade-in {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .animate-blob         { animation:blob 7s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }
        .animate-fade-in      { animation:fade-in 0.8s ease-out; }
      `}</style>
    </div>
  );
}