/**
 * HOSTEL 360 - PolicyEngine.gs
 * Institutional policies, application window deadline enforcement, and academic years.
 */

var PolicyEngine = (function () {

  /**
   * Retrieves the currently active Academic Year
   */
  function getActiveAcademicYear() {
    var years = SheetRepository.findRecords(SheetRepository.SHEETS.ACADEMIC_YEARS, function (y) {
      return y.IsActive === true || y.IsActive === 'TRUE' || y.IsActive === 'true' || y.IsActive === 1;
    });
    if (years.length > 0) {
      return years[0];
    }
    // Fallback if no active year flagged
    var allYears = SheetRepository.getAllRecords(SheetRepository.SHEETS.ACADEMIC_YEARS);
    if (allYears.length > 0) {
      return allYears[allYears.length - 1];
    }
    return {
      YearID: 'AY_DEFAULT',
      AcademicYear: '2026-27',
      ApplicationStartDate: '2026-08-01',
      ApplicationDeadline: '2026-09-30',
      IsActive: true,
      Status: 'ACTIVE'
    };
  }

  /**
   * Validates if the application window is currently open
   */
  function isApplicationWindowOpen() {
    var activeYear = getActiveAcademicYear();
    if (!activeYear) return { isOpen: false, reason: 'No active academic year configured.' };

    var now = new Date().getTime();
    var startDate = activeYear.ApplicationStartDate ? new Date(activeYear.ApplicationStartDate).getTime() : null;
    var deadlineDate = activeYear.ApplicationDeadline ? new Date(activeYear.ApplicationDeadline).getTime() : null;

    // Extend deadline to end of day (23:59:59)
    if (deadlineDate) {
      var d = new Date(activeYear.ApplicationDeadline);
      d.setHours(23, 59, 59, 999);
      deadlineDate = d.getTime();
    }

    if (startDate && now < startDate) {
      return {
        isOpen: false,
        reason: 'Application portal opens on ' + activeYear.ApplicationStartDate
      };
    }

    if (deadlineDate && now > deadlineDate) {
      return {
        isOpen: false,
        reason: 'Application deadline passed on ' + activeYear.ApplicationDeadline
      };
    }

    return {
      isOpen: true,
      academicYear: activeYear.AcademicYear,
      deadline: activeYear.ApplicationDeadline
    };
  }

  /**
   * Retrieves a policy value by key with fallback
   */
  function getPolicyValue(key, defaultValue) {
    var policy = SheetRepository.findRecordByKey(SheetRepository.SHEETS.POLICIES, 'PolicyKey', key);
    if (policy && policy.PolicyValue !== undefined && policy.PolicyValue !== '') {
      return policy.PolicyValue;
    }
    return defaultValue;
  }

  /**
   * Updates or inserts a policy configuration
   */
  function setPolicyValue(key, value, description, userEmail) {
    var activeYear = getActiveAcademicYear();
    var existing = SheetRepository.findRecordByKey(SheetRepository.SHEETS.POLICIES, 'PolicyKey', key);
    var nowIso = new Date().toISOString();

    if (existing) {
      SheetRepository.updateRecordByKey(SheetRepository.SHEETS.POLICIES, 'PolicyKey', key, {
        PolicyValue: value,
        Description: description || existing.Description,
        UpdatedAt: nowIso,
        UpdatedBy: userEmail || 'Warden'
      });
    } else {
      SheetRepository.insertRecord(SheetRepository.SHEETS.POLICIES, {
        PolicyID: 'POL_' + Utilities.getUuid().substring(0, 8).toUpperCase(),
        AcademicYear: activeYear ? activeYear.AcademicYear : '2026-27',
        PolicyKey: key,
        PolicyValue: value,
        Description: description || '',
        UpdatedAt: nowIso,
        UpdatedBy: userEmail || 'Warden'
      });
    }

    AuditService.logAction(
      userEmail,
      userEmail,
      'WARDEN',
      'POLICY_UPDATED',
      'Policy',
      key,
      existing ? existing.PolicyValue : null,
      value,
      'Updated policy: ' + key,
      'SUCCESS'
    );

    return true;
  }

  /**
   * Gets list of mandatory document types
   */
  function getMandatoryDocuments() {
    var raw = getPolicyValue('MANDATORY_DOCUMENTS', 'ADMISSION_FEE_RECEIPT,MEDICAL_FITNESS,PERMANENT_ADDRESS_PROOF,PARENT_UNDERTAKING,STUDENT_UNDERTAKING');
    return String(raw).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  }

  /**
   * Gets fee payment and reporting deadline in days from allotment publication
   */
  function getFeePaymentDeadlineDays() {
    var raw = getPolicyValue('FEE_PAYMENT_DEADLINE_DAYS', 3);
    return parseInt(raw, 10) || 3;
  }

  /**
   * Gets foreign student quota percentage
   */
  function getForeignStudentQuotaPct() {
    var raw = getPolicyValue('FOREIGN_STUDENT_QUOTA_PCT', 5);
    return parseFloat(raw) || 5;
  }

  return {
    getActiveAcademicYear: getActiveAcademicYear,
    isApplicationWindowOpen: isApplicationWindowOpen,
    getPolicyValue: getPolicyValue,
    setPolicyValue: setPolicyValue,
    getMandatoryDocuments: getMandatoryDocuments,
    getForeignStudentQuotaPct: getForeignStudentQuotaPct,
    getFeePaymentDeadlineDays: getFeePaymentDeadlineDays
  };
})();
