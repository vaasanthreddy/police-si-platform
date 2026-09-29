'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { sanitizeInput, isValidIndianMobile } from '../../lib/security';
import { TargetState, TargetExam, PrimaryLanguage } from '../../lib/types';
import { 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  ShieldAlert,
  Clock,
  Sparkles
} from 'lucide-react';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect') || '';
  const modeParam = searchParams.get('mode');
  const blockedParam = searchParams.get('blocked');
  const reasonParam = searchParams.get('reason');

  const { 
    user,
    role,
    loginStudentWithEmail, 
    loginStudentWithOtp, 
    loginStudentWithGoogle, 
    signupStudent,
    loginAdminWithCredentials,
    loginAdminWithOtp
  } = useAuth();

  // If already logged in, instantly redirect to respective dashboard
  useEffect(() => {
    if (user) {
      const destination = redirectParam || (role === 'ADMIN' ? '/admin' : '/dashboard');
      window.location.href = destination;
    }
  }, [user, role, redirectParam]);

  // Portal selector: 'STUDENT' or 'ADMIN'
  const [portal, setPortal] = useState<'STUDENT' | 'ADMIN'>(
    modeParam === 'admin' || blockedParam ? 'ADMIN' : 'STUDENT'
  );

  // Student mode: 'LOGIN' or 'SIGNUP'
  const [studentMode, setStudentMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  // Student login method: 'EMAIL' | 'PHONE_OTP'
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'PHONE_OTP'>('EMAIL');

  // Admin login method: 'CREDENTIALS' | 'PHONE_OTP'
  const [adminMethod, setAdminMethod] = useState<'CREDENTIALS' | 'PHONE_OTP'>('CREDENTIALS');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Signup fields
  const [name, setName] = useState('');
  const [targetState, setTargetState] = useState<TargetState>('TELANGANA');
  const [targetExam, setTargetExam] = useState<TargetExam>('TSLPRB_SI_CIVIL_AR');
  const [primaryLanguage, setPrimaryLanguage] = useState<PrimaryLanguage>('TELUGU');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Set default credentials on toggle for easy testing
  useEffect(() => {
    if (portal === 'ADMIN') {
      setEmail('admin@police-recruitment.gov.in');
      setPassword('Admin@TS2026!');
      setPhone('9876543210');
    } else {
      if (email.includes('admin')) {
        setEmail('');
        setPassword('');
      }
    }
  }, [portal]);

  const handleSendOtp = (isForAdmin = false) => {
    setErrorMessage(null);
    const targetPhone = isForAdmin ? phone : phone;
    if (!targetPhone || !isValidIndianMobile(targetPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9848022338).');
      return;
    }
    setOtpSent(true);
    setCountdown(60);
    setSuccessMessage(`One Time Password (OTP) dispatched to +91-${targetPhone}. (Demo Hint: Use 542918)`);
  };

  // Student Email Login
  const handleStudentEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (!email) {
      setErrorMessage('Please enter your registered email address.');
      setLoading(false);
      return;
    }

    try {
      await loginStudentWithEmail(sanitizeInput(email), password);
      window.location.href = redirectParam || '/dashboard';
    } catch {
      setErrorMessage('Unable to log in. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Student OTP Login
  const handleStudentOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (!otp || otp.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP received on your mobile.');
      setLoading(false);
      return;
    }

    try {
      const ok = await loginStudentWithOtp(phone, otp);
      if (ok) {
        window.location.href = redirectParam || '/dashboard';
      } else {
        setErrorMessage('Invalid OTP code. Please use 542918 or any 6-digit number.');
      }
    } catch {
      setErrorMessage('Verification failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginStudentWithGoogle();
      window.location.href = redirectParam || '/dashboard';
    } catch {
      setErrorMessage('Google Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  // Student Signup
  const handleStudentSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (!name || (!email && !phone)) {
      setErrorMessage('Please provide your name and either an email or mobile number.');
      setLoading(false);
      return;
    }

    try {
      await signupStudent({
        name: sanitizeInput(name),
        email: sanitizeInput(email) || `${phone}@police-aspirant.in`,
        phone: sanitizeInput(phone) || '9848022338',
        targetState,
        targetExam,
        primaryLanguage,
        gender,
      });
      window.location.href = redirectParam || '/dashboard';
    } catch {
      setErrorMessage('Signup registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Admin Login
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      let success = false;
      if (adminMethod === 'CREDENTIALS') {
        success = await loginAdminWithCredentials(email, password);
      } else {
        success = await loginAdminWithOtp(phone, otp);
      }

      if (success) {
        const dest = (redirectParam && redirectParam.startsWith('/admin')) ? redirectParam : '/admin';
        window.location.href = dest;
      } else {
        setErrorMessage('Invalid administrative credentials. Access restricted to authorized board personnel.');
      }
    } catch {
      setErrorMessage('Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 font-sans">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        
        {/* Emblem Brand */}
        <div className="text-center space-y-3 mb-6">
          <div className="relative w-16 h-16 mx-auto rounded-2xl bg-amber-50 p-1.5 border border-amber-300 shadow-sm flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Police SI Emblem"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {portal === 'STUDENT' ? 'Police SI Candidate Portal' : 'Police Recruitment Board Admin Portal'}
          </h2>
          <p className="text-xs text-slate-500">
            {portal === 'STUDENT' 
              ? 'Sign in to access your personal mock tests, PET logs, and analytics' 
              : 'Restricted administrative access for question banks & paper grading'}
          </p>
        </div>

        {/* Inactivity Alert if session timed out (> 2 hours) */}
        {reasonParam === 'inactivity_timeout' && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Session Auto-Logged Off:</span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                For security reasons, your account was automatically logged off after 2 hours of inactivity. Please log in again to continue your preparation.
              </p>
            </div>
          </div>
        )}

        {/* Admin Clearance Required Alert (when student changed URL to /admin) */}
        {blockedParam && (
          <div className="mb-5 p-3.5 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-xs flex items-start gap-2.5 shadow-sm animate-pulse">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <span className="font-bold">Administrative Clearance Required:</span>
              <p className="text-[11px] text-red-800 mt-0.5">
                You attempted to open the Admin Dashboard. The system redirected you to login because admin privileges are strictly verified. Please sign in with verified Board Administrator credentials.
              </p>
            </div>
          </div>
        )}

        {/* Portal Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 border border-slate-200">
          <button
            type="button"
            onClick={() => {
              setPortal('STUDENT');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              portal === 'STUDENT'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Candidate / Student Portal
          </button>
          <button
            type="button"
            onClick={() => {
              setPortal('ADMIN');
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              portal === 'ADMIN'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-red-700 hover:text-red-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Error and Success Notices */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* 1. STUDENT / CANDIDATE PORTAL */}
        {/* ========================================================= */}
        {portal === 'STUDENT' && (
          <div>
            {/* Student Mode: Login vs Signup */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setStudentMode('LOGIN')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 ${
                  studentMode === 'LOGIN'
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => setStudentMode('SIGNUP')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all border-b-2 ${
                  studentMode === 'SIGNUP'
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                New Aspirant Registration
              </button>
            </div>

            {/* A. STUDENT LOGIN */}
            {studentMode === 'LOGIN' && (
              <div className="space-y-4">
                
                {/* Method selector: Email vs Phone OTP */}
                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pb-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="studentLoginMethod"
                      checked={loginMethod === 'EMAIL'}
                      onChange={() => setLoginMethod('EMAIL')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Email / Gmail</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="studentLoginMethod"
                      checked={loginMethod === 'PHONE_OTP'}
                      onChange={() => setLoginMethod('PHONE_OTP')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Mobile + OTP Verification</span>
                  </label>
                </div>

                {/* EMAIL LOGIN */}
                {loginMethod === 'EMAIL' && (
                  <form onSubmit={handleStudentEmailLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address (or Gmail)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="aspirant@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </span>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Sign In as Candidate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* PHONE + OTP LOGIN */}
                {loginMethod === 'PHONE_OTP' && (
                  <form onSubmit={handleStudentOtpLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-mono text-slate-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9848022338"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSendOtp(false)}
                          disabled={countdown > 0}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-colors whitespace-nowrap"
                        >
                          {countdown > 0 ? `${countdown}s` : otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Enter 6-Digit SMS OTP Code
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <KeyRound className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="542918"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white tracking-widest font-mono text-center font-bold"
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">
                          Demo OTP: <strong className="text-amber-700">542918</strong>
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !otpSent}
                      className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Verify OTP & Open Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* Google Sign In Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2.5 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            )}

            {/* B. STUDENT SIGNUP / REGISTRATION (PRD § 3.1) */}
            {studentMode === 'SIGNUP' && (
              <form onSubmit={handleStudentSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Full Name (as per SSC Memo)
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aspirant@gmail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9848022338"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                {/* Target State & Exam */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target State Board
                    </label>
                    <select
                      value={targetState}
                      onChange={(e) => setTargetState(e.target.value as TargetState)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                    >
                      <option value="TELANGANA">Telangana (TSLPRB)</option>
                      <option value="ANDHRA_PRADESH">Andhra Pradesh (SLPRB)</option>
                      <option value="ALL_INDIA">All State Police Exams</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Recruitment
                    </label>
                    <select
                      value={targetExam}
                      onChange={(e) => setTargetExam(e.target.value as TargetExam)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                    >
                      <option value="TSLPRB_SI_CIVIL_AR">Police SI (Civil & AR)</option>
                      <option value="TSLPRB_SI_TSSP">Police SI (TSSP Battalion)</option>
                      <option value="AP_POLICE_SI_CIVIL">AP Police SI (Civil)</option>
                      <option value="CONSTABLE_GENERAL">Police Constable (Civil/AR)</option>
                    </select>
                  </div>
                </div>

                {/* Language & Gender (for PET standards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Question Language
                    </label>
                    <select
                      value={primaryLanguage}
                      onChange={(e) => setPrimaryLanguage(e.target.value as PrimaryLanguage)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                    >
                      <option value="TELUGU">తెలుగు (Telugu & English)</option>
                      <option value="ENGLISH">English Only</option>
                      <option value="URDU">اردو (Urdu)</option>
                      <option value="HINDI">हिंदी (Hindi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Gender (for PET Standards)
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'MALE' | 'FEMALE')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white font-medium"
                    >
                      <option value="MALE">Male (1600m Run: 7m 15s)</option>
                      <option value="FEMALE">Female (800m Run: 5m 20s)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Complete Registration & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. ADMIN PORTAL (RESTRICTED ACCESS) */}
        {/* ========================================================= */}
        {portal === 'ADMIN' && (
          <div className="space-y-4">
            
            {/* High Security Admin Banner */}
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Restricted Police Recruitment Board Access:</span>
                <p className="text-[11px] text-red-700 mt-0.5">
                  Only authorized system administrators, educators, and descriptive evaluators can access this dashboard.
                </p>
              </div>
            </div>

            {/* Admin Verification Mode */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pb-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="adminMethod"
                  checked={adminMethod === 'CREDENTIALS'}
                  onChange={() => setAdminMethod('CREDENTIALS')}
                  className="text-red-600 focus:ring-red-500"
                />
                <span>Official Admin Email & Password</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="adminMethod"
                  checked={adminMethod === 'PHONE_OTP'}
                  onChange={() => setAdminMethod('PHONE_OTP')}
                  className="text-red-600 focus:ring-red-500"
                />
                <span>Admin Mobile + High-Security OTP</span>
              </label>
            </div>

            {adminMethod === 'CREDENTIALS' ? (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Administrator Email
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@police-recruitment.gov.in"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Administrator Security Passphrase
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Admin@TS2026!"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Default Testing Admin: <strong className="text-red-700">admin@police-recruitment.gov.in</strong> / <strong className="text-red-700">Admin@TS2026!</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credentials & Enter Admin Panel</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin Registered Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-mono text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSendOtp(true)}
                      disabled={countdown > 0}
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold border border-red-200 transition-colors whitespace-nowrap"
                    >
                      {countdown > 0 ? `${countdown}s` : otpSent ? 'Resend' : 'Send Admin OTP'}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Admin Phone: <strong className="text-red-700">9876543210</strong>
                  </p>
                </div>

                {otpSent && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Enter 6-Digit Admin High-Security OTP
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="542918"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:bg-white tracking-widest font-mono text-center font-bold"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      OTP Hint: <strong className="text-red-700">542918</strong>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !otpSent}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify OTP & Access Admin Panel</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto my-24 p-8 text-center text-slate-500 text-xs font-semibold">
        <div className="w-8 h-8 mx-auto mb-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading Verification Portal...</span>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
