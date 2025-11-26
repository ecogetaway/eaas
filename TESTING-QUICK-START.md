# ⚡ EaaS Platform - Quick Testing Guide

> **For Testers** - Everything you need to start testing in 2 minutes

---

## 🌐 Access the Application

**Live URL:** https://eaas-snowy.vercel.app

---

## 👤 Demo Login Credentials

```
Email: demo1@eaas.com
Password: Demo@123
```

**Additional Test Users:**
- demo2@eaas.com / Demo@123 (Solar + Battery plan)
- demo3@eaas.com / Demo@123 (Premium plan)

---

## ✅ 5-Minute Test Checklist

### 1. Login (30 seconds)
- [ ] Go to https://eaas-snowy.vercel.app/login
- [ ] Enter: demo1@eaas.com / Demo@123
- [ ] Click "Sign in"
- [ ] ✅ Should redirect to dashboard

### 2. Real-Time Dashboard (1 minute)
- [ ] Dashboard loads with 4 metric cards
- [ ] Wait 10 seconds
- [ ] ✅ Metrics should update automatically
- [ ] ✅ Chart displays 24-hour energy data

### 3. Billing (1 minute)
- [ ] Click "Billing" in navigation
- [ ] ✅ See list of bills
- [ ] Click "Download Invoice" on any bill
- [ ] ✅ PDF downloads

### 4. Support (1 minute)
- [ ] Click "Support" in navigation
- [ ] Click "Create New Ticket"
- [ ] Fill in: Subject, Category, Priority, Description
- [ ] Submit
- [ ] ✅ Ticket appears in list

### 5. Navigation (30 seconds)
- [ ] Test all menu links: Dashboard, Billing, Support
- [ ] ✅ All pages load correctly
- [ ] Click "Logout"
- [ ] ✅ Returns to login page

---

## 🎯 What to Test

### Core Features
- ✅ **Authentication** - Login, Register, Logout
- ✅ **Real-time Dashboard** - Live metrics (updates every 5 seconds)
- ✅ **Billing** - View bills, download PDF invoices
- ✅ **Support** - Create and manage tickets
- ✅ **Subscription** - 3-step onboarding flow
- ✅ **Smart Meters** - View and sync meters
- ✅ **AI Advisor** - Chat-based energy advisor

### Pages to Test
- `/dashboard` - Real-time energy monitoring
- `/billing` - Bill list and details
- `/support` - Support tickets
- `/subscription` - Manage subscription
- `/meters` - Smart meters
- `/ai-advisor` - AI chat
- `/profile` - User profile

---

## 🐛 Known Limitations

1. **Payment** - Mock payment (not real Razorpay)
2. **Email** - Mock notifications (not real emails)
3. **Backend** - If API is down, features won't work

---

## 📊 Test Results

**Overall Status:** ✅ **92% Test Pass Rate** (52/57 tests passing)

| Feature | Status |
|---------|--------|
| Authentication | ✅ 83% |
| Dashboard | ✅ 100% |
| Billing | ✅ 100% |
| Support | ✅ 100% |
| Subscription | ✅ 100% |

---

## 🚨 Quick Troubleshooting

**Metrics not updating?**
- Hard refresh: Cmd+Shift+R
- Wait 10 seconds
- Check WebSocket in console (F12 → Network → WS)

**Login fails?**
- Verify credentials (copy from above)
- Clear browser cache
- Try incognito window

**Bills not loading?**
- Refresh page
- Check console for errors (F12)
- Try different user account

---

## 📝 Report Issues

**Bug Report Template:**
1. **Summary:** Brief description
2. **Steps:** How to reproduce
3. **Expected:** What should happen
4. **Actual:** What happened
5. **Screenshots:** If applicable

**Report at:** https://github.com/ecogetaway/eaas/issues

---

## 📚 Full Documentation

For detailed test cases and comprehensive documentation, see:
- [Testing Summary](./TESTING-SUMMARY.md) - Complete testing guide
- [UAT Test Cases](./UAT-TEST-CASES.md) - Detailed test scenarios
- [Quick UAT Checklist](./QUICK-UAT-CHECKLIST.md) - 5-minute test

---

**Ready to test?** 🚀

1. Go to: https://eaas-snowy.vercel.app
2. Login with: demo1@eaas.com / Demo@123
3. Start testing!

---

**Last Updated:** December 2024

