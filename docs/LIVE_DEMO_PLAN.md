# HOSTEL 360 — Live SIH Demo Presentation & Execution Plan

---

## 🎯 1. DEMO OVERVIEW & CREDENTIALS

> 🌐 **Live Web App Deployment:**  
> [https://script.google.com/macros/s/AKfycbz2gqdNf-fevMecr7wx91fgggoFDJ3otrjxAo57F2X6i0Wqd7iMIPoB2tkB3VPTtgJtzw/exec](https://script.google.com/macros/s/AKfycbz2gqdNf-fevMecr7wx91fgggoFDJ3otrjxAo57F2X6i0Wqd7iMIPoB2tkB3VPTtgJtzw/exec)

### 🔑 Demo Accounts
| Role | Email Address | Password | Details |
| :--- | :--- | :--- | :--- |
| **Demo Student (Visible on Login)** | `aarav.sharma2@hostel360.test` | `Student@123` | **Aarav Sharma** (Pre-submitted applicant #1 of 119) |
| **Live Demo Student (Live Email)** | **`mrg7216@gmail.com`** | `Student@123` | **Mohit Gupta** (Unsubmitted applicant #120 for live demo & real email) |
| **Chief Warden** | `warden.demo@hostel360.test` | `Warden@123` | Full admin console, Quota controls, Allocation Engine, DD Verify |

---

## ⚡ 2. HOW TO RESET & SEED THE 120-STUDENT DATASET

To reset your entire Google Sheet database and seed **120 realistic applicants + 80 single-occupancy rooms + `mrg7216@gmail.com`**:

### Method 1: From Google Apps Script Editor (Recommended)
1. Open your Google Spreadsheet and go to **Extensions &rarr; Apps Script**.
2. In the top function dropdown (next to "Debug" / "Run"), select **`resetAndSeed120Applicants`**.
3. Click **▷ Run**.
4. Check the Execution log — it will display:
   ```text
   ====================================================
   HOSTEL 360: 120 DEMO APPLICANTS SEEDED SUCCESSFULLY
   Hero Student: mrg7216@gmail.com / Student@123
   Chief Warden: warden.demo@hostel360.test / Warden@123
   ====================================================
   ```

### Method 2: From Web App Warden Console
- Log in as Warden (`warden.demo@hostel360.test` / `Warden@123`) and trigger reset via browser console / setup API.

---

## 📊 3. THE SEEDED DATASET ARCHITECTURE

- **4 Hostels with 80 Total Single-Occupancy Rooms**:
  - 👨 **Shivalik Hostel (BH-I)**: 20 Single Rooms (Floors 1–4, Rooms 101–405)
  - 👨 **Aravali Hostel (BH-II)**: 20 Single Rooms (Floors 1–4, Rooms 101–405)
  - 👩 **Satpura Hostel (GH-I)**: 20 Single Rooms (Floors 1–4, Rooms 101–405)
  - 👩 **Nilgiri Hostel (GH-II)**: 20 Single Rooms (Floors 1–4, Rooms 101–405)
- **120 Diverse Student Applicants (60 Boys + 60 Girls)**:
  - Spread across 20+ Indian cities (Jaipur, Patna, Lucknow, Varanasi, Chandigarh, Kolkata, Bengaluru, Pune, Delhi-NCR, etc.).
  - Realistic driving distances from Dwarka Campus (22 km to 2,150 km).
  - Complete representation across all statutory quotas (General, OBC, SC, ST, EWS, PwD, Foreign).
  - Complete representation across all 6 Priority Tiers.
- **Expected Dataset & Outcome**:
  - **119 Applications Pre-Submitted & Pre-Verified** (59 Boys + 60 Girls).
  - **`mrg7216@gmail.com` (Mohit Gupta)** starts with an **unsubmitted application** so you can fill & submit it LIVE on screen!
  - Upon your live submission, total applications counter becomes **120** (60 Boys + 60 Girls).
  - **40 Boys Allotted** (20 Shivalik + 20 Aravali) | **20 Boys Waitlisted**
  - **40 Girls Allotted** (20 Satpura + 20 Nilgiri) | **20 Girls Waitlisted**
  - **`mrg7216@gmail.com`** (Mohit Gupta, Group 2 OD Jaipur 270 km) is **Allotted Room 101 in Shivalik Hostel**, triggering an automated live email to your inbox!
  - **`aarav.sharma2@hostel360.test`** (Aarav Sharma, Group 5 Local Delhi-NCR 18 km) is deterministically placed on the **Waitlist**, allowing you to showcase both Allotment and Waitlist portals!

---

## 🎬 4. THE 3-MINUTE SIH LIVE DEMO SCRIPT (STEP-BY-STEP)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             SIH LIVE DEMO SCRIPT                                 │
├───────────────┬──────────────────────────────────────────────────────────────────┤
│ 0:00 - 0:45   │ 1. Student Portal: Live Application Submission (mrg7216@gmail.com)│
│ 0:45 - 1:45   │ 2. Warden Executive Console, 120 Count & Deterministic Engine Run │
│ 1:45 - 2:30   │ 3. Live Email Verification & Demand Draft (DD) Payment Handshake │
│ 2:30 - 3:00   │ 4. Physical Key Possession, Digital Allotment Letter & Waitlist  │
└───────────────┴──────────────────────────────────────────────────────────────────┘
```

### [0:00 – 0:45] ACT 1: LIVE STUDENT APPLICATION SUBMISSION
1. Open the Web App in your browser.
2. Log in as student:
   - **Email**: `mrg7216@gmail.com`
   - **Password**: `Student@123`
3. **What to Show & Do Live**:
   - Point out the **Application Form**: Profile is pre-populated (*Mohit Gupta, B.Tech CSE, Bengaluru, 2,150 km*).
   - Select Hostel Preferences:
     - **1st Preference**: `Shivalik Hostel (BH-I)`
     - **2nd Preference**: `Aravali Hostel (BH-II)`
   - Click **`Submit Application`** &rarr; toast appears: *"Application submitted successfully"*.
   - Point out the **8-Stage Allocation Lifecycle Stepper** moving to *Stage 3: Verified*.
   - Toggle **Dark / Light Mode** in the navbar to showcase the matte charcoal design system.
   - Click **Sign Out** (red button).

---

### [0:45 – 1:45] ACT 2: WARDEN MISSION CONTROL & 1-CLICK ALLOCATION
1. Log in as Warden:
   - **Email**: `warden.demo@hostel360.test`
   - **Password**: `Warden@123`
2. **What to Show & Say to Jury**:
   - Point out the **Total Applications metric card updated to 120** (119 pre-existing + Mohit Gupta's live submission).
   - **Gender Subtabs**: Click **`👨 BOYS (60)`** and **`👩 GIRLS (60)`** &rarr; show Mohit Gupta listed under Boys.
   - **Dynamic Quota & Priority Hierarchy**: Show the *Quotas & Priority* tab with 1-click **Move Up / Down** rank controls and live percentage editing.
   - Click **`▶️ Run Allocation (Draft)`**:
     - The deterministic engine executes in ~1 second.
     - Show the generated matrix: 80 students allotted single rooms, 40 students ranked on the deterministic waitlist.
   - Click **`🔍 Run Validator`**:
     - Show the 12-point integrity check pass (0 capacity violations, 0 double-bookings, 0 gender mismatches).
   - Click **`🚀 Publish All`**:
     - Locks room allotments, starts the 3-day countdown deadline, and triggers **automated Gmail dispatch**.

---

### [1:45 – 2:30] ACT 3: LIVE EMAIL VERIFICATION & DEMAND DRAFT (DD) PAYMENT
1. **Live Email Proof**:
   - Open your real Gmail inbox for **`mrg7216@gmail.com`** in another tab.
   - Show the incoming email from `HOSTEL 360 Administration`:
     - Subject: `[HOSTEL 360] Hostel Accommodation Allotted - Shivalik Hostel`
     - Content includes Allotment ID, Room Number, Fee Amount (₹35,000), and Reporting Deadline.
2. **Student Demand Draft Submission**:
   - Switch back to the student portal and log in as `mrg7216@gmail.com`.
   - The **Hero Allotment Spotlight Card** is now active with a **live 3-Day Countdown Timer**!
   - Click **Fee Payment / DD Submission** tab:
     - Select Mode: **Demand Draft (DD)**
     - Enter DD Number: `DD-884920`
     - Issuing Bank: `State Bank of India`
     - Branch: `Jaipur Main Branch`
     - Click **Submit Payment Details**.
     - Notice the alert badge: `⏳ DD AWAITING PHYSICAL SUBMISSION`.

---

### [2:30 – 3:00] ACT 4: PHYSICAL CHECK-IN, STAMPED LETTER & RECLAIMING SEATS
1. Log back in as Warden.
2. In **Fee & DD Reconciliation** tab, find Mohit Gupta's DD and click **`✓ Verify DD`**.
3. In **Allocation Engine** tab, find Mohit Gupta and click **`🔑 Check-In / Key`**:
   - Marks student as `✓ CHECKED-IN`.
4. Switch back to student portal:
   - All **8 Stages in the lifecycle stepper are now completed in green with checkmarks (`✓`)**!
   - Click **View Digital Allotment Letter** &rarr; display the official university letterhead with digital seal, room number, fee verification stamp, and Print/PDF feature.
5. In Warden Console, demonstrate **Lapsed Seat Reclamation**:
   - Show **`⏰ Lapse Unreported Seats`** and **`⚡ Promote Waitlist Candidates`** to explain how unoccupied rooms never go to waste.

---

## 🏆 5. KEY DEFENSE STATEMENTS FOR JURY

1. **On Speed & Reliability**:
   *"Our allocation engine processed 120 applicants across 4 hostels, 7 statutory quotas, and 6 priority tiers deterministically in under 1.2 seconds with $0 cloud cost."*
2. **On Real-World Readiness**:
   *"We don't assume every student has a credit card — our Demand Draft reconciliation and physical key handover features model exact university SOPs."*
3. **On Tamper-Proof Auditability**:
   *"Every room assignment, override, and publication is logged in our immutable `AuditLog` sheet with actor email and timestamp, completely eliminating allegations of favoritism."*
