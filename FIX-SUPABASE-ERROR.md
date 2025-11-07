# 🔧 Fix Supabase Connection Error

## ❌ Current Problem

Error: `getaddrinfo ENOTFOUND db.znrijfsbcovdggwvifbw.supabase.co`

**What this means:** Your Railway backend is still trying to connect to Supabase instead of Railway Postgres.

**This is NOT a CORS issue** - it's a database connection issue. The backend can't find the Supabase server.

---

## ✅ SOLUTION: Use Railway Postgres Instead

You already have Railway Postgres set up! We just need to make sure Railway backend is using it.

---

## 🔍 Step 1: Check Railway Variables (2 minutes)

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment" service**
3. **Click "Variables" tab**
4. **Look for `DATABASE_URL`**

**What you should see:**
- ✅ `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (reference variable)
- ✅ OR `DATABASE_URL` = `postgresql://...@postgres.railway.internal:5432/railway`

**What you might see (WRONG):**
- ❌ `DATABASE_URL` = `postgresql://...@db.znrijfsbcovdggwvifbw.supabase.co...`

---

## 🔧 Step 2: Fix DATABASE_URL (3 minutes)

**If DATABASE_URL points to Supabase:**

### **Option A: Use Reference Variable (Recommended)**

1. **Delete the Supabase DATABASE_URL** variable
2. **Click "+ New Variable"**
3. **Click "Reference Variable"** (or "Link Variable")
4. **Select "Postgres" service**
5. **Select `DATABASE_URL`**
6. **Save**

This creates: `DATABASE_URL=${{Postgres.DATABASE_URL}}`

### **Option B: Set Manually**

1. **Go to "Postgres" service** → **Variables tab**
2. **Copy the `DATABASE_URL`** (should have `.railway.internal` or `.rlwy.net`)
3. **Go back to "resilient-fulfillment"** → **Variables**
4. **Delete Supabase DATABASE_URL**
5. **Add new variable:**
   - Name: `DATABASE_URL`
   - Value: Paste Railway Postgres URL
   - Save

---

## ⏱️ Step 3: Wait for Redeploy (1-2 minutes)

Railway automatically redeploys when you change variables.

**Check deployment:**
1. Railway → resilient-fulfillment → **Deployments** tab
2. Look for latest deployment
3. Wait for green checkmark ✅

---

## 🧪 Step 4: Test (1 minute)

**Test backend:**
```bash
curl https://resilient-fulfillment-production-3915.up.railway.app/health
```

Should return: `{"status":"ok",...}`

**Test frontend login:**
1. Visit your Netlify URL
2. Login: `demo1@eaas.com` / `Demo@123`
3. Should work now! ✅

---

## 🔍 Why This Happened

**Possible reasons:**
1. Railway backend still has Supabase DATABASE_URL from earlier
2. Variable wasn't updated when we switched to Railway Postgres
3. Multiple DATABASE_URL variables exist (Railway uses the wrong one)

**Solution:** Make sure Railway backend uses Railway Postgres DATABASE_URL, not Supabase.

---

## 📋 Quick Checklist

- [ ] Check Railway Variables for DATABASE_URL
- [ ] Remove Supabase DATABASE_URL if present
- [ ] Set DATABASE_URL to Railway Postgres (reference or manual)
- [ ] Wait for Railway redeploy (1-2 minutes)
- [ ] Test backend health endpoint
- [ ] Test frontend login

---

## 🎯 What to Do Right Now

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment"** → **Variables tab**
3. **Check DATABASE_URL** - does it point to Supabase?
4. **If yes:** Delete it and add Railway Postgres DATABASE_URL
5. **Wait for redeploy** (1-2 minutes)
6. **Test:** Visit Netlify URL and try login

---

## 💡 Important Notes

- **This is NOT a CORS issue** - it's a database connection issue
- **Supabase might be paused** (free tier pauses after inactivity)
- **But you don't need Supabase** - you have Railway Postgres! ✅
- **Just switch Railway backend to use Railway Postgres**

---

## ✅ After Fix

Once Railway backend uses Railway Postgres:
- ✅ No more Supabase connection errors
- ✅ Backend connects to Railway Postgres
- ✅ Frontend login works
- ✅ All features work

**You're using Railway Postgres, not Supabase - just need to make sure Railway backend knows that!**

