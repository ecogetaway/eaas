# UAT Test Cases - Mock Data Demo

## Demo Credentials

**User 1:**
- Email: `demo@eaas.com`
- Password: `demo123`

**User 2:**
- Email: `demo2@eaas.com`
- Password: `demo123`

---

## Test Suite 1: Authentication & Onboarding

### TC-001: User Login
**Objective:** Verify user can log in with demo credentials

**Steps:**
1. Navigate to login page
2. Enter email: `demo@eaas.com`
3. Enter password: `demo123`
4. Click "Sign In"

**Expected Result:**
- User is redirected to dashboard
- User profile is loaded
- No error messages displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-002: User Registration
**Objective:** Verify new user registration works

**Steps:**
1. Navigate to registration page
2. Fill in all required fields:
   - Name: Test User
   - Email: `test_${timestamp}@eaas.com`
   - Password: `test123`
   - Phone: `9876543210`
   - Address: `123 Test Street`
3. Click "Register"

**Expected Result:**
- User is registered successfully
- Redirected to dashboard
- Mock user data is created

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-003: Invalid Login
**Objective:** Verify error handling for invalid credentials

**Steps:**
1. Navigate to login page
2. Enter invalid email/password
3. Click "Sign In"

**Expected Result:**
- Error message displayed
- User remains on login page
- No redirect occurs

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 2: Dashboard & Real-Time Monitoring

### TC-004: Dashboard Loads
**Objective:** Verify dashboard displays all components

**Steps:**
1. Login with demo credentials
2. Navigate to dashboard

**Expected Result:**
- Dashboard loads without blank page
- Energy Overview Cards visible
- Real-time metrics displayed
- Charts render correctly
- No console errors

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-005: Real-Time Energy Updates
**Objective:** Verify real-time energy metrics update

**Steps:**
1. Login and navigate to dashboard
2. Observe energy metrics
3. Wait 5-10 seconds

**Expected Result:**
- Energy values update every 5 seconds
- Solar generation, consumption, battery levels change
- Updates are smooth (no flickering)
- Values are realistic (not NaN or undefined)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-006: Energy Charts
**Objective:** Verify energy charts display correctly

**Steps:**
1. Navigate to dashboard
2. Check Energy Mix Chart
3. Check Battery Performance Chart
4. Check Grid Independence Score
5. Switch between Day/Week/Month views

**Expected Result:**
- All charts render with data
- Charts are interactive
- Period switching works
- Data updates correctly

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-007: Dashboard Summary Cards
**Objective:** Verify summary cards display correct data

**Steps:**
1. Navigate to dashboard
2. Check all summary cards:
   - Savings Card
   - Carbon Impact Card
   - Solar Generated Today

**Expected Result:**
- All cards display numeric values
- Values are formatted correctly (₹, kWh, kg CO₂)
- Icons and colors are correct
- No empty or undefined values

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 3: Subscription Management

### TC-008: View Subscription Plans
**Objective:** Verify all subscription plans are displayed

**Steps:**
1. Navigate to "Services & Plans" page
2. View all available plans

**Expected Result:**
- 3 plans displayed: Basic Solar, Solar + Battery, Premium
- Plan details visible (price, capacity, features)
- Plan comparison works
- No blank cards

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-009: Plan Recommendation
**Objective:** Verify plan recommendation based on monthly bill

**Steps:**
1. Navigate to onboarding or Services & Plans
2. Enter monthly bill amount (e.g., 4000)
3. Click "Get Recommendation"

**Expected Result:**
- Recommended plan is highlighted
- Recommendation is appropriate for bill amount
- Plan details are shown

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-010: Complete Onboarding Flow
**Objective:** Verify complete subscription onboarding

**Steps:**
1. Navigate to onboarding (if no subscription exists)
2. Step 1: Enter user info (address, monthly bill)
3. Step 2: Select a plan
4. Step 3: Complete payment

**Expected Result:**
- All steps complete successfully
- Payment modal opens (Razorpay mock)
- Payment can be completed
- Subscription is created
- Redirected to dashboard

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-011: View Current Subscription
**Objective:** Verify subscription details page

**Steps:**
1. Navigate to "Subscription" page
2. View subscription details

**Expected Result:**
- Subscription details displayed
- Plan name, monthly fee visible
- Installation details shown
- Status is "Active"
- Next billing date visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 4: Billing & Payments

### TC-012: View Bills List
**Objective:** Verify bills list displays correctly

**Steps:**
1. Navigate to "Billing" page
2. View all bills

**Expected Result:**
- At least 2 bills displayed (one paid, one pending)
- Bill details visible (amount, period, status)
- Bills are sorted by date (newest first)
- Status badges are correct (Paid/Pending)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-013: View Bill Details
**Objective:** Verify bill detail page

**Steps:**
1. Navigate to Billing page
2. Click on a bill
3. View bill details

**Expected Result:**
- Bill breakdown visible
- Energy consumption details shown
- Charges breakdown (subscription, energy, tax)
- Savings vs traditional displayed
- Carbon offset shown
- Payment button visible (if pending)

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-014: Enhanced Payment Mock - UPI
**Objective:** Verify UPI payment flow

**Steps:**
1. Navigate to a pending bill
2. Click "Pay Now"
3. Select UPI payment method
4. Complete payment flow

**Expected Result:**
- Razorpay mock modal opens
- UPI option is available
- Payment processing animation shown
- Success message displayed
- Bill status updates to "Paid"

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-015: Enhanced Payment Mock - Card
**Objective:** Verify card payment with OTP

**Steps:**
1. Navigate to a pending bill
2. Click "Pay Now"
3. Select Card payment method
4. Enter card details (4242 4242 4242 4242)
5. Enter OTP (any 6 digits)
6. Complete payment

**Expected Result:**
- Card payment form displayed
- OTP verification step shown
- Payment processing animation
- Success message with confetti
- Bill marked as paid

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-016: Enhanced Payment Mock - Net Banking
**Objective:** Verify net banking payment

**Steps:**
1. Navigate to a pending bill
2. Click "Pay Now"
3. Select Net Banking
4. Select a bank
5. Complete payment

**Expected Result:**
- Net banking options displayed
- Bank selection works
- Payment processing shown
- Success message displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-017: Enhanced Payment Mock - Wallet
**Objective:** Verify wallet payment

**Steps:**
1. Navigate to a pending bill
2. Click "Pay Now"
3. Select Wallet payment
4. Select a wallet (Paytm, PhonePe, etc.)
5. Complete payment

**Expected Result:**
- Wallet options displayed
- Wallet selection works
- Payment processing shown
- Success message displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-018: Download Invoice
**Objective:** Verify invoice download

**Steps:**
1. Navigate to a paid bill
2. Click "Download Invoice"

**Expected Result:**
- Invoice file downloads (text file in demo mode)
- File contains bill details
- Invoice is properly formatted

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 5: Smart Meters

### TC-019: View Registered Meters
**Objective:** Verify meters list displays

**Steps:**
1. Navigate to "Meters" page
2. View registered meters

**Expected Result:**
- At least 1 meter displayed
- Meter details visible (number, type, status)
- Last sync time shown
- Sync button available

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-020: Sync Meter
**Objective:** Verify meter sync functionality

**Steps:**
1. Navigate to Meters page
2. Click "Sync" button on a meter
3. Wait for sync to complete

**Expected Result:**
- Sync button shows loading state
- Sync completes successfully
- Last sync time updates
- Success message displayed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-021: Register New Meter
**Objective:** Verify new meter registration

**Steps:**
1. Navigate to Meters page
2. Click "Register New Meter"
3. Fill in meter details
4. Submit form

**Expected Result:**
- Meter registration form displayed
- Form validation works
- Meter is registered successfully
- New meter appears in list

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 6: Support Tickets

### TC-022: Create Support Ticket
**Objective:** Verify ticket creation

**Steps:**
1. Navigate to "Support" page
2. Click "Create Ticket"
3. Fill in ticket details:
   - Category: Technical
   - Priority: High
   - Subject: Test Issue
   - Description: Test description
4. Submit ticket

**Expected Result:**
- Ticket form displayed
- Ticket created successfully
- Ticket appears in list
- Status is "Open"

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-023: View Tickets
**Objective:** Verify tickets list displays

**Steps:**
1. Navigate to Support page
2. View all tickets

**Expected Result:**
- Tickets list displayed
- Ticket details visible (subject, status, date)
- Tickets can be filtered by status
- Ticket details can be viewed

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-024: Add Ticket Reply
**Objective:** Verify adding reply to ticket

**Steps:**
1. Navigate to a ticket
2. Click "Add Reply"
3. Enter message
4. Submit reply

**Expected Result:**
- Reply form displayed
- Reply is added successfully
- Reply appears in ticket thread
- Ticket updated timestamp changes

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 7: DISCOM Integration

### TC-025: View DISCOM Status
**Objective:** Verify DISCOM status displays

**Steps:**
1. Navigate to "DISCOM" page
2. View application status

**Expected Result:**
- DISCOM status card visible on dashboard
- Application status displayed
- Timeline shows progress
- Grid sync status visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-026: Submit Net-Metering Application
**Objective:** Verify application submission

**Steps:**
1. Navigate to DISCOM page
2. Click "Submit Application" (if not submitted)
3. Fill in application form
4. Submit application

**Expected Result:**
- Application form displayed
- Form validation works
- Application submitted successfully
- Status updates to "Submitted"
- Timeline updates

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-027: View Application Timeline
**Objective:** Verify timeline visualization

**Steps:**
1. Navigate to DISCOM page
2. View application timeline

**Expected Result:**
- Timeline displays all stages
- Current status highlighted
- Dates are shown for each stage
- Progress indicator visible

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 8: Notifications & Alerts

### TC-028: View Notifications
**Objective:** Verify notifications display

**Steps:**
1. Navigate to dashboard or notifications page
2. View notifications

**Expected Result:**
- Notifications list displayed
- Notification details visible (title, message, date)
- Unread notifications highlighted
- Mark as read works

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-029: View Alerts
**Objective:** Verify alerts display

**Steps:**
1. Navigate to dashboard
2. View alerts section

**Expected Result:**
- Alerts list displayed
- Alert details visible (type, severity, description)
- Acknowledge/Resolve buttons work
- Alerts can be filtered

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 9: Profile & Settings

### TC-030: View Profile
**Objective:** Verify profile page displays

**Steps:**
1. Navigate to "Profile" page
2. View profile information

**Expected Result:**
- Profile details displayed
- User information visible (name, email, phone, address)
- Edit profile button available

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-031: Update Profile
**Objective:** Verify profile update

**Steps:**
1. Navigate to Profile page
2. Click "Edit Profile"
3. Update information
4. Save changes

**Expected Result:**
- Profile form displayed
- Changes are saved
- Updated information displayed
- Success message shown

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 10: AI Advisor

### TC-032: AI Advisor Chat
**Objective:** Verify AI advisor functionality

**Steps:**
1. Navigate to "AI Advisor" page
2. Send a message
3. Wait for response

**Expected Result:**
- Chat interface displayed
- Message is sent
- AI response is received (mock response)
- Chat history maintained

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-033: Quick Actions
**Objective:** Verify quick action buttons

**Steps:**
1. Navigate to AI Advisor page
2. Click a quick action button

**Expected Result:**
- Quick action buttons visible
- Clicking button fills message
- Message can be sent
- Response received

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Suite 11: Navigation & UI

### TC-034: Navigation Menu
**Objective:** Verify all navigation links work

**Steps:**
1. Login to application
2. Click each navigation link:
   - Dashboard
   - Billing
   - Support
   - Profile
   - Subscription
   - Meters
   - Services & Plans
   - AI Advisor
   - Settings
   - DISCOM

**Expected Result:**
- All links navigate correctly
- Pages load without errors
- Active link is highlighted
- No blank pages

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-035: Responsive Design
**Objective:** Verify mobile responsiveness

**Steps:**
1. Open application on mobile/tablet viewport
2. Test key pages:
   - Dashboard
   - Billing
   - Onboarding

**Expected Result:**
- Pages are responsive
- Content is readable
- Buttons are accessible
- Navigation works on mobile

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

### TC-036: Error Handling
**Objective:** Verify error handling

**Steps:**
1. Test various error scenarios:
   - Invalid login
   - Network errors (simulated)
   - Missing data

**Expected Result:**
- Error messages are user-friendly
- No blank pages
- Application doesn't crash
- Error boundaries work

**Status:** ✅ Pass / ❌ Fail / ⚠️ Partial

---

## Test Summary

**Total Test Cases:** 36

**Passed:** ___
**Failed:** ___
**Partial:** ___

**Overall Status:** ✅ Ready / ❌ Issues Found / ⚠️ Needs Review

---

## Notes for Testers

1. **All features work with mock data** - No backend required
2. **Real-time updates** - Energy metrics update every 5 seconds
3. **Payment flows** - All payment methods work (simulated)
4. **No data persistence** - Refresh page to reset some data
5. **Demo credentials** - Use provided credentials for testing

## Issues Found

[List any issues found during testing]

---

## Tester Information

**Tester Name:** _______________
**Date:** _______________
**Browser:** _______________
**Device:** _______________

