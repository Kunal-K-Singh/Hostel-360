# HOSTEL 360 — PROJECT HANDOFF / CONTEXT FILE

## PURPOSE

This file is the authoritative handoff for continuing the Hostel 360 MVP in a fresh Antigravity conversation/account.

IMPORTANT:
- Read this file completely before modifying code.
- The project already exists and has been tested.
- DO NOT rebuild it from scratch.
- Make targeted fixes only.

---

## 1. PROJECT

Hostel 360 is a Google Apps Script Web App for:
- hostel applications
- eligibility
- reservation-aware allocation
- warden review
- allocation publication
- student/warden dashboards
- analytics
- documents
- offline payment tracking
- reports
- notifications
- auditability

Stack:
- Google Apps Script
- Google Sheets
- Google Drive
- Apps Script MailApp/GmailApp
- Vanilla HTML/CSS/JavaScript
- V8 runtime
- No Firebase
- No Node.js backend
- No payment gateway
- No LLM

MVP scope: fresh admissions.

All rooms are single occupancy.

Both boys and girls hostels are supported.

---

## 2. LOCAL PROJECT / DEPLOYMENT

Local folder:

D:\PROJECTS\Hostel 360

Apps Script project:
Hostel 360

Database spreadsheet:
HOSTEL 360 Database

Manifest currently uses:
- Asia/Kolkata
- V8
- spreadsheets scope
- Drive scope
- send_mail scope
- userinfo.email scope
- web app executeAs USER_DEPLOYING
- web app access ANYONE

Deployment:
- Execute as: Me / deploying account
- Who has access: Anyone

This is intentional because the application uses custom email/password authentication and server-side Google Sheets/Drive/Mail operations.

---

## 3. DATABASE

setupHostel360() has already been executed successfully.

17 sheets exist:

1. Users
2. Students
3. Applications
4. Documents
5. Hostels
6. Rooms
7. Beds
8. Policies
9. ReservationRules
10. PriorityRules
11. Preferences
12. Allocations
13. Waitlist
14. Payments
15. AuditLog
16. Notifications
17. AcademicYears

Synthetic demo capacity:
- 60 rooms total
- 15 rooms per hostel
- 3 floors
- single occupancy

The 60 rooms are DEMO DATA, not permanent institutional capacity.

Initial hostels:

BOYS:
- Shivalik / BH-I
- Aravali / BH-II

GIRLS:
- Satpura / GH-I
- Nilgiri / GH-II

---

## 4. USERS / AUTHENTICATION

Roles:
- STUDENT
- WARDEN

Authentication:
- email + password
- salted and hashed password storage
- plaintext passwords never stored or returned
- server-side authentication
- server-side RBAC
- server-side student ownership checks
- frontend is never trusted for authorization

MVP only requires logout.

---

## 5. STUDENT FLOW

Landing
→ Student Login
→ Student Dashboard
→ Fill Application
→ Submit
→ Eligibility/document status
→ Allocation status
→ Payment information
→ Published allocation
→ Digital allotment letter

---

## 6. WARDEN FLOW

Landing
→ Warden Login
→ Warden Dashboard
→ Application review
→ Document verification
→ Eligibility/allocation processing
→ DRAFT allocation
→ Validation
→ Manual override if required
→ Review
→ Publish
→ LOCKED allocation
→ Analytics/reports/audit

---

## 7. AUTHORITATIVE ALLOCATION RULES

### Gender
Male → boys hostels only.
Female → girls hostels only.

### Occupancy
Every room is single occupancy.
An occupied room must never be assigned again.

### Academic merit
NOT USED.
Do not introduce academic merit scoring.

### Priority
Priority Group is the primary ranking criterion.

Distance must NEVER allow a lower-priority group to overtake a higher-priority group.

Within the same appropriate priority/category context:
- distance may be used as a tie-breaker
- application submission timestamp is a later tie-breaker

Enrollment number is NOT an institutional allocation criterion.

An internal immutable ID may only be used as a technical deterministic safeguard when all meaningful criteria are identical.

### Preferences

Students select:
- Preference 1
- Preference 2
- No Preference

Correct logic:

Preference 1 available + compatible
→ Preference 1

Preference 1 unavailable
→ Preference 2 if available + compatible

Preference 1 unavailable + Preference 2 unavailable
→ WAITLIST

Specific preferences must NOT fall back to an unrelated third/general hostel.

No Preference
→ any compatible hostel may be considered.

Gender and eligibility constraints always override preferences.

### Reservation

Reservation rules are configurable by Warden.

Unused reserved seats remain VACANT.

They must NOT silently be allocated to General students.

Only Warden can explicitly release reserved seats to General Pool.

Release must be audited with:
- Warden/UserID
- timestamp
- category
- number released
- reason
- old state
- new state

---

## 8. ALLOCATION LIFECYCLE

DRAFT
→ REVIEW
→ PUBLISHED
→ LOCKED

Run creates DRAFT.

Students cannot see DRAFT.

Warden reviews/validates.

Warden can make valid manual overrides.

Warden publishes.

Published allocation becomes LOCKED.

Reopening must be explicit and audited.

---

## 9. MANUAL OVERRIDE

Warden overrides must be validated.

Reject:
- gender mismatch
- occupied room
- unavailable room
- capacity violation
- ineligible student
- invalid hostel
- invalid room
- reservation violation
- duplicate allocation

Valid override records:
- old hostel
- old room
- new hostel
- new room
- reason
- Warden/UserID
- timestamp

in AuditLog.

---

## 10. STUDENT DASHBOARD

Factual information only.

Do NOT add:
- allocation probability
- predicted chance
- AI prediction
- preference match score
- academic merit score
- LLM-generated explanation

Show:
- application status/completion
- eligibility
- documents
- application timeline
- factual hostel availability
- allocation status
- payment information
- hostel/room after publication
- floor
- allocation date
- priority information
- deterministic allocation explanation

---

## 11. STUDENT TIMELINE

Official MVP timeline:

1. Submitted
2. Eligibility Check
3. Document Verification
4. Allocation Processing
5. Warden Review
6. Allocation Published
7. Payment
8. Registration

Do NOT add Possession.

---

## 12. DIGITAL ALLOTMENT LETTER

After publication, student can view the Digital Allotment Letter.

Current implementation reportedly provides a modal with print/save-as-PDF capability.

Letter should contain:
- Hostel 360/institution heading
- student name
- enrollment number
- academic year
- application ID
- hostel name/code
- room number
- floor
- allocation date
- allocation status
- priority information
- payment information/status
- deterministic explanation

No LLM.

Browser print/save-as-PDF is acceptable for MVP.

---

## 13. PAYMENT

No payment gateway.

Payment is offline.

Student may submit payment details → PENDING.

Warden verifies/rejects.

Student must never set VERIFIED.

Recommended statuses:
- PENDING
- PAID
- VERIFIED

Payment linked to:
- Student
- Application
- Academic Year

---

## 14. DOCUMENTS

Google Drive integration.

Track:
- DriveFileID
- DriveURL
- verification status
- verifier
- timestamp
- remarks

Student cannot mark documents VERIFIED.

Warden verifies.

---

## 15. EMAILS

Required:
1. Application submitted
2. Allocation published

Send to student's university/login email.

---

## 16. DISTANCE

MVP uses deterministic coordinate/pincode heuristic distance.

Do NOT add Routes API now.

Future:
Permanent Address
→ Google Routes API
→ Distance from Dwarka Campus
→ allocation tie-break

API keys must remain server-side.

Future Script Property:
GOOGLE_ROUTES_API_KEY

---

## 17. ANALYTICS

Warden analytics should include factual:
- total applications
- eligible/ineligible
- pending verification
- boys/girls
- category distribution
- programme distribution
- allocated/waitlisted
- allocation percentage
- allocation by hostel
- allocation by priority group
- total/occupied/available rooms
- occupancy percentage
- hostel/floor occupancy
- reserved capacity
- foreign quota utilization
- application/allocation/waitlist trends
- priority-group allocation
- reserved-seat utilization
- first/second preference allocations
- waitlist distribution
- manual overrides
- category/gender distribution

No predictive AI.

---

## 18. REPORTS

Warden reports:
- Application
- Allocation
- Waitlist
- Occupancy
- Reservation
- Payment
- Document verification
- Audit

CSV mandatory.
PDF optional.

---

## 19. AUDIT

Audit:
- login/logout
- document verification
- application verification
- allocation run
- validation
- publish
- override
- reopen
- reservation changes
- room changes
- policy changes
- payment verification

Ordinary users cannot modify audit records.

---

## 20. POLICY CONFIGURATION

Reservation and institutional policies must be configurable by Warden because university policy may change.

Do not hardcode policy into frontend.

---

## 21. IMPORTANT MODULES

Backend:
- Code.gs
- AuthService.gs
- SessionService.gs
- SheetRepository.gs
- EligibilityEngine.gs
- PolicyEngine.gs
- PriorityEngine.gs
- ReservationEngine.gs
- ConstraintEngine.gs
- PreferenceEngine.gs
- StudentComparator.gs
- AllocationEngine.gs
- AllocationValidator.gs
- ExplanationEngine.gs
- DistanceService.gs
- DocumentService.gs
- PaymentService.gs
- AnalyticsService.gs
- AuditService.gs
- NotificationService.gs
- ReportService.gs
- SetupService.gs
- TestRunner.gs

Frontend:
- Index.html
- StudentLogin.html
- StudentDashboard.html
- WardenLogin.html
- WardenDashboard.html
- Styles.html
- JavaScript.html

---

## 22. RECENT CORRECTIONS ALREADY COMPLETED

Do not redo unless actual code inspection shows a regression.

1. Preference fallback corrected.
2. Enrollment number removed as institutional criterion.
3. Distance corrected so priority group dominates.
4. Reserved seats protected until Warden release.
5. 60 rooms documented as synthetic demo data.
6. Password terminology corrected to salted/hashed.
7. Possession removed from timeline.
8. Digital allotment letter added.
9. Offline payment workflow clarified.
10. Demo student changed to live application submission flow.

---

## 23. REGRESSION TESTS

TestRunner.gs exists.

Latest run:

Passed: 20 / 20
Failed: 0

Tests:
1. Male → Girls rejection
2. Female → Boys rejection
3. Same room duplicate rejection
4. Preference 1 ordering
5. Preference 2 ordering
6. No fallback to unchosen third hostel
7. No Preference considers compatible hostels
8. Reserved quota distinct from General
9. Reserved release math
10. Priority overrides distance
11. Same priority: greater distance ranks higher
12. Student ID tampering denied
13. Role escalation denied
14. Draft invisible to student
15. Published allocation visible
16. Invalid manual override rejected
17. Valid manual override accepted
18. Password hashing salted/irreversible
19. Student cannot verify payment
20. Digital allotment letter structure complete

Minor test-output issue:
Test 3 says:
"Duplicate room allocation: Room undefined in Shivalik Hostel is already assigned."
The test passed. This appears to be a test fixture/display-field issue and is not currently a blocker.

---

## 24. CURRENT DEPLOYMENT

All .gs and .html files have been manually copied into Apps Script.

setupHostel360() has run.

17 sheets created.

20/20 regression tests pass.

Web App deployed:
- Execute as: Me
- Who has access: Anyone

Frontend testing is now underway.

---

# 25. CURRENT BLOCKER — STUDENT DASHBOARD REFRESH

Observed:
- Student login succeeds.
- Student dashboard initially opens.
- Refreshing Student Dashboard produces:
  "An unexpected server error occurred."
- Apps Script Executions show apiLogin and apiGetStudentDashboard as Completed.
- Browser console showed Apps Script iframe/security warnings, but those do not appear to be the application error.
- apiResponse catches backend exceptions and returns success:false.

Current apiGetStudentDashboard():

function apiGetStudentDashboard(token) {
  return apiResponse(function () {
    var session = AuthService.requireRole(token, 'STUDENT');
    var studentId = session.studentId;

    if (!studentId) {
      throw new Error('No student record associated with this account.');
    }

    var student = SheetRepository.findRecordByKey(SheetRepository.SHEETS.STUDENTS, 'StudentID', studentId);
    var activeYear = PolicyEngine.getActiveAcademicYear();
    var windowStatus = PolicyEngine.isApplicationWindowOpen();

    var application = SheetRepository.findRecords(SheetRepository.SHEETS.APPLICATIONS, function (a) {
      return String(a.StudentID) === String(studentId) &&
             String(a.AcademicYear) === String(activeYear.AcademicYear);
    })[0] || null;

    var documents = DocumentService.getStudentDocuments(studentId);
    var payments = PaymentService.getStudentPayments(studentId);

    var allocation = SheetRepository.findRecords(SheetRepository.SHEETS.ALLOCATIONS, function (al) {
      return String(al.StudentID) === String(studentId) &&
             String(al.AcademicYear) === String(activeYear.AcademicYear) &&
             al.Status === 'PUBLISHED';
    })[0] || null;

    var allocatedHostel = null;
    var allocatedRoom = null;

    if (allocation) {
      allocatedHostel = SheetRepository.findRecordByKey(
        SheetRepository.SHEETS.HOSTELS,
        'HostelID',
        allocation.HostelID
      );

      allocatedRoom = SheetRepository.findRecordByKey(
        SheetRepository.SHEETS.ROOMS,
        'RoomID',
        allocation.RoomID
      );
    }

    var waitlist = SheetRepository.findRecords(
      SheetRepository.SHEETS.WAITLIST,
      function (w) {
        return String(w.StudentID) === String(studentId) &&
               String(w.AcademicYear) === String(activeYear.AcademicYear) &&
               w.Status === 'ACTIVE';
      }
    )[0] || null;

    var allHostels = SheetRepository.findRecords(
      SheetRepository.SHEETS.HOSTELS,
      function (h) {
        return h.Status === 'ACTIVE' ||
               h.Status === 'true' ||
               h.Status === true;
      }
    );

    var analytics = AnalyticsService.getStudentAnalytics(studentId);
    var mandatoryDocs = PolicyEngine.getMandatoryDocuments();
    var feeAmount = PolicyEngine.getPolicyValue('HOSTEL_FEE_AMOUNT', 35000);

    return {
      student: student,
      academicYear: activeYear,
      windowStatus: windowStatus,
      application: application,
      documents: documents,
      mandatoryDocs: mandatoryDocs,
      payments: payments,
      feeAmount: feeAmount,
      allocation: allocation ? {
        allocationId: allocation.AllocationID,
        hostelName: allocatedHostel ? allocatedHostel.Name : '',
        hostelCode: allocatedHostel ? allocatedHostel.Code : '',
        roomNumber: allocatedRoom ? allocatedRoom.RoomNumber : '',
        floorNumber: allocatedRoom ? allocatedRoom.FloorNumber : '',
        allocatedDate: allocation.AllocatedDate,
        priorityGroup: allocation.PriorityGroup,
        explanation: allocation.Explanation,
        status: allocation.Status
      } : null,
      waitlist: waitlist ? {
        waitlistId: waitlist.WaitlistID,
        position: waitlist.WaitlistPosition,
        priorityGroup: waitlist.PriorityGroup,
        explanation: waitlist.Explanation,
        status: waitlist.Status
      } : null,
      hostelsList: allHostels,
      analytics: analytics
    };
  });
}

Current apiResponse():

function apiResponse(actionFn) {
  try {
    var result = actionFn();

    return {
      success: true,
      data: result,
      error: null
    };
  } catch (err) {
    Logger.log(
      'API Error: ' +
      err.message +
      (err.stack ? '
' + err.stack : '')
    );

    return {
      success: false,
      data: null,
      error: err.message ||
             'An unexpected error occurred. Please try again.'
    };
  }
}

Dependencies to inspect:
- AuthService.requireRole()
- PolicyEngine.getActiveAcademicYear()
- PolicyEngine.isApplicationWindowOpen()
- DocumentService.getStudentDocuments()
- PaymentService.getStudentPayments()
- AnalyticsService.getStudentAnalytics()
- PolicyEngine.getMandatoryDocuments()
- PolicyEngine.getPolicyValue()
- SheetRepository methods
- JavaScript.html callServer
- StudentDashboard initialization

IMPORTANT:
Do not blindly rewrite apiResponse or the whole dashboard.

First trace the actual failure and identify the root cause.

---

## 26. NEXT TASK

Fix Student Dashboard refresh.

Acceptance:
1. Student login works.
2. Dashboard opens.
3. Refresh does not show generic error.
4. Dashboard data loads correctly.
5. Authentication remains secure.
6. 20/20 regression tests remain passing.
7. No student data exposure.
8. Warden dashboard remains unaffected.

Do not add broad new features until this is fixed.

---

## 27. DEVELOPMENT RULES

Do not rebuild.
Do not change stack.
Do not add Firebase.
Do not add LLM.
Do not add payment gateway.
Do not change allocation rules without explicit instruction.
Do not remove working functionality.

Before editing:
1. Read this file.
2. Inspect actual code.
3. Identify root cause.
4. Explain root cause.
5. Make smallest safe fix.
6. Test.
7. Report exact files changed and why.

Actual code and test results are the source of truth, not README claims.

---

## 28. FINAL STATUS

Backend architecture: implemented
Database setup: complete
17 sheets: created
Synthetic data: created
Authentication: implemented
RBAC: implemented
Allocation engine: implemented
Reservation: implemented
Preferences: corrected
Waitlist: implemented
Warden review/publish: implemented
Overrides: implemented
Analytics: implemented
Documents: implemented
Offline payment tracking: implemented
Digital allotment letter: implemented
Reports/audit/email infrastructure: implemented
Regression tests: 20/20 PASSING
Web App deployment: complete
Frontend end-to-end testing: IN PROGRESS

CURRENT BLOCKER:
Student Dashboard refresh produces a generic server error even though apiGetStudentDashboard appears Completed.

NEXT ACTION:
Diagnose and fix Student Dashboard refresh without disturbing the tested allocation/authentication architecture.
