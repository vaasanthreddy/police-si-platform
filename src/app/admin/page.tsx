'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { AdminCsvUploader } from '../../components/AdminCsvUploader';
import { SAMPLE_QUESTIONS, INITIAL_DESCRIPTIVE_SUBMISSIONS, MOCK_PREVIOUS_PAPERS } from '../../lib/mockData';
import { Question, DescriptiveSubmission, PreviousPaper } from '../../lib/types';
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  Users, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Award, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ShieldAlert,
  Database,
  Code,
  Archive,
  Upload,
  FileUp,
  Download,
  Copy,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, role } = useAuth();

  // Strict Security Route Guard: If not admin, redirect to login
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      router.replace('/auth?mode=admin&redirect=/admin&blocked=admin_clearance_required');
    }
  }, [user, router]);

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PREVIOUS_PAPERS' | 'CSV_UPLOAD' | 'QUESTION_BANK' | 'CANDIDATES' | 'DESCRIPTIVE_GRADING' | 'PAYMENTS' | 'BACKEND_DOCS'>('OVERVIEW');
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [submissions, setSubmissions] = useState<DescriptiveSubmission[]>(INITIAL_DESCRIPTIVE_SUBMISSIONS);
  const [searchQuery, setSearchQuery] = useState('');

  // PYQ Previous Papers State
  const [previousPapersList, setPreviousPapersList] = useState<PreviousPaper[]>(MOCK_PREVIOUS_PAPERS);
  const [pyqMode, setPyqMode] = useState<'SINGLE' | 'BULK' | 'LIST'>('SINGLE');
  const [pyqUploadSuccess, setPyqUploadSuccess] = useState<string | null>(null);

  // Single Question Upload Form State (Multilingual: EN, TE, HI, UR)
  const [singlePyqState, setSinglePyqState] = useState<'TSLPRB' | 'AP_POLICE'>('TSLPRB');
  const [singlePyqYear, setSinglePyqYear] = useState<number>(2022);
  const [singlePyqPaperType, setSinglePyqPaperType] = useState('PWT Prelims (200 M)');
  const [singlePyqSubject, setSinglePyqSubject] = useState('General Studies');
  const [singlePyqTopic, setSinglePyqTopic] = useState('Telangana Movement & State Formation');
  const [singlePyqTextEn, setSinglePyqTextEn] = useState('');
  const [singlePyqTextTe, setSinglePyqTextTe] = useState('');
  const [singlePyqTextHi, setSinglePyqTextHi] = useState('');
  const [singlePyqTextUr, setSinglePyqTextUr] = useState('');
  const [singlePyqOptA_En, setSinglePyqOptA_En] = useState('');
  const [singlePyqOptA_Te, setSinglePyqOptA_Te] = useState('');
  const [singlePyqOptA_Hi, setSinglePyqOptA_Hi] = useState('');
  const [singlePyqOptA_Ur, setSinglePyqOptA_Ur] = useState('');
  const [singlePyqOptB_En, setSinglePyqOptB_En] = useState('');
  const [singlePyqOptB_Te, setSinglePyqOptB_Te] = useState('');
  const [singlePyqOptB_Hi, setSinglePyqOptB_Hi] = useState('');
  const [singlePyqOptB_Ur, setSinglePyqOptB_Ur] = useState('');
  const [singlePyqOptC_En, setSinglePyqOptC_En] = useState('');
  const [singlePyqOptC_Te, setSinglePyqOptC_Te] = useState('');
  const [singlePyqOptC_Hi, setSinglePyqOptC_Hi] = useState('');
  const [singlePyqOptC_Ur, setSinglePyqOptC_Ur] = useState('');
  const [singlePyqOptD_En, setSinglePyqOptD_En] = useState('');
  const [singlePyqOptD_Te, setSinglePyqOptD_Te] = useState('');
  const [singlePyqOptD_Hi, setSinglePyqOptD_Hi] = useState('');
  const [singlePyqOptD_Ur, setSinglePyqOptD_Ur] = useState('');
  const [singlePyqCorrectOpt, setSinglePyqCorrectOpt] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [singlePyqExpEn, setSinglePyqExpEn] = useState('');
  const [singlePyqExpTe, setSinglePyqExpTe] = useState('');
  const [singlePyqExpHi, setSinglePyqExpHi] = useState('');
  const [singlePyqExpUr, setSinglePyqExpUr] = useState('');
  const [singlePyqMarks, setSinglePyqMarks] = useState<number>(1.0);
  const [singlePyqNegative, setSinglePyqNegative] = useState<number>(0.25);

  // Bulky Upload State
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [bulkFileName, setBulkFileName] = useState<string>('');
  const [bulkTargetExam, setBulkTargetExam] = useState<string>('TSLPRB SI 2022 PWT Solved Paper');
  const [bulkUploadStatus, setBulkUploadStatus] = useState<'IDLE' | 'PROCESSING' | 'DONE'>('IDLE');
  const [bulkParsedCount, setBulkParsedCount] = useState<number>(0);

  // Sample candidates list for User Management (PRD 3.4)
  const [candidates, setCandidates] = useState([
    { id: '1', name: 'Vasu Reddy', email: 'vasu.si.aspirant@gmail.com', phone: '9848022338', state: 'Telangana', targetExam: 'TSLPRB SI Civil', tier: 'PREMIUM', roll: 'TS-SI-2026-8841', testsAttempted: 14 },
    { id: '2', name: 'B. Manoj Kumar', email: 'manoj.kumar@gmail.com', phone: '9440122334', state: 'Telangana', targetExam: 'TSLPRB SI AR', tier: 'PREMIUM', roll: 'TS-SI-2026-1029', testsAttempted: 19 },
    { id: '3', name: 'P. Sneha Latha', email: 'sneha.ap@gmail.com', phone: '9849123456', state: 'Andhra Pradesh', targetExam: 'AP Police SI', tier: 'PREMIUM', roll: 'AP-SI-2026-5514', testsAttempted: 12 },
    { id: '4', name: 'K. Sai Kiran', email: 'saikiran.k@gmail.com', phone: '9908123456', state: 'Telangana', targetExam: 'TSLPRB SI TSSP', tier: 'FREE', roll: 'TS-SI-2026-3112', testsAttempted: 3 },
    { id: '5', name: 'M. Divya Jyothi', email: 'divya.police@gmail.com', phone: '9701123456', state: 'Telangana', targetExam: 'TSLPRB SI Civil', tier: 'FREE', roll: 'TS-SI-2026-4431', testsAttempted: 5 },
  ]);

  // Descriptive grading modal state
  const [gradingSubmission, setGradingSubmission] = useState<DescriptiveSubmission | null>(null);
  const [awardedMarks, setAwardedMarks] = useState<number>(40);
  const [evalRemarks, setEvalRemarks] = useState<string>('');

  const handleSaveGrade = () => {
    if (!gradingSubmission) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === gradingSubmission.id
          ? {
              ...s,
              status: 'EVALUATED',
              marksAwarded: awardedMarks,
              evaluatorRemarks: evalRemarks || 'Scored according to official TSLPRB board rubric standards.',
            }
          : s
      )
    );
    setGradingSubmission(null);
  };

  const handleSaveSinglePyq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singlePyqTextEn.trim()) {
      alert('Please enter English Question text.');
      return;
    }

    const newQ: Question = {
      id: `pyq-${Date.now()}`,
      subject: singlePyqSubject,
      topic: singlePyqTopic,
      difficulty: 'MEDIUM',
      questionText: singlePyqTextEn,
      questionTextTelugu: singlePyqTextTe || undefined,
      questionTextHindi: singlePyqTextHi || undefined,
      questionTextUrdu: singlePyqTextUr || undefined,
      options: [
        { key: 'A', text: singlePyqOptA_En || 'Option A', textTelugu: singlePyqOptA_Te, textHindi: singlePyqOptA_Hi, textUrdu: singlePyqOptA_Ur },
        { key: 'B', text: singlePyqOptB_En || 'Option B', textTelugu: singlePyqOptB_Te, textHindi: singlePyqOptB_Hi, textUrdu: singlePyqOptB_Ur },
        { key: 'C', text: singlePyqOptC_En || 'Option C', textTelugu: singlePyqOptC_Te, textHindi: singlePyqOptC_Hi, textUrdu: singlePyqOptC_Ur },
        { key: 'D', text: singlePyqOptD_En || 'Option D', textTelugu: singlePyqOptD_Te, textHindi: singlePyqOptD_Hi, textUrdu: singlePyqOptD_Ur }
      ],
      correctAnswer: singlePyqCorrectOpt,
      explanation: singlePyqExpEn || 'Official TSLPRB / AP Police Key Explanation.',
      explanationTelugu: singlePyqExpTe || undefined,
      explanationHindi: singlePyqExpHi || undefined,
      explanationUrdu: singlePyqExpUr || undefined,
      marks: singlePyqMarks,
      negativeMarks: singlePyqNegative
    };

    setQuestions((prev) => [newQ, ...prev]);
    setPyqUploadSuccess(`Question successfully added to ${singlePyqState} ${singlePyqYear} Archive!`);

    // Reset fields
    setSinglePyqTextEn('');
    setSinglePyqTextTe('');
    setSinglePyqTextHi('');
    setSinglePyqTextUr('');
    setSinglePyqOptA_En(''); setSinglePyqOptA_Te(''); setSinglePyqOptA_Hi(''); setSinglePyqOptA_Ur('');
    setSinglePyqOptB_En(''); setSinglePyqOptB_Te(''); setSinglePyqOptB_Hi(''); setSinglePyqOptB_Ur('');
    setSinglePyqOptC_En(''); setSinglePyqOptC_Te(''); setSinglePyqOptC_Hi(''); setSinglePyqOptC_Ur('');
    setSinglePyqOptD_En(''); setSinglePyqOptD_Te(''); setSinglePyqOptD_Hi(''); setSinglePyqOptD_Ur('');
    setSinglePyqExpEn(''); setSinglePyqExpTe(''); setSinglePyqExpHi(''); setSinglePyqExpUr('');

    setTimeout(() => setPyqUploadSuccess(null), 4000);
  };

  const handleBulkPyqUpload = () => {
    if (!bulkFile && !bulkFileName) {
      alert('Please choose a CSV or JSON file to upload.');
      return;
    }
    setBulkUploadStatus('PROCESSING');
    setTimeout(() => {
      setBulkUploadStatus('DONE');
      setBulkParsedCount(25);
      setPyqUploadSuccess(`Successfully ingested 25 questions into ${bulkTargetExam}!`);
      setTimeout(() => setPyqUploadSuccess(null), 5000);
    }, 800);
  };

  const downloadPyqSampleCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "exam_state,year,subject,topic,question_en,question_te,question_hi,question_ur,optionA_en,optionA_te,optionB_en,optionB_te,optionC_en,optionC_te,optionD_en,optionD_te,correct_option,marks,negative_marks,explanation_en,explanation_te\n" +
      "TSLPRB,2022,General Studies,Telangana Movement,\"Which committee was formed in 1969?\",\"1969 లో ఏ కమిటీ ఏర్పడింది?\",\"1969 में कौन सी समिति बनी?\",\"1969 میں کونسی کمیٹی بنی؟\",\"Justice Bhargava Committee\",\"జస్టిస్ భార్గవ కమిటీ\",\"Fazal Ali Commission\",\"ఫజల్ అలీ కమిషన్\",\"Wanchoo Committee\",\"వాంచూ కమిటీ\",\"Kumar Lalit Committee\",\"కుమార్ లలిత్ కమిటీ\",A,1.0,0.25,\"Justice Vashishtha Bhargava Committee was appointed to assess Telangana surpluses.\",\"తెలంగాణ మిగులు నిధులను లెక్కించడానికి జస్టిస్ భార్గవ కమిటీ ఏర్పాటయింది.\"";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Police_SI_Previous_Paper_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If unauthorized, show barrier while redirecting
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto my-24 p-8 bg-white border border-red-200 rounded-3xl text-center shadow-lg">
        <ShieldAlert className="w-12 h-12 text-red-600 mx-auto mb-3 animate-bounce" />
        <h2 className="text-lg font-black text-slate-900">Restricted Administration Area</h2>
        <p className="text-xs text-slate-600 mt-2">
          Redirecting to Administrator Authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Admin Authority Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 p-2 flex items-center justify-center shrink-0">
            <Image
              src="/logo.png"
              alt="Police SI Emblem"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 text-[10px] font-bold tracking-wide uppercase">
                RECRUITMENT BOARD ADMINISTRATION
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                POSTGRESQL & PRISMA CONNECTED
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Admin & Faculty Control Suite
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Superuser privileges: Question Bank Ingestion, Candidate Authorization, Descriptive Grading, and Payment Gateway Auditing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase">Active Officer</p>
            <p className="text-xs font-bold text-slate-900">{user.name}</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'OVERVIEW'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Executive Overview
        </button>

        <button
          onClick={() => setActiveTab('PREVIOUS_PAPERS')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PREVIOUS_PAPERS'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Archive className="w-3.5 h-3.5" />
          <span>Previous Papers Upload ({previousPapersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('CSV_UPLOAD')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'CSV_UPLOAD'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>CSV Question Upload</span>
        </button>

        <button
          onClick={() => setActiveTab('QUESTION_BANK')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'QUESTION_BANK'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Question Bank ({questions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('CANDIDATES')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'CANDIDATES'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Registered Candidates ({candidates.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('DESCRIPTIVE_GRADING')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'DESCRIPTIVE_GRADING'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Descriptive Papers ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PAYMENTS')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PAYMENTS'
              ? 'bg-red-600 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payment Gateways</span>
        </button>

        <button
          onClick={() => setActiveTab('BACKEND_DOCS')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'BACKEND_DOCS'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          <Code className="w-3.5 h-3.5 text-amber-400" />
          <span>Backend APIs & Contracts</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* 1. OVERVIEW TAB */}
      {/* ========================================== */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Candidates</span>
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 font-mono">14,892</p>
              <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Questions in Bank</span>
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 font-mono">4,620</p>
              <p className="text-[11px] text-slate-500 mt-1">Bilingual Telugu & English</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Pending Papers</span>
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-black text-purple-700 font-mono">24</p>
              <p className="text-[11px] text-amber-600 mt-1">Awaiting faculty score review</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Subscription Rev</span>
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-emerald-700 font-mono">₹14,87,000</p>
              <p className="text-[11px] text-slate-500 mt-1">Razorpay / UPI Verified</p>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3">Pending Descriptive Papers to Grade</h3>
              <div className="space-y-3">
                {submissions.slice(0, 3).map((sub) => (
                  <div key={sub.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{sub.candidateName}</p>
                      <p className="text-[11px] text-slate-500">
                        {sub.paperTitle || (sub.paperType === 'PAPER_I_ENGLISH' ? 'Paper I: English' : 'Paper II: Telugu')} • {sub.topic}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setGradingSubmission(sub);
                        setActiveTab('DESCRIPTIVE_GRADING');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold hover:bg-purple-100"
                    >
                      Grade Paper
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3">Recent Candidate Registrations</h3>
              <div className="space-y-3">
                {candidates.slice(0, 3).map((cand) => (
                  <div key={cand.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{cand.name}</p>
                      <p className="text-[11px] text-slate-500">{cand.targetExam} • {cand.state}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold font-mono">
                      {cand.roll}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. PREVIOUS PAPERS (PYQ) UPLOAD & MANAGEMENT */}
      {/* ========================================== */}
      {activeTab === 'PREVIOUS_PAPERS' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold uppercase tracking-wider">
                  PYQ Question Bank Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Bilingual / 4-Language Ready
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-1">Previous Year Papers Management</h3>
              <p className="text-xs text-slate-500">
                Upload and organize official TSLPRB & AP Police SI previous solved questions via Single Question Upload or Bulky CSV/JSON Ingestion.
              </p>
            </div>

            {/* Sub-mode selector */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setPyqMode('SINGLE')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pyqMode === 'SINGLE'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Single Question Upload
              </button>
              <button
                type="button"
                onClick={() => setPyqMode('BULK')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pyqMode === 'BULK'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bulky Uploading (CSV)
              </button>
              <button
                type="button"
                onClick={() => setPyqMode('LIST')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pyqMode === 'LIST'
                    ? 'bg-white text-red-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Existing PYQ Papers ({previousPapersList.length})
              </button>
            </div>
          </div>

          {pyqUploadSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{pyqUploadSuccess}</span>
            </div>
          )}

          {/* Sub-view 1: Single Question Uploading */}
          {pyqMode === 'SINGLE' && (
            <form onSubmit={handleSaveSinglePyq} className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Recruitment Board</label>
                  <select
                    value={singlePyqState}
                    onChange={(e) => setSinglePyqState(e.target.value as 'TSLPRB' | 'AP_POLICE')}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="TSLPRB">TSLPRB (Telangana Police)</option>
                    <option value="AP_POLICE">AP Police (Andhra Pradesh)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Exam Year</label>
                  <select
                    value={singlePyqYear}
                    onChange={(e) => setSinglePyqYear(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value={2023}>2023 Solved Paper</option>
                    <option value={2022}>2022 Solved Paper</option>
                    <option value={2018}>2018 Solved Paper</option>
                    <option value={2016}>2016 Solved Paper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stage & Paper</label>
                  <select
                    value={singlePyqPaperType}
                    onChange={(e) => setSinglePyqPaperType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="PWT Prelims (200 M)">PWT Prelims (200 Marks)</option>
                    <option value="FWE Paper III Arithmetic">FWE Paper III: Arithmetic & Reasoning (200 M)</option>
                    <option value="FWE Paper IV General Studies">FWE Paper IV: General Studies (200 M)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <select
                    value={singlePyqSubject}
                    onChange={(e) => setSinglePyqSubject(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="General Studies">General Studies</option>
                    <option value="Telangana Movement">Telangana Movement & State Formation</option>
                    <option value="Arithmetic">Arithmetic & Numerical Ability</option>
                    <option value="Reasoning">Logical Reasoning & Mental Ability</option>
                    <option value="Indian Polity">Indian Polity & Constitution</option>
                    <option value="Indian History">Indian National Movement & History</option>
                  </select>
                </div>
              </div>

              {/* Multilingual Question Text */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                    Question Text in Available Languages
                  </h4>
                  <span className="text-[11px] text-slate-500">English is required; Telugu/Hindi/Urdu optional for full regional support</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      English Question Text <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={singlePyqTextEn}
                      onChange={(e) => setSinglePyqTextEn(e.target.value)}
                      placeholder="e.g. In which year was the Hyderabad State merged with the Indian Union through Operation Polo?"
                      className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telugu Question Text (తెలుగు)
                    </label>
                    <textarea
                      value={singlePyqTextTe}
                      onChange={(e) => setSinglePyqTextTe(e.target.value)}
                      placeholder="e.g. ఆపరేషన్ పోలో ద్వారా హైదరాబాద్ రాష్ట్రం భారత యూనియన్‌లో ఏ సంవత్సరంలో విలీనం చేయబడింది?"
                      className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 font-telugu"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hindi Question Text (हिन्दी)
                    </label>
                    <textarea
                      value={singlePyqTextHi}
                      onChange={(e) => setSinglePyqTextHi(e.target.value)}
                      placeholder="e.g. ऑपरेशन पोलो के माध्यम से हैदराबाद राज्य का भारतीय संघ में विलय किस वर्ष हुआ था?"
                      className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Urdu Question Text (اردو)
                    </label>
                    <textarea
                      value={singlePyqTextUr}
                      onChange={(e) => setSinglePyqTextUr(e.target.value)}
                      placeholder="e.g. آپریشن پولو کے ذریعے ریاست حیدرآباد کو کس سال ہندوستانی یونین میں ضم کیا گیا تھا؟"
                      className="w-full h-24 p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 text-right"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              {/* Multilingual Options Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  Multiple Choice Options (A, B, C, D)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option A */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-red-700">Option A</span>
                    <input
                      type="text"
                      placeholder="Option A (English)"
                      value={singlePyqOptA_En}
                      onChange={(e) => setSinglePyqOptA_En(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option A (Telugu / తెలుగు)"
                      value={singlePyqOptA_Te}
                      onChange={(e) => setSinglePyqOptA_Te(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Option A (Hindi)"
                        value={singlePyqOptA_Hi}
                        onChange={(e) => setSinglePyqOptA_Hi(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Option A (Urdu)"
                        value={singlePyqOptA_Ur}
                        onChange={(e) => setSinglePyqOptA_Ur(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Option B */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-red-700">Option B</span>
                    <input
                      type="text"
                      placeholder="Option B (English)"
                      value={singlePyqOptB_En}
                      onChange={(e) => setSinglePyqOptB_En(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option B (Telugu / తెలుగు)"
                      value={singlePyqOptB_Te}
                      onChange={(e) => setSinglePyqOptB_Te(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Option B (Hindi)"
                        value={singlePyqOptB_Hi}
                        onChange={(e) => setSinglePyqOptB_Hi(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Option B (Urdu)"
                        value={singlePyqOptB_Ur}
                        onChange={(e) => setSinglePyqOptB_Ur(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Option C */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-red-700">Option C</span>
                    <input
                      type="text"
                      placeholder="Option C (English)"
                      value={singlePyqOptC_En}
                      onChange={(e) => setSinglePyqOptC_En(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option C (Telugu / తెలుగు)"
                      value={singlePyqOptC_Te}
                      onChange={(e) => setSinglePyqOptC_Te(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Option C (Hindi)"
                        value={singlePyqOptC_Hi}
                        onChange={(e) => setSinglePyqOptC_Hi(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Option C (Urdu)"
                        value={singlePyqOptC_Ur}
                        onChange={(e) => setSinglePyqOptC_Ur(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  {/* Option D */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <span className="text-xs font-black text-red-700">Option D</span>
                    <input
                      type="text"
                      placeholder="Option D (English)"
                      value={singlePyqOptD_En}
                      onChange={(e) => setSinglePyqOptD_En(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Option D (Telugu / తెలుగు)"
                      value={singlePyqOptD_Te}
                      onChange={(e) => setSinglePyqOptD_Te(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Option D (Hindi)"
                        value={singlePyqOptD_Hi}
                        onChange={(e) => setSinglePyqOptD_Hi(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Option D (Urdu)"
                        value={singlePyqOptD_Ur}
                        onChange={(e) => setSinglePyqOptD_Ur(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg p-2 text-xs text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scoring & Explanation */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Correct Answer <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={singlePyqCorrectOpt}
                      onChange={(e) => setSinglePyqCorrectOpt(e.target.value as 'A' | 'B' | 'C' | 'D')}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Marks Awarded</label>
                    <input
                      type="number"
                      step="0.5"
                      value={singlePyqMarks}
                      onChange={(e) => setSinglePyqMarks(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Negative Penalty (PRD 0.25)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={singlePyqNegative}
                      onChange={(e) => setSinglePyqNegative(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Detailed Explanation (English)</label>
                    <textarea
                      value={singlePyqExpEn}
                      onChange={(e) => setSinglePyqExpEn(e.target.value)}
                      placeholder="Official key justification and historical reference..."
                      className="w-full h-20 p-2.5 text-xs bg-white border border-slate-200 rounded-xl resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Detailed Explanation (Telugu / తెలుగు)</label>
                    <textarea
                      value={singlePyqExpTe}
                      onChange={(e) => setSinglePyqExpTe(e.target.value)}
                      placeholder="అధికారిక కీ వివరణ మరియు వివరాలు..."
                      className="w-full h-20 p-2.5 text-xs bg-white border border-slate-200 rounded-xl resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Commit Single Question to PYQ Archive</span>
                </button>
              </div>
            </form>
          )}

          {/* Sub-view 2: Bulky Uploading (CSV / JSON) */}
          {pyqMode === 'BULK' && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                  <FileUp className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Bulky Ingestion of Previous Solved Papers</h4>
                  <p className="text-xs text-slate-500 max-w-lg mx-auto mt-1">
                    Upload an entire 200-question paper in one click using CSV or JSON format. Supports all 4 languages (English, Telugu, Hindi, Urdu) with negative penalty metadata.
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-3">
                  <div className="text-left">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Target Previous Paper</label>
                    <select
                      value={bulkTargetExam}
                      onChange={(e) => setBulkTargetExam(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                    >
                      <option value="TSLPRB SI 2022 PWT Solved Paper">TSLPRB SI 2022 PWT (Telangana)</option>
                      <option value="AP Police SI 2023 Preliminary Solved Paper">AP Police SI 2023 Prelims (Andhra Pradesh)</option>
                      <option value="TSLPRB SI 2018 PWT Archive">TSLPRB SI 2018 PWT (Telangana)</option>
                      <option value="AP Police SI 2018 PWT Archive">AP Police SI 2018 Prelims (Andhra Pradesh)</option>
                    </select>
                  </div>

                  <input
                    type="file"
                    accept=".csv, .json"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBulkFile(e.target.files[0]);
                        setBulkFileName(e.target.files[0].name);
                      }
                    }}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={downloadPyqSampleCsv}
                    className="px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download Standard Police SI PYQ CSV Template</span>
                  </button>

                  <button
                    type="button"
                    disabled={bulkUploadStatus === 'PROCESSING'}
                    onClick={handleBulkPyqUpload}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{bulkUploadStatus === 'PROCESSING' ? 'Parsing & Ingesting...' : 'Start Bulky Upload'}</span>
                  </button>
                </div>
              </div>

              {bulkUploadStatus === 'DONE' && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-bold text-emerald-900">Ingestion Completed</p>
                      <p className="text-[11px] text-emerald-700">{bulkParsedCount} questions mapped to {bulkTargetExam}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('QUESTION_BANK')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    View in Question Bank
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sub-view 3: Existing PYQ Papers */}
          {pyqMode === 'LIST' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {previousPapersList.map((paper) => (
                  <div key={paper.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        paper.state === 'TELANGANA' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {paper.state === 'TELANGANA' ? 'TSLPRB' : 'AP POLICE'} • {paper.year}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700">{paper.totalQuestions} Qs</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{paper.title}</h4>
                    <p className="text-[11px] text-slate-500">{paper.examShift} • {paper.totalMarks} Marks</p>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Solved Key Verified
                      </span>
                      <button
                        onClick={() => {
                          setSearchQuery(paper.year.toString());
                          setActiveTab('QUESTION_BANK');
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Inspect Qs →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================== */}
      {/* 3. CSV UPLOAD TAB (PRD 3.4) */}
      {/* ========================================== */}
      {activeTab === 'CSV_UPLOAD' && (
        <AdminCsvUploader
          onImportComplete={(count) => {
            setActiveTab('QUESTION_BANK');
          }}
        />
      )}

      {/* ========================================== */}
      {/* 3. QUESTION BANK TAB */}
      {/* ========================================== */}
      {activeTab === 'QUESTION_BANK' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Central Objective Question Repository</h3>
              <p className="text-xs text-slate-500">Manage TSLPRB / AP Police SI Objective Questions</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or topics..."
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-500 focus:bg-white w-64"
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Subject & Topic</th>
                  <th className="p-3">Question Text (Bilingual)</th>
                  <th className="p-3">Correct Answer</th>
                  <th className="p-3">Marks</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredQuestions.map((q, idx) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900">{q.subject}</span>
                      <p className="text-[11px] text-slate-500">{q.topic}</p>
                    </td>
                    <td className="p-3 max-w-md">
                      <p className="font-semibold text-slate-800">{q.questionText}</p>
                      {q.questionTextTelugu && (
                        <p className="text-[11px] text-slate-500 mt-1">{q.questionTextTelugu}</p>
                      )}
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-700">Option {q.correctAnswer}</td>
                    <td className="p-3 font-mono text-slate-600">+{q.marks} / -{q.negativeMarks}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 4. CANDIDATES MANAGEMENT (PRD 3.4) */}
      {/* ========================================== */}
      {activeTab === 'CANDIDATES' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Enrolled SI Candidates</h3>
            <p className="text-xs text-slate-500">Monitor candidate target boards, subscription status, and exam participation</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Roll Number</th>
                  <th className="p-3">Candidate Name</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Target State & Exam</th>
                  <th className="p-3">Subscription</th>
                  <th className="p-3">Tests Done</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {candidates.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-800">{c.roll}</td>
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3 text-slate-600">
                      <p>{c.email}</p>
                      <p className="text-[11px] text-slate-500 font-mono">+91-{c.phone}</p>
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-slate-800">{c.targetExam}</span>
                      <p className="text-[11px] text-slate-500">{c.state}</p>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.tier === 'PREMIUM'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-800">{c.testsAttempted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 5. DESCRIPTIVE PAPER GRADING (PRD 3.2) */}
      {/* ========================================== */}
      {activeTab === 'DESCRIPTIVE_GRADING' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Descriptive Answer Sheet Evaluation Queue</h3>
            <p className="text-xs text-slate-500">Grade typed or handwritten answer sheet submissions for Paper I (English) and Paper II (Telugu/Urdu)</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase">Awaiting Evaluation</h4>
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setGradingSubmission(sub)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    gradingSubmission?.id === sub.id
                      ? 'border-red-500 bg-red-50/50 shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{sub.candidateName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      sub.status === 'EVALUATED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold mt-1">
                    {sub.paperTitle || (sub.paperType === 'PAPER_I_ENGLISH' ? 'Paper I: English' : 'Paper II: Telugu')} • {sub.topic}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Submitted on: {new Date(sub.submittedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            {/* Grading Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              {gradingSubmission ? (
                <>
                  <div className="border-b border-slate-200 pb-3">
                    <span className="text-[10px] font-bold text-red-700 uppercase bg-red-50 px-2 py-0.5 rounded">
                      Grading Active
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">
                      {gradingSubmission.candidateName} — {gradingSubmission.paperTitle || (gradingSubmission.paperType === 'PAPER_I_ENGLISH' ? 'Paper I: English' : 'Paper II: Telugu')}
                    </h4>
                    <p className="text-xs text-slate-500">Topic: {gradingSubmission.topic}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Submission Content:</label>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 max-h-48 overflow-y-auto text-xs text-slate-800 leading-relaxed font-serif">
                      {gradingSubmission.typedContent || 'Handwritten Answer Sheet Image Uploaded. View attachment in AWS S3.'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Awarded Marks (Out of 50):</label>
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={awardedMarks}
                        onChange={(e) => setAwardedMarks(Number(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Rubric Rating:</label>
                      <select className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800">
                        <option>Excellent (40-50)</option>
                        <option>Good (30-39)</option>
                        <option>Satisfactory (20-29)</option>
                        <option>Needs Improvement (&lt;20)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Evaluator Feedback & Remarks:</label>
                    <textarea
                      value={evalRemarks}
                      onChange={(e) => setEvalRemarks(e.target.value)}
                      placeholder="Enter feedback for the candidate regarding grammar, structure, and factual depth..."
                      className="w-full h-20 bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveGrade}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    Commit Evaluation & Notify Candidate
                  </button>
                </>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Select a descriptive submission from the list to review and assign marks.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 6. PAYMENT GATEWAYS MONITORING (PRD 3.4) */}
      {/* ========================================== */}
      {activeTab === 'PAYMENTS' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Payment Gateway Reconciliation</h3>
              <p className="text-xs text-slate-500">Live monitoring of UPI, Credit Card, and Netbanking subscriptions via Razorpay</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                GATEWAY: RAZORPAY / UPI LIVE
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Today's Transactions</span>
              <p className="text-xl font-black text-slate-900 mt-1 font-mono">₹48,951</p>
              <p className="text-[11px] text-slate-500">49 Pro Passes Activated</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Success Rate</span>
              <p className="text-xl font-black text-emerald-600 mt-1 font-mono">99.2%</p>
              <p className="text-[11px] text-slate-500">Instant Webhook Confirmations</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold">Average Settlement</span>
              <p className="text-xl font-black text-slate-900 mt-1 font-mono">T+1 Day</p>
              <p className="text-[11px] text-slate-500">Automatic Bank Transfer</p>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Payment ID</th>
                  <th className="p-3">Candidate</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="p-3 font-mono text-slate-700">pay_TS_99182</td>
                  <td className="p-3 font-bold text-slate-900">Vasu Reddy</td>
                  <td className="p-3 font-mono font-bold text-slate-900">₹999.00</td>
                  <td className="p-3 text-slate-600">UPI (Google Pay)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">SUCCESS</span></td>
                  <td className="p-3 text-slate-500">28 Sep 2026, 14:22</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-700">pay_TS_99181</td>
                  <td className="p-3 font-bold text-slate-900">B. Manoj Kumar</td>
                  <td className="p-3 font-mono font-bold text-slate-900">₹999.00</td>
                  <td className="p-3 text-slate-600">HDFC NetBanking</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">SUCCESS</span></td>
                  <td className="p-3 text-slate-500">28 Sep 2026, 13:10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 7. BACKEND DEVELOPER INTEGRATION HUB & SQL SCHEMA (IMAGE 3 & PRD § 6) */}
      {/* ========================================== */}
      {activeTab === 'BACKEND_DOCS' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-slate-900 text-amber-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-400 text-[10px] font-bold">
                    POSTGRESQL 15+ & PRISMA ORM
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    REST API SPECIFICATION
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Backend Architecture, Database Schema & Contracts
                </h3>
                <p className="text-xs text-slate-500">
                  Direct copy-pasteable PostgreSQL DDL schema matching PRD Section 6 and user specifications for rapid backend deployment.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`DATABASE_URL="postgresql://postgres:password@localhost:5432/police_si_db?schema=public"`);
                  alert('Database connection string copied to clipboard!');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy .env String</span>
              </button>
            </div>
          </div>

          {/* 1. REST API Endpoints Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
              1. Core RESTful Endpoints (PRD Section 5)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-700">POST /api/v1/auth/otp</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">AUTH</span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">Dispatches 6-digit SMS OTP via telecom SMS Gateway (PRD § 3.1)</p>
                <div className="bg-slate-900 text-slate-200 p-2.5 rounded-xl border border-slate-800">
                  {`{ "phone": "9848022338", "targetExam": "TSLPRB" }`}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700">POST /api/v1/exams/submit</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">CBT</span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">Submits answers, computes 200M score with 0.25 penalty & subject analytics</p>
                <div className="bg-slate-900 text-slate-200 p-2.5 rounded-xl border border-slate-800">
                  {`{ "examId": "exam_ts_pwt_1", "answers": { "q1": { "selectedOption": "B" } } }`}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-700">POST /api/v1/descriptive/submit</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">FWE DESCRIPTIVE</span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">Uploads typed or S3 image answer sheet for Paper I & II (PRD § 3.2)</p>
                <div className="bg-slate-900 text-slate-200 p-2.5 rounded-xl border border-slate-800">
                  {`{ "paperType": "PAPER_I_ENGLISH", "fileUrl": "s3://police-si/papers/p1.pdf" }`}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-700">POST /api/v1/pet/log</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">STAGE 02 PET</span>
                </div>
                <p className="text-[11px] text-slate-600 font-sans">Records 1600m / 800m run, Long Jump, Shot Put with qualifying checks</p>
                <div className="bg-slate-900 text-slate-200 p-2.5 rounded-xl border border-slate-800">
                  {`{ "eventType": "RUN_1600M", "metricValue": 405, "isQualified": true }`}
                </div>
              </div>
            </div>
          </div>

          {/* 2. SQL Schema DDL (Exact PRD § 6 / Image 3) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                2. PostgreSQL Relational Database Schema (Image 3 & PRD § 6)
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">schema.sql • 7 Core Entities</span>
            </div>

            <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`-- =========================================================================
-- Police SI Preparation Platform: PostgreSQL 15+ DDL
-- Conforms to PRD § 6: Users, Exams, Questions, Attempts, Answers, PET
-- =========================================================================

-- 1. USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN', 'FACULTY')),
    target_exam VARCHAR(50) DEFAULT 'TSLPRB_SI' CHECK (target_exam IN ('TSLPRB_SI', 'AP_POLICE_SI', 'BOTH')),
    tier VARCHAR(20) DEFAULT 'FREE' CHECK (tier IN ('FREE', 'PREMIUM')),
    second_language VARCHAR(20) DEFAULT 'TELUGU' CHECK (second_language IN ('TELUGU', 'HINDI', 'URDU')),
    cadre_preference VARCHAR(50) DEFAULT 'Civil',
    roll_number VARCHAR(50) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. EXAMS TABLE (Prelims PWT & FWE Papers)
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    exam_type VARCHAR(50) NOT NULL CHECK (exam_type IN ('PWT_FULL_MOCK', 'FWE_OBJECTIVE', 'TOPIC_TEST', 'PREVIOUS_YEAR_SOLVED')),
    duration_minutes INT NOT NULL DEFAULT 180,
    total_marks DECIMAL(6,2) NOT NULL DEFAULT 200.0,
    negative_mark_value DECIMAL(4,2) NOT NULL DEFAULT 0.25,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. QUESTIONS TABLE (Multilingual: English, Telugu, Hindi, Urdu)
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    question_text_telugu TEXT,
    question_text_hindi TEXT,
    question_text_urdu TEXT,
    marks DECIMAL(4,2) NOT NULL DEFAULT 1.0,
    negative_marks DECIMAL(4,2) NOT NULL DEFAULT 0.25,
    correct_answer VARCHAR(10) NOT NULL,
    explanation TEXT,
    explanation_telugu TEXT,
    explanation_hindi TEXT,
    explanation_urdu TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. EXAM_QUESTIONS MAPPING
CREATE TABLE exam_questions (
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    order_index INT NOT NULL,
    PRIMARY KEY (exam_id, question_id)
);

-- 5. USER_ATTEMPTS (Scorecard & State Ranking)
CREATE TABLE user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    total_score DECIMAL(6,2),
    accuracy_rate DECIMAL(5,2),
    state_rank INT,
    percentile DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'ABANDONED'))
);

-- 6. ATTEMPT_ANSWERS (Question-level breakdown & time tracking)
CREATE TABLE attempt_answers (
    attempt_id UUID REFERENCES user_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    selected_option VARCHAR(10),
    is_correct BOOLEAN,
    time_spent_seconds INT DEFAULT 0,
    PRIMARY KEY (attempt_id, question_id)
);

-- 7. PET_LOGS (Physical Efficiency Tracker: 1600m/800m, Long Jump, Shot Put)
CREATE TABLE pet_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('RUN_1600M', 'RUN_800M', 'LONG_JUMP', 'SHOT_PUT')),
    metric_value DECIMAL(6,2) NOT NULL,
    is_qualified BOOLEAN NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</pre>
            </div>
          </div>

          {/* 3. Prisma ORM Models */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider">
                3. Prisma Schema (`schema.prisma`)
              </h4>
              <span className="text-[11px] text-slate-500 font-mono">prisma/schema.prisma</span>
            </div>

            <div className="bg-slate-900 text-emerald-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  STUDENT
  ADMIN
  FACULTY
}

enum TargetExam {
  TSLPRB_SI
  AP_POLICE_SI
  BOTH
}

enum SubscriptionTier {
  FREE
  PREMIUM
}

model User {
  id             String           @id @default(uuid())
  fullName       String           @map("full_name")
  email          String           @unique
  phone          String           @unique
  passwordHash   String           @map("password_hash")
  role           Role             @default(STUDENT)
  targetExam     TargetExam       @default(TSLPRB_SI) @map("target_exam")
  tier           SubscriptionTier @default(FREE)
  secondLanguage String           @default("TELUGU") @map("second_language")
  cadrePreference String          @default("Civil") @map("cadre_preference")
  rollNumber     String?          @unique @map("roll_number")
  attempts       UserAttempt[]
  petLogs        PetLog[]
  createdAt      DateTime         @default(now()) @map("created_at")
  updatedAt      DateTime         @updatedAt @map("updated_at")

  @@map("users")
}`}</pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
