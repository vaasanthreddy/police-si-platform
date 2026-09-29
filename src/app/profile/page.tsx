'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { TargetState, TargetExam, PrimaryLanguage } from '../../lib/types';
import { 
  User, 
  ArrowLeft, 
  ShieldCheck, 
  Crown, 
  Languages, 
  CheckCircle2, 
  Smartphone, 
  Mail, 
  Sparkles,
  CreditCard,
  Save
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || 'Vasu Reddy');
  const [email, setEmail] = useState(user?.email || 'vasu.si.aspirant@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '9848022338');
  const [targetState, setTargetState] = useState<TargetState>(user?.targetState || 'TELANGANA');
  const [targetExam, setTargetExam] = useState<TargetExam>(user?.targetExam || 'TSLPRB_SI_CIVIL_AR');
  const [primaryLanguage, setPrimaryLanguage] = useState<PrimaryLanguage>(user?.primaryLanguage || 'TELUGU');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      targetState,
      targetExam,
      primaryLanguage,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2.5">
            <User className="w-8 h-8 text-amber-600" />
            <span>Candidate Aspirant Profile</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your recruitment details, target cadre, roll number, and bilingual language preference.
          </p>
        </div>

        <Link
          href="/upgrade"
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          <span>{user?.subscriptionTier === 'PREMIUM' ? 'Active Pro Member' : 'Upgrade to Pro Pass'}</span>
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Profile configuration updated successfully! Changes saved across all exam engines.</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* User Identity Banner */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white font-black text-xl flex items-center justify-center shadow-md">
            {(name || 'C').slice(0, 2).toUpperCase()}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-lg font-bold text-slate-900">{name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                {user?.subscriptionTier === 'PREMIUM' ? 'PRO PASS SUBSCRIBER' : 'FREE ASPIRANT'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Roll No: <strong>{user?.rollNumber || 'TS-SI-2026-8841'}</strong> • Registered: {user?.registeredAt || '2026-08-15'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name (as per SSC memo)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Mobile Number (OTP Verified)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50 font-mono"
              />
            </div>

            {/* Second / Regional Language Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Preferred Regional / Second Language
              </label>
              <select
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value as PrimaryLanguage)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50 font-semibold"
              >
                <option value="TELUGU">Telugu (తెలుగు) - TSLPRB / AP Official</option>
                <option value="HINDI">Hindi (हिन्दी) - Central & State Police</option>
                <option value="URDU">Urdu (اردو) - TSLPRB Regional Option</option>
                <option value="ENGLISH">English Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Recruitment State
              </label>
              <select
                value={targetState}
                onChange={(e) => setTargetState(e.target.value as TargetState)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50 font-semibold"
              >
                <option value="TELANGANA">Telangana State Level Police Recruitment Board (TSLPRB)</option>
                <option value="ANDHRA_PRADESH">Andhra Pradesh Police Recruitment Board (AP Police)</option>
                <option value="ALL_INDIA">All India Combined Mock Access</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Cadre
              </label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 bg-slate-50/50 font-semibold"
              >
                <option value="TSLPRB_SI_CIVIL_AR">Sub-Inspector (Civil, AR, SAR CPL)</option>
                <option value="TSLPRB_SI_TSSP">Telangana State Special Police (TSSP)</option>
                <option value="AP_POLICE_SI_CIVIL">AP Police Sub-Inspector (Civil)</option>
                <option value="AP_POLICE_SI_AR_APSP">AP Police (AR & APSP Battalions)</option>
                <option value="CONSTABLE_GENERAL">Police Constable (Civil & Armed)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
