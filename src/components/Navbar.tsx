'use client';

import React, { useState } from 'react';
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
  CreditCard
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const isAuthPage = pathname.startsWith('/auth');
  const isHomePage = pathname === '/';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl p-1">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50/80 p-1 border border-amber-200 shadow-sm group-hover:border-amber-400 transition-all flex items-center justify-center shrink-0">
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
                <span className="font-extrabold text-xs sm:text-base lg:text-lg tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors uppercase leading-tight">
                  POLICE SI <span className="text-amber-600">EXAM PREPARATION PLATFORM</span>
                </span>
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block shrink-0">
                  TSLPRB & AP
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 tracking-wide font-medium truncate max-w-[200px] sm:max-w-none">
                Exam Preparation & Physical Efficiency Testing Portal
              </p>
            </div>
          </Link>

          {/* ========================================================================= */}
          {/* MAIN NAVIGATION (Item 3: Mock Tests, Previous Papers, PET Tracker,        */}
          {/* Pricing, with secondary links in 'More' dropdown menu)                    */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex items-center gap-1.5">
            {/* If in dashboard, provide dashboard button */}
            {user && (
              <Link
                href={role === 'ADMIN' ? '/admin' : '/dashboard'}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                  pathname === '/dashboard' || pathname === '/admin'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
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
                  ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Archive className="w-4 h-4 text-amber-700" />
              <span>Previous Papers</span>
            </Link>

            {/* 3. PET Tracker */}
            <Link
              href="/pet-tracker"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                pathname === '/pet-tracker'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>PET Tracker</span>
            </Link>

            {/* 4. Pricing */}
            <Link
              href="/upgrade"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none ${
                pathname === '/upgrade'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>Pricing</span>
            </Link>

            {/* 5. More Dropdown (Secondary Links) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div 
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute left-0 top-full mt-1.5 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in duration-100"
                >
                  <Link
                    href="/results"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl"
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Exam Results & Scorecard</span>
                  </Link>

                  <Link
                    href="/performance"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-purple-800 hover:bg-purple-50 rounded-xl"
                  >
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <span>Performance Analytics</span>
                  </Link>

                  <Link
                    href="/descriptive"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-purple-800 hover:bg-purple-50 rounded-xl"
                  >
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Descriptive Paper Submissions</span>
                  </Link>

                  <Link
                    href="/leaderboard"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
                  >
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Sample State Leaderboard</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Auth / Profile Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {user ? (
              <div className="relative flex items-center gap-2">
                {isHomePage && (
                  <Link
                    href={role === 'ADMIN' ? '/admin' : '/dashboard'}
                    className="hidden sm:inline-flex px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{role === 'ADMIN' ? 'Admin Panel' : 'My Dashboard'}</span>
                  </Link>
                )}

                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-all text-left shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
                  aria-label="User profile options"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="leading-tight hidden sm:block">
                    <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                      <span>{user.name.split(' ')[0]}</span>
                      {user.subscriptionTier === 'PREMIUM' && (
                        <Crown className="w-3 h-3 text-amber-600 inline" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {role === 'ADMIN' ? 'OFFICER' : user.rollNumber}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {profileDropdown && (
                  <div 
                    onMouseLeave={() => setProfileDropdown(false)}
                    className="absolute right-0 top-12 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in duration-100"
                  >
                    <div className="px-3 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email || user.phone}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                        <span className="font-semibold text-slate-600 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                          {role}
                        </span>
                        <span className="font-semibold text-amber-700 uppercase bg-amber-50 px-1.5 py-0.5 rounded">
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
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg"
                          >
                            <LayoutDashboard className="w-4 h-4 text-amber-600" />
                            <span>Student Dashboard</span>
                          </Link>

                          <Link
                            href="/profile"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg"
                          >
                            <User className="w-4 h-4 text-blue-600" />
                            <span>My Profile & Cadre</span>
                          </Link>

                          <Link
                            href="/upgrade"
                            onClick={() => setProfileDropdown(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-50 rounded-lg font-bold"
                          >
                            <Crown className="w-4 h-4 text-amber-600" />
                            <span>Upgrade to Pro Pass</span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          href="/admin"
                          onClick={() => setProfileDropdown(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-red-800 hover:bg-red-50 rounded-lg"
                        >
                          <ShieldCheck className="w-4 h-4 text-red-600" />
                          <span>Admin Control Panel</span>
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileDropdown(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out Session</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[44px]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle (Item 11: Min 44px touch target) */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HORIZONTAL QUICK CHIP BAR (Item 11: 360px-390px responsive)        */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs font-bold scrollbar-none">
        {user && (
          <Link
            href={role === 'ADMIN' ? '/admin' : '/dashboard'}
            className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
              pathname === '/dashboard' || pathname === '/admin' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        )}
        <Link
          href="/exam/tslprb-si-pwt-mock-01"
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
            pathname.startsWith('/exam') ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Mock Tests</span>
        </Link>
        <Link
          href="/previous-papers"
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
            pathname === '/previous-papers' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Archive className="w-3.5 h-3.5" />
          <span>Previous Papers</span>
        </Link>
        <Link
          href="/pet-tracker"
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
            pathname === '/pet-tracker' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>PET Tracker</span>
        </Link>
        <Link
          href="/upgrade"
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
            pathname === '/upgrade' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Pricing</span>
        </Link>
        <Link
          href="/leaderboard"
          className={`px-3 py-2 rounded-xl whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 min-h-[44px] ${
            pathname === '/leaderboard' ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Leaderboard</span>
        </Link>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 min-h-[44px]"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Home</span>
          </Link>

          <Link
            href="/exam/tslprb-si-pwt-mock-01"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 min-h-[44px]"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Mock Tests</span>
          </Link>

          <Link
            href="/previous-papers"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 min-h-[44px]"
          >
            <Archive className="w-4 h-4 text-amber-700" />
            <span>Previous Papers (PYQ)</span>
          </Link>

          <Link
            href="/pet-tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 min-h-[44px]"
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>PET Tracker Standards</span>
          </Link>

          <Link
            href="/upgrade"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold text-amber-800 bg-amber-50 border border-amber-200 min-h-[44px]"
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Pricing (SI Pro Pass)</span>
          </Link>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
              Secondary Tools
            </span>
            <Link
              href="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Results & Scorecards</span>
            </Link>
            <Link
              href="/performance"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
            >
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Performance Analytics</span>
            </Link>
            <Link
              href="/descriptive"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
            >
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Descriptive Paper Submissions</span>
            </Link>
            <Link
              href="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg min-h-[44px]"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>State Leaderboard (Simulated)</span>
            </Link>
          </div>

          {!user && (
            <div className="pt-3 border-t border-slate-200">
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
  );
};
