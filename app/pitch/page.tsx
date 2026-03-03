'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  HiLightBulb,
  HiTag,
  HiCurrencyDollar,
  HiDocumentText,
  HiXCircle,
  HiCheckCircle,
  HiArrowLeft,
  HiPaperAirplane,
  HiInformationCircle,
  HiSparkles,
} from 'react-icons/hi2';

const CATEGORIES = [
  { label: 'Technology', icon: '💻' },
  { label: 'Agriculture', icon: '🌱' },
  { label: 'Healthcare', icon: '🏥' },
  { label: 'Education', icon: '🎓' },
  { label: 'Finance', icon: '💳' },
  { label: 'E-commerce', icon: '🛒' },
  { label: 'Sustainability', icon: '♻️' },
];

const TIPS = [
  { icon: HiLightBulb, text: 'Be clear and concise about the problem you are solving' },
  { icon: HiSparkles, text: 'Explain your unique solution and competitive advantage' },
  { icon: HiDocumentText, text: 'Include market research and potential impact' },
  { icon: HiCurrencyDollar, text: 'Be realistic about funding needs and timeline' },
];

export default function Pitch() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    fundingGoal: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'description') setCharCount(value.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.description.length < 100) {
      setError('Description must be at least 100 characters.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          fundingGoal: parseFloat(formData.fundingGoal),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/ideas'), 2000);
      } else {
        setError('Failed to submit idea. Please try again.');
      }
    } catch {
      setError('Connection error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-24 px-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-16 -left-16 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <HiLightBulb className="w-4 h-4 text-teal-300" />
            Share Your Vision
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Pitch Your{' '}
            <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Idea
            </span>
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Share your innovative business concept with investors and mentors around the world
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L48,45C96,50,192,60,288,58C384,55,480,38,576,34C672,30,768,38,864,42C960,46,1056,46,1152,42C1248,38,1344,30,1392,26L1440,22L1440,80H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="max-w-6xl mx-auto px-6 py-12 -mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Form ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Success state */}
              {success && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <HiCheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Pitch Submitted!</h2>
                  <p className="text-slate-500">Redirecting you to Browse Ideas…</p>
                </div>
              )}

              {!success && (
                <>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <HiDocumentText className="w-6 h-6 text-teal-500" />
                    Your Pitch Details
                  </h2>

                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                      <HiXCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiLightBulb className="w-4 h-4 text-teal-500" />
                        Idea Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Mobile App for Local Farmers"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-3">
                        <HiTag className="w-4 h-4 text-teal-500" />
                        Category <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat.label}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, category: cat.label }))}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                              formData.category === cat.label
                                ? 'border-teal-500 bg-teal-50 text-teal-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            <span>{cat.icon}</span>
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiDocumentText className="w-4 h-4 text-teal-500" />
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={7}
                        placeholder="Describe your business idea, target market, unique value proposition, and how it solves a problem…"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors resize-none"
                      />
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${charCount < 100 ? 'text-red-400' : 'text-green-500'}`}>
                          {charCount < 100
                            ? `${100 - charCount} more characters needed`
                            : '✓ Minimum length reached'}
                        </span>
                        <span className="text-xs text-slate-400">{charCount} chars</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-1.5 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            charCount < 100 ? 'bg-red-400' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((charCount / 100) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Funding Goal */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiCurrencyDollar className="w-4 h-4 text-teal-500" />
                        Funding Goal (USD) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
                        <input
                          type="number"
                          name="fundingGoal"
                          value={formData.fundingGoal}
                          onChange={handleChange}
                          required
                          min="100"
                          step="100"
                          placeholder="50,000"
                          className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                        />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">How much funding do you need to get started?</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <HiPaperAirplane className="w-4 h-4" />
                            Submit Pitch
                          </>
                        )}
                      </button>
                      <Link
                        href="/ideas"
                        className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300"
                      >
                        <HiArrowLeft className="w-4 h-4" />
                        Cancel
                      </Link>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Tips panel */}
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 font-bold text-lg mb-5">
                <HiInformationCircle className="w-5 h-5 text-teal-200" />
                Tips for a Great Pitch
              </div>
              <ul className="space-y-4">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-4 h-4 text-teal-200" />
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">{tip.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submission checklist */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HiCheckCircle className="w-5 h-5 text-teal-500" />
                Submission Checklist
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Descriptive title', done: formData.title.length > 5 },
                  { label: 'Category selected', done: !!formData.category },
                  { label: '100+ character description', done: charCount >= 100 },
                  { label: 'Funding goal set', done: !!formData.fundingGoal },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {item.done
                      ? <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      : <div className="w-5 h-5 border-2 border-slate-200 rounded-full flex-shrink-0" />
                    }
                    <span className={item.done ? 'text-green-700 font-medium' : 'text-slate-500'}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who's reading */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                Who will see your pitch?
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Angel Investors', count: '200+', color: 'bg-blue-100 text-blue-700' },
                  { label: 'Expert Mentors', count: '500+', color: 'bg-teal-100 text-teal-700' },
                  { label: 'Entrepreneurs', count: '10K+', color: 'bg-cyan-100 text-cyan-700' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
      `}</style>
    </div>
  );
}