/**
 * Police SI Examination Platform - Domain API Services
 * Provides strongly-typed frontend contracts for backend integration.
 * Backend engineers can implement these matching REST endpoints in Express/Node.js/PostgreSQL.
 */

import { apiClient, ApiResponse } from './apiClient';
import { 
  User, 
  Question, 
  Exam, 
  UserAttempt, 
  PetLog, 
  DescriptiveSubmission, 
  LeaderboardEntry,
  TargetState,
  TargetExam,
  PrimaryLanguage
} from '../lib/types';

// ==========================================
// 1. AUTHENTICATION & PROFILE APIS (PRD 3.1)
// ==========================================
export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface AuthResponseData {
  user: User;
  token: string;
  refreshToken: string;
}

export const authApi = {
  /**
   * Request OTP verification code to mobile number
   */
  sendOtp: (phone: string): Promise<ApiResponse<{ message: string; testOtpHint?: string }>> => {
    return apiClient.post('/auth/otp', { phone });
  },

  /**
   * Verify OTP and receive JWT access token
   */
  verifyOtp: (phone: string, otp: string): Promise<ApiResponse<AuthResponseData>> => {
    return apiClient.post('/auth/verify', { phone, otp });
  },

  /**
   * Get current authenticated user session
   */
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return apiClient.get('/auth/me');
  },

  /**
   * Update candidate onboarding preferences & target state
   */
  updateProfile: (profile: Partial<User>): Promise<ApiResponse<User>> => {
    return apiClient.put('/auth/me', profile);
  },

  /**
   * Terminate active user session
   */
  logout: (): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.post('/auth/logout');
  },
};

// ==========================================
// 2. EXAM & CBT PRACTICE ENGINE APIS (PRD 3.2, 4)
// ==========================================
export interface SubmitExamPayload {
  examId: string;
  answers: Record<string, { selectedOption?: 'A' | 'B' | 'C' | 'D'; timeSpentSeconds?: number }>;
  timeSpentSeconds: number;
  tabSwitchViolations: number;
}

export interface ExamEvaluationResult {
  attemptId: string;
  examId: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  grossScore: number;
  penaltyMarks: number;
  finalScore: number;
  accuracyPercentage: number;
  stateRankEstimate: number;
  percentile: number;
  subjectBreakdown: Array<{
    subject: string;
    total: number;
    correct: number;
    score: number;
  }>;
}

export const examsApi = {
  /**
   * Fetch list of available mock tests (PWT, Mains Paper 1-4, Daily Quizzes)
   */
  getExams: (params?: { examType?: string; state?: TargetState }): Promise<ApiResponse<Exam[]>> => {
    return apiClient.get('/exams', params);
  },

  /**
   * Fetch full exam details including question bank & bilingual content
   */
  getExamById: (examId: string): Promise<ApiResponse<Exam>> => {
    return apiClient.get(`/exams/${examId}`);
  },

  /**
   * Submit completed CBT mock exam and trigger automated grading
   */
  submitExam: (payload: SubmitExamPayload): Promise<ApiResponse<ExamEvaluationResult>> => {
    return apiClient.post(`/exams/${payload.examId}/submit`, payload);
  },

  /**
   * Fetch candidate's previous attempt history and analytics
   */
  getMyAttempts: (): Promise<ApiResponse<UserAttempt[]>> => {
    return apiClient.get('/exams/attempts');
  },
};

// ==========================================
// 3. PHYSICAL EFFICIENCY TEST (PET) APIS (PRD 3.3)
// ==========================================
export interface CreatePetLogPayload {
  eventType: 'RUN_1600M' | 'RUN_800M' | 'SPRINT_100M' | 'LONG_JUMP' | 'SHOT_PUT';
  metricValue: number;
  date?: string;
  notes?: string;
}

export interface PetSummary {
  logs: PetLog[];
  qualifyingStatus: {
    run1600m: { qualified: boolean; bestTimeSec: number; targetSec: number };
    run800m: { qualified: boolean; bestTimeSec: number; targetSec: number };
    longJump: { qualified: boolean; bestDistanceMeters: number; targetMeters: number };
    shotPut: { qualified: boolean; bestDistanceMeters: number; targetMeters: number };
  };
}

export const petApi = {
  /**
   * Get candidate's PET logs & qualifying status
   */
  getLogs: (gender?: string): Promise<ApiResponse<PetSummary>> => {
    return apiClient.get('/pet', { gender });
  },

  /**
   * Record a new physical training log
   */
  createLog: (payload: CreatePetLogPayload): Promise<ApiResponse<PetLog>> => {
    return apiClient.post('/pet', payload);
  },

  /**
   * Remove a mistaken PET entry
   */
  deleteLog: (logId: string): Promise<ApiResponse<{ message: string }>> => {
    return apiClient.delete(`/pet/${logId}`);
  },
};

// ==========================================
// 4. DESCRIPTIVE EVALUATION APIS (PRD 3.2, 4)
// ==========================================
export interface SubmitDescriptivePayload {
  paperType: 'PAPER_1_ENGLISH' | 'PAPER_2_TELUGU';
  questionTitle: string;
  typedContent?: string;
  uploadedFileUrl?: string;
  candidateNotes?: string;
}

export const descriptiveApi = {
  /**
   * Get all descriptive submissions for current student
   */
  getSubmissions: (): Promise<ApiResponse<DescriptiveSubmission[]>> => {
    return apiClient.get('/descriptive');
  },

  /**
   * Submit essay / précis for AI or examiner grading
   */
  submitEssay: (payload: SubmitDescriptivePayload): Promise<ApiResponse<DescriptiveSubmission>> => {
    return apiClient.post('/descriptive', payload);
  },
};

// ==========================================
// 5. LEADERBOARD APIS (PRD 3.4)
// ==========================================
export const leaderboardApi = {
  /**
   * Fetch standardized state-wide ranking matrix
   */
  getLeaderboard: (params?: { state?: string; search?: string }): Promise<ApiResponse<LeaderboardEntry[]>> => {
    return apiClient.get('/leaderboard', params);
  },
};

// ==========================================
// 6. ADMIN & FACULTY CONTROL APIS (PRD 3.4)
// ==========================================
export interface AdminStats {
  totalAspirants: number;
  telanganaCandidates: number;
  apCandidates: number;
  totalExamsDelivered: number;
  totalQuestionsInBank: number;
  pendingDescriptiveReviews: number;
  monthlyRevenueInr: number;
  activeProPassSubscribers: number;
}

export interface CandidateDirectoryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  targetExam: string;
  tier: 'FREE' | 'PREMIUM';
  roll: string;
  testsAttempted: number;
  status: 'ACTIVE' | 'SUSPENDED';
}

export const adminApi = {
  /**
   * Get executive KPIs and platform telemetry
   */
  getStats: (): Promise<ApiResponse<AdminStats>> => {
    return apiClient.get('/admin/stats');
  },

  /**
   * Bulk ingest question bank via CSV format
   */
  bulkUploadQuestions: (csvString: string): Promise<ApiResponse<{ count: number; sampleImported: Question[] }>> => {
    return apiClient.post('/admin/questions/upload', { csvContent: csvString });
  },

  /**
   * Fetch candidate directory with filters
   */
  getCandidates: (params?: { search?: string; state?: string }): Promise<ApiResponse<CandidateDirectoryItem[]>> => {
    return apiClient.get('/admin/candidates', params);
  },

  /**
   * Update candidate tier or status
   */
  updateCandidateStatus: (candidateId: string, updates: Partial<CandidateDirectoryItem>): Promise<ApiResponse<CandidateDirectoryItem>> => {
    return apiClient.patch(`/admin/candidates/${candidateId}`, updates);
  },

  /**
   * Grade descriptive submission and post remarks
   */
  gradeDescriptiveSubmission: (
    submissionId: string, 
    marksAwarded: number, 
    remarks: string
  ): Promise<ApiResponse<DescriptiveSubmission>> => {
    return apiClient.post(`/descriptive/${submissionId}/evaluate`, { marksAwarded, remarks });
  },

  /**
   * Get payment transactions ledger
   */
  getPayments: (): Promise<ApiResponse<any[]>> => {
    return apiClient.get('/admin/payments');
  },
};

export const api = {
  auth: authApi,
  exams: examsApi,
  pet: petApi,
  descriptive: descriptiveApi,
  leaderboard: leaderboardApi,
  admin: adminApi,
};
