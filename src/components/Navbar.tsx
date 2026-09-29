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
  User
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Accessible keys must ONLY appear inside active dashboard / portal pages (NOT on home '/' and NOT on '/auth')
  const isAuthPage = pathname.startsWith('/auth');
  const isHomePage = pathname === '/';
  const showAccessibleKeys = !isHomePage && !isAuthPage && !!user;
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand (Always Present) */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-xl bg-amber-50/80 p-1 border border-amber-200 shadow-sm group-hover:border-amber-400 transition-all flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Police SI Emblem Logo"
                width={42}
                height={42}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  POLICE <span className="text-amber-600">SI</span>
                </span>
                <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  TSLPRB & AP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wide font-medium">
                Recruitment Exam & PET Platform
              </p>
            </div>
          </Link>

          {/* ========================================================================= */}
          {/* TOP BAR ACCESSIBLE KEYS                                                   */}
          {/* Completely hidden on Home ('/') and Auth ('/auth') pages.                  */}
          {/* Appear ONLY when user opens respective student account or admin page.      */}
          {/* ========================================================================= */}
          {showAccessibleKeys && (
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg text-xs font-bold transition-colors hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Home className="w-4 h-4 text-slate-500" />
                <span>Home</span>
              </Link>

              {isAdminPage ? (
                /* Admin Specific Accessible Keys */
                <>
                  <Link
                    href="/admin"
                    className="bg-red-50 text-red-900 border border-red-300 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-red-700" />
                    <span>Admin Control</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg text-xs font-bold transition-colors hover:bg-slate-100 flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    <span>Student View</span>
                  </Link>
                </>
              ) : (
                /* Student Specific Accessible Keys */
                <>
                  <Link
                    href="/dashboard"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      pathname === '/dashboard'
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-700" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    href="/exam/tslprb-si-pwt-mock-01"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname.startsWith('/exam')
                        ? 'bg-blue-50 text-blue-900 border border-blue-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Mock Tests</span>
                  </Link>

                  <Link
                    href="/previous-papers"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/previous-papers'
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Archive className="w-4 h-4 text-amber-700" />
                    <span>Previous Papers</span>
                  </Link>

                  <Link
                    href="/results"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/results'
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Results</span>
                  </Link>

                  <Link
                    href="/performance"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/performance'
                        ? 'bg-purple-50 text-purple-900 border border-purple-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                    <span>Performance</span>
                  </Link>

                  <Link
                    href="/pet-tracker"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/pet-tracker'
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>PET Tracker</span>
                  </Link>

                  <Link
                    href="/descriptive"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/descriptive'
                        ? 'bg-purple-50 text-purple-900 border border-purple-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span>Descriptive</span>
                  </Link>

                  <Link
                    href="/leaderboard"
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                      pathname === '/leaderboard'
                        ? 'bg-amber-50 text-amber-900 border border-amber-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Leaderboard</span>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Right Side: Auth / Profile Button */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative flex items-center gap-2">
                {/* On home page, give a quick button to go directly to their dashboard */}
                {isHomePage && (
                  <Link
                    href={role === 'ADMIN' ? '/admin' : '/dashboard'}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{role === 'ADMIN' ? 'Go to Admin Panel' : 'Go to My Dashboard'}</span>
                  </Link>
                )}

                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-300 transition-all text-left shadow-sm"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="leading-tight">
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
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Candidate / Admin Login</span>
              </Link>
            )}

            {showAccessibleKeys && (
              <div className="flex md:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Menu (Only when accessible keys are active) */}
      {showAccessibleKeys && mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Home
          </Link>

          {isAdminPage ? (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-red-900 bg-red-50 border border-red-200"
            >
              Admin Control Panel
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-900 bg-amber-50 border border-amber-200"
              >
                My Student Dashboard
              </Link>
              <Link
                href="/exam/tslprb-si-pwt-mock-01"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Mock Tests (200 M)
              </Link>
              <Link
                href="/previous-papers"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Previous Year Papers (PYQ)
              </Link>
              <Link
                href="/results"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Results Tool (Scorecards)
              </Link>
              <Link
                href="/performance"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Performance Analysis
              </Link>
              <Link
                href="/pet-tracker"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                PET / PMT Physical Tracker
              </Link>
              <Link
                href="/descriptive"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Descriptive Evaluation
              </Link>
              <Link
                href="/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                State Leaderboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                My Profile
              </Link>
              <Link
                href="/upgrade"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50"
              >
                Upgrade to Pro Pass
              </Link>
            </>
          )}

          <div className="pt-3 border-t border-slate-200">
            {user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({user.name.split(' ')[0]})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
