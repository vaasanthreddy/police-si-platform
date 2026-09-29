-- PostgreSQL Production Schema for Police SI Recruitment Platform
-- Covers PRD Section 6 (High-Level SQL Database Schema) & Cybersecurity Hardening

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Candidates & Admins)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'STUDENT' CHECK (role IN ('STUDENT', 'ADMIN', 'CONTENT_CREATOR')),
    target_state VARCHAR(50) DEFAULT 'TELANGANA' CHECK (target_state IN ('TELANGANA', 'ANDHRA_PRADESH', 'ALL_INDIA')),
    target_exam VARCHAR(100) DEFAULT 'TSLPRB_SI_CIVIL_AR',
    primary_language VARCHAR(50) DEFAULT 'TELUGU',
    gender VARCHAR(10) DEFAULT 'MALE' CHECK (gender IN ('MALE', 'FEMALE')),
    subscription_tier VARCHAR(50) DEFAULT 'FREE' CHECK (subscription_tier IN ('FREE', 'PREMIUM')),
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_role_state ON users(role, target_state);

-- 2. Questions Table (Central repository for objective items with bilingual support)
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject VARCHAR(150) NOT NULL,
    topic VARCHAR(150) NOT NULL,
    question_text TEXT NOT NULL,
    question_text_telugu TEXT,
    options JSONB NOT NULL, -- [{'key': 'A', 'text': '...', 'text_telugu': '...'}]
    correct_answer CHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    explanation TEXT NOT NULL,
    explanation_telugu TEXT,
    difficulty VARCHAR(20) DEFAULT 'MEDIUM' CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
    marks NUMERIC(4, 2) DEFAULT 1.00,
    negative_marks NUMERIC(4, 2) DEFAULT 0.25,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject, topic);

-- 3. Exams Table (Prelims PWT & Mains FWE Papers)
CREATE TABLE IF NOT EXISTS exams (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_telugu VARCHAR(255),
    exam_type VARCHAR(50) NOT NULL CHECK (exam_type IN ('PRELIMS_PWT', 'MAINS_PAPER_1_ENGLISH', 'MAINS_PAPER_2_REGIONAL', 'MAINS_PAPER_3_ARITHMETIC_REASONING', 'MAINS_PAPER_4_GENERAL_STUDIES', 'DAILY_QUIZ')),
    duration_mins INT DEFAULT 180,
    total_marks NUMERIC(6, 2) DEFAULT 200.00,
    total_questions INT DEFAULT 200,
    negative_marking BOOLEAN DEFAULT TRUE,
    negative_mark_rate NUMERIC(4, 2) DEFAULT 0.25,
    is_bilingual BOOLEAN DEFAULT TRUE,
    target_state VARCHAR(50) DEFAULT 'TELANGANA',
    is_premium_only BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Exam Questions Mapping
CREATE TABLE IF NOT EXISTS exam_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id VARCHAR(100) REFERENCES exams(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    section_name VARCHAR(100) DEFAULT 'General',
    order_index INT DEFAULT 0,
    UNIQUE(exam_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_exam_questions_exam ON exam_questions(exam_id);

-- 5. User Exam Attempts (Audit log & proctoring record)
CREATE TABLE IF NOT EXISTS user_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_id VARCHAR(100) REFERENCES exams(id) ON DELETE CASCADE,
    score NUMERIC(6, 2) DEFAULT 0.00,
    total_marks NUMERIC(6, 2) DEFAULT 200.00,
    accuracy NUMERIC(5, 2) DEFAULT 0.00,
    time_spent_seconds INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'PAUSED', 'FLAGGED_CHEATING')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_attempts_user_exam ON user_attempts(user_id, exam_id);

-- 6. Granular Attempt Answers (Detailed per-question response for analytics)
CREATE TABLE IF NOT EXISTS attempt_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES user_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    selected_option CHAR(1) CHECK (selected_option IN ('A', 'B', 'C', 'D')),
    time_taken_seconds INT DEFAULT 0,
    is_correct BOOLEAN DEFAULT FALSE,
    marked_for_review BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_attempt_answers_attempt ON attempt_answers(attempt_id);

-- 7. PET Logs (Physical Efficiency Test Daily Logbook)
CREATE TABLE IF NOT EXISTS pet_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('RUN_1600M', 'RUN_800M', 'SPRINT_100M', 'LONG_JUMP', 'SHOT_PUT')),
    metric_value NUMERIC(6, 2) NOT NULL, -- Seconds for running, meters for jump/throw
    unit VARCHAR(20) NOT NULL CHECK (unit IN ('seconds', 'meters')),
    logged_date DATE DEFAULT CURRENT_DATE,
    is_qualified BOOLEAN DEFAULT FALSE,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_pet_logs_user ON pet_logs(user_id, event_type);

-- 8. Descriptive Submissions (FWE Paper I & II Evaluations)
CREATE TABLE IF NOT EXISTS descriptive_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    candidate_name VARCHAR(255) NOT NULL,
    candidate_roll VARCHAR(50) NOT NULL,
    paper_type VARCHAR(50) NOT NULL,
    topic TEXT NOT NULL,
    typed_content TEXT,
    scanned_image_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'PENDING_REVIEW' CHECK (status IN ('PENDING_REVIEW', 'EVALUATED')),
    marks_awarded NUMERIC(5, 2),
    max_marks NUMERIC(5, 2) DEFAULT 50.00,
    evaluator_remarks TEXT,
    rubric_scores JSONB
);

CREATE INDEX IF NOT EXISTS idx_descriptive_status ON descriptive_submissions(status);
