# 🧪 UAT Test Cases - Energy-as-a-Service Platform

## 📋 Test Environment

**Frontend URL:** https://eaas-snowy.vercel.app/
**Backend URL:** https://resilient-fulfillment-production-3915.up.railway.app
**Test Date:** November 7, 2025

---

## 👥 Test User Accounts

| User ID | Email | Password | Subscription Plan | Status |
|---------|-------|----------|-------------------|--------|
| User 1 | demo1@eaas.com | Demo@123 | Basic Solar | Active |
| User 2 | demo2@eaas.com | Demo@123 | Solar + Battery | Active |
| User 3 | demo3@eaas.com | Demo@123 | Premium | Active |
| User 4 | demo4@eaas.com | Demo@123 | Basic Solar | Active |
| User 5 | demo5@eaas.com | Demo@123 | Solar + Battery | Active |

---

# 1️⃣ AUTHENTICATION MODULE

## TC-AUTH-001: User Login (Valid Credentials)

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Navigate to https://eaas-snowy.vercel.app/login
2. Enter email: `demo1@eaas.com`
3. Enter password: `Demo@123`
4. Click "Sign in" button

### Expected Results:
- ✅ User is authenticated successfully
- ✅ Redirected to `/dashboard`
- ✅ Dashboard shows user name
- ✅ Navigation menu shows Dashboard, Billing, Support
- ✅ No error messages displayed

---

## TC-AUTH-002: User Login (Invalid Credentials)

**Priority:** HIGH
**Test Data:** wrong@email.com / WrongPassword123

### Steps:
1. Navigate to https://eaas-snowy.vercel.app/login
2. Enter email: `wrong@email.com`
3. Enter password: `WrongPassword123`
4. Click "Sign in" button

### Expected Results:
- ✅ Login fails
- ✅ Error message displayed: "Invalid credentials" or similar
- ✅ User remains on login page
- ✅ No redirect occurs

---

## TC-AUTH-003: User Registration (New User)

**Priority:** MEDIUM
**Test Data:** Use unique email (e.g., testuser{timestamp}@test.com)

### Steps:
1. Navigate to https://eaas-snowy.vercel.app/register
2. Fill in form:
   - Full Name: `Test User`
   - Email: `testuser123@test.com`
   - Phone: `555-0123`
   - Password: `TestPass@123`
   - Confirm Password: `TestPass@123`
3. Click "Sign Up" button

### Expected Results:
- ✅ Registration successful
- ✅ User is automatically logged in
- ✅ Redirected to onboarding page (`/onboarding`)
- ✅ Success message displayed

---

## TC-AUTH-004: Logout Functionality

**Priority:** MEDIUM
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Click on user profile/menu (top right)
3. Click "Logout" or "Sign Out"

### Expected Results:
- ✅ User is logged out
- ✅ Redirected to home page or login page
- ✅ Cannot access protected routes (dashboard, billing)
- ✅ Session token is cleared

---

# 2️⃣ SUBSCRIPTION WORKFLOW MODULE

## TC-SUB-001: Complete Onboarding (3-Step Process)

**Priority:** HIGH
**Test User:** New registered user

### Step 1: User Information
1. Navigate to `/onboarding` (or auto-redirected after registration)
2. Verify form displays:
   - Address fields
   - Property type dropdown
   - Average monthly bill input
3. Fill in details:
   - Address: `123 Main St`
   - City: `San Francisco`
   - State: `CA`
   - ZIP: `94102`
   - Property Type: `residential`
   - Monthly Bill: `200`
4. Click "Next"

### Expected Results:
- ✅ Form validates correctly
- ✅ Advances to Step 2 (Plan Selection)
- ✅ Progress indicator shows Step 2 active

---

### Step 2: Plan Selection
1. View available plans (Basic Solar, Solar + Battery, Premium)
2. View recommended plan highlighted
3. Select a plan (e.g., "Solar + Battery")
4. Verify plan details displayed:
   - Monthly cost
   - Features list
   - Savings estimate
5. Click "Next"

### Expected Results:
- ✅ Selected plan is highlighted
- ✅ Plan details are clear and accurate
- ✅ Advances to Step 3 (Payment & Activation)
- ✅ Progress indicator shows Step 3 active

---

### Step 3: Payment & Activation
1. Review subscription summary:
   - Selected plan
   - Monthly cost
   - Installation date
2. Enter payment details (mocked):
   - Card Number: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVV: `123`
3. Accept terms and conditions checkbox
4. Click "Activate Subscription"

### Expected Results:
- ✅ Payment processing message shown
- ✅ Success confirmation displayed
- ✅ Redirected to dashboard
- ✅ Subscription is active
- ✅ Dashboard shows subscription details

---

## TC-SUB-002: Plan Selection (View All Plans)

**Priority:** MEDIUM

### Steps:
1. Navigate to onboarding Step 2
2. View all available plans
3. Compare features between plans

### Expected Results:
- ✅ All 3 plans displayed:
  - Basic Solar ($99/month)
  - Solar + Battery ($149/month)
  - Premium ($199/month)
- ✅ Features clearly listed for each plan
- ✅ Recommended plan has visual indicator
- ✅ Pricing is accurate

---

# 3️⃣ DASHBOARD MODULE (Real-Time Energy Monitoring)

## TC-DASH-001: View Real-Time Energy Metrics

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Navigate to dashboard (auto-redirected after login)
3. Wait 5 seconds (for WebSocket connection)
4. Observe live metrics

### Expected Results:
- ✅ Dashboard loads successfully
- ✅ Real-time metrics update every 5 seconds:
  - Current Power (kW)
  - Today's Energy (kWh)
  - Cost Savings ($)
  - Grid Usage (%)
- ✅ Metrics show realistic values
- ✅ Values change/update automatically
- ✅ No loading errors

---

## TC-DASH-002: View Energy Chart (24-Hour History)

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. View dashboard
3. Locate energy usage chart
4. Verify chart displays 24-hour data

### Expected Results:
- ✅ Chart displays energy usage over 24 hours
- ✅ X-axis shows time periods (hourly)
- ✅ Y-axis shows energy in kWh
- ✅ Data points are plotted correctly
- ✅ Chart is interactive (hover shows values)
- ✅ Chart updates with real-time data

---

## TC-DASH-003: View Savings Card

**Priority:** MEDIUM
**Test User:** demo2@eaas.com / Demo@123

### Steps:
1. Login as demo2
2. View dashboard
3. Locate savings summary card

### Expected Results:
- ✅ Savings card displays:
  - Monthly savings amount ($)
  - Yearly projected savings ($)
  - Percentage saved vs grid
- ✅ Values are realistic
- ✅ Positive savings shown

---

## TC-DASH-004: View Carbon Impact

**Priority:** MEDIUM
**Test User:** demo3@eaas.com / Demo@123

### Steps:
1. Login as demo3
2. View dashboard
3. Locate carbon impact section

### Expected Results:
- ✅ Carbon impact displays:
  - CO2 offset (kg or lbs)
  - Equivalent trees planted
  - Environmental metrics
- ✅ Values are calculated correctly
- ✅ Visual indicators present

---

## TC-DASH-005: WebSocket Connection (Real-Time Updates)

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Open browser console (F12)
3. Check Network tab → WS (WebSocket)
4. Observe WebSocket connection
5. Wait for data updates

### Expected Results:
- ✅ WebSocket connects to: `wss://resilient-fulfillment-production-3915.up.railway.app`
- ✅ Connection status: "Connected"
- ✅ Messages received every 5 seconds
- ✅ Dashboard updates automatically
- ✅ No connection errors

---

# 4️⃣ BILLING MODULE

## TC-BILL-001: View Billing History

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Navigate to Billing page (`/billing`)
3. View list of bills

### Expected Results:
- ✅ Billing page loads successfully
- ✅ List of bills displayed (at least 2-3 bills)
- ✅ Each bill shows:
  - Bill date
  - Billing period
  - Amount due
  - Status (Paid / Pending / Overdue)
- ✅ Bills are sorted by date (newest first)

---

## TC-BILL-002: View Current Month Bill

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Navigate to Billing page
2. Locate current month's bill
3. Click on current bill

### Expected Results:
- ✅ Current month bill is highlighted or marked
- ✅ Bill shows:
  - Current period (e.g., November 2025)
  - Total amount
  - Due date
  - Payment status
- ✅ Bill details are accurate

---

## TC-BILL-003: Download Invoice (PDF)

**Priority:** MEDIUM
**Test User:** demo2@eaas.com / Demo@123

### Steps:
1. Login as demo2
2. Navigate to Billing page
3. Select any paid bill
4. Click "Download Invoice" or "View Invoice" button

### Expected Results:
- ✅ PDF invoice downloads automatically
- ✅ File name format: `invoice-{billId}.pdf`
- ✅ PDF contains:
  - Bill ID
  - Billing period
  - Itemized charges
  - Total amount
  - Payment status
- ✅ PDF is readable and properly formatted

---

## TC-BILL-004: View Bill Details

**Priority:** MEDIUM
**Test User:** demo3@eaas.com / Demo@123

### Steps:
1. Login as demo3
2. Navigate to Billing page
3. Click on any bill to view details

### Expected Results:
- ✅ Bill detail page opens
- ✅ Displays breakdown:
  - Energy consumption (kWh)
  - Rate per kWh
  - Base subscription fee
  - Taxes/fees
  - Total amount
- ✅ Usage chart/graph displayed
- ✅ All calculations are correct

---

## TC-BILL-005: Make Payment (Mocked)

**Priority:** MEDIUM
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Navigate to Billing page
2. Select an unpaid/pending bill
3. Click "Pay Now" button
4. Enter payment details:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25`
   - CVV: `123`
5. Click "Submit Payment"

### Expected Results:
- ✅ Payment form appears
- ✅ Payment processing message shown
- ✅ Payment successful confirmation
- ✅ Bill status updates to "Paid"
- ✅ Success message displayed
- ✅ Bill list refreshes

---

# 5️⃣ SUPPORT MODULE

## TC-SUP-001: View Support Tickets List

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Navigate to Support page (`/support`)
3. View list of tickets

### Expected Results:
- ✅ Support page loads successfully
- ✅ List of tickets displayed (if any exist)
- ✅ Each ticket shows:
  - Ticket ID
  - Subject
  - Status (Open / In Progress / Resolved / Closed)
  - Priority (Low / Medium / High / Critical)
  - Created date
  - Category
- ✅ "Create New Ticket" button visible

---

## TC-SUP-002: Create New Support Ticket

**Priority:** HIGH
**Test User:** demo2@eaas.com / Demo@123

### Steps:
1. Login as demo2
2. Navigate to Support page
3. Click "Create New Ticket" or similar button
4. Fill in form:
   - Subject: `Solar panel not generating power`
   - Category: `Technical`
   - Priority: `High`
   - Description: `My solar panel stopped generating power yesterday. Need urgent help.`
5. Click "Submit" or "Create Ticket"

### Expected Results:
- ✅ Form validates correctly
- ✅ Ticket is created successfully
- ✅ Success message displayed
- ✅ Redirected to ticket list or ticket detail page
- ✅ New ticket appears in list
- ✅ Ticket status is "Open"
- ✅ Ticket ID is generated

---

## TC-SUP-003: View Ticket Details

**Priority:** MEDIUM
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Navigate to Support page
2. Click on any existing ticket

### Expected Results:
- ✅ Ticket detail page opens
- ✅ Displays complete ticket information:
  - Ticket ID
  - Subject
  - Description
  - Status
  - Priority
  - Category
  - Created date
  - Last updated date
- ✅ Conversation/updates thread displayed (if any)
- ✅ Option to add update/comment

---

## TC-SUP-004: Add Update to Ticket

**Priority:** MEDIUM
**Test User:** demo3@eaas.com / Demo@123

### Steps:
1. Navigate to Support page
2. Open an existing ticket
3. Locate "Add Update" or "Add Comment" section
4. Enter message: `Any update on this issue?`
5. Click "Submit" or "Post Update"

### Expected Results:
- ✅ Update/comment is added successfully
- ✅ New update appears in ticket thread
- ✅ Timestamp is recorded
- ✅ Update attributed to user
- ✅ Ticket updated date refreshes

---

## TC-SUP-005: Filter Tickets by Status

**Priority:** LOW
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Navigate to Support page
2. Locate filter/dropdown for status
3. Select "Open" tickets
4. Observe filtered results

### Expected Results:
- ✅ Only "Open" tickets displayed
- ✅ Other status tickets hidden
- ✅ Ticket count updates
- ✅ Can filter by other statuses (In Progress, Resolved, Closed)

---

# 6️⃣ NAVIGATION & UI/UX

## TC-NAV-001: Main Navigation Menu

**Priority:** MEDIUM
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. Login as demo1
2. Test all navigation links:
   - Dashboard
   - Billing
   - Support
   - Logout

### Expected Results:
- ✅ All navigation links work
- ✅ Correct pages load
- ✅ Active page highlighted in nav
- ✅ No broken links
- ✅ Smooth transitions

---

## TC-NAV-002: Responsive Design (Mobile View)

**Priority:** MEDIUM

### Steps:
1. Open app in browser
2. Open DevTools (F12)
3. Toggle device toolbar (mobile view)
4. Test on different screen sizes:
   - iPhone (375px)
   - iPad (768px)
   - Desktop (1920px)

### Expected Results:
- ✅ Layout adjusts to screen size
- ✅ Navigation menu collapses on mobile
- ✅ Charts are responsive
- ✅ Tables scroll horizontally if needed
- ✅ Buttons are touch-friendly
- ✅ No horizontal scrolling on mobile
- ✅ Text is readable on all devices

---

## TC-NAV-003: Loading States

**Priority:** LOW

### Steps:
1. Login and navigate between pages
2. Observe loading indicators

### Expected Results:
- ✅ Loading spinners shown during data fetch
- ✅ Skeleton screens or placeholders (optional)
- ✅ No blank white screens
- ✅ Smooth loading transitions

---

## TC-NAV-004: Error Handling

**Priority:** MEDIUM

### Steps:
1. Simulate error conditions:
   - Network disconnection
   - Invalid API response
   - Unauthorized access
2. Observe error messages

### Expected Results:
- ✅ User-friendly error messages displayed
- ✅ No technical jargon in errors
- ✅ Errors don't crash the app
- ✅ User can recover from errors
- ✅ Clear instructions provided

---

# 7️⃣ PERFORMANCE & SECURITY

## TC-PERF-001: Page Load Time

**Priority:** MEDIUM

### Steps:
1. Open browser DevTools → Network tab
2. Hard refresh page (Cmd+Shift+R)
3. Measure load time

### Expected Results:
- ✅ Login page loads in < 3 seconds
- ✅ Dashboard loads in < 5 seconds
- ✅ Other pages load in < 3 seconds
- ✅ No timeout errors

---

## TC-SEC-001: Protected Routes (Authentication Required)

**Priority:** HIGH

### Steps:
1. Open browser in incognito mode (not logged in)
2. Try to access protected routes directly:
   - `/dashboard`
   - `/billing`
   - `/support`

### Expected Results:
- ✅ Access denied to protected routes
- ✅ Redirected to login page
- ✅ After login, redirected to original requested page

---

## TC-SEC-002: JWT Token Handling

**Priority:** HIGH

### Steps:
1. Login as demo1
2. Open browser DevTools → Application → Local Storage
3. Verify JWT token is stored
4. Delete token manually
5. Try to access dashboard

### Expected Results:
- ✅ Token stored securely in local storage
- ✅ After deleting token, access denied
- ✅ Redirected to login page

---

# 8️⃣ END-TO-END USER JOURNEY

## TC-E2E-001: Complete User Journey (New User)

**Priority:** CRITICAL

### Steps:
1. **Register:**
   - Go to `/register`
   - Create new account
   - Verify email/phone

2. **Onboarding:**
   - Complete Step 1 (User Info)
   - Complete Step 2 (Plan Selection)
   - Complete Step 3 (Payment)

3. **Dashboard:**
   - View real-time metrics
   - Check energy chart
   - Verify subscription is active

4. **Billing:**
   - Navigate to billing page
   - View initial bill
   - Download invoice

5. **Support:**
   - Create support ticket
   - View ticket details
   - Add update to ticket

6. **Logout:**
   - Logout successfully
   - Verify session ended

### Expected Results:
- ✅ All steps complete without errors
- ✅ Data persists across sessions
- ✅ User experience is smooth
- ✅ All features work correctly

---

## TC-E2E-002: Complete User Journey (Existing User)

**Priority:** HIGH
**Test User:** demo1@eaas.com / Demo@123

### Steps:
1. **Login:**
   - Login with demo1 credentials

2. **Dashboard:**
   - View real-time energy data
   - Check metrics update every 5 seconds
   - View 24-hour energy chart

3. **Billing:**
   - View billing history
   - Select current month bill
   - Download invoice PDF
   - Make payment on pending bill

4. **Support:**
   - View existing tickets
   - Create new ticket
   - View ticket details
   - Add update to ticket

5. **Navigation:**
   - Navigate between all pages
   - Verify smooth transitions

6. **Logout:**
   - Logout successfully

### Expected Results:
- ✅ All features accessible
- ✅ Data loads correctly
- ✅ Real-time updates work
- ✅ No errors or crashes
- ✅ Smooth user experience

---

# 📊 TEST EXECUTION SUMMARY

## Test Status Template

| Test Case ID | Test Case Name | Status | Priority | Notes |
|--------------|----------------|--------|----------|-------|
| TC-AUTH-001 | User Login (Valid) | ⏳ Pending | HIGH | |
| TC-AUTH-002 | User Login (Invalid) | ⏳ Pending | HIGH | |
| TC-AUTH-003 | User Registration | ⏳ Pending | MEDIUM | |
| TC-SUB-001 | Complete Onboarding | ⏳ Pending | HIGH | |
| TC-DASH-001 | Real-Time Metrics | ⏳ Pending | HIGH | |
| TC-DASH-005 | WebSocket Connection | ⏳ Pending | HIGH | |
| TC-BILL-001 | View Billing History | ⏳ Pending | HIGH | |
| TC-BILL-003 | Download Invoice | ⏳ Pending | MEDIUM | |
| TC-SUP-001 | View Support Tickets | ⏳ Pending | HIGH | |
| TC-SUP-002 | Create Support Ticket | ⏳ Pending | HIGH | |
| TC-E2E-001 | Complete Journey (New) | ⏳ Pending | CRITICAL | |
| TC-E2E-002 | Complete Journey (Existing) | ⏳ Pending | HIGH | |

**Status Legend:**
- ⏳ Pending
- ✅ Pass
- ❌ Fail
- 🔄 In Progress
- ⚠️ Blocked

---

## Critical Path Tests (Must Pass)

**Priority Order:**
1. ✅ TC-AUTH-001: User Login
2. ✅ TC-DASH-001: Real-Time Metrics
3. ✅ TC-DASH-005: WebSocket Connection
4. ✅ TC-SUB-001: Complete Onboarding
5. ✅ TC-BILL-001: View Billing
6. ✅ TC-SUP-002: Create Support Ticket
7. ✅ TC-E2E-002: Complete User Journey

---

## Test Data Summary

**Demo Users:**
- demo1@eaas.com / Demo@123 (Basic Solar)
- demo2@eaas.com / Demo@123 (Solar + Battery)
- demo3@eaas.com / Demo@123 (Premium)
- demo4@eaas.com / Demo@123 (Basic Solar)
- demo5@eaas.com / Demo@123 (Solar + Battery)

**Test Cards:**
- 4242 4242 4242 4242 (Visa)
- Expiry: 12/25
- CVV: 123

**URLs:**
- Frontend: https://eaas-snowy.vercel.app
- Backend: https://resilient-fulfillment-production-3915.up.railway.app

---

## 🎯 Quick Test Checklist (5-Minute Demo)

### Rapid Verification Test

1. ✅ **Login** (demo1@eaas.com / Demo@123)
2. ✅ **Dashboard loads** with real-time metrics
3. ✅ **Metrics update** every 5 seconds
4. ✅ **Navigate to Billing** → view bills
5. ✅ **Download invoice** PDF
6. ✅ **Navigate to Support** → view tickets
7. ✅ **Create new ticket** → submit
8. ✅ **View ticket details**
9. ✅ **Logout**

**Expected Time:** 5 minutes
**All features demonstrated:** ✅

---

## 🐛 Bug Reporting Template

**Bug ID:** BUG-001
**Severity:** High / Medium / Low
**Priority:** High / Medium / Low

**Summary:**
Brief description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:**
What should happen

**Actual Result:**
What actually happened

**Screenshots:**
Attach screenshots if applicable

**Environment:**
- Browser: Chrome/Firefox/Safari
- OS: macOS/Windows/Linux
- Device: Desktop/Mobile

---

## ✅ Success Criteria

**UAT Passes If:**
- ✅ All HIGH priority tests pass
- ✅ All CRITICAL tests pass
- ✅ At least 90% of MEDIUM priority tests pass
- ✅ No blocking bugs
- ✅ Complete user journey works end-to-end
- ✅ Real-time features work correctly
- ✅ All demo accounts functional

**Ready for Hackathon Demo:** 🎉

