# 🔧 Fix Backend Database Connection Error

## ❌ Current Problem

Error: `getaddrinfo ENOTFOUND db.znrijfsbcovdggwvifbw.supabase.co`

**What this means:** Your Railway backend is trying to connect to Supabase database instead of Railway Postgres.

---

## ✅ SOLUTION: Fix Railway DATABASE_URL

### **The Problem**

Railway backend has `DATABASE_URL` pointing to Supabase instead of Railway Postgres.

### **The Fix**

We need to ensure Railway uses the Railway Postgres `DATABASE_URL`.

---

## 🚀 Step-by-Step Fix

### **STEP 1: Check Railway Variables** ⏱️ 2 minutes

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment" service**
3. **Click "Variables" tab**
4. **Look for `DATABASE_URL`**

**What you should see:**
- ✅ `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (reference variable)
- ✅ OR `DATABASE_URL` = `postgresql://postgres:...@shortline.proxy.rlwy.net:.../railway`

**What you might see (WRONG):**
- ❌ `DATABASE_URL` = `postgresql://...@db.znrijfsbcovdggwvifbw.supabase.co...`

---

### **STEP 2: Fix DATABASE_URL** ⏱️ 3 minutes

**If DATABASE_URL points to Supabase:**

1. **Click on the Supabase DATABASE_URL variable**
2. **Click "Delete" or edit it**
3. **Click "+ New Variable"**
4. **Click "Reference Variable"** (or "Link Variable")
5. **Select "Postgres" service**
6. **Select `DATABASE_URL`**
7. **Save**

**OR manually set Railway Postgres URL:**

1. **Go to "Postgres" service** → **Variables tab**
2. **Copy the `DATABASE_URL`** (should have `.railway.app` or `.rlwy.net`)
3. **Go back to "resilient-fulfillment"** → **Variables**
4. **Delete the Supabase DATABASE_URL**
5. **Add new variable:**
   - Name: `DATABASE_URL`
   - Value: Paste Railway Postgres URL
   - Save

---

### **STEP 3: Verify Railway Postgres URL** ⏱️ 1 minute

**The Railway DATABASE_URL should look like:**

```
postgresql://postgres:password@shortline.proxy.rlwy.net:44908/railway
```

**OR:**

```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

**NOT:**

```
postgresql://postgres:password@db.znrijfsbcovdggwvifbw.supabase.co:5432/postgres
```

---

### **STEP 4: Redeploy Backend** ⏱️ 1 minute

After fixing DATABASE_URL:

1. **Railway will auto-redeploy** (usually happens automatically)
2. **OR manually trigger:**
   - Click "Deployments" tab
   - Click "Redeploy" or wait for auto-deploy
3. **Wait 1-2 minutes** for deployment

---

### **STEP 5: Test** ⏱️ 1 minute

1. **Test backend health:**
   ```bash
   curl https://resilient-fulfillment-production-3915.up.railway.app/health
   ```
   Should return: `{"status":"ok",...}`

2. **Test frontend login:**
   - Visit: `https://ecogetaway.github.io/eaas/login`
   - Login: `demo1@eaas.com` / `Demo@123`
   - Should work now! ✅

---

## 🔍 How to Check Current DATABASE_URL

**Option 1: Railway Dashboard**
- Railway → resilient-fulfillment → Variables → Check DATABASE_URL

**Option 2: Railway CLI**
```bash
cd eaas-backend
railway variables | grep DATABASE_URL
```

**Option 3: Check Railway Logs**
- Railway → resilient-fulfillment → Logs
- Look for database connection errors or successful connections

---

## 🐛 Troubleshooting

**If DATABASE_URL is correct but still failing:**

1. **Check Railway Postgres is running:**
   - Railway → Postgres service → Should show green checkmark ✅

2. **Check DATABASE_URL format:**
   - Should start with `postgresql://`
   - Should NOT have `.supabase.co`
   - Should have `.railway.app` or `.rlwy.net`

3. **Check backend logs:**
   - Railway → resilient-fulfillment → Logs
   - Look for database connection errors
   - Should show successful connection after fix

**If multiple DATABASE_URL variables exist:**

- Delete all of them
- Add only ONE DATABASE_URL pointing to Railway Postgres

**If reference variable doesn't work:**

- Use the actual connection string from Postgres service
- Copy it manually and paste as DATABASE_URL value

---

## 📋 Quick Checklist

- [ ] Check Railway Variables for DATABASE_URL
- [ ] Remove Supabase DATABASE_URL if present
- [ ] Set DATABASE_URL to Railway Postgres (reference or manual)
- [ ] Verify DATABASE_URL format is correct
- [ ] Wait for Railway to redeploy
- [ ] Test backend health endpoint
- [ ] Test frontend login

---

## 🎯 What to Do Right Now

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment"** → **Variables tab**
3. **Check DATABASE_URL** - does it point to Supabase?
4. **If yes:** Delete it and add Railway Postgres DATABASE_URL
5. **Wait for redeploy** (1-2 minutes)
6. **Test:** Visit `https://ecogetaway.github.io/eaas/login`

---

## 💡 Important Notes

- **Railway auto-redeploys** when you change variables
- **Use reference variable** (`${{Postgres.DATABASE_URL}}`) if possible - it's cleaner
- **Or use actual connection string** from Postgres service
- **Only ONE DATABASE_URL** should exist in Variables

---

## ✅ After Fix

Once DATABASE_URL is correct:
- ✅ Backend connects to Railway Postgres
- ✅ Frontend login works
- ✅ Dashboard loads with data
- ✅ All features work

**Your app will be fully functional!** 🎉

