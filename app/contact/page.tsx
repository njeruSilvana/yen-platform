'use client';

import { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiChatBubbleLeftRight,
  HiCheckCircle,
  HiXCircle,
  HiChevronDown,
  HiChevronUp,
  HiSparkles,
  HiClock,
  HiUserGroup,
} from 'react-icons/hi2';

const FAQS = [
  {
    q: 'How do I pitch my business idea on YEN?',
    a: 'Once you register as an entrepreneur, navigate to the Pitch page. Fill in your idea title, category, description (min 100 chars), and funding goal. Your pitch is immediately visible to verified investors and mentors.',
  },
  {
    q: 'How are mentors and investors verified?',
    a: 'Every mentor and investor goes through our manual verification process which includes ID verification, LinkedIn profile review, and a short onboarding call with our team. Only verified users appear in the Connect section.',
  },
  {
    q: 'Is YEN free to use for entrepreneurs?',
    a: 'Yes — joining as an entrepreneur is completely free. We charge a small success fee only when your idea receives funding through the platform, keeping our interests aligned with yours.',
  },
  {
    q: 'What kinds of ideas does YEN support?',
    a: 'We support all industries: Technology, Agriculture, Healthcare, Education, Finance, E-commerce, and Sustainability. The only requirement is that you are under 35 and your idea has a viable business model.',
  },
  {
    q: 'How long does it take to get connected with an investor?',
    a: 'Connection requests are typically reviewed within 48 hours. Once accepted, you can schedule a video call directly through your dashboard. Most entrepreneurs have their first investor meeting within 2 weeks.',
  },
  {
    q: 'Can I update my pitch after submitting?',
    a: 'Absolutely. Log in, navigate to your Dashboard, find the idea under My Ideas, and click the edit icon. Updates are reflected immediately.',
  },
];

const CONTACT_METHODS = [
  {
    icon: HiEnvelope,
    label: 'Email Us',
    value: 'silvananjeru25@gmail.com',
    sub: 'We reply within 24 hours',
    link: 'mailto:silvananjeru25@gmail.com',
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
//   {
//     icon: HiChatBubbleLeftRight,
//     label: 'Live Chat',
//     value: 'Chat with our team',
//     sub: 'Available Mon–Fri, 9am–6pm EAT',
//     link: '/livechat',
//     gradient: 'from-teal-500 to-teal-600',
//     bg: 'bg-teal-50',
//   },
  {
    icon: HiPhone,
    label: 'Call Us',
    value: '+254 792 563 775',
    sub: 'Mon–Fri, 8am–5pm EAT',
    link: 'tel:+254792563775',
    gradient: 'from-cyan-500 to-cyan-600',
    bg: 'bg-cyan-50',
  },
  {
    icon: HiMapPin,
    label: 'Visit Us',
    value: 'Nairobi, Kenya',
    sub: 'The Hub, Karen Road',
    link: 'https://www.google.com/maps?q=Nairobi,Kenya',
    gradient: 'from-blue-600 to-teal-500',
    bg: 'bg-blue-50',
  },
];
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-2 rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-teal-300 bg-teal-50/30' : 'border-slate-100 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-semibold text-slate-800 pr-4">{q}</span>
        {open
          ? <HiChevronUp className="w-5 h-5 text-teal-500 flex-shrink-0" />
          : <HiChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

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
            <HiChatBubbleLeftRight className="w-4 h-4 text-teal-300" />
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            We'd Love to{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Whether you have a question, feedback, or just want to say hello — our team is here for you.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,50L60,55C120,60,240,70,360,68C480,65,600,48,720,44C840,40,960,48,1080,52C1200,56,1320,50,1380,46L1440,42L1440,100H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Contact method cards ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
         {CONTACT_METHODS.map((m, i) => (
                <a
                    key={i}
                    href={m.link}
                    target={m.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={`${m.bg} rounded-2xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-white group block`}
                >
              <div className={`w-11 h-11 bg-gradient-to-br ${m.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <m.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{m.label}</div>
              <div className="font-semibold text-slate-800 text-sm">{m.value}</div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <HiClock className="w-3 h-3" />
                {m.sub}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Send a Message
            </h2>
            <p className="text-slate-500 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl shadow-md">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <HiCheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-500">Thanks for reaching out. We'll reply within 24 hours.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-8">
                {error && (
                  <div className="flex items-start gap-3 bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                    <HiXCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-slate-700 font-semibold text-sm mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Silvana Muthoni"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold text-sm mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm bg-white"
                    >
                      <option value="">Select a topic…</option>
                      <option value="general">General Enquiry</option>
                      <option value="investor">Investor Enquiry</option>
                      <option value="mentor">Mentor Application</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold text-sm mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required
                      rows={6}
                      placeholder="Tell us how we can help…"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                    ) : (
                      <><HiEnvelope className="w-5 h-5" />Send Message</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
              Frequently Asked
            </h2>
            <p className="text-slate-500 mb-8">Quick answers to common questions about YEN.</p>
            <div className="space-y-3">
              {FAQS.map((faq, i) => <FAQItem key={i} {...faq} />)}
            </div>

            {/* Community prompt
            <div className="mt-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <HiUserGroup className="w-5 h-5 text-teal-300" />
                <h3 className="font-bold">Join the Community</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                Get instant answers from 10,000+ entrepreneurs in our community forum.
              </p>
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                <HiSparkles className="w-4 h-4 text-teal-300" />
                Join Community Forum
              </button>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes blob { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.1)} 66%{transform:translate(-20px,20px) scale(0.9)} }
        @keyframes fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .animate-blob{animation:blob 7s infinite}
        .animation-delay-2000{animation-delay:2s}
        .animate-fade-in{animation:fade-in 0.8s ease-out}
      `}</style>
    </div>
  );
}