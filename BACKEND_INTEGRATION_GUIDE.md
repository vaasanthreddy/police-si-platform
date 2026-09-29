# Backend Integration & REST API Architecture Guide
## Police SI Exam & Practice Platform (TSLPRB & AP Police Preparation)

This guide documents the full API contract, database schema, security specifications, and integration workflows designed specifically for backend developers connecting their Express.js / Node.js / PostgreSQL services to this Next.js frontend.

---

## 1. System Architecture

```
+-------------------------------------------------------------+
|                      NEXT.JS FRONTEND                       |
|   (React 18, Tailwind CSS, App Router, Lucide, TypeScript)  |
|                                                             |
|  - Candidate CBT Exam Hall (Timer, Anti-Cheat, Watermark)   |
|  - Student Dashboard (Analytics, Accuracy, Strengths/Weak)  |
|  - Admin Control Suite (CSV Question Ingestion, Grading)    |
|  - Physical Efficiency Test Tracker (1600m, Jump, Shotput)  |
+------------------------------+------------------------------+
                               |
                               |  HTTP / HTTPS REST Calls
                               |  Bearer JWT + X-CSRF-Token
                               v
+-------------------------------------------------------------+
|                    BACKEND SERVICE LAYER                    |
|                (Node.js / Express.js REST APIs)             |
|                                                             |
|  Configured via: NEXT_PUBLIC_API_BASE_URL                   |
|  Default: /api/v1 (or http://localhost:5000/api/v1)         |
+------------------------------+------------------------------+
                               |
                               |  Prisma ORM / Parameterized SQL
                               v
+-------------------------------------------------------------+
|                     POSTGRESQL DATABASE                     |
|           Schema: prisma/schema.prisma                      |
|           Raw SQL: scripts/init_schema.sql                  |
|                                                             |
|  Tables: Users, Questions, Exams, Exam_Questions,           |
|          User_Attempts, Attempt_Answers, PET_Logs,          |
|          Descriptive_Submissions, Payments                  |
+-------------------------------------------------------------+
```

---

## 2. Environment Variables & Switching to External Backend

To point the frontend to an external backend server, update `.env.local`:

```env
# Switch from internal Next.js routes to external Express server:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Security & Session
NEXT_PUBLIC_SESSION_TIMEOUT_MINS=60
JWT_SECRET=super_secret_police_si_recruitment_jwt_key_2026_tslprb_ap
JWT_EXPIRY_DAYS=7d

# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:police_si_admin_2026@localhost:5432/police_si_db?schema=public"

# Storage for Descriptive Exam Sheets
STORAGE_PROVIDER=supabase
STORAGE_BUCKET_NAME=police-si-descriptive-papers
```

---

## 3. Standard Request & Response Structure

All responses returned by backend endpoints must conform to this JSON schema:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully.",
  "timestamp": "2026-09-28T18:00:00.000Z",
  "errors": []
}
```

### Standard HTTP Headers Sent by Frontend:
- `Authorization`: `Bearer <jwt_token>` (Sent automatically from `localStorage.getItem('police_si_token')`)
- `X-CSRF-Token`: Anti-CSRF token generated on session start
- `X-Client-Platform`: `POLICE_SI_CBT_NEXTJS_v1.0`
- `Content-Type`: `application/json`

---

## 4. Complete REST API Specifications

### 4.1 Authentication & Profile (`/api/v1/auth`)

#### `POST /api/v1/auth/otp`
- **Purpose**: Dispatches 6-digit SMS OTP to aspirant mobile number.
- **Request Body**:
  ```json
  {
    "phone": "9848022338"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "phone": "9848022338",
      "message": "SMS OTP dispatched successfully via Gov Gateway.",
      "testOtpHint": "542918"
    },
    "timestamp": "2026-09-28T18:00:00.000Z"
  }
  ```

#### `POST /api/v1/auth/verify`
- **Purpose**: Validates SMS OTP code and returns authenticated JWT session.
- **Request Body**:
  ```json
  {
    "phone": "9848022338",
    "otp": "542918"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "usr_vasu_reddy_si",
        "name": "Vasu Reddy",
        "email": "vasu.si.aspirant@gmail.com",
        "phone": "9848022338",
        "role": "STUDENT",
        "targetState": "TELANGANA",
        "targetExam": "TSLPRB_SI_CIVIL_AR",
        "primaryLanguage": "TELUGU",
        "gender": "MALE",
        "subscriptionTier": "PREMIUM",
        "rollNumber": "TS-SI-2026-8841"
      },
      "token": "tslprb_jwt_...",
      "refreshToken": "tslprb_rf_..."
    }
  }
  ```

#### `GET /api/v1/auth/me`
- **Purpose**: Fetches active session profile using Bearer JWT.

#### `PUT /api/v1/auth/me`
- **Purpose**: Updates user target state, language, or target exam.

---

### 4.2 Exams & CBT Practice Engine (`/api/v1/exams`)

#### `GET /api/v1/exams`
- **Query Params**: `?examType=PRELIMS_PWT`
- **Response `200 OK`**: Returns array of exam configurations with question counts, duration, and bilingual flags.

#### `GET /api/v1/exams/:id`
- **Purpose**: Loads full examination question bank including bilingual questions (English & Telugu) and answer choices.
- **Sample Question Schema**:
  ```json
  {
    "id": "q_001",
    "subject": "Indian Polity & Constitution",
    "topic": "Fundamental Rights",
    "questionText": "Under which Article of the Indian Constitution is the Right to Constitutional Remedies guaranteed?",
    "questionTextTelugu": "భారత రాజ్యాంగంలోని ఏ అధికరణ ప్రకారం రాజ్యాంగ పరిహారాల హక్కు హామీ ఇవ్వబడింది?",
    "options": [
      { "key": "A", "text": "Article 19", "textTelugu": "అధికరణ 19" },
      { "key": "B", "text": "Article 21", "textTelugu": "అధికరణ 21" },
      { "key": "C", "text": "Article 32", "textTelugu": "అధికరణ 32" },
      { "key": "D", "text": "Article 44", "textTelugu": "అధికరణ 44" }
    ],
    "correctAnswer": "C",
    "explanation": "Article 32 gives the right to individuals to move to the Supreme Court to seek justice.",
    "marks": 1.0,
    "negativeMarks": 0.25
  }
  ```

#### `POST /api/v1/exams/:id/submit`
- **Purpose**: Evaluates candidate responses against answer key with negative marking (-0.25), calculates rank estimate, and logs proctoring violations.
- **Request Body**:
  ```json
  {
    "examId": "tslprb-si-pwt-mock-01",
    "answers": {
      "q_001": { "selectedOption": "C", "timeSpentSeconds": 34 },
      "q_002": { "selectedOption": "A", "timeSpentSeconds": 52 }
    },
    "timeSpentSeconds": 4820,
    "tabSwitchViolations": 1
  }
  ```
- **Response `200 OK`**: Returns `finalScore`, `accuracyPercentage`, `stateRankEstimate`, `percentile`, and `subjectBreakdown`.

---

### 4.3 Physical Efficiency Test (PET) Module (`/api/v1/pet`)

#### `GET /api/v1/pet`
- **Returns**: Candidate log history and automatic qualification status based on official police recruiting standards:
  - **1600m Run (Men)**: Standard $\le 7\text{ min } 15\text{ sec}$ ($435\text{ seconds}$)
  - **800m Run (Women)**: Standard $\le 5\text{ min } 20\text{ sec}$ ($320\text{ seconds}$)
  - **Long Jump**: Standard $\ge 3.80\text{ meters}$
  - **Shot Put (7.26 kg)**: Standard $\ge 5.60\text{ meters}$

#### `POST /api/v1/pet`
- **Request Body**:
  ```json
  {
    "eventType": "RUN_1600M",
    "metricValue": 395,
    "notes": "Morning track training session"
  }
  ```

---

### 4.4 Descriptive Evaluation Module (`/api/v1/descriptive`)

#### `POST /api/v1/descriptive`
- **Purpose**: Submits typed essay or image URL for Paper I (English) or Paper II (Telugu/Urdu) Mains.
- **Request Body**:
  ```json
  {
    "paperType": "PAPER_1_ENGLISH",
    "questionTitle": "Essay: Role of Community Policing in Modern Cybercrime Prevention",
    "typedContent": "Community policing bridges the gap between law enforcement agencies and civil society...",
    "uploadedFileUrl": null
  }
  ```

#### `POST /api/v1/descriptive/:id/evaluate`
- **Purpose**: Admin / Examiner evaluates submission and records score & remarks.
- **Request Body**:
  ```json
  {
    "marksAwarded": 42,
    "remarks": "Excellent articulation of cyber forensics. Structure follows official TSLPRB rubric."
  }
  ```

---

### 4.5 Admin Control Suite (`/api/v1/admin`)

#### `GET /api/v1/admin/stats`
- Returns platform telemetry: Total aspirants, revenue in INR, pending descriptive papers, active live exams.

#### `POST /api/v1/admin/questions/upload`
- **Purpose**: Bulk CSV question bank upload.
- **CSV Headers expected**:
  `Subject,Topic,QuestionText,OptionA,OptionB,OptionC,OptionD,CorrectAnswer`
- Ingests all rows into PostgreSQL `Questions` and `Exam_Questions` tables.

#### `GET /api/v1/admin/candidates` & `PATCH /api/v1/admin/candidates`
- Candidate directory lookup, tier management (`FREE` / `PREMIUM`), and access control suspension.

#### `GET /api/v1/admin/payments`
- Returns payment transactions ledger (Razorpay / BillDesk).

---

## 5. Database Setup & Migrations

The database models are already codified in `prisma/schema.prisma` and `scripts/init_schema.sql`.

### To apply migrations with Prisma:
```bash
# Generate Prisma Client
npx prisma generate

# Push schema directly to PostgreSQL
npx prisma db push

# Or view interactive database studio
npx prisma studio
```

### To apply raw SQL directly in PostgreSQL:
```bash
psql -U postgres -d police_si_db -f scripts/init_schema.sql
```

---

## 6. Security Hardening Checklist for Backend Team

1. **JWT Verification**: Validate Bearer token on every `/api/v1/*` endpoint (except public `/auth/otp` and `/auth/verify`).
2. **Role Authorization**: Verify `role === 'ADMIN'` for any request under `/api/v1/admin/*` or `/descriptive/*/evaluate`.
3. **CORS Configuration**: Restrict allowed origins to the frontend domain:
   ```javascript
   app.use(cors({
     origin: ['http://localhost:3000', 'https://your-production-domain.gov.in'],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Client-Platform']
   }));
   ```
4. **Rate Limiting**: Enforce strict Redis or in-memory rate limiting on `/auth/otp` (e.g. 5 requests/minute per IP/mobile).
5. **SQL Injection Defense**: Always use parameterized queries (Prisma ORM handles this automatically).
