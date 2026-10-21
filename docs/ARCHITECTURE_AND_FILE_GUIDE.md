# HOSTEL 360 — Complete Architecture, Working & File Guide
**A Beginner-Friendly, Behind-The-Scenes Guide to the Smart Hostel Allocation Management System**

---

## 🌟 1. WHAT IS HOSTEL 360? (HIGH-LEVEL OVERVIEW)

**HOSTEL 360** is a full-fledged, web-based hostel allotment and residence management system built entirely on the **Google Workspace** cloud ecosystem.

### The Big Idea:
In most colleges and universities, allocating hostel rooms is done manually using messy spreadsheets, paper forms, and offline registers. This leads to:
- Long queues and delays.
- Accusations of favoritism and bias.
- Reserved quota seats (SC/ST/OBC/PwD) getting miscalculated or leaked into general pools.
- Expensive software bills that government universities cannot sustain.

**HOSTEL 360 solves all of this with:**
1. **$0 / Month Cloud Cost**: Runs 100% serverless using Google Apps Script (backend), Google Sheets (database), Google Drive (file storage), and Gmail (email engine).
2. **100% Deterministic & Rule-Driven**: No human bias, no subjective scoring, and no AI hallucination. The room allocation math is 100% predictable and auditable.
3. **Real-World University Features**: Supports physical **Demand Drafts (DD)**, automated reporting deadline countdowns with 1-click **Lapse Unreported Seats**, **Google Routes API v2** real driving distance calculation, and live **Hostel Resident Rosters**.

---

## 🏗️ 2. HOW THE SYSTEM WORKS (THE COMPLETE WORKFLOW)

Here is what happens from start to finish across the **8-Stage Lifecycle**:

```
 ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
 │ 1. Student      │ ────► │ 2. Eligibility  │ ────► │ 3. Document     │ ────► │ 4. Deterministic│
 │    Registration │       │    Check        │       │    Verification │       │    Allocation   │
 └─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
                                                                                        │
 ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐                ▼
 │ 8. Room Key     │ ◄──── │ 7. Demand Draft │ ◄──── │ 6. Official     │ ◄──── ┌─────────────────┐
 │    Handover     │       │    Fee Payment  │       │    Publication  │       │ 5. Warden Audit │
 └─────────────────┘       └─────────────────┘       └─────────────────┘       │    & Validator  │
                                                                               └─────────────────┘
```

### Step-by-Step Flow:
1. **Student Registration (`StudentLogin.html` + `AuthService.gs`)**:
   - The student signs in with email/password. The backend hashes the password using SHA-256 with cryptographic salt.
2. **Application & Preferences (`StudentDashboard.html` + `DistanceService.gs`)**:
   - Student enters their details (Category, NCR residency, Department).
   - Distance from university gates is calculated using **Google Routes API v2**.
   - Student selects their 1st and 2nd preferred single-occupancy hostels.
3. **Document Upload (`DocumentService.gs` + Google Drive)**:
   - Student uploads Admission Fee Receipt, Medical Fitness Certificate, Undertaking, and PwD/Category proofs.
   - Files are stored safely in an institutional Google Drive folder.
4. **Warden Document Audit (`WardenDashboard.html`)**:
   - The Chief Warden audits the uploaded Drive files and clicks **`✓ Approve All`**.
   - Once verified, the student is marked `ELIGIBLE` by `EligibilityEngine.gs`.
5. **Deterministic Allocation Engine Runs (`AllocationEngine.gs`)**:
   - The Warden clicks **`▶️ Run Allocation (Draft)`**.
   - The system partitions candidates strictly into Boys and Girls pools.
   - It sorts applicants deterministically:
     $$\text{Priority Tier (1 to 6)} \longrightarrow \text{Category Quotas} \longrightarrow \text{Real Distance (km)} \longrightarrow \text{Timestamp (FIFO)}$$
   - Assigns available single rooms (Capacity = 1) and places remaining candidates on the ranked **Waitlist**.
6. **Integrity Validation & Publication (`AllocationValidator.gs` + `NotificationService.gs`)**:
   - The Warden runs the 12-point integrity validator (checks for double bookings or gender mismatches).
   - Clicking **`🚀 Publish Allocations`** locks allotments, starts the fee deadline countdown (e.g. 3 days), and sends automated Gmail notifications.
7. **Demand Draft & Fee Reconciliation (`PaymentService.gs`)**:
   - The student enters their Demand Draft (DD) details (DD Number, Bank, Branch, Issue Date).
   - Student takes the physical DD to the hostel office.
   - The Warden reconciles the physical instrument and clicks **`✓ Verify DD`**.
8. **Physical Check-In & Room Key Handover (`Code.gs`)**:
   - The Warden clicks **`🔑 Check-In / Key`**, marking the student as `✓ CHECKED-IN`.
   - The student's portal turns green across all 8 stages, and they print their official stamped **Digital Allotment Letter**.

---

## 📂 3. COMPLETE FILE STRUCTURE & RESPONSIBILITY BREAKDOWN

Here is every file in the project, grouped by its role:

```
HOSTEL 360 Codebase
│
├── 🌐 FRONTEND / USER INTERFACE (HTML + CSS + JS)
│   ├── Index.html               ─── Master Web App container, navbar & routing
│   ├── Styles.html              ─── Design system (CSS variables, dark/light mode, UI components)
│   ├── JavaScript.html          ─── Client-side controller (AJAX API calls, UI rendering, filters)
│   ├── StudentLogin.html        ─── Student authentication interface
│   ├── WardenLogin.html         ─── Warden & administrator login interface
│   ├── StudentDashboard.html    ─── Student portal (Stepper, Form, Doc Upload, DD payment, Letter)
│   └── WardenDashboard.html     ─── Warden console (KPIs, Engine, Hostels, Quotas, DD Reconcile)
│
├── ⚙️ CORE SERVER ROUTER & DATABASE LAYER
│   ├── Code.gs                  ─── Main server router & public API endpoints (apiLogin, apiSaveRoom, etc.)
│   ├── SheetRepository.gs       ─── Database ORM & Google Sheets multi-table CRUD operations
│   ├── SetupService.gs          ─── Auto-database initializer, schema enforcer & demo seeder
│   ├── SessionService.gs        ─── HMAC-SHA256 cryptographically signed session token manager
│   ├── AuthService.gs           ─── User authentication, SHA-256 salted hashing & RBAC permission checks
│   └── AuditService.gs          ─── Tamper-proof audit logging for all administrative actions
│
├── 🧠 THE BRAIN: ENGINES & ALGORITHMS
│   ├── AllocationEngine.gs      ─── Main deterministic room allocation algorithm & waitlist cascade
│   ├── AllocationValidator.gs   ─── 12-point pre-publication safety and double-booking checker
│   ├── StudentComparator.gs     ─── Multi-tier candidate sorting logic (Tier > Quota > Distance > FIFO)
│   ├── PriorityEngine.gs        ─── Institutional Priority Hierarchy manager (Groups 1 to 6 & dynamic ranks)
│   ├── ReservationEngine.gs     ─── Statutory Category Quota math (SC/ST/OBC/EWS/PwD/Foreign)
│   ├── EligibilityEngine.gs     ─── Automated student eligibility and document completeness evaluator
│   ├── PreferenceEngine.gs      ─── Student 1st/2nd hostel choice resolver
│   ├── ConstraintEngine.gs      ─── Hard rules: strict single occupancy (1 bed) & gender isolation
│   └── ExplanationEngine.gs     ─── Generates human-readable explanations for why a room was allotted
│
├── 🛠️ DOMAIN SERVICES & UTILITIES
│   ├── DistanceService.gs       ─── Google Routes API v2 driving distance calculator
│   ├── DocumentService.gs       ─── Google Drive folder creation, file uploads & doc verification
│   ├── PaymentService.gs        ─── Demand Draft (DD) & online payment recording & reconciliation
│   ├── PolicyEngine.gs          ─── Master academic year dates & institutional rule settings
│   ├── NotificationService.gs   ─── Automated branded HTML email dispatch via Gmail API
│   ├── AnalyticsService.gs      ─── Real-time factual metrics, occupancy rates & lifecycle stepper data
│   ├── ReportService.gs         ─── CSV report generation & data exporter
│   └── TestRunner.gs            ─── Automated 20-test institutional regression test suite
│
└── 📄 CONFIGURATION & DOCUMENTATION
    ├── appsscript.json          ─── Google Apps Script manifest & OAuth scopes
    ├── README.md                ─── Project overview & quick deployment guide
    ├── DEMO_INSTRUCTIONS.md     ─── Live demo script & step-by-step verification guide
    ├── SIH_PITCH_PREPARATION_GUIDE.txt ─── Master pitch guide, jury Q&A & elevator pitch
    ├── HOSTEL360_CONTEXT.md     ─── Deep architectural context & mathematical invariants
    └── HOSTEL_360_FIGMA_FRONTEND_PROMPT.txt ─── UI/UX design prompt for Figma & AI tools
```

---

## 🔍 4. DEEP-DIVE: WHAT EACH FILE DOES BEHIND THE SCENES

### 🌐 Frontend (User Interface)

#### 1. [`Index.html`](file:///d:/PROJECTS/Hostel%20360/Index.html)
- **What it does**: The single-page application (SPA) shell. It holds the top navigation bar, University logo, dark/light mode toggle switch, and user profile badge.
- **How it works**: Uses `<?!= include('FileName') ?>` to pull in all HTML sub-views (login pages, dashboards, styles, and scripts) into one clean page.

#### 2. [`Styles.html`](file:///d:/PROJECTS/Hostel%20360/Styles.html)
- **What it does**: The entire CSS styling system.
- **Key Features**:
  - CSS custom properties (`var(--primary)`, `var(--bg-card)`, etc.).
  - True Matte Charcoal Dark Mode (`[data-theme="dark"]`).
  - Styles for the 8-stage Stepper, KPI metric cards, tables, badges, and modals.

#### 3. [`JavaScript.html`](file:///d:/PROJECTS/Hostel%20360/JavaScript.html)
- **What it does**: The client-side brain of the application (runs inside the user's browser).
- **Key Functions**:
  - `callServer(apiName, ...args)`: Communicates asynchronously with the backend `google.script.run`.
  - `switchWardenTab(tabName)`: Controls tab switching on the Warden Dashboard.
  - `filterWardenApplications`, `filterWardenAllocations`, `filterWardenWaitlist`: Powers the **👨 BOYS** and **👩 GIRLS** subtab filtering.
  - `openHostelResidentsModal`, `submitAddRoom`: Manages live hostel occupancy and single-room creation.

#### 4. [`StudentDashboard.html`](file:///d:/PROJECTS/Hostel%20360/StudentDashboard.html)
- **What it does**: The complete self-service portal for students.
- **Contains**:
  - 8-stage visual progress stepper.
  - Hero Allotment Spotlight Card (with countdown timer and allotment status).
  - Tab 1: Application Form & Preferences.
  - Tab 2: Document Upload to Google Drive.
  - Tab 3: Demand Draft Fee Submission & Receipt status.

#### 5. [`WardenDashboard.html`](file:///d:/PROJECTS/Hostel%20360/WardenDashboard.html)
- **What it does**: The Chief Warden's operational mission control.
- **Contains**:
  - Top action bar (`Refresh`, `▶️ Run Allocation`, `🚀 Publish`, `🔓 Reopen`).
  - 5 Clickable KPI Metric Cards.
  - 8 Specialized Operational Tabs (Analytics, Docs, Allocations, Waitlist, Hostels, Quotas, Payments, Reports).
  - Interactive Modals (Document Verification, Override, Add Room, View Residents, Add Quota Category, Add Priority Tier).

---

### ⚙️ Backend Core & Database

#### 6. [`Code.gs`](file:///d:/PROJECTS/Hostel%20360/Code.gs)
- **What it does**: The central server-side controller and API router.
- **How it works**: Every action triggered by a user in `JavaScript.html` (like logging in, publishing allocations, or approving a document) calls an `api...()` function in `Code.gs`. `Code.gs` checks the user's session token, verifies permissions, calls the respective engine, and returns a clean JSON response.

#### 7. [`SheetRepository.gs`](file:///d:/PROJECTS/Hostel%20360/SheetRepository.gs)
- **What it does**: The Database Engine. It turns standard Google Sheets into a fast relational database.
- **Features**:
  - `getAllRecords(sheetName)`: Fast cached row reader.
  - `insertRecord`, `updateRecordByKey`, `deleteRecordByKey`: Standard CRUD operations.
  - `ensureColumn()`: Self-healing feature that dynamically creates new columns on the Google Sheet if they don't already exist.
  - `sanitizeCellValueForWrite()`: Prevents Google Sheets `#ERROR!` formula parse bugs on phone numbers.

#### 8. [`SetupService.gs`](file:///d:/PROJECTS/Hostel%20360/SetupService.gs)
- **What it does**: 1-click database setup and self-healing.
- **How it works**: If you open a completely blank Google Spreadsheet, `SetupService` automatically creates all 17 required sheets with blue header styling, sets plain-text formatting, and seeds 60 single rooms and demo applicants.

#### 9. [`AuthService.gs`](file:///d:/PROJECTS/Hostel%20360/AuthService.gs) & [`SessionService.gs`](file:///d:/PROJECTS/Hostel%20360/SessionService.gs)
- **What they do**: Security, Authentication & Role-Based Access Control.
- **How they work**:
  - Uses irreversible **SHA-256 salted password hashing**.
  - Generates tamper-proof **HMAC-SHA256 cryptographically signed session tokens**.
  - Enforces strict roles (`STUDENT` cannot access Warden APIs; students can only view their own data).

#### 10. [`AuditService.gs`](file:///d:/PROJECTS/Hostel%20360/AuditService.gs)
- **What it does**: Immutable institutional accountability.
- **How it works**: Every time a room is allotted, a document is approved, or an override is executed, `AuditService` writes a permanent record into the `AuditLog` sheet with timestamp, actor email, old value, new value, and required written rationale.

---

### 🧠 The Allocation Brain & Rule Engines

#### 11. [`AllocationEngine.gs`](file:///d:/PROJECTS/Hostel%20360/AllocationEngine.gs)
- **What it does**: The master execution algorithm.
- **How it works**:
  1. Loads all eligible students who have verified documents.
  2. Partitions students into **Boys** and **Girls** lists.
  3. Sorts them using `StudentComparator.gs`.
  4. Runs single-occupancy room assignments across preferred hostels.
  5. Places remaining students onto the deterministic **Waitlist**.
  6. Supports **`lapseUnreportedAllocations`** (reclaims overdue unpaid rooms) and **`promoteWaitlistCandidates`** (cascades waitlist into vacant rooms).

#### 12. [`StudentComparator.gs`](file:///d:/PROJECTS/Hostel%20360/StudentComparator.gs)
- **What it does**: The deterministic tie-breaker.
- **Comparison Order**:
  1. Priority Group Rank (Rank 1 outranks Rank 2).
  2. Category Quota Weight (Reserved categories outrank General).
  3. Real Driving Distance from Campus (Farthest student wins).
  4. Application Timestamp (First-come, first-served).
  *Note: Enrollment number / marks are never used.*

#### 13. [`PriorityEngine.gs`](file:///d:/PROJECTS/Hostel%20360/PriorityEngine.gs)
- **What it does**: Evaluates which Priority Tier (Groups 1 to 6) a student falls into and allows the Warden to customize and reorder these tiers dynamically.

#### 14. [`ReservationEngine.gs`](file:///d:/PROJECTS/Hostel%20360/ReservationEngine.gs)
- **What it does**: Calculates category seat quotas (SC, ST, OBC, EWS, PwD, Foreign, General).
- **Core Rule**: Unused reserved quota seats remain **`VACANT + RESERVED`** and are never leaked to the General pool unless explicitly released by the Warden with an audited reason.

#### 15. [`ConstraintEngine.gs`](file:///d:/PROJECTS/Hostel%20360/ConstraintEngine.gs) & [`AllocationValidator.gs`](file:///d:/PROJECTS/Hostel%20360/AllocationValidator.gs)
- **What they do**: Safety and integrity checks.
- **How they work**: Enforce that room capacity is always exactly 1, boys are never in girls' hostels, and no room is ever double-booked.

---

### 🛠️ Domain Services & External Integrations

#### 16. [`DistanceService.gs`](file:///d:/PROJECTS/Hostel%20360/DistanceService.gs)
- **What it does**: Distance verification.
- **How it works**: Takes the student's permanent city/pincode and queries **Google Routes API v2** to calculate the exact driving distance from the university campus in kilometers.

#### 17. [`DocumentService.gs`](file:///d:/PROJECTS/Hostel%20360/DocumentService.gs)
- **What it does**: Cloud storage integration.
- **How it works**: Creates structured folders in **Google Drive**, converts Base64 uploaded files from the browser into Drive files, and generates secure view links for the Warden to audit.

#### 18. [`PaymentService.gs`](file:///d:/PROJECTS/Hostel%20360/PaymentService.gs)
- **What it does**: Fee recording & Demand Draft reconciliation.
- **How it works**: Manages DD numbers, issuing bank names, branches, and reconciliation statuses (`PENDING`, `VERIFIED`, `REJECTED`).

#### 19. [`NotificationService.gs`](file:///d:/PROJECTS/Hostel%20360/NotificationService.gs)
- **What it does**: Automated email dispatch.
- **How it works**: Uses Google's native `MailApp` / Gmail engine to send branded HTML emails for room allotment results, fee deadlines, and document status updates.

#### 20. [`AnalyticsService.gs`](file:///d:/PROJECTS/Hostel%20360/AnalyticsService.gs)
- **What it does**: Metrics and charts generator.
- **How it works**: Calculates real-time occupancy percentages, category distribution counts, priority histograms, and the student's current stage (1 to 8) for the lifecycle tracker.

---

## 📊 5. DATABASE SCHEMA QUICK REFERENCE

HOSTEL 360 uses **17 normalized tables** inside Google Sheets:

| Sheet Table | Purpose / Contents |
| :--- | :--- |
| **`Users`** | Authentication credentials, salt, role (`STUDENT` vs `WARDEN`) |
| **`Students`** | Personal profiles, permanent address, gender, program, phone |
| **`Applications`** | Academic year application, eligibility status, hostel preferences |
| **`Documents`** | Drive file IDs, document types, verification status, audit remarks |
| **`Hostels`** | Hostel buildings (Shivalik, Aravali, Satpura, Nilgiri), gender, floors |
| **`Rooms`** | Room numbers, floor, occupancy status (`AVAILABLE`, `ALLOCATED`), Capacity = 1 |
| **`Beds`** | Bed identifiers (Bed 1), linked student ID |
| **`Allocations`** | Room allotment records, allocation status, physical check-in status, deadlines |
| **`Waitlist`** | Position-ranked waitlisted applicants with explanation |
| **`Payments`** | Demand Draft (DD) details, UTR numbers, amount, verification status |
| **`ReservationRules`**| Dynamic category quotas (General, OBC, SC, ST, EWS, PwD, Foreign) |
| **`PriorityRules`** | Institutional Priority Hierarchy order and tier definitions |
| **`Policies`** | Master system policies (deadline days, NCR distance limit) |
| **`AuditLog`** | Immutable chronological record of all administrative actions |
| **`Notifications`** | Log of all automated emails sent via Gmail |
| **`AcademicYears`** | Active academic year and application opening/closing dates |
| **`Preferences`** | Raw preference mapping for applicants |

---

## 🎯 6. SUMMARY: WHY HOSTEL 360 WINS

1. **Zero Infrastructure Cost**: No cloud hosting bills ($0 AWS/GCP cost) — runs natively on existing university Google Workspace.
2. **Zero Bias**: 100% mathematical, deterministic rule hierarchy — eliminating favoritism and legal disputes.
3. **Institutional Realism**: Native support for **Demand Drafts**, **Google Routes API distance validation**, **dynamic quota customization**, and **1-click vacant room reclamation**.
4. **Deployable in 5 Minutes**: Requires zero server installation; can be imported into any college's Google account instantly.
