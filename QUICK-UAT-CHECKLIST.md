# ⚡ Quick UAT Checklist (5-Minute Test)

## 🎯 Fast Track Testing for Hackathon Demo

**App URL:** https://eaas-snowy.vercel.app

---

## ✅ Critical Tests (Must Pass)

### 1. LOGIN TEST (30 seconds)

**Test User:** demo1@eaas.com / Demo@123

- [ ] Go to https://eaas-snowy.vercel.app/login
- [ ] Enter credentials
- [ ] Click "Sign in"
- [ ] **PASS:** Redirected to dashboard ✅
- [ ] **FAIL:** Error message or stuck on login ❌

---

### 2. REAL-TIME DASHBOARD (1 minute)

**After successful login:**

- [ ] Dashboard loads
- [ ] See 4 metric cards:
  - Current Power (kW)
  - Today's Energy (kWh)
  - Cost Savings ($)
  - Grid Usage (%)
- [ ] Wait 10 seconds
- [ ] **PASS:** Metrics update automatically ✅
- [ ] **FAIL:** Metrics frozen or don't change ❌

---

### 3. ENERGY CHART (30 seconds)

**On dashboard:**

- [ ] Scroll to energy chart
- [ ] See 24-hour line graph
- [ ] Hover over data points
- [ ] **PASS:** Chart displays data clearly ✅
- [ ] **FAIL:** Chart empty or broken ❌

---

### 4. BILLING MODULE (1 minute)

**Click "Billing" in navigation:**

- [ ] Billing page loads
- [ ] See list of 2+ bills
- [ ] Each bill shows:
  - Date
  - Amount
  - Status (Paid/Pending)
- [ ] Click "Download Invoice" on any bill
- [ ] **PASS:** PDF downloads ✅
- [ ] **FAIL:** No bills or download fails ❌

---

### 5. SUPPORT MODULE (1 minute)

**Click "Support" in navigation:**

- [ ] Support page loads
- [ ] See existing tickets (if any)
- [ ] Click "Create New Ticket" button
- [ ] Fill in form:
  - Subject: `Test ticket`
  - Category: Technical
  - Priority: Medium
  - Description: `Testing support system`
- [ ] Click Submit
- [ ] **PASS:** Ticket created, appears in list ✅
- [ ] **FAIL:** Form error or submission fails ❌

---

### 6. NAVIGATION TEST (30 seconds)

**Test all menu links:**

- [ ] Click Dashboard → loads
- [ ] Click Billing → loads
- [ ] Click Support → loads
- [ ] Click Logout → returns to login/home
- [ ] **PASS:** All pages work ✅
- [ ] **FAIL:** Any page broken ❌

---

### 7. WEBSOCKET CONNECTION (30 seconds)

**Open browser console (F12):**

- [ ] Go to dashboard
- [ ] Press F12 → Network tab → WS filter
- [ ] Look for WebSocket connection
- [ ] Status: "101 Switching Protocols"
- [ ] **PASS:** WebSocket connected ✅
- [ ] **FAIL:** No connection or errors ❌

---

## 📊 Test Result Summary

| Test | Status | Notes |
|------|--------|-------|
| 1. Login | ⏳ | |
| 2. Real-Time Dashboard | ⏳ | |
| 3. Energy Chart | ⏳ | |
| 4. Billing | ⏳ | |
| 5. Support | ⏳ | |
| 6. Navigation | ⏳ | |
| 7. WebSocket | ⏳ | |

**Overall Status:** ⏳ Not Started / ✅ All Pass / ❌ Issues Found

---

## 🎯 Demo Scenario (Hackathon Presentation)

### **Story:** Show a customer monitoring their solar energy

**Time:** 3 minutes

1. **Login** (10 sec)
   - "This is our EaaS platform. Let me log in as a customer..."
   - Login with demo1@eaas.com

2. **Dashboard** (1 min)
   - "Here's the real-time dashboard..."
   - Point out live metrics: "These update every 5 seconds"
   - Show energy chart: "24-hour consumption history"
   - Highlight savings: "Saving $XX this month"

3. **Billing** (1 min)
   - "Customers can view their bills..."
   - Click Billing
   - "Here are past bills, current status"
   - Download invoice: "One-click PDF download"

4. **Support** (1 min)
   - "If there's an issue, customers can contact support..."
   - Click Support
   - "View existing tickets or create new ones"
   - Quick demo of creating ticket

5. **Conclusion** (10 sec)
   - "All data is real-time, backed by PostgreSQL database"
   - "WebSocket for live updates"
   - "Fully functional subscription management"

---

## 🧪 Additional Test Users

**Try different users to show variety:**

| User | Email | Plan | Use Case |
|------|-------|------|----------|
| User 1 | demo1@eaas.com | Basic Solar | Standard customer |
| User 2 | demo2@eaas.com | Solar + Battery | Mid-tier customer |
| User 3 | demo3@eaas.com | Premium | High-end customer |

All passwords: `Demo@123`

---

## 🐛 Common Issues & Quick Fixes

### Issue: Metrics not updating

**Fix:**
- Hard refresh: Cmd+Shift+R
- Check WebSocket in console
- Wait 10 seconds for first update

### Issue: Login fails

**Fix:**
- Check credentials (copy from above)
- Clear browser cache
- Try incognito window

### Issue: Bills not loading

**Fix:**
- Refresh page
- Check console for errors
- Try different user account

### Issue: Support ticket not submitting

**Fix:**
- Ensure all fields filled
- Check form validation
- Refresh and try again

---

## ✅ Success Criteria

**Hackathon Demo is Ready If:**

- ✅ All 7 critical tests pass
- ✅ Real-time metrics update automatically
- ✅ Can complete end-to-end user journey
- ✅ No major bugs or crashes
- ✅ UI is responsive and professional

**If all checked:** 🎉 **READY FOR DEMO!**

---

## 📝 Quick Test Script

**Read this during demo:**

> "This is our Energy-as-a-Service platform. Let me show you how customers can monitor their solar energy in real-time.
>
> [Login] Here's our dashboard with live metrics that update every 5 seconds. You can see current power generation, daily energy, cost savings, and grid usage.
>
> [Chart] This chart shows 24-hour consumption history. The data is pulled from IoT sensors and stored in our PostgreSQL database.
>
> [Billing] Customers can view their billing history, download PDF invoices, and make payments.
>
> [Support] If there's any issue, they can submit support tickets which are tracked in our ticketing system.
>
> Everything is real-time, with WebSocket connections for live data streaming. The platform is fully functional with subscription management, payment processing, and customer support."

**Time:** ~3 minutes
**Impact:** Maximum! 🚀

---

## 🎯 Final Checklist Before Demo

- [ ] Test all 7 critical features
- [ ] Verify login credentials work
- [ ] Check real-time updates are working
- [ ] Ensure WebSocket is connected
- [ ] Test in the browser you'll use for demo
- [ ] Bookmark the Vercel URL
- [ ] Have backup demo account ready
- [ ] Clear browser cache before demo
- [ ] Test on good internet connection
- [ ] Practice demo script 2-3 times

**All checked?** 🎉 **GO PRESENT!**

