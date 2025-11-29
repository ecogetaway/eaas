# UAT Test Cases - Enhanced DISCOM Workflow

## Overview
This document contains comprehensive UAT test cases for the enhanced DISCOM (Distribution Company) Net Metering workflow, which now includes the complete 6-step real-world process with document management, technical approvals, grid synchronization, and commissioning.

## Demo Credentials

**User 1:**
- Email: `demo@eaas.com`
- Password: `demo123`
- Status: Has existing DISCOM application (Grid Connected)

**User 2:**
- Email: `demo2@eaas.com`
- Password: `demo123`
- Status: No DISCOM application (can test new application flow)

---

## Test Suite 1: DISCOM Application - New Application Flow

### TC-DISCOM-001: Access DISCOM Page
**Objective:** Verify user can navigate to DISCOM page

**Steps:**
1. Login with `demo2@eaas.com` / `demo123`
2. Navigate to DISCOM page (via navbar link or `/discom` URL)

**Expected Result:**
- DISCOM page loads successfully
- Page title "DISCOM Integration" is visible
- Subtitle "Net-metering application and grid connection status" is visible
- No blank page or error messages
- Refresh button is visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-002: View No Application State
**Objective:** Verify "No Application" state displays correctly

**Steps:**
1. Login with `demo2@eaas.com` / `demo123`
2. Navigate to `/discom`

**Expected Result:**
- "Apply for Net Metering" card is displayed
- Shows key information:
  - "14-21 Days" - Typical approval time
  - "Export Energy" - Earn credits for surplus
  - "Free Application" - No processing fee
- "Start Application" button is visible and clickable

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-003: Open Application Form
**Objective:** Verify application form opens correctly

**Steps:**
1. Login with `demo2@eaas.com` / `demo123`
2. Navigate to `/discom`
3. Click "Start Application" button

**Expected Result:**
- Application form is displayed
- Form title "Net Metering Application" is visible
- All form sections are visible:
  - Solar System Details
  - Property Details
  - Electricity Connection
  - Required Documents section
- Cancel and Submit buttons are visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-004: Document Checklist Display
**Objective:** Verify required documents are listed in form

**Steps:**
1. Open application form (TC-DISCOM-003)
2. Scroll to "Required Documents" section

**Expected Result:**
- Document checklist is displayed with 4 items:
  1. **Identity Proof** - Aadhaar, PAN, or Driving License (Required)
  2. **Property Ownership Proof** - Sale Deed, Property Tax Receipt, or NOC (Required)
  3. **Latest Electricity Bill** - Most recent bill from DISCOM (Required)
  4. **Site Plan/Sketch** - Optional
- Each document shows status indicator (Required/Uploaded/Verified)
- Upload button is visible for required documents
- Demo mode notice is displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-005: Document Upload Simulation
**Objective:** Verify document upload button works (demo mode)

**Steps:**
1. Open application form
2. Click "Upload" button on any required document

**Expected Result:**
- Alert/notification appears explaining demo mode
- Message indicates: "Demo Mode: Document would be uploaded here. In production, this would open a file upload dialog."
- No actual file upload occurs (expected in demo)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-006: Form Validation - Required Fields
**Objective:** Verify form validates required fields

**Steps:**
1. Open application form
2. Leave required fields empty:
   - Solar Capacity (kW)
   - Property Address
   - Consumer Number
3. Click "Submit Application"

**Expected Result:**
- Form does not submit
- Error message displayed: "Please fill in all required fields"
- Form remains on page
- Required fields are highlighted or marked

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-007: Submit New Application
**Objective:** Verify application submission works

**Steps:**
1. Open application form
2. Fill in required fields:
   - Solar Capacity: `3`
   - Property Address: `456 Solar Avenue, Mumbai, Maharashtra 400001`
   - Consumer Number: `CON987654321`
   - Electricity Provider: `Tata Power`
   - Property Type: `Residential`
   - Installation Type: `Rooftop`
3. Optionally fill optional fields:
   - Sanctioned Load: `5`
   - Roof Area: `500`
4. Click "Submit Application"

**Expected Result:**
- Form submits successfully
- Loading indicator shows during submission
- Redirected to application status page
- Application Number is displayed
- Status shows "Submitted"
- Progress bar shows initial progress (e.g., 8%)
- Timeline shows "Submitted" stage as completed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 2: DISCOM Application - Status & Timeline

### TC-DISCOM-008: View Application Status
**Objective:** Verify application status page displays correctly

**Steps:**
1. Login with `demo@eaas.com` / `demo123` (has existing application)
2. Navigate to `/discom`

**Expected Result:**
- Application status card is displayed
- Application Number is visible (format: `DISCOM-2024-XXXXXX`)
- Current status badge is displayed with appropriate color
- Progress bar shows percentage (e.g., 100% for completed)
- Application details grid shows:
  - Type
  - Solar Capacity (kW)
  - Property Type
  - Submitted Date
- No blank page or errors

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-009: Application Timeline - All Stages
**Objective:** Verify complete timeline with all 13 stages

**Steps:**
1. Login with `demo@eaas.com` / `demo123`
2. Navigate to `/discom`
3. Scroll to "Application Timeline" section

**Expected Result:**
- Timeline displays all 13 stages:
  1. ✅ Submitted
  2. ✅ Document Verification
  3. ✅ Feasibility Study
  4. ✅ Site Inspection Scheduled
  5. ✅ Site Inspection Completed
  6. ✅ Technical Approval
  7. ✅ System Installation
  8. ✅ Inspection & Documentation
  9. ✅ Meter Installation
  10. ✅ Grid Sync Pending
  11. ✅ Grid Synchronized
  12. ✅ Commissioning Complete
  13. ✅ Grid Connected
- Completed stages show green checkmark icons
- Current stage (if any) is highlighted with ring
- Each completed stage shows timestamp
- Each stage shows descriptive message

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-010: Timeline Stage Messages
**Objective:** Verify detailed messages for each timeline stage

**Steps:**
1. View application timeline
2. Review messages for each completed stage

**Expected Result:**
- Each stage has a descriptive message:
  - Submitted: "Application submitted with required documents"
  - Document Verification: "Documents verified by DISCOM"
  - Feasibility Study: "Feasibility study completed - Grid capacity checked"
  - Site Inspection: "Site inspection completed successfully"
  - Technical Approval: "Technical approval letter issued"
  - System Installation: "Solar system installation completed"
  - Inspection & Documentation: "Inspection completed and documentation submitted"
  - Meter Installation: "Bi-directional meter installed"
  - Grid Sync: "Grid synchronized successfully"
  - Commissioning: "Commissioning completed"
  - Grid Connected: "System fully connected and operational"
- Messages are clear and informative

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-011: Progress Percentage Calculation
**Objective:** Verify progress percentage is calculated correctly

**Steps:**
1. View application status
2. Check progress percentage
3. Count completed stages in timeline

**Expected Result:**
- Progress percentage matches completed stages
- Formula: `(completed_stages / total_stages) * 100`
- For completed application: 100%
- For new application: ~8% (1/13 stages)
- Progress bar width matches percentage

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 3: Document Management

### TC-DISCOM-012: Document Status Display
**Objective:** Verify document status is displayed correctly

**Steps:**
1. Login with `demo@eaas.com` / `demo123`
2. Navigate to `/discom`
3. Scroll to "Required Documents" section

**Expected Result:**
- Document checklist card is displayed
- Shows all 4 documents with status:
  - Identity Proof: ✅ Verified (green)
  - Property Ownership: ✅ Verified (green)
  - Latest Electricity Bill: ✅ Verified (green)
  - Site Plan/Sketch: Uploaded (yellow) or Verified
- Each document shows:
  - Document name
  - Description
  - Status badge (Required/Uploaded/Verified)
  - Upload date (if uploaded)
  - Verification date (if verified)
- Status colors are correct:
  - Verified: Green background
  - Uploaded: Yellow background
  - Required: Gray background

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-013: Document Status Icons
**Objective:** Verify correct icons for document status

**Steps:**
1. View document checklist
2. Check icons for each document

**Expected Result:**
- Verified documents: ✅ CheckCircle icon (green)
- Uploaded documents: ⏰ Clock icon (yellow)
- Required documents: 📄 FileText icon (gray)
- Icons are clearly visible and color-coded

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 4: Technical Details

### TC-DISCOM-014: Feasibility Study Card
**Objective:** Verify feasibility study details are displayed

**Steps:**
1. Login with `demo@eaas.com` / `demo123`
2. Navigate to `/discom`
3. Scroll to "Feasibility Study" card

**Expected Result:**
- Feasibility Study card is displayed
- Shows:
  - Status: Approved (green badge)
  - Conducted On: Date
  - Grid Capacity Available: Yes (green checkmark)
  - Proposed Solar Capacity: 3.0 kW
  - Grid Capacity: 10.0 kW
  - Capacity Utilization: 12.0% with progress bar
  - Remarks: "Grid capacity sufficient for proposed solar system"
- Progress bar color:
  - Green: < 50% utilization
  - Yellow: 50-80% utilization
  - Red: > 80% utilization

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-015: Technical Approval Card
**Objective:** Verify technical approval details are displayed

**Steps:**
1. View DISCOM page
2. Scroll to "Technical Approval" card

**Expected Result:**
- Technical Approval card is displayed
- Shows:
  - Status: Approved (green badge)
  - Approval Letter Number: `TA-BESCOM-2024-001234`
  - Approval Date: Date
  - Approved By: "DISCOM Technical Team"
  - Validity Period: 180 days
  - Conditions list:
    - System must comply with CEA and BIS standards
    - Anti-islanding protection must be installed
    - Bi-directional meter will be installed by DISCOM
- All information is clearly formatted

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-016: System Installation Card
**Objective:** Verify system installation details are displayed

**Steps:**
1. View DISCOM page
2. Scroll to "System Installation" card

**Expected Result:**
- System Installation card is displayed
- Shows:
  - Status: Completed (green badge)
  - Installation Date: Date
  - Installer: "SolarTech Installations"
  - Certificate Number: `INST-CERT-2024-001234`
  - Equipment Compliance section:
    - ✅ CEA Compliant (green)
    - ✅ BIS Compliant (green)
    - Inverter: SolarEdge SE5000
    - Panels: Adani Solar (300W each)
- Compliance indicators are clearly visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 5: Grid Synchronization

### TC-DISCOM-017: Grid Sync Details Card
**Objective:** Verify grid synchronization details are displayed

**Steps:**
1. View DISCOM page
2. Scroll to "Grid Synchronization" card

**Expected Result:**
- Grid Synchronization card is displayed
- Shows:
  - Sync Status: Synchronized (green badge)
  - Bi-directional Meter Number: `BI-MTR-2024-001234`
  - Meter Type: "Bi-directional Smart Meter"
  - Installation Date: Date
  - Synchronized At: Date and time
  - Grid Export: Enabled (green checkmark)
  - Last Sync: Current timestamp

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-018: Anti-Islanding Protection
**Objective:** Verify anti-islanding protection details

**Steps:**
1. View Grid Synchronization card
2. Check "Anti-Islanding Protection" section

**Expected Result:**
- Anti-Islanding Protection section is displayed
- Shows:
  - Status: Active (green)
  - Tested: Yes
  - Test Date: Date
  - Compliance: "CEA Compliant"
- Section has green background indicating safety compliance

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-019: Voltage & Frequency Alignment
**Objective:** Verify voltage and frequency alignment details

**Steps:**
1. View Grid Synchronization card
2. Check "Voltage & Frequency Alignment" section

**Expected Result:**
- Voltage & Frequency Alignment section is displayed
- Shows:
  - Voltage: `220.5V`
  - Frequency: `50.0Hz`
  - Alignment Status: Aligned (green)
  - Last Check: Current timestamp
- Values are within acceptable ranges
- Section has blue background

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 6: Commissioning

### TC-DISCOM-020: Inspection & Documentation Card
**Objective:** Verify inspection and documentation details

**Steps:**
1. View DISCOM page
2. Scroll to "Inspection & Documentation" card

**Expected Result:**
- Inspection & Documentation card is displayed
- Shows:
  - Status: Completed (green badge)
  - Inspection Date: Date
  - Inspected By: "DISCOM Inspection Team"
  - Electrical Test Results section:
    - Voltage Alignment: `220V ± 5%`
    - Frequency Alignment: `50Hz ± 0.5Hz`
    - Power Factor: `0.95+`
    - Insulation Resistance: Pass
    - Earth Resistance: Pass
    - Test Certificate Number: `TEST-CERT-2024-001234`

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-021: Commissioning Certificate
**Objective:** Verify commissioning certificate details

**Steps:**
1. View Inspection & Documentation card
2. Check "Commissioning Certificate" section

**Expected Result:**
- Commissioning Certificate section is displayed
- Shows:
  - Certificate Number: `COMM-CERT-2024-001234`
  - Issued Date: Date
  - Issued By: "DISCOM Commissioning Authority"
- Certificate number is in monospace font
- Section has blue background

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-022: Commissioning Card
**Objective:** Verify commissioning details are displayed

**Steps:**
1. View DISCOM page
2. Scroll to "Commissioning" card

**Expected Result:**
- Commissioning card is displayed
- Shows:
  - Status: Complete (green badge)
  - Commissioning Date: Date
  - Report Number: `COMM-RPT-2024-001234`
  - Meter Sealing section:
    - Status: Sealed (green)
    - Sealed By: "DISCOM Metering Team"
    - Sealed At: Date and time
  - Billing Cycle section:
    - Billing cycle started: Date
    - Message: "Net metering is now active. You can export excess energy and earn credits."
  - Net Metering Active: Active (green checkmark)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-023: Meter Sealing Status
**Objective:** Verify meter sealing information

**Steps:**
1. View Commissioning card
2. Check "Meter Sealing" section

**Expected Result:**
- Meter Sealing section is displayed
- Shows:
  - Status: Sealed (green indicator)
  - Sealed By: DISCOM team name
  - Sealed At: Date and time
- Section has blue background
- Lock icon is displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 7: Property & Connection Details

### TC-DISCOM-024: Property Details Card
**Objective:** Verify property information is displayed

**Steps:**
1. View DISCOM page
2. Scroll to "Property Details" card

**Expected Result:**
- Property Details card is displayed
- Shows:
  - Address: Full property address
  - Property Type: Residential/Commercial/Industrial
  - Roof Area: 500 sq ft (if provided)
- Information matches application form data

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-025: Connection Details Card
**Objective:** Verify electricity connection details

**Steps:**
1. View DISCOM page
2. Scroll to "Connection Details" card

**Expected Result:**
- Connection Details card is displayed
- Shows:
  - Provider: DISCOM name (e.g., BESCOM, Tata Power)
  - Consumer No.: Consumer number
  - Sanctioned Load: X.X kW
- Information matches application form data

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 8: Navigation & Accessibility

### TC-DISCOM-026: Navigation from Dashboard
**Objective:** Verify DISCOM link in navbar works

**Steps:**
1. Login with demo credentials
2. Navigate to dashboard
3. Click "DISCOM" link in navbar

**Expected Result:**
- DISCOM link is visible in navbar
- Clicking link navigates to `/discom`
- Page loads without errors
- URL changes to include `/discom`

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-027: DISCOM Status Card on Dashboard
**Objective:** Verify DISCOM status card on dashboard

**Steps:**
1. Login with `demo@eaas.com` / `demo123`
2. Navigate to dashboard
3. Look for DISCOM status card

**Expected Result:**
- DISCOM status card is displayed on dashboard
- Shows:
  - Application number
  - Current status badge
  - Progress percentage
  - Status dots indicating progress
  - Clickable link to DISCOM page
- Card styling matches application status:
  - Green gradient: Grid Connected
  - Blue gradient: Approved/In Progress
  - Yellow: Pending stages

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-028: Authentication Required
**Objective:** Verify DISCOM page requires authentication

**Steps:**
1. Logout (if logged in)
2. Navigate directly to `/discom` URL

**Expected Result:**
- User is redirected to `/login`
- DISCOM page is not accessible
- Login page is displayed
- After login, user can access DISCOM page

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-029: Refresh Functionality
**Objective:** Verify refresh button works

**Steps:**
1. View DISCOM page
2. Click "Refresh" button

**Expected Result:**
- Refresh button is visible in header
- Button shows loading spinner when clicked
- Page data refreshes
- Status updates if application has progressed
- No page reload (SPA behavior)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 9: Demo Mode & User Experience

### TC-DISCOM-030: Demo Mode Notice
**Objective:** Verify demo mode notices are displayed

**Steps:**
1. View DISCOM page
2. Check for demo mode notices

**Expected Result:**
- Demo mode notice is displayed:
  - In application form (before submission)
  - In application status page (if exists)
- Notice explains:
  - Application auto-progresses through stages
  - Document uploads are simulated
  - Use refresh button to see latest status
- Notice has blue background with info icon

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-031: Responsive Design
**Objective:** Verify DISCOM page works on mobile devices

**Steps:**
1. Open DISCOM page on mobile viewport (375px width)
2. Test all sections

**Expected Result:**
- Page is responsive and mobile-friendly
- Cards stack vertically on mobile
- Timeline is readable on small screens
- Form fields are accessible
- Buttons are appropriately sized
- No horizontal scrolling required

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-032: Loading States
**Objective:** Verify loading indicators work

**Steps:**
1. Navigate to DISCOM page
2. Observe loading behavior

**Expected Result:**
- Loading spinner displays while data loads
- No blank page during loading
- Smooth transition to content
- Refresh button shows spinner when active

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-033: Error Handling
**Objective:** Verify error handling works gracefully

**Steps:**
1. View DISCOM page
2. Check browser console for errors
3. Test with network throttling (if possible)

**Expected Result:**
- No console errors in normal operation
- Error boundaries catch React errors
- User-friendly error messages if API fails
- Page doesn't crash on errors
- Fallback to mock data works

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 10: Status Progression

### TC-DISCOM-034: Status Color Coding
**Objective:** Verify status colors are correct

**Steps:**
1. View application status
2. Check status badge color

**Expected Result:**
- Status colors match stage:
  - Blue: Submitted, Document Verification
  - Yellow: Feasibility Study, Site Inspection
  - Orange: Technical Approval, System Installation
  - Purple: Inspection Documentation, Meter Installation
  - Indigo: Grid Sync Pending, Grid Synchronized
  - Green: Commissioning Complete, Grid Connected
- Colors are consistent across:
  - Status badge
  - Timeline icons
  - Progress indicators

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-DISCOM-035: Completion State
**Objective:** Verify completed application displays correctly

**Steps:**
1. Login with `demo@eaas.com` / `demo123`
2. View DISCOM page

**Expected Result:**
- Status shows "Grid Connected" (green)
- Progress shows 100%
- Success message displayed:
  - "Congratulations! Your solar system is now connected to the grid."
  - "You can now export excess energy and earn net metering credits."
- All timeline stages show as completed
- All technical details cards are visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Summary

### Test Coverage
- **Total Test Cases:** 35
- **Test Suites:** 10
- **Coverage Areas:**
  - New Application Flow (7 tests)
  - Status & Timeline (4 tests)
  - Document Management (2 tests)
  - Technical Details (3 tests)
  - Grid Synchronization (3 tests)
  - Commissioning (4 tests)
  - Property & Connection (2 tests)
  - Navigation & Accessibility (4 tests)
  - Demo Mode & UX (4 tests)
  - Status Progression (2 tests)

### Key Features Tested
✅ Complete 6-step DISCOM process (13 status stages)
✅ Document checklist with status tracking
✅ Feasibility study and technical approval
✅ System installation and compliance
✅ Grid synchronization with safety features
✅ Commissioning and meter sealing
✅ Comprehensive timeline visualization
✅ Responsive design and accessibility

### Demo Credentials
- **User 1:** `demo@eaas.com` / `demo123` (Has completed application)
- **User 2:** `demo2@eaas.com` / `demo123` (No application - for testing new flow)

---

## Notes for Testers

1. **Mock Data:** All features work with mock data. No backend connection required for demo.

2. **Auto-Progression:** In demo mode, applications automatically progress through stages. Use refresh button to see updates.

3. **Document Uploads:** Document uploads are simulated. Clicking "Upload" shows a demo message.

4. **Status Stages:** The application follows 13 distinct stages matching the real-world DISCOM process.

5. **Technical Details:** Technical details (feasibility study, approval, etc.) appear as the application progresses through stages.

6. **Grid Sync:** Grid synchronization details include anti-islanding protection and voltage/frequency alignment.

7. **Commissioning:** Commissioning section shows inspection results, certificates, and meter sealing status.

---

**Last Updated:** November 29, 2024
**Version:** 2.0 (Enhanced DISCOM Workflow)

