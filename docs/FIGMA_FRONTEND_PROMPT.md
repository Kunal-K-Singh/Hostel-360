# PROJECT: HOSTEL 360 - SMART HOSTEL ALLOCATION MANAGEMENT SYSTEM
# PURPOSE: Master Frontend UI/UX Design Specification & AI Prompt for Figma / v0.dev / Relume / Claude Artifacts

================================================================================
SECTION 1: DESIGN PHILOSOPHY & AESTHETIC DIRECTIVES ("HUMAN-CRAFTED ENTERPRISE")
================================================================================
- Core Tone: Trustworthy Academic ERP, High Information Density, Intuitive Hierarchy, Purposeful Micro-Interactions.
- Anti-AI-Trope Rules (To feel realistic, human-designed & enterprise-ready):
  * NO generic floating glass bubbles, neon glow gradients, or futuristic cyber illustrations.
  * NO ambiguous iconography or placeholder dummy text.
  * Use clear tabular records, distinct semantic status badges (Emerald/Amber/Crimson/Slate), and clear card compartmentalization.
  * Responsive layout designed for desktop administrative workflows (1440px / 1280px) and student mobile/tablet devices.

================================================================================
SECTION 2: DESIGN SYSTEM SPECIFICATIONS
================================================================================
1. COLOR PALETTE:
   - Primary Brand Navy: `#0F172A` (Slate 900), `#1E293B` (Slate 800), `#2563EB` (Blue 600)
   - Accent & Interactive: `#3B82F6` (Blue 500), `#4F46E5` (Indigo 600)
   - Backgrounds & Canvas:
     * App Canvas: `#F8FAFC` (Slate 50)
     * Surface / Card Background: `#FFFFFF` (Pure White)
     * Subtle Sub-panels: `#F1F5F9` (Slate 100)
   - Borders & Dividers: `#E2E8F0` (Slate 200), `#CBD5E1` (Slate 300)
   - Semantic Status Tokens:
     * Success / Verified: `#059669` (Emerald 600), BG: `#ECFDF5`, Border: `#A7F3D0`
     * Pending / Warning / Waitlist: `#D97706` (Amber 600), BG: `#FFFBEB`, Border: `#FDE68A`
     * Danger / Overdue / Lapsed: `#DC2626` (Red 600), BG: `#FEF2F2`, Border: `#FECACA`
     * Neutral / Informative: `#475569` (Slate 600), BG: `#F1F5F9`, Border: `#E2E8F0`

2. TYPOGRAPHY:
   - Font Family: `Inter`, `Plus Jakarta Sans`, or `SF Pro Display` for UI; `JetBrains Mono` for ID tags, Room numbers, and Transaction References.
   - Hierarchy:
     * H1 Page Titles: 24px - 26px, Bold (700), Color: `#0F172A`
     * H2 Section Headers: 18px - 20px, SemiBold (600), Color: `#1E293B`
     * H3 Card Headers: 15px - 16px, SemiBold (600)
     * Body Text: 14px, Regular (400), Line-height: 1.5, Color: `#334155`
     * Subtitles & Hints: 12.5px - 13px, Regular (400), Color: `#64748B`
     * Status Badges: 11.5px - 12px, SemiBold (600), Letter-spacing: 0.03em

3. COMPONENT PATTERNS:
   - Cards: `background: #FFFFFF`, `border: 1px solid #E2E8F0`, `border-radius: 8px`, `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04)`.
   - Primary Buttons: Solid Navy or Royal Blue (`#2563EB`), white text, `border-radius: 6px`, padding `8px 16px`.
   - Tables: Fixed header row (`background: #F8FAFC`, uppercase 12px labels), alternating row hover, right-aligned action buttons with distinct visual hierarchy.

================================================================================
SECTION 3: SCREEN 1 — STUDENT PORTAL DASHBOARD
================================================================================
A. GLOBAL TOP NAVBAR:
   - Brand: University Shield Icon + "HOSTEL 360" + Badge "Academic Year 2026-27".
   - Student Info Chip: "Aarav Sharma • Enrollment: 04216403223" + Badge "STUDENT" + "Sign Out" button.

B. 8-STAGE HORIZONTAL LIFECYCLE TRACKER (STEPPER):
   - Progression:
     1. Portal Open -> 2. Profile & Address -> 3. Doc Upload -> 4. Warden Verification ->
     5. Engine Allocation -> 6. Allotment Published -> 7. Fee & DD Payment -> 8. Room Key Handover
   - Visual Styling:
     * Completed steps: Emerald green circle with checkmark (✓) and connected green line.
     * Active step: Pulsed blue ring with bold title.
     * Upcoming steps: Light slate circle with muted gray text.

C. HERO ALLOTMENT SPOTLIGHT CARD (Appears between Stepper and Tabs ONLY when room is allotted):
   - Visual Treatment: High-contrast rich indigo/navy gradient card with gold accent badges.
   - Content:
     * Top Bar: "OFFICIALLY ALLOTTED • SINGLE OCCUPANCY" badge + Physical Check-in Status badge ("✓ REGISTRATION COMPLETED" or "⏳ OFFLINE CHECK-IN PENDING" or "🔴 DEADLINE EXPIRED (OVERDUE)").
     * Center: Large Room Number ("Room 204 • Floor 2") + Hostel Name ("Shivalik Hostel (BH-I)").
     * Metadata: Allotment Date, Priority Tier ("Group 2 - Outside Delhi"), Category Quota.
     * Official Decision Explanation Box: Transparent, auditable plain-English rule explanation.
     * Live Countdown Pill: "⏳ Fee & Reporting Deadline: 3 days (72 hours remaining)".
     * Physical Handover Callout: "📌 Please visit the Warden Office with your printed Allotment Letter and physical Demand Draft for biometric registration and room key handover."
     * Action: `[📄 View & Print Digital Allotment Letter]` button.

D. PARTITIONED 3-TAB WORKSPACE:
   - Tab 1: 📝 Application & Preferences
     * Clean 2-column form: Programme, Department, Category, Region (Delhi / Outside Delhi), NCR residency toggle, Parent outside NCR toggle, PwD toggle.
     * Permanent Address with auto-calculated distance from campus.
     * Single-Occupancy Hostel Preferences: 1st Preference, 2nd Preference, or "No Preference" checkbox.
   - Tab 2: 📁 Document Verification
     * Table of required certificates: Admission Fee Receipt, Medical Fitness, Permanent Address Proof, Undertakings, PwD Certificate.
     * Status pills (`VERIFIED`, `PENDING_REVIEW`, `REJECTED` with Warden audit notes).
   - Tab 3: 💳 Hostel Fee Payment & Demand Draft Reconciliation
     * Pre-allocation State: Clean locked banner with padlock icon explaining payment unlocks upon room allotment.
     * Post-allocation State:
       - Annual Hostel Fee badge: "INR 35,000".
       - Payment Instrument Dropdown: "Demand Draft (DD) - Institutional Default", "Bank Transfer (NEFT/RTGS)", "Bank Challan".
       - Dedicated Demand Draft Fields:
         * DD Number (6 digits), Issuing Bank Name, Issuing Branch, Drawn in Favor Of ("Registrar, GGSIP University" - Read-only), Issue Date.
         * Guidance Callout: "🏦 Please prepare a DD payable at Delhi and hand over the physical instrument to the Warden during room key handover."
       - Recorded Receipts Ledger: Reference/DD#, Bank, Amount, Date, Status (`⏳ DD AWAITING PHYSICAL HANDOVER` / `✓ VERIFIED`).

================================================================================
SECTION 4: SCREEN 2 — WARDEN ADMINISTRATION CONSOLE
================================================================================
A. EXECUTIVE HEADER & ACTIONS BAR:
   - Title: "Warden Administration Console • Academic Year 2026-27"
   - Executive Action Buttons:
     * `[▶️ Run Allocation Engine (Draft)]` (Solid Blue)
     * `[🚀 Publish Official Allocations]` (Solid Emerald Green)
     * `[🔓 Reopen Allocations]` (Solid Red Outline)
     * `[🌱 Seed Demo Applicants]` (Slate Outline)
     * `[🔄 Refresh]`

B. TOP KPI SUMMARY METRICS (5 TILES):
   1. Total Registered Applications (e.g. 60)
   2. Published Room Allotments (e.g. 48 Single Rooms)
   3. Waitlisted Candidates (e.g. 12 Ranked)
   4. Campus Occupancy Rate (e.g. 80% • 12 Available Rooms)
   5. Pending Audit Verifications (e.g. 4 Docs / 3 DD Receipts)

C. TABBED ADMINISTRATIVE CONSOLE (8 SPECIALIZED TABS):
   - Tab 1: 📊 Overview & Analytics: Quota distribution pie charts, single-room occupancy bars, priority group histograms.
   - Tab 2: 📝 Applications & Doc Audit:
     * Full applicant roster with Category, Distance (km), Priority Tier.
     * "Audit Docs" button opening fast document review modal with `[✓ Approve All]` / `[✕ Reject]`.
   - Tab 3: 🎯 Allocation Engine & Room Management:
     * Master Table: Allocation ID, Student Name, Hostel, Room Number (Floor), Priority Tier, Quota, Allotment Status, Check-In Status.
     * Dynamic Alert Badges: `🔴 OVERDUE` highlighted for students exceeding the reporting deadline without payment.
     * Header Action: `[⏰ Lapse Unreported Seats]` (1-click bulk forfeiture) and `[⚡ Promote Waitlist]`.
     * Row Actions: `[🔑 Check-In / Key Handover]` and `[✏️ Override / Cancel Allotment]`.
   - Tab 4: ⏳ Deterministic Institutional Waitlist:
     * Position-ranked table (Rank #1, #2, #3...) ordered strictly by Tier, Quota, and Distance without marks/merit.
     * Header Action: `[⚡ Promote Waitlisted Candidates to Vacant Rooms]`.
   - Tab 5: 🏢 Hostels & Rooms Inventory:
     * Hostel Overview: Shivalik (Boys), Aravali (Boys), Satpura (Girls), Nilgiri (Girls).
     * Single-occupancy inventory grid (Floor 1, 2, 3) with live `AVAILABLE` / `OCCUPIED` status chips.
   - Tab 6: ⚖️ Reservation & Quotas (Fully Configurable):
     * Card 1: Category Quotas (`GENERAL`, `OBC`, `SC`, `ST`, `EWS`, `PWD`, `FOREIGN`, + Custom Categories):
       - Inline editable percentage inputs + `[+ Add Quota Category]` modal + `[💾 Save Quota Percentages]`.
       - Seat counts, Used seats, Remaining vacant seats, `[Release Vacant Seats]` button.
     * Card 2: Institutional Priority Hierarchy (Deterministic Ranks 1 to N):
       - Tier Code, Group Name, Policy Description, Order Rank.
       - Reorder buttons (`[⬆️ Up]`, `[⬇️ Down]`), `[+ Add Priority Tier]` modal, `[✏️ Edit]`, `[🗑️ Delete]`, `[💾 Save Priority Order]`.
   - Tab 7: 💳 Fee Payments & DD Reconciliation:
     * Ledger of student payment records showing DD Number, Issuing Bank, Branch.
     * Fast-action reconciliation buttons: `[✓ Verify DD Received]` and `[✕ Reject]`.
   - Tab 8: 📜 Reports & Audit Trail:
     * Chronological immutable audit log of every allocation, room reassignment, seat cancellation, and policy update.

================================================================================
SECTION 5: MODAL DIALOGS & OVERLAYS
================================================================================
1. MANUAL OVERRIDE & CANCELLATION MODAL:
   - Radio Selector: `🔀 Reassign Single Room` vs `🚫 Cancel & Revoke Allotment`.
   - Target Hostel and Single Room pickers.
   - Mandatory Administrative Reason textarea.
2. DIGITAL ALLOTMENT LETTER MODAL:
   - Printable view with university emblem, official seal, single-room details, and print trigger.
3. ADD / EDIT PRIORITY TIER & QUOTA CATEGORY MODALS:
   - Clean popup dialogs with validated inputs for Category Codes, Percentages, Tier Codes, and Order Ranks.
