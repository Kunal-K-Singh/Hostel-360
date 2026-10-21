# Security Policy & Architecture Safeguards

At **HOSTEL 360**, data privacy, access control, and allocation integrity are foundational.

---

## 1. Reporting Security Vulnerabilities

If you discover a potential vulnerability in HOSTEL 360, please report it responsibly:
- **Email:** `mrg7216@gmail.com`
- **Subject:** `[SECURITY] HOSTEL 360 Vulnerability Report`
- Include detailed steps to reproduce the vulnerability, sample payloads, and impact assessment.
- We will acknowledge receipt within 48 hours and work with you on a resolution before any public disclosure.

---

## 2. Security Architecture Invariants

HOSTEL 360 is built with defense-in-depth principles:

### A. Salted SHA-256 Authentication
- Passwords are never stored in plaintext and never described as encrypted.
- Every user record has a unique cryptographically generated 32-character hexadecimal salt.
- The hash is generated server-side using `Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password + salt)`.
- Password hashes and salts are stripped before sending any user object to the client.

### B. Ephemeral Server-Side Session Tokens
- Client-side authentication tokens are generated server-side using `Utilities.getUuid()`.
- Sessions are cached in `CacheService` with a strict Time-To-Live (TTL) of 6 hours.
- Every API endpoint in `Code.gs` checks `SessionService.validateSession(token, requiredRole)`.
- Client-side parameters like `studentId` or `userId` are never trusted blindly; the identity is resolved strictly from the verified session token.

### C. Role-Based Access Control (RBAC)
- **Student Role:** Can only query their own application, profile, allotment status, and upload their own documents.
- **Warden Role:** Authorized to audit documents, verify fee payments, trigger allocation runs, and download institutional reports.
- Any attempt by a Student token to invoke administrative functions fails immediately with an authorization error and writes an immutable entry to `AuditLog`.

### D. Digital Personal Data Protection (DPDP) Act Compliance
- **Data Minimization:** Only fields necessary for hostel allocation and residential safety (emergency contact, medical certification for PwD) are collected.
- **Document Access Security:** Uploaded verification documents stored in Google Drive have restricted access permissions granted only to verified institutional administrators.
- **Auditability:** Every administrative modification, status change, or manual override is recorded with timestamp, operator ID, prior value, new value, and justification in the immutable `AuditLog` sheet.
