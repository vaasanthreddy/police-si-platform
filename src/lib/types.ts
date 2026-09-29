export type UserRole = 'STUDENT' | 'ADMIN' | 'CONTENT_CREATOR';

export type TargetState = 'TELANGANA' | 'ANDHRA_PRADESH' | 'ALL_INDIA';

export type TargetExam = 
  | 'TSLPRB_SI_CIVIL_AR'
  | 'TSLPRB_SI_TSSP'
  | 'AP_POLICE_SI_CIVIL'
  | 'AP_POLICE_SI_AR_APSP'
  | 'CONSTABLE_GENERAL';

export type PrimaryLanguage = 'ENGLISH' | 'TELUGU' | 'URDU' | 'HINDI';

export type SubscriptionTier = 'FREE' | 'PREMIUM';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  targetState: TargetState;
  targetExam: TargetExam;
  primaryLanguage: PrimaryLanguage;
  gender: 'MALE' | 'FEMALE';
  subscriptionTier: SubscriptionTier;
  rollNumber: string;
  registeredAt: string;
  avatarUrl?: string;
}

export type ExamType = 
  | 'PRELIMS_PWT' 
  | 'MAINS_PAPER_1_ENGLISH' 
  | 'MAINS_PAPER_2_REGIONAL' 
  | 'MAINS_PAPER_3_ARITHMETIC_REASONING' 
  | 'MAINS_PAPER_4_GENERAL_STUDIES'
  | 'DAILY_QUIZ';

export interface Question {
  id: string;
  subject: string;
  topic: string;
  questionText: string;
  questionTextTelugu?: string;
  questionTextHindi?: string;
  questionTextUrdu?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
    textTelugu?: string;
    textHindi?: string;
    textUrdu?: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationTelugu?: string;
  explanationHindi?: string;
  explanationUrdu?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  marks: number;
  negativeMarks: number;
}

export interface Exam {
  id: string;
  title: string;
  titleTelugu?: string;
  titleHindi?: string;
  titleUrdu?: string;
  examType: ExamType;
  durationMins: number;
  totalMarks: number;
  totalQuestions: number;
  negativeMarking: boolean;
  negativeMarkRate: number; // e.g. 0.25
  isBilingual: boolean;
  targetState: TargetState;
  isPremiumOnly: boolean;
  isPreviousPaper?: boolean;
  year?: number;
  questions: Question[];
}

export interface PreviousPaper {
  id: string;
  examId: string;
  title: string;
  state: TargetState;
  year: number;
  examShift: string;
  totalMarks: number;
  durationMins: number;
  totalQuestions: number;
  downloadPdfUrl?: string;
  isSolved: boolean;
}

export interface UserAttempt {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  startedAt: string;
  completedAt?: string;
  score: number;
  totalMarks: number;
  accuracy: number; // Percentage
  timeSpentSeconds: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED' | 'FLAGGED_CHEATING';
  stateRank?: number;
  answers: Record<string, {
    selectedOption?: 'A' | 'B' | 'C' | 'D';
    isCorrect?: boolean;
    timeTakenSeconds: number;
    markedForReview: boolean;
  }>;
}

export type PetEventType = 
  | 'RUN_1600M' 
  | 'RUN_800M' 
  | 'SPRINT_100M' 
  | 'LONG_JUMP' 
  | 'SHOT_PUT' 
  | 'HIGH_JUMP';

export interface PetLogEntry {
  id: string;
  userId: string;
  eventType: PetEventType;
  metricValue: number; // Seconds for runs, meters for jumps/throws
  unit: 'seconds' | 'meters';
  loggedDate: string;
  isQualified: boolean;
  notes?: string;
}

export interface PetStandard {
  eventType: PetEventType;
  label: string;
  gender: 'MALE' | 'FEMALE';
  qualifyingStandard: number; // max seconds for run, min meters for jumps
  unit: string;
  description: string;
  marksScale?: { metric: number; marks: number }[];
}

export interface DescriptiveSubmission {
  id: string;
  userId: string;
  candidateName: string;
  candidateRoll: string;
  paperType: 'PAPER_I_ENGLISH' | 'PAPER_II_TELUGU';
  paperTitle?: string;
  topic: string;
  typedContent?: string;
  scannedImageUrl?: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'EVALUATED';
  marksAwarded?: number;
  maxMarks: number;
  evaluatorRemarks?: string;
  rubricScores?: {
    contentRelevance: number; // out of 15
    vocabularyGrammar: number; // out of 15
    organizationStructure: number; // out of 10
    expressionStyle: number; // out of 10
  };
}

export interface LeaderboardRank {
  rank: number;
  userId: string;
  name: string;
  rollNumber: string;
  targetState: TargetState;
  score: number;
  accuracy: number;
  timeTakenMins: number;
  avatarUrl?: string;
}

// =========================================================================
// PRD SECTION 6: HIGH-LEVEL SQL DATABASE SCHEMA MAPPING (IMAGE 3)
// Direct typed entities for backend SQL/Prisma/PostgreSQL integration
// =========================================================================
export interface DbUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'STUDENT' | 'ADMIN' | 'CONTENT_CREATOR';
  target_state: string;
}

export interface DbQuestion {
  id: string;
  subject_id: string;
  question_text: string;
  options: { key: string; text: string; textTelugu?: string; textHindi?: string; textUrdu?: string }[];
  correct_answer: string;
  explanation: string;
  question_translations?: {
    telugu?: string;
    hindi?: string;
    urdu?: string;
  };
}

export interface DbExam {
  id: string;
  title: string;
  exam_type: string;
  duration_mins: number;
  total_marks: number;
}

export interface DbExamQuestion {
  exam_id: string;
  question_id: string;
  section_name: string;
}

export interface DbUserAttempt {
  id: string;
  user_id: string;
  exam_id: string;
  score: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';
  started_at: string;
}

export interface DbAttemptAnswer {
  attempt_id: string;
  question_id: string;
  selected_option: string;
  time_taken: number;
  is_correct: boolean;
}

export interface DbPetLog {
  id: string;
  user_id: string;
  event_type: string;
  metric_value: number;
  logged_date: string;
}

// Performance & Analytics Types
export interface SubjectPerformance {
  subject: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  averageTimeSeconds: number;
  status: 'STRONG' | 'AVERAGE' | 'WEAK';
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  amount: number;
  planName: string;
  paymentMethod: 'UPI' | 'PHONEPE' | 'GPAY' | 'CARD' | 'NETBANKING';
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  paidAt: string;
  validUntil: string;
}

// Universal convenience aliases matching PRD Section 6 terminology
export type User = UserProfile;
export type PetLog = PetLogEntry;
export type LeaderboardEntry = LeaderboardRank;

