'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiLightBulb,
  HiUserGroup,
  HiRocketLaunch,
  HiChartBarSquare,
  HiBriefcase,
  HiCurrencyDollar,
  HiAcademicCap,
  HiGlobeAlt,
  HiUsers,
  HiArrowRight,
  HiCheckCircle,
} from 'react-icons/hi2';

export default function Home() {
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) setCounted(true);
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [counted]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const testimonials = [
    {
      quote:
        "YEN didn't just give me connections — it gave me a community that believed in my idea before anyone else did. Six months after joining, my agri-tech startup now employs 12 people in my hometown.",
      name: 'Kwame Asante',
      role: 'Founder, HarvestLink',
      country: 'Ghana',
      avatar: 'KA',
      color: '#0ea5e9',
    },
    {
      quote:
        'I had the idea but no roadmap. My YEN mentor helped me write a real business plan, and we secured seed funding within 4 months. I went from job seeker to job creator.',
      name: 'Priya Nambiar',
      role: 'CEO, SkillBridge',
      country: 'India',
      avatar: 'PN',
      color: '#14b8a6',
    },
    {
      quote:
        "The YEN platform matched me with an investor who actually understood my vision for affordable solar energy. Now we've installed panels in 300+ homes.",
      name: 'Amara Diallo',
      role: 'Co-Founder, SolarReach',
      country: 'Senegal',
      avatar: 'AD',
      color: '#6366f1',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Young Entrepreneurs', sublabel: 'across 47 countries', Icon: HiUsers },
    { value: '$5M+', label: 'Funding Secured', sublabel: 'by YEN members', Icon: HiCurrencyDollar },
    { value: '500+', label: 'Expert Mentors', sublabel: 'ready to guide you', Icon: HiAcademicCap },
    { value: '1,200+', label: 'Jobs Created', sublabel: 'and counting', Icon: HiBriefcase },
  ];

  const problems = [
    { stat: '73M', description: 'young people are unemployed globally', source: 'ILO, 2023' },
    { stat: '87%', description: 'of youth entrepreneurs lack access to funding', source: 'World Bank' },
    { stat: '64%', description: 'give up on business ideas due to no mentorship', source: 'YEN Survey' },
  ];

  const howItWorks = [
    {
      number: '01',
      title: 'Pitch Your Idea',
      description:
        "Create a compelling pitch for your business concept. Our guided templates help you articulate your vision, target market, and the problem you solve — even if it's your first time.",
      Icon: HiLightBulb,
      accent: '#0ea5e9',
    },
    {
      number: '02',
      title: 'Get Matched',
      description:
        "Our smart matching connects you with mentors who've built what you're building, investors aligned with your sector, and co-founders who complement your skills.",
      Icon: HiUserGroup,
      accent: '#14b8a6',
    },
    {
      number: '03',
      title: 'Access Resources',
      description:
        'Unlock funding opportunities, business development workshops, legal templates, market research tools, and a network of peers who are on the same journey.',
      Icon: HiRocketLaunch,
      accent: '#6366f1',
    },
    {
      number: '04',
      title: 'Launch & Scale',
      description:
        'Go from idea to incorporated business with hands-on support. Track your milestones, celebrate wins, and inspire the next generation of youth entrepreneurs.',
      Icon: HiChartBarSquare,
      accent: '#f59e0b',
    },
  ];

  const whoIsItFor = [
    {
      title: 'Young Entrepreneurs',
      desc: 'Ages 18–35 with a business idea, early-stage startup, or side hustle you want to scale.',
      Icon: HiBriefcase,
      cta: 'Pitch Your Idea',
      href: '/register',
      accent: '#0ea5e9',
    },
    {
      title: 'Investors',
      desc: 'Angel investors, VCs, and impact funds looking for the next generation of world-changing founders.',
      Icon: HiCurrencyDollar,
      cta: 'Discover Startups',
      href: '/ideas',
      accent: '#14b8a6',
    },
    {
      title: 'Mentors',
      desc: 'Experienced founders and industry experts who want to give back by guiding emerging talent.',
      Icon: HiAcademicCap,
      cta: 'Become a Mentor',
      href: '/register?role=mentor',
      accent: '#6366f1',
    },
    {
      title: 'Partners & NGOs',
      desc: 'Organizations who want to sponsor youth programs, run challenges, or fund entrepreneurship initiatives.',
      Icon: HiGlobeAlt,
      cta: 'Partner With Us',
      href: '/contact',
      accent: '#f59e0b',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ─── HERO — original blue-600 → blue-700 → teal-600 gradient ─── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-36 md:pb-44">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Hero Text */}
            <div className="text-center md:text-left space-y-8 animate-fade-in">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-100">
                <span className="w-2 h-2 bg-teal-300 rounded-full animate-pulse" />
                Empowering Youth Since 2023 · 47 Countries
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Stop Looking for Jobs.{' '}
                <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Start Creating Them.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
                Youth unemployment isn't just an economic problem; it's a waste of a
                generation's potential. <strong className="text-white">YEN</strong> is the
                platform where young innovators pitch ideas, connect with investors and mentors,
                and build businesses that create real jobs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/register">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                    <span>Join as Entrepreneur</span>
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/ideas">
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300">
                    Explore Ideas
                  </button>
                </Link>
              </div>

              {/* Social proof avatars */}
              <div className="flex items-center gap-3 justify-center md:justify-start text-blue-200 text-sm">
                <div className="flex">
                  {['K', 'A', 'P', 'J', 'M'].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 border-2 border-blue-700 grid place-items-center text-xs font-bold text-blue-900"
                      style={{ marginLeft: i === 0 ? 0 : '-8px', zIndex: 5 - i, position: 'relative' }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span>
                  Join <strong className="text-white">10,000+</strong> entrepreneurs already building
                </span>
              </div>
            </div>

            {/* Hero Visual — real image with floating notification cards */}
            <div className="relative animate-fade-in-delay mt-8 md:mt-0">
              {/* Floating card top-right */}
              <div className="absolute -top-4 -right-4 z-20 flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3 animate-float-a shadow-xl">
                <HiLightBulb className="w-6 h-6 text-teal-300 flex-shrink-0" />
                <div>
                  {/* <div className="text-xs font-bold text-white">New Pitch</div>
                  <div className="text-xs text-blue-200">Solar Energy for Rural Kenya</div> */}
                </div>
                {/* <span className="ml-1 px-2 py-0.5 bg-teal-400/20 border border-teal-300/40 rounded-full text-teal-300 text-[10px] font-bold">
                  New
                </span> */}
              </div>

              {/* Main image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=90&auto=format&fit=crop"
                  alt="Young entrepreneurs collaborating"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
              </div>

              {/* Floating card bottom-left */}
              <div className="absolute -bottom-4 -left-4 z-20 flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3 animate-float-b shadow-xl">
                <HiUserGroup className="w-6 h-6 text-cyan-300 flex-shrink-0" />
                {/* <div>
                  <div className="text-xs font-bold text-white">Mentor Connected</div>
                  <div className="text-xs text-blue-200">David Chen, ex-Google</div>
                </div> */}
              </div>

              {/* Decorative blurs */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-400/20 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />
            </div>
          </div>
        </div>


        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L48,45C96,50,192,60,288,58C384,55,480,38,576,34C672,30,768,38,864,42C960,46,1056,46,1152,42C1248,38,1344,30,1392,26L1440,22L1440,80H0Z" />
          </svg>
        </div>
      </section>

      {/* ─── THE PROBLEM ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
            The Crisis We're Solving
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            73 million young people.<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Zero opportunities.
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
            Youth unemployment is one of the most urgent challenges of our time. Talented young
            people around the world have ideas that could change industries — but without access
            to mentors, funding, or networks, those ideas die quietly.{' '}
            <strong className="text-slate-800">YEN exists to change that.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={counterRef}>
            {problems.map((p, i) => (
              <div
                key={i}
                className="relative bg-slate-50 border border-blue-100 rounded-2xl p-10 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-t-2xl" />
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3 leading-none">
                  {p.stat}
                </div>
                <div className="text-slate-800 font-semibold text-base mb-2 leading-snug">
                  {p.description}
                </div>
                <div className="text-slate-400 text-xs">{p.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
            How YEN Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Your journey from idea<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              to running business
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
            We've designed every step of the YEN platform to remove the barriers that stop
            young entrepreneurs before they even start.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => {
              const { Icon } = step;
              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  style={{ borderTop: `3px solid ${step.accent}` }}
                >
                  <div className="text-4xl font-extrabold text-slate-100 mb-4 leading-none select-none">
                    {step.number}
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${step.accent}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHO IS IT FOR ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
            Who Is YEN For?
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
            A platform built for<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              everyone in the ecosystem
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mb-14 leading-relaxed">
            Whether you're building, investing, mentoring, or partnering — there's a place for
            you in the YEN community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoIsItFor.map((w, i) => {
              const { Icon } = w;
              return (
                <div
                  key={i}
                  className="group bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col gap-4 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${w.accent}18` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: w.accent }} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{w.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{w.desc}</p>
                  <Link
                    href={w.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 hover:gap-2.5"
                    style={{ color: w.accent }}
                  >
                    {w.cta}
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
            Real Impact, Real Numbers
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-14 leading-tight">
            The proof is in<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              our community
            </span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => {
              const { Icon } = s;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 leading-none">
                    {s.value}
                  </div>
                  <div className="text-slate-800 font-semibold text-sm mb-1">{s.label}</div>
                  <div className="text-slate-400 text-xs">{s.sublabel}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-bold uppercase tracking-widest mb-5">
            Stories That Inspire
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-14 leading-tight">
            They started with an idea.<br />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Now they lead companies.
            </span>
          </h2>

          <div className="relative max-w-3xl">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-slate-50 border border-blue-100 rounded-2xl p-10 transition-all duration-500 ${
                  i === activeTestimonial
                    ? 'opacity-100 translate-x-0 scale-100 relative'
                    : 'opacity-0 absolute top-0 left-0 w-full pointer-events-none scale-[0.97] ' +
                      (i < activeTestimonial ? '-translate-x-8' : 'translate-x-8')
                }`}
              >
                <div className="font-serif text-6xl leading-none text-blue-200 mb-4 select-none">"</div>
                <p className="text-slate-700 text-lg leading-relaxed mb-8">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl grid place-items-center font-extrabold text-white text-sm flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{t.name}</div>
                    <div className="text-slate-400 text-sm">
                      {t.role} · {t.country}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? 'bg-blue-600 w-6'
                      : 'bg-slate-200 w-2 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-blue-100 text-xs font-bold uppercase tracking-widest mb-6">
            <HiCheckCircle className="w-4 h-4 text-teal-300" />
            Don't Wait. The World Needs Your Idea.
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Your business idea could<br />
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              create hundreds of jobs.
            </span>
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join the movement. Whether you're an entrepreneur with a rough idea, a mentor with
            wisdom to share, or an investor looking for the next big thing — YEN is your platform.
          </p>
          <form
            onSubmit={handleEarlyAccess}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-teal-300 focus:bg-white/15 transition-all duration-300 text-sm"
            />
            <button
              type="submit"
              className="px-7 py-4 bg-gradient-to-r from-teal-400 to-cyan-400 text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm whitespace-nowrap"
            >
              {submitted ? "✓ You're on the list!" : 'Get Early Access'}
            </button>
          </form>
          <p className="text-blue-200/60 text-xs">Free to join. No credit card. Launch your idea today.</p>
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-a {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-b {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.8s ease-out 0.3s backwards; }
        .animate-float-a { animation: float-a 4s ease-in-out infinite; }
        .animate-float-b { animation: float-b 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}