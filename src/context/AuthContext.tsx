'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole, SubscriptionTier } from '../lib/types';
import { INITIAL_USER, ADMIN_USER } from '../lib/mockData';
import { authApi } from '../services/api';

const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  sessionExpired: boolean;
  sessionRemainingMs: number;
  loginStudentWithEmail: (email: string, password?: string) => Promise<boolean>;
  loginStudentWithOtp: (phone: string, otp: string) => Promise<boolean>;
  loginStudentWithGoogle: () => Promise<boolean>;
  signupStudent: (profile: Partial<UserProfile>) => Promise<boolean>;
  loginAdminWithCredentials: (email: string, password: string) => Promise<boolean>;
  loginAdminWithOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: (reason?: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  toggleSubscription: () => void;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (phone: string, otp: string) => Promise<boolean>;
  resetSessionExpiryNotice: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('police_si_auth_user');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USER;
  });
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sessionRemainingMs, setSessionRemainingMs] = useState(TWO_HOURS_MS);

  // Helper to set both localStorage and cookie (for Next.js middleware)
  const persistUserSession = (u: UserProfile | null) => {
    setUser(u);
    if (typeof window !== 'undefined') {
      if (u) {
        const serialized = JSON.stringify(u);
        localStorage.setItem('police_si_auth_user', serialized);
        localStorage.setItem('police_si_last_active', Date.now().toString());
        // Set cookie with 2 hour max-age
        document.cookie = `police_si_auth_user=${encodeURIComponent(serialized)}; path=/; max-age=7200; SameSite=Lax`;
      } else {
        localStorage.removeItem('police_si_auth_user');
        localStorage.removeItem('police_si_last_active');
        localStorage.removeItem('police_si_token');
        document.cookie = 'police_si_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
  };

  const logout = useCallback((reason?: string) => {
    persistUserSession(null);
    if (reason === 'inactivity') {
      setSessionExpired(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('police_si_logout_notice', 'Logged out due to 2 hours of inactivity. Please sign in again.');
        if (!window.location.pathname.startsWith('/auth')) {
          window.location.href = '/auth?reason=inactivity_timeout';
        }
      }
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth';
      }
    }
  }, []);

  // Update last active timestamp on user interaction
  const recordUserActivity = useCallback(() => {
    if (!user) return;
    const now = Date.now();
    const last = parseInt(localStorage.getItem('police_si_last_active') || '0', 10);
    // Throttle writing to localStorage to at most once every 15 seconds
    if (now - last > 15000) {
      localStorage.setItem('police_si_last_active', now.toString());
    }
  }, [user]);

  // Initial session restoration and inactivity check
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('police_si_auth_user');
    const lastActiveStr = localStorage.getItem('police_si_last_active');

    if (!saved) {
      persistUserSession(INITIAL_USER);
      return;
    }

    if (lastActiveStr) {
      const lastActive = parseInt(lastActiveStr, 10);
      const elapsed = Date.now() - lastActive;

      if (elapsed > TWO_HOURS_MS) {
        logout('inactivity');
        return;
      }

      setSessionRemainingMs(Math.max(0, TWO_HOURS_MS - elapsed));
    }

    // Attach user activity listeners
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => recordUserActivity();

    activityEvents.forEach((evt) => window.addEventListener(evt, handleActivity, { passive: true }));

    // Periodic check every 30 seconds for 2-hour inactivity
    const intervalId = setInterval(() => {
      const activeStr = localStorage.getItem('police_si_last_active');
      if (activeStr) {
        const lastActive = parseInt(activeStr, 10);
        const elapsed = Date.now() - lastActive;
        setSessionRemainingMs(Math.max(0, TWO_HOURS_MS - elapsed));

        if (elapsed > TWO_HOURS_MS) {
          logout('inactivity');
        }
      }
    }, 30000);

    return () => {
      activityEvents.forEach((evt) => window.removeEventListener(evt, handleActivity));
      clearInterval(intervalId);
    };
  }, [logout, recordUserActivity]);

  // Student Email Login
  const loginStudentWithEmail = async (email: string, password?: string): Promise<boolean> => {
    const studentUser: UserProfile = {
      ...INITIAL_USER,
      email: email.trim(),
      name: email.split('@')[0].replace(/[._-]/g, ' ').toUpperCase(),
      role: 'STUDENT',
      rollNumber: `TS-SI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    persistUserSession(studentUser);
    localStorage.setItem('police_si_token', 'tslprb_jwt_student_email_session');
    return true;
  };

  // Student Phone + OTP Login
  const loginStudentWithOtp = async (phone: string, otp: string): Promise<boolean> => {
    if (otp === '542918' || otp.length === 6) {
      const studentUser: UserProfile = {
        ...INITIAL_USER,
        phone: phone.trim(),
        role: 'STUDENT',
        rollNumber: `TS-SI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      };
      persistUserSession(studentUser);
      localStorage.setItem('police_si_token', 'tslprb_jwt_student_otp_session');
      return true;
    }
    return false;
  };

  // Student Google Login
  const loginStudentWithGoogle = async (): Promise<boolean> => {
    const googleUser: UserProfile = {
      ...INITIAL_USER,
      email: 'aspirant.google@gmail.com',
      name: 'P. Sai Kumar (Google Verified)',
      role: 'STUDENT',
      rollNumber: `TS-SI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    persistUserSession(googleUser);
    localStorage.setItem('police_si_token', 'tslprb_jwt_student_google_session');
    return true;
  };

  // Student Signup
  const signupStudent = async (profile: Partial<UserProfile>): Promise<boolean> => {
    const newStudent: UserProfile = {
      id: `usr_${Date.now()}`,
      name: profile.name?.trim() || 'SI Aspirant',
      email: profile.email?.trim() || 'aspirant@police-si.gov.in',
      phone: profile.phone?.trim() || '9848022338',
      role: 'STUDENT',
      targetState: profile.targetState || 'TELANGANA',
      targetExam: profile.targetExam || 'TSLPRB_SI_CIVIL_AR',
      primaryLanguage: profile.primaryLanguage || 'TELUGU',
      gender: profile.gender || 'MALE',
      subscriptionTier: 'FREE',
      rollNumber: `TS-SI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredAt: new Date().toISOString(),
    };
    persistUserSession(newStudent);
    localStorage.setItem('police_si_token', 'tslprb_jwt_student_signup_session');
    return true;
  };

  // Admin Login with Credentials
  const loginAdminWithCredentials = async (email: string, password: string): Promise<boolean> => {
    // Validate admin credentials
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail.includes('admin') || password === 'Admin@TS2026!' || password === 'admin123') {
      const admin: UserProfile = {
        ...ADMIN_USER,
        email: cleanEmail,
        name: 'Superintendent / Admin Control Officer',
        role: 'ADMIN',
      };
      persistUserSession(admin);
      localStorage.setItem('police_si_token', 'tslprb_jwt_admin_clearance_token');
      return true;
    }
    return false;
  };

  // Admin Login with Phone + OTP
  const loginAdminWithOtp = async (phone: string, otp: string): Promise<boolean> => {
    const cleanPhone = phone.replace(/\D/g, '');
    if ((cleanPhone === '9876543210' || cleanPhone.endsWith('3210')) && (otp === '542918' || otp === '998877')) {
      const admin: UserProfile = {
        ...ADMIN_USER,
        phone: cleanPhone,
        name: 'Board Admin Officer',
        role: 'ADMIN',
      };
      persistUserSession(admin);
      localStorage.setItem('police_si_token', 'tslprb_jwt_admin_clearance_token');
      return true;
    }
    return false;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    persistUserSession(updated);

    authApi.updateProfile(updated).catch(() => {
      // Offline fallback
    });
  };

  const toggleSubscription = () => {
    if (!user) return;
    const newTier: SubscriptionTier = user.subscriptionTier === 'PREMIUM' ? 'FREE' : 'PREMIUM';
    persistUserSession({ ...user, subscriptionTier: newTier });
  };

  const sendOtp = async (phone: string): Promise<boolean> => {
    try {
      await authApi.sendOtp(phone);
      return true;
    } catch {
      return true;
    }
  };

  const verifyOtp = async (phone: string, otp: string): Promise<boolean> => {
    return loginStudentWithOtp(phone, otp);
  };

  const resetSessionExpiryNotice = () => {
    setSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        sessionExpired,
        sessionRemainingMs,
        loginStudentWithEmail,
        loginStudentWithOtp,
        loginStudentWithGoogle,
        signupStudent,
        loginAdminWithCredentials,
        loginAdminWithOtp,
        logout,
        updateProfile,
        toggleSubscription,
        sendOtp,
        verifyOtp,
        resetSessionExpiryNotice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
