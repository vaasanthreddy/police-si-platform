'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { 
  Crown, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building, 
  Sparkles, 
  Lock, 
  Download,
  HelpCircle,
  XCircle,
  Clock,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function UpgradePage() {
  const { user, toggleSubscription } = useAuth();

  // Pricing duration toggle: 'MONTHLY' | 'YEARLY'
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'YEARLY'>('YEARLY');

  // Checkout modal / target plan
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    validity: string;
    tag: string;
  }>({
    id: 'pro-yearly',
    name: 'Police SI Pro 1-Year Pass',
    price: 499,
    originalPrice: 749,
    validity: '365 Days (1 Full Year)',
    tag: 'MOST POPULAR • BEST VALUE',
  });

  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiApp, setUpiApp] = useState<'PHONEPE' | 'GPAY' | 'PAYTM'>('PHONEPE');
  const [processing, setProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleOpenCheckout = (planId: 'monthly' | 'yearly') => {
    if (planId === 'monthly') {
      setSelectedPlan({
        id: 'pro-monthly',
        name: 'Police SI Pro Monthly Sprint',
        price: 99,
        validity: '30 Days Access',
        tag: 'SHORT-TERM REVISION',
      });
    } else {
      setSelectedPlan({
        id: 'pro-yearly',
        name: 'Police SI Pro 1-Year Pass',
        price: 499,
        originalPrice: 749,
        validity: '365 Days (1 Full Year)',
        tag: 'MOST POPULAR • BEST VALUE',
      });
    }
    setPaymentDone(false);
    setCheckoutModalOpen(true);
  };

  const handleSimulatePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      const txId = `TXN-SI-${Math.floor(100000000 + Math.random() * 900000000)}`;
      setTransactionId(txId);
      toggleSubscription();
      setProcessing(false);
      setPaymentDone(true);
    }, 1200);
  };

  const PRICING_FAQS = [
    {
      q: 'Can I switch between Telugu and English during mock tests?',
      a: 'Yes, absolutely! Every question, multiple-choice option, and detailed explanation has a one-click language toggle (English & Telugu, with select papers also in Urdu/Hindi). You can toggle between languages at any time without losing your submitted answers or remaining time.',
    },
    {
      q: 'What is the refund policy if I am not satisfied with the Pro Pass?',
      a: 'We offer an unconditional 7-Day Money-Back Guarantee on the 1-Year Pro Pass. If you have attempted fewer than 2 full-length tests and feel the platform does not meet your standards, simply submit a ticket to our Candidate Support Center within 7 days for a 100% refund with zero cancellation fees.',
    },
    {
      q: 'Does the Pro Pass cover both Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) exams?',
      a: 'Yes! Your subscription gives you unrestricted access to both TSLPRB SI (Civil, AR, SAR CPL, TSSP) and AP SLPRB SI (Civil & APSP) Preliminary Written Tests (PWT), physical efficiency trackers, and Mains descriptive papers.',
    },
    {
      q: 'How does the Descriptive Paper Evaluation work for Mains Paper I & II?',
      a: 'Pro Pass members can download official question sheets for Paper I (English) and Paper II (Telugu/Urdu), write answers on standard A4 lined paper, and upload clear photos or PDF scans. Our panel of retired educators reviews grammar, vocabulary, precis synthesis, and essay structuring with rubrics returned within 48–72 hours.',
    },
    {
      q: 'Can I take the tests on my mobile phone as well as laptop?',
      a: 'Yes. Our platform is completely responsive and optimized for mobile screens (360px–420px), tablets, and desktop computers. You can practice speed drills on your phone during commutes and full 3-hour grand mocks on your PC to simulate real CBT examination halls.',
    },
    {
      q: 'Are GST and platform charges included in the displayed price?',
      a: 'Yes. The displayed prices (₹99 for Monthly, ₹499 for 1-Year Pass) are fully inclusive of 18% GST. You will receive an official tax invoice immediately upon payment completion.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-12 animate-slide-up">
      
      {/* Top Header & Breadcrumb */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>Transparent Aspirant Pricing</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Choose Your Police SI Preparation Pass
          </h1>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Engineered exclusively for Telangana (TSLPRB) and Andhra Pradesh (AP SLPRB) Sub-Inspector and Constable aspirants. Start free or upgrade to unrestricted CBT simulations with faculty-evaluated descriptive feedback.
          </p>
        </div>

        {/* Monthly vs Yearly Billing Switcher */}
        <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold shadow-inner">
          <button
            type="button"
            onClick={() => setBillingCycle('MONTHLY')}
            className={`px-5 py-2 rounded-xl transition-all ${
              billingCycle === 'MONTHLY'
                ? 'bg-white text-slate-900 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Sprint
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('YEARLY')}
            className={`px-5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === 'YEARLY'
                ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1-Year Pass</span>
            <span className="bg-amber-200 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
              Save 33%
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TIERED PRICING CARDS (Free vs Monthly vs Yearly)                       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        
        {/* Tier 1: Free Aspirant */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-slate-300 transition-all">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Forever Free
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-900">Free Aspirant Access</h3>
              <p className="text-xs text-slate-500 mt-1">Foundational daily practice & benchmarks</p>
            </div>

            <div className="pt-2">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                ₹0 <span className="text-xs font-normal text-slate-500">/ No credit card required</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Basic candidate access</p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Daily 10–20 Question Practice Quizzes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5+ Preliminary Sample Mock Tests</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>PET Physical Fitness Tracker (1600m & 800m)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bilingual Questions (Telugu & English)</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="line-through">Full 25+ Grand PWT CBT Mocks</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="line-through">Descriptive Paper Faculty Evaluation</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="w-full block text-center py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px] flex items-center justify-center"
            >
              Start Free Practice
            </Link>
          </div>
        </div>

        {/* Tier 2: Pro Monthly Sprint */}
        <div className={`bg-white border-2 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm transition-all ${
          billingCycle === 'MONTHLY' ? 'border-amber-500 ring-2 ring-amber-200' : 'border-slate-200'
        }`}>
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full uppercase tracking-wider">
              30-Day Revision Sprint
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-900">SI Pro Monthly</h3>
              <p className="text-xs text-slate-500 mt-1">High-intensity 30-day exam sprint</p>
            </div>

            <div className="pt-2">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                ₹99 <span className="text-xs font-normal text-slate-500">/ 30 Days (Incl. GST)</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Full CBT test engine access
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>All 25+ Full-Length PWT CBT Mocks</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complete Official Solved PYQ Archive</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bilingual Telugu & English Explanations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>State-wide Rank & Accuracy Percentile</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Topic-wise Weak Area Diagnostics</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="line-through">Descriptive Paper Faculty Evaluation</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => handleOpenCheckout('monthly')}
              className="w-full py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs uppercase tracking-wider transition-colors min-h-[44px] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Choose Monthly (₹99)</span>
            </button>
          </div>
        </div>

        {/* Tier 3: Pro 1-Year Comprehensive Pass (RECOMMENDED) */}
        <div className="bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
          {/* Top Banner Ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-sm">
            RECOMMENDED
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-amber-900 bg-amber-200 border border-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
                12-Month Unlimited Pass
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                33% OFF
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-1.5">
                <Crown className="w-5 h-5 text-amber-600" />
                <span>SI Pro 1-Year Pass</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Complete multi-stage preparation suite for 365 days</p>
            </div>

            <div className="pt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-700 font-mono">
                  ₹499
                </span>
                <span className="text-sm font-bold text-slate-400 line-through font-mono">
                  ₹749
                </span>
                <span className="text-xs font-semibold text-slate-500">/ 1 Full Year</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-bold mt-1">
                ✓ Inclusive of 18% GST (Total: ₹499.00) • Zero hidden fees
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-amber-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>365 Days Full Access</strong> to all TS & AP police materials</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>25+ Grand PWT CBT Mocks</strong> (200 M with timers)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Mains Descriptive Paper Evaluation</strong> (48–72h turnaround)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Authentic Verified Solved PYQ Archive (2018–2023)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited re-attempts with Personal Error Book</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority Candidate Helpdesk Support (&lt; 24h response)</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>7-Day 100% Money-Back Guarantee</strong></span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={() => handleOpenCheckout('yearly')}
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md min-h-[44px] flex items-center justify-center gap-2 cursor-pointer hover:shadow-amber-500/20"
            >
              <Crown className="w-4 h-4" />
              <span>Unlock 1-Year Pro Pass (₹499)</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. COMPREHENSIVE FEATURE COMPARISON TABLE (Like MockNest)                  */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Side-By-Side Matrix
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Detailed Plan Feature Comparison
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare all features across Free, Monthly Sprint, and 1-Year Comprehensive Pass.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5">Feature / Capability</th>
                  <th className="p-4 sm:p-5 text-center">Free Aspirant</th>
                  <th className="p-4 sm:p-5 text-center">Pro Monthly (₹99)</th>
                  <th className="p-4 sm:p-5 text-center bg-amber-50/80 text-amber-900 border-x border-amber-200">
                    Pro 1-Year Pass (₹499)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Full-Length 3-Hour PWT CBT Mocks (200 Qs)
                  </td>
                  <td className="p-4 text-center text-slate-500">5 Sample Tests</td>
                  <td className="p-4 text-center font-bold text-slate-800">All 25+ Tests</td>
                  <td className="p-4 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200">
                    All 25+ Tests + Live Sunday Mocks
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Official Solved PYQ Archive (TS & AP 2018–2023)
                  </td>
                  <td className="p-4 text-center text-slate-500">1 Solved Paper</td>
                  <td className="p-4 text-center font-bold text-slate-800">All 3 Years Solved</td>
                  <td className="p-4 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200">
                    All Solved PYQs + PDF Keys
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Bilingual Question Medium (Telugu & English)
                  </td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center bg-amber-50/40 border-x border-amber-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Negative Marking Calculation (-0.25 Penalty)
                  </td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center"><CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-4 text-center bg-amber-50/40 border-x border-amber-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Mains Descriptive Evaluation (Paper I & II)
                  </td>
                  <td className="p-4 text-center text-slate-400"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                  <td className="p-4 text-center text-slate-400"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                  <td className="p-4 text-center font-bold text-emerald-700 bg-amber-50/40 border-x border-amber-200">
                    ✓ Unlimited (48–72h Turnaround)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    State Rank & Percentile Prediction
                  </td>
                  <td className="p-4 text-center text-slate-500">Basic Percentile</td>
                  <td className="p-4 text-center font-bold text-slate-800">State-wide Rank</td>
                  <td className="p-4 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200">
                    Real-time All India & State Leaderboard
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Personal Error Book & Unlimited Re-attempts
                  </td>
                  <td className="p-4 text-center text-slate-400"><XCircle className="w-4 h-4 text-slate-300 mx-auto" /></td>
                  <td className="p-4 text-center font-bold text-slate-800">3 Re-attempts</td>
                  <td className="p-4 text-center font-bold text-emerald-700 bg-amber-50/40 border-x border-amber-200">
                    ✓ Unlimited Re-attempts
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    PET 1600m/800m Ground Training Benchmark Tracker
                  </td>
                  <td className="p-4 text-center font-semibold text-slate-700">Basic Timing Log</td>
                  <td className="p-4 text-center font-bold text-slate-800">Qualifying Cutoffs</td>
                  <td className="p-4 text-center font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200">
                    Full Benchmark Log & Score Predictor
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    Validity Duration
                  </td>
                  <td className="p-4 text-center text-slate-600 font-mono">Lifetime</td>
                  <td className="p-4 text-center font-mono font-bold text-slate-800">30 Days</td>
                  <td className="p-4 text-center font-mono font-bold text-amber-900 bg-amber-50/40 border-x border-amber-200">
                    365 Days (1 Full Year)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 sm:p-5 font-semibold text-slate-900">
                    7-Day Money-Back Guarantee
                  </td>
                  <td className="p-4 text-center text-slate-400">—</td>
                  <td className="p-4 text-center text-slate-400">—</td>
                  <td className="p-4 text-center font-bold text-emerald-700 bg-amber-50/40 border-x border-amber-200">
                    ✓ 100% Risk-Free Guarantee
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TRUST & SECURITY BADGES (Inspired by MockNest)                          */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm space-y-1.5">
          <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">7-Day Refund Policy</h4>
          <p className="text-[11px] text-slate-500">100% money back if unsatisfied</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm space-y-1.5">
          <Lock className="w-6 h-6 text-amber-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">256-Bit SSL Encryption</h4>
          <p className="text-[11px] text-slate-500">Direct Razorpay banking rail</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm space-y-1.5">
          <Zap className="w-6 h-6 text-blue-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Instant Activation</h4>
          <p className="text-[11px] text-slate-500">Access unlocked immediately</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm space-y-1.5">
          <Smartphone className="w-6 h-6 text-purple-600 mx-auto" />
          <h4 className="text-xs font-bold text-slate-900">Mobile & PC Ready</h4>
          <p className="text-[11px] text-slate-500">Practice anywhere, anytime</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRICING & SUBSCRIPTION FAQS (Accordion)                                */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Common questions regarding subscription, validity, refund policies, and exam access.
          </p>
        </div>

        <div className="space-y-3">
          {PRICING_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-amber-700 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-slide-up">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CHECKOUT MODAL (Interactive UPI, Card, NetBanking simulation)          */}
      {/* ========================================================================= */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto animate-slide-up">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                  {selectedPlan.tag}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Complete Secure Subscription
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {paymentDone ? (
              /* Payment Success Invoice State */
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900">Payment Successfully Completed!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your account has been upgraded to <strong>{selectedPlan.name}</strong>. All mock tests and modules are now accessible.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-bold text-slate-900">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Plan Subscribed:</span>
                    <span className="font-bold text-slate-900">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-emerald-700 font-mono">₹{selectedPlan.price}.00 (Incl. 18% GST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Validity:</span>
                    <span className="font-bold text-slate-900">{selectedPlan.validity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Method:</span>
                    <span className="font-bold text-slate-900">{selectedMethod} ({upiApp})</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => alert(`Official GST Tax Receipt for ${transactionId} downloaded.`)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Tax Invoice</span>
                  </button>

                  <Link
                    href="/dashboard"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              /* Checkout Selection & Form */
              <div className="space-y-5">
                {/* Selected Plan Summary Banner */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{selectedPlan.name}</h4>
                    <p className="text-xs text-slate-500">{selectedPlan.validity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-700 font-mono">₹{selectedPlan.price}</span>
                    <span className="text-[10px] text-slate-500 block">Total Incl. GST</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-700">Select Payment Rails:</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('UPI')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        selectedMethod === 'UPI' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      <span>UPI / QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('CARD')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        selectedMethod === 'CARD' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <span>Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('NETBANKING')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        selectedMethod === 'NETBANKING' ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <Building className="w-4 h-4 text-amber-600" />
                      <span>NetBanking</span>
                    </button>
                  </div>
                </div>

                {/* UPI App Selection */}
                {selectedMethod === 'UPI' && (
                  <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-600">Choose UPI App:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setUpiApp('PHONEPE')}
                        className={`p-2 rounded-xl border font-bold text-center ${
                          upiApp === 'PHONEPE' ? 'bg-purple-100 border-purple-400 text-purple-900' : 'bg-white border-slate-200'
                        }`}
                      >
                        PhonePe
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiApp('GPAY')}
                        className={`p-2 rounded-xl border font-bold text-center ${
                          upiApp === 'GPAY' ? 'bg-blue-100 border-blue-400 text-blue-900' : 'bg-white border-slate-200'
                        }`}
                      >
                        GPay
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiApp('PAYTM')}
                        className={`p-2 rounded-xl border font-bold text-center ${
                          upiApp === 'PAYTM' ? 'bg-cyan-100 border-cyan-400 text-cyan-900' : 'bg-white border-slate-200'
                        }`}
                      >
                        Paytm
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Guarantee Note */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Backed by our 7-Day Money-Back Guarantee. Cancel anytime with zero fees.</span>
                </div>

                {/* Complete Button */}
                <button
                  type="button"
                  disabled={processing}
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-black text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {processing ? (
                    <span>Processing Secure Gateway...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ₹{selectedPlan.price} & Activate Subscription</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
