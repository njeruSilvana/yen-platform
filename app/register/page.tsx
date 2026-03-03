'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import { authAPI } from '@/lib/api';
import {
  HiUser, HiEnvelope, HiLockClosed, HiCheckCircle,
  HiXCircle, HiAcademicCap, HiCurrencyDollar, HiRocketLaunch,
  HiBriefcase, HiClock, HiChartBar,
} from 'react-icons/hi2';

const ROLES = [
  {
    value: 'entrepreneur',
    label: 'Entrepreneur',
    icon: HiRocketLaunch,
    description: 'Pitch your ideas and find funding',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    value: 'mentor',
    label: 'Mentor',
    icon: HiAcademicCap,
    description: 'Guide entrepreneurs with your expertise',
    color: 'from-blue-500 to-blue-600',
  },
  {
    value: 'investor',
    label: 'Investor',
    icon: HiCurrencyDollar,
    description: 'Fund promising ideas and startups',
    color: 'from-cyan-500 to-teal-600',
  },
];

const EXPERTISE_OPTIONS = [
  'Business Strategy', 'Product Development', 'Digital Marketing',
  'Financial Planning', 'Tech Leadership', 'Sales & Growth',
  'Legal & Compliance', 'Operations', 'UI/UX Design', 'Data & Analytics',
];

const INVESTOR_TYPE_OPTIONS = [
  'Angel Investor', 'VC Partner', 'Fund Manager', 'Private Equity', 'Corporate Investor',
];

const INVESTMENT_FOCUS_OPTIONS = [
  'Pre-Seed', 'Seed Stage', 'Early Stage', 'Series A', 'Series B', 'Growth Stage',
];

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name:            '',
    email:           '',
    password:        '',
    confirmPassword: '',
    role:            'entrepreneur',
    // Mentor fields
    expertise:       '',
    experience:      '',
    // Investor fields
    investmentRange: '',
    investmentFocus: '',
    investorType:    '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Build payload — only include role-specific fields that are relevant
      const payload: any = {
        name:     formData.name.trim(),
        email:    formData.email.trim(),
        password: formData.password,
        role:     formData.role,
      };

      if (formData.role === 'mentor') {
        payload.expertise  = formData.expertise;
        payload.experience = formData.experience;
      }

      if (formData.role === 'investor') {
        payload.investmentRange = formData.investmentRange;
        payload.investmentFocus = formData.investmentFocus;
        payload.investorType    = formData.investorType;
      }

      const response = await authAPI.register(payload);

      if (response.success && response.data) {
        // Save user + token to localStorage
        localStorage.setItem('user',  JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        setError(response.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('Connection error. Please ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white overflow-hidden pt-32 pb-24 px-6">
        <div className="relative max-w-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Join <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">YEN Platform</span>
          </h1>
          <p className="text-blue-100 text-lg">Create your account and start your journey</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,40L48,45C96,50,192,60,288,58C384,55,480,38,576,34C672,30,768,38,864,42C960,46,1056,46,1152,42C1248,38,1344,30,1392,26L1440,22L1440,80H0Z" />
          </svg>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 py-12 -mt-2">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {success ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <HiCheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Account Created!</h2>
              <p className="text-slate-500">Redirecting to your dashboard…</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-3">
                  <HiXCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ── Role selector ──────────────────────────────────────────── */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-3">I am a…</label>
                  <div className="grid grid-cols-3 gap-3">
                    {ROLES.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, role: r.value }))}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.role === r.value
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${r.color} rounded-lg flex items-center justify-center`}>
                          <r.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-sm font-semibold ${formData.role === r.value ? 'text-teal-700' : 'text-slate-600'}`}>
                          {r.label}
                        </span>
                        <span className="text-xs text-slate-400 text-center leading-tight">{r.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Base fields ────────────────────────────────────────────── */}
                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <HiUser className="w-4 h-4 text-teal-500" /> Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text" name="name" value={formData.name}
                    onChange={handleChange} required
                    placeholder="e.g. Silva Akinyi"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <HiEnvelope className="w-4 h-4 text-teal-500" /> Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email" name="email" value={formData.email}
                    onChange={handleChange} required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                      <HiLockClosed className="w-4 h-4 text-teal-500" /> Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password" name="password" value={formData.password}
                      onChange={handleChange} required minLength={6}
                      placeholder="Min. 6 characters"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                      <HiLockClosed className="w-4 h-4 text-teal-500" /> Confirm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password" name="confirmPassword" value={formData.confirmPassword}
                      onChange={handleChange} required
                      placeholder="Repeat password"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                {/* ── Mentor-specific fields ─────────────────────────────────── */}
                {formData.role === 'mentor' && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-4">
                    <h3 className="font-bold text-blue-800 flex items-center gap-2">
                      <HiAcademicCap className="w-5 h-5" /> Mentor Profile
                    </h3>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiBriefcase className="w-4 h-4 text-blue-500" /> Area of Expertise <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="expertise" value={formData.expertise}
                        onChange={handleChange} required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white transition-colors"
                      >
                        <option value="">Select your expertise…</option>
                        {EXPERTISE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiClock className="w-4 h-4 text-blue-500" /> Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" name="experience" value={formData.experience}
                        onChange={handleChange} required
                        placeholder="e.g. 5+ Years, 10 Years"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* ── Investor-specific fields ───────────────────────────────── */}
                {formData.role === 'investor' && (
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 space-y-4">
                    <h3 className="font-bold text-teal-800 flex items-center gap-2">
                      <HiCurrencyDollar className="w-5 h-5" /> Investor Profile
                    </h3>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiChartBar className="w-4 h-4 text-teal-500" /> Investor Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="investorType" value={formData.investorType}
                        onChange={handleChange} required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white transition-colors"
                      >
                        <option value="">Select investor type…</option>
                        {INVESTOR_TYPE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiCurrencyDollar className="w-4 h-4 text-teal-500" /> Investment Range <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text" name="investmentRange" value={formData.investmentRange}
                        onChange={handleChange} required
                        placeholder="e.g. $10K – $100K"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                        <HiChartBar className="w-4 h-4 text-teal-500" /> Investment Focus <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="investmentFocus" value={formData.investmentFocus}
                        onChange={handleChange} required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 bg-white transition-colors"
                      >
                        <option value="">Select focus stage…</option>
                        {INVESTMENT_FOCUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-cyan-600 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account…</>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <p className="text-center text-slate-500 text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}