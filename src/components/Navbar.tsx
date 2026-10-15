'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { 
  Award, 
  Activity, 
  FileText, 
  Menu, 
  X, 
  LogOut, 
  Crown, 
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  Home,
  Archive,
  BarChart3,
  User,
  CreditCard,
  Calendar,
  Bell,
  Sun,
  Moon,
  Headphones,
  CheckCircle2,
  Send,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportModalOpen, setSupportModalOpen] = useState(false);

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Support ticket form state
  const [supportForm, setSupportForm] = useState({
    name: '',
    identifier: '',
    category: 'TECHNICAL',
    message: ''
  });
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Sample live notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'TSLPRB SI Prelims 2026 Expected Schedule',
      desc: 'Official notification announcement anticipated soon. 200 Questions PWT mock series active.',
      tag: 'TSLPRB SI',
      unread: true,
      time: 'Just now',
      href: '/calendar'
    },
    {
      id: 2,
      title: 'AP Police SI Preliminary Mock Test 1 Live',
      desc: 'Full-length 3-hour bilingual simulator is available for free candidate practice.',
      tag: 'AP SLPRB',
      unread: true,
      time: '2h ago',
      href: '/calendar'
    },
    {
      id: 3,
      title: 'PET Physical Training Standards Updated',
      desc: '1600m & 800m qualifying cutoffs calibrated with official recruitment board norms.',
      tag: 'PET STANDARDS',
      unread: false,
      time: '1d ago',
      href: '/pet-tracker'
    }
  ]);

  // Sync theme with localStorage & document root
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.message.trim()) return;
    const generated = `TKT-SI-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generated);
    setSupportSubmitted(true);
  };

  const isHomePage = pathname === '/';
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 p-1 border border-amber-200 dark:border-amber-800 shadow-sm group-hover:border-amber-400 transition-all flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="Police SI Emblem Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-xs sm:text-base lg:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors uppercase leading-tight">
                    POLICE SI <span className="text-amber-600">EXAM PREPARATION PLATFORM</span>
                  </span>
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block shrink-0">
                    TSLPRB & AP
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 tracking-wide font-medium truncate max-w-[200px] sm:max-w-none">
                  Exam Preparation & Physical Efficiency Testing Portal
                </p>
              </div>
            </Link>

            {/* ========================================================================= */}
            {/* MAIN NAVIGATION DESKTOP                                                  */}
            {/* ========================================================================= */}
            <div className="hidden lg:flex items-center gap-1">
              {/* If in dashboard, provide dashboard button */}
              {user && (
                <Link
                  href={role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                    pathname === '/dashboard' || pathname === '/admin'
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-600" />
                  <span>{role === 'ADMIN' ? 'Admin Panel' : 'My Dashboard'}</span>
                </Link>
              )}

              {/* 1. Mock Tests */}
              <Link
                href="/exam/tslprb-si-pwt-mock-01"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname.startsWith('/exam')
                    ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Mock Tests</span>
              </Link>

              {/* 2. Previous Papers */}
              <Link
                href="/previous-papers"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname === '/previous-papers'
                    ? 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Archive className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                <span>Previous Papers</span>
              </Link>

              {/* 3. Exam Calendar (Added from user request) */}
              <Link
                href="/calendar"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname === '/calendar'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Calendar</span>
              </Link>

              {/* 4. PET Tracker */}
              <Link
                href="/pet-tracker"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname === '/pet-tracker'
                    ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>PET Tracker</span>
              </Link>

              {/* 5. Pricing */}
              <Link
                href="/upgrade"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname === '/upgrade'
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-600" />
                <span>Pricing</span>
              </Link>

              {/* 6. More Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {moreDropdownOpen && (
                  <div 
                    onMouseLeave={() => setMoreDropdownOpen(false)}
                    className="absolute left-0 top-full mt-1.5 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in duration-100"
                  >
                    <Link
                      href="/results"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Award className="w-4 h-4 text-emerald-600" />
                      <span>Exam Results & Scorecard</span>
                    </Link>

                    <Link
                      href="/performance"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-800 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <span>Performance Analytics</span>
                    </Link>

                    <Link
                      href="/descriptive"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-800 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span>Descriptive Paper Submissions</span>
                    </Link>

                    <Link
                      href="/leaderboard"
                      onClick={() => setMoreDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>Sample State Leaderboard</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* RIGHT SIDE: Theme Toggle + Notification Bell + Profile Column             */}
            {/* ========================================================================= */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* 1. Theme Toggle (Light / Dark) */}
              <button
                type="button"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} theme`}
                className="p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-slate-700 hover:text-amber-600 transition-colors" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
                )}
              </button>

              {/* 2. Notification Symbol (Bell Icon beside profile) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  title="Exam Notifications & Alerts"
                  className="relative p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center"
                  aria-label="View exam notifications"
                >
                  <Bell className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                  )}
                </button>

                {/* Notification Dropdown Popover */}
                {notificationsOpen && (
                  <div 
                    onMouseLeave={() => setNotificationsOpen(false)}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in duration-100"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-amber-600" />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Exam Alerts & Updates
                        </h4>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsAsRead}
                          className="text-[10px] font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                      {notifications.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setNotificationsOpen(false)}
                          className={`block p-2.5 rounded-xl border transition-all text-left ${
                            item.unread 
                              ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50' 
                              : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300">
                              {item.tag}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{item.time}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">
                            {item.desc}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                      <Link
                        href="/calendar"
                        onClick={() => setNotificationsOpen(false)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        <span>Open Full Exam Calendar</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Profile Column / Sign-in */}
              {user ? (
                <div className="relative flex items-center gap-2">
                  {isHomePage && (
                    <Link
                      href={role === 'ADMIN' ? '/admin' : '/dashboard'}
                      className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px]"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>{role === 'ADMIN' ? 'Admin Panel' : 'My Dashboard'}</span>
                    </Link>
                  )}

                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-all text-left shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px]"
                    aria-label="User profile options"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="leading-tight hidden sm:block">
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                        <span>{user.name.split(' ')[0]}</span>
                        {user.subscriptionTier === 'PREMIUM' && (
                          <Crown className="w-3 h-3 text-amber-600 inline" />
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        {role === 'ADMIN' ? 'OFFICER' : user.rollNumber}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdown && (
                    <div 
                      onMouseLeave={() => setProfileDropdown(false)}
                      className="absolute right-0 top-12 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in duration-100"
                    >
                      <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email || user.phone}</p>
                        <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                          <span className="font-semibold text-slate-600 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                            {role}
                          </span>
                          <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                            {user.targetState}
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        {role === 'STUDENT' ? (
                          <>
                            <Link
                              href="/dashboard"
                              onClick={() => setProfileDropdown(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg"
                            >
                              <LayoutDashboard className="w-4 h-4 text-amber-600" />
                              <span>Student Dashboard</span>
                            </Link>

                            <Link
                              href="/profile"
                              onClick={() => setProfileDropdown(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg"
                            >
                              <User className="w-4 h-4 text-blue-600" />
                              <span>My Profile & Cadre</span>
                            </Link>

                            <Link
                              href="/upgrade"
                              onClick={() => setProfileDropdown(false)}
                              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-800 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg font-bold"
                            >
                              <Crown className="w-4 h-4 text-amber-600" />
                              <span>Upgrade to Pro Pass</span>
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/admin"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-red-800 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg"
                          >
                            <ShieldCheck className="w-4 h-4 text-red-600" />
                            <span>Admin Control Panel</span>
                          </Link>
                        )}

                        {/* Theme row in profile dropdown */}
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left"
                        >
                          <div className="flex items-center gap-2">
                            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-500" /> : <Sun className="w-4 h-4 text-amber-400" />}
                            <span>{theme === 'light' ? 'Dark Theme' : 'Light Theme'}</span>
                          </div>
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {theme}
                          </span>
                        </button>

                        {/* Help & Support item in profile dropdown (Moved from footer per user request) */}
                        <button
                          type="button"
                          onClick={() => {
                            setProfileDropdown(false);
                            setSupportModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 rounded-lg text-left cursor-pointer"
                        >
                          <Headphones className="w-4 h-4 text-amber-600" />
                          <span>Help & Support</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            setProfileDropdown(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out Session</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSupportModalOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-amber-600" />
                    <span>Help & Support</span>
                  </button>

                  <Link
                    href="/auth"
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[40px]"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Toggle */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[40px] min-w-[40px] flex items-center justify-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE HORIZONTAL QUICK CHIP BAR                                          */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs font-bold scrollbar-none">
          {user && (
            <Link
              href={role === 'ADMIN' ? '/admin' : '/dashboard'}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
                pathname === '/dashboard' || pathname === '/admin' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          )}
          <Link
            href="/exam/tslprb-si-pwt-mock-01"
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
              pathname.startsWith('/exam') ? 'bg-blue-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Mock Tests</span>
          </Link>
          <Link
            href="/calendar"
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
              pathname === '/calendar' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </Link>
          <Link
            href="/previous-papers"
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
              pathname === '/previous-papers' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Previous Papers</span>
          </Link>
          <Link
            href="/pet-tracker"
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
              pathname === '/pet-tracker' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>PET Tracker</span>
          </Link>
          <Link
            href="/upgrade"
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[40px] ${
              pathname === '/upgrade' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pricing</span>
          </Link>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Home</span>
            </Link>

            <Link
              href="/exam/tslprb-si-pwt-mock-01"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Mock Tests</span>
            </Link>

            <Link
              href="/calendar"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>Exam Calendar & Alerts</span>
            </Link>

            <Link
              href="/previous-papers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
            >
              <Archive className="w-4 h-4 text-amber-700" />
              <span>Previous Papers (PYQ)</span>
            </Link>

            <Link
              href="/pet-tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px]"
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>PET Tracker Standards</span>
            </Link>

            <Link
              href="/upgrade"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 min-h-[44px]"
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Pricing (SI Pro Pass)</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSupportModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[44px] text-left"
            >
              <Headphones className="w-4 h-4 text-amber-600" />
              <span>Help & Support Desk</span>
            </button>

            {!user && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <Link
                  href="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Candidate Portal</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* ========================================================================= */}
      {/* CANDIDATE HELP & SUPPORT TICKET MODAL (Accessible from Profile Column)     */}
      {/* ========================================================================= */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <button
              type="button"
              onClick={() => {
                setSupportModalOpen(false);
                setSupportSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close support dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {supportSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Ticket Submitted Successfully!</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Your reference number is <strong className="text-amber-600 font-mono text-sm">{ticketId}</strong>.
                  </p>
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Our academic and technical coordinators will review your query and respond via email/SMS within 12–24 hours.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSupportModalOpen(false);
                      setSupportSubmitted(false);
                      setSupportForm({ name: '', identifier: '', category: 'TECHNICAL', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">Help & Support Desk</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Direct assistance for SI mock tests, answer keys & account queries.
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSupportSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Candidate Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={supportForm.name || (user?.name || '')}
                      onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Roll No / Hall Ticket No
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 24SI-48201"
                        value={supportForm.identifier || (user?.rollNumber || '')}
                        onChange={(e) => setSupportForm({ ...supportForm, identifier: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Query Category
                      </label>
                      <select
                        value={supportForm.category}
                        onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      >
                        <option value="TECHNICAL">CBT Mock Test Simulator</option>
                        <option value="QUESTION">Question Key Discrepancy</option>
                        <option value="PAYMENT">Pro Pass & Payment</option>
                        <option value="CALENDAR">Exam Calendar & Dates</option>
                        <option value="PET">PET Ground Tracker</option>
                        <option value="OTHER">Other Assistance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Describe your query or issue
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please mention the test title, question number, or payment transaction ID..."
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSupportModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-600/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Ticket</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
