# HOSTEL 360 - Complete Demo & Verification Runbook
**Smart Hostel Allocation Management System**

> **Institutional Single-Occupancy Allotment System**  
> *Built natively on Google Apps Script (V8), Google Sheets (Database), Google Drive, and Vanilla JavaScript.*

---

## 1. Quick Access & Demo Credentials

The demo credentials are displayed directly on their respective login screens:

| Portal | Role | Email | Password | Seeded Student Details |
| :--- | :--- | :--- | :--- | :--- |
| **Student Portal** | Student | `student.demo@hostel360.test` | `Student@123` | Aarav Sharma (B.Tech CSE, Jaipur, Outside Delhi) |
| **Administration Console** | Chief Warden | `warden.demo@hostel360.test` | `Warden@123` | Prof. Rajesh Sharma (Hostel Administration) |

*Tip: A **🌙 Dark / ☀️ Light Mode** toggle is available in the top navigation bar across all pages.*

---

## 2. Recommended 5-Minute Demonstration Walkthrough

Follow this 5-step end-to-end evaluation flow:

```
Step 1: Student Live Submission
         ↓
Step 2: Warden Document Verification
         ↓
Step 3: Multi-Tier Allocation Run & Audit
         ↓
Step 4: Official Allotment Publication
         ↓
Step 5: Student Digital Allotment Letter & Payment
```

---

### Step 1: Student Application & Document Submission

1. **Access Student Portal:**
   - Open the Web App deployment link: [https://script.google.com/macros/s/AKfycbz2gqdNf-fevMecr7wx91fgggoFDJ3otrjxAo57F2X6i0Wqd7iMIPoB2tkB3VPTtgJtzw/exec](https://script.google.com/macros/s/AKfycbz2gqdNf-fevMecr7wx91fgggoFDJ3otrjxAo57F2X6i0Wqd7iMIPoB2tkB3VPTtgJtzw/exec)
   - Click **🎓 Student Portal** and sign in using `student.demo@hostel360.test` / `Student@123`.
2. **Review Profile & Choose Preferences:**
   - The application pre-fills Aarav Sharma's details (Outstation applicant from Jaipur, 270 km from Dwarka campus).
   - Select **First Preferred Hostel:** `Shivalik Hostel (BH-I - BOYS)`
   - Select **Second Preferred Hostel:** `Aravali Hostel (BH-II - BOYS)`
   - Click **💾 Save & Submit Application**.
3. **Upload Mandatory Documents:**
   - Under **Document Verification**, click **Upload** on the required documents (e.g. *Medical Fitness*, *Permanent Address Proof*, *Signed Undertaking*).
   - Documents are securely stored in Google Drive (`HOSTEL_360_STUDENT_DOCUMENTS` folder) and linked to the database.
4. **Record Offline Fee Payment:**
   - In the **Hostel Fee Payment** section, enter:
     - **Amount:** `35000`
     - **Mode:** `Bank Transfer (NEFT/RTGS)`
     - **Transaction Reference / UTR:** `UTR987654321`
   - Click **Record Payment Details** (enters status: `PENDING`).
5. **Sign Out:** Click **Sign Out** in the top navigation bar.

---

### Step 2: Warden Document & Payment Reconciliation

1. **Access Administration Console:**
   - On the landing page, click **🛡️ Warden Administration** &rarr; sign in using `warden.demo@hostel360.test` / `Warden@123`.
2. **Review & Approve Documents:**
   - Click the **📝 Applications & Docs** tab.
   - Locate Aarav Sharma's application (`APP_2026_...`) and click **Docs (5)**.
   - Review the uploaded Drive links and click **Approve** on the documents.
3. **Audit Offline Fee Payment:**
   - Click the **💳 Fee Payments** tab.
   - Find transaction `UTR987654321` submitted by Aarav Sharma.
   - Click **Verify** to confirm bank receipt reconciliation.

---

### Step 3: Run Deterministic Allocation Engine

1. **Execute Draft Allocation Run:**
   - From the top action bar, click **▶️ Run Allocation (Draft)** and confirm.
   - The system deterministically processes all male and female applicant pools:
     - **Group 1:** PwD / Specially-abled students (allocated top-priority single rooms).
     - **Group 2:** Outside Delhi outstation applicants sorted by distance & quota.
     - **Group 3–6:** Delhi outstation, parent posting, and local NCR categories.
2. **Inspect Allocation Results:**
   - Switch to the **🎯 Allocation Engine** tab to see assigned Single Occupancy rooms (`Floor 1 to 3`, `Capacity = 1`).
   - Switch to the **⏳ Waitlist** tab to observe ranked waitlist positions with deterministic reasoning.
3. **Run Pre-Publication Integrity Audit:**
   - Click **🔍 Run Validator** in the action bar.
   - The 12-point integrity engine verifies zero double-bookings, strict gender isolation, quota adherence, and single-occupancy compliance.

---

### Step 4: Official Allotment Publication

1. **Publish Allotments:**
   - Click **🚀 Publish Allocations** in the top action bar and confirm.
   - The system locks the room records (`OCCUPIED`), updates application states (`ALLOCATED`), and dispatches official email notifications.
2. **Sign Out:** Click **Sign Out**.

---

### Step 5: Student Digital Allotment Letter

1. **Log In as Student:**
   - Return to **Student Portal** and log in as `student.demo@hostel360.test`.
2. **View Real-Time Allotment Spotlight:**
   - The dashboard updates with the **OFFICIALLY ALLOTTED • SINGLE OCCUPANCY** spotlight card displaying:
     - Allotted Room number, Floor, and Hostel Name
     - Evaluated Priority Tier & Reservation Quota
     - Deterministic rule explanation (100% auditable, zero AI/LLM hallucinations)
3. **Generate Official Digital Allotment Letter:**
   - Click **📄 View Digital Allotment Letter** (or the header banner button).
   - An institutional letterhead modal renders with student details, room assignment, fee verification stamp, deterministic explanation, and official digital seal.
   - Click **🖨️ Print / Save as PDF** to test clean document printing.

---

## 3. Key Architectural Principles Evaluated

| Feature | Institutional Rule Enforced | How to Verify in Demo |
| :--- | :--- | :--- |
| **Strict Single Occupancy** | Every room capacity is fixed at 1 bed (`Capacity = 1`). | Check room list in Warden Console; no room ever holds >1 student. |
| **Gender Isolation** | Male students &rarr; Boys Hostels only; Female &rarr; Girls only. | View `Allocations` table — zero crossover between male/female residences. |
| **Preference Fallback** | Pref 1 &rarr; Pref 2 &rarr; Waitlist (unless "No Preference" chosen). | A student who selected 2 specific full hostels is waitlisted, never placed in an unchosen 3rd hostel. |
| **Distance Rule** | Higher priority tier always outranks lower tier regardless of distance. | Group 2 outstation applicant living 50 km away outranks Group 5 local applicant living 60 km away. |
| **Reserved Quota Isolation** | Unused SC/ST/OBC seats remain vacant (`RESERVED + VACANT`). | Quotas do not automatically spill into General pool unless Warden explicitly clicks *Release Vacant Seats*. |
| **Warden Manual Override** | Warden can reallocate a room with required written justification. | Click *Override* on any allocation — must pass gender & capacity constraints and logs to `AuditLog`. |
| **Password Security** | Salted SHA-256 password hashing per user. | No plaintext or reversible passwords stored in `Users` sheet. |

---

## 4. Administrative Features & Reports

In the Warden Console, explore:

- **📊 Overview & Charts:** Real-time visual charts for Category Breakdown, Hostel Occupancy Rates, and Priority Tier Distribution.
- **🏢 Hostels & Rooms:** Inspect the 4 hostels (Shivalik, Aravali, Satpura, Nilgiri) and add rooms dynamically.
- **⚖️ Reservation & Quotas:** View active seat quota calculations and test the **Release Vacant Seats** workflow.
- **📑 Reports & Audit:** Download CSV reports for:
  - *Full Allocation Master Sheet*
  - *Official Waitlist Register*
  - *Hostel Occupancy Report*
  - *Category Reservation Breakdown*
  - *Financial & Fee Reconciliation Report*
  - *Immutable Administrative Audit Trail*

---

## 5. Automated Regression Test Suite

To verify the test suite directly in Google Apps Script:
1. Open the Google Spreadsheet &rarr; **Extensions &rarr; Apps Script**.
2. Select `runHostel360RegressionTests` from the top function dropdown.
3. Click **Run** &rarr; View **Execution log**.
4. All **20 institutional regression tests** will execute and report `✅ [PASS]`.
