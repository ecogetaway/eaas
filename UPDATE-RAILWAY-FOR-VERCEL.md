# 🔧 Update Railway Backend for Vercel Frontend

## ✅ Vercel Deployment Successful!

**Your public URL:** https://eaas-snowy.vercel.app/

**Status:** ✅ Frontend deployed and publicly accessible

**Next:** Update Railway backend to allow requests from Vercel

---

## 🎯 Update Railway CORS (2 Minutes)

### **STEP 1: Go to Railway Dashboard**

**Link:** https://railway.app

1. Login if needed
2. Click on your project: **friendly-passion** (or your project name)
3. Click on service: **resilient-fulfillment**

---

### **STEP 2: Update Environment Variable**

1. Click on **"Variables"** tab (top menu)
2. Look for: `FRONTEND_URL`

#### Option A: If FRONTEND_URL Already Exists

1. Click on `FRONTEND_URL`
2. **Change value to:** `https://eaas-snowy.vercel.app`
3. Click **"Update"** or **"Save"**

#### Option B: If FRONTEND_URL Doesn't Exist

1. Click **"Add Variable"** or **"New Variable"**
2. **Name:** `FRONTEND_URL`
3. **Value:** `https://eaas-snowy.vercel.app`
4. Click **"Add"** or **"Save"**

---

### **STEP 3: Deploy Changes**

**After updating the variable:**

1. Look for **"Deploy"** button (if Railway shows pending changes)
2. Click **"Deploy"**
3. **Wait 1-2 minutes** for deployment to complete
4. Check for **green checkmark** (deployment successful)

**OR:** Railway might auto-deploy (watch for deployment in progress)

---

## 🧪 Test Your App (After Railway Deploys)

### **STEP 1: Visit Your Vercel App**

**Go to:** https://eaas-snowy.vercel.app/login

---

### **STEP 2: Try Login**

Use any of these demo accounts:

**Account 1:**
- Email: `demo1@eaas.com`
- Password: `Demo@123`

**Account 2:**
- Email: `demo2@eaas.com`
- Password: `Demo@123`

**Account 3:**
- Email: `demo3@eaas.com`
- Password: `Demo@123`

---

### **STEP 3: Success! 🎉**

**After successful login, you should see:**
- ✅ Redirected to dashboard
- ✅ Real-time energy metrics
- ✅ User information
- ✅ Navigation menu

---

## 🔍 If You Still Get CORS Error

### Quick Checks:

1. **Railway deployed?**
   - Check Railway dashboard
   - Should show green checkmark
   - Recent deployment timestamp

2. **FRONTEND_URL correct?**
   - Should be: `https://eaas-snowy.vercel.app`
   - No trailing slash
   - Uses `https://` (not `http://`)

3. **Wait 2 minutes:**
   - Railway needs time to restart
   - Backend needs to pick up new CORS settings

4. **Hard refresh browser:**
   - Press: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - This clears browser cache

5. **Try incognito window:**
   - Opens fresh session
   - No cached data

---

## 📊 Current Setup

### ✅ What's Working:

| Component | Status | URL |
|-----------|--------|-----|
| **Backend** | ✅ Deployed | https://resilient-fulfillment-production-3915.up.railway.app |
| **Frontend** | ✅ Deployed | https://eaas-snowy.vercel.app |
| **Database** | ✅ Connected | Railway Postgres |

### ⏳ Pending:

- [ ] Update Railway FRONTEND_URL to Vercel URL
- [ ] Railway redeploy
- [ ] Test login

---

## 🎯 Quick Summary

**What you need to do:**

1. **Railway:** https://railway.app
2. **Service:** resilient-fulfillment → Variables
3. **Update:** `FRONTEND_URL` = `https://eaas-snowy.vercel.app`
4. **Deploy:** Click Deploy button
5. **Wait:** 1-2 minutes
6. **Test:** https://eaas-snowy.vercel.app/login
7. **Login:** demo1@eaas.com / Demo@123
8. **Success:** 🎉

---

## 🌐 Your Public URLs

**Frontend (Vercel):**
```
https://eaas-snowy.vercel.app
```

**Backend (Railway):**
```
https://resilient-fulfillment-production-3915.up.railway.app
```

**Backend Health Check:**
```
https://resilient-fulfillment-production-3915.up.railway.app/health
```

---

## ✅ After It Works

**Your hackathon demo is ready!**

You can:
- ✅ Share the Vercel URL with anyone
- ✅ Demo all features (subscription, dashboard, billing, support)
- ✅ All 5 demo accounts work
- ✅ Real-time energy data updates
- ✅ Fully functional backend + database

**Public access:** Anyone with the link can access it!

---

## 🚀 Start Now

**Go to Railway and update FRONTEND_URL:**

https://railway.app

Then tell me when Railway is deployed, and we'll test!

