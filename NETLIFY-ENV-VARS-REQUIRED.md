# 🚨 CRITICAL: Netlify Environment Variables Required

## ❌ Current Problem

Frontend is STILL connecting to `http://localhost:5001` instead of Railway backend.

**This means:** Netlify environment variables are NOT set!

---

## ✅ SOLUTION: Set Netlify Environment Variables (MUST DO!)

### **STEP 1: Go to Netlify Environment Variables** ⏱️ 1 minute

1. **Go to:** https://app.netlify.com
2. **Click your site:** `eaasproject`
3. **Go to:** **Site configuration** (or Site settings)
4. **Click:** **Environment variables** (left sidebar under "Build & deploy")

---

### **STEP 2: Add Environment Variables** ⏱️ 2 minutes

**Variable #1: VITE_API_URL**

1. Click **"Add a variable"** or **"Add variable"**
2. **Key:** `VITE_API_URL`
3. **Values:**
   - **Scopes:** Select "Production" (and optionally Deploy previews, Branch deploys)
   - **Value:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
4. Click **"Create variable"** or **"Save"**

**Variable #2: VITE_WS_URL**

1. Click **"Add a variable"** again
2. **Key:** `VITE_WS_URL`
3. **Values:**
   - **Scopes:** Select "Production" (and optionally Deploy previews, Branch deploys)
   - **Value:** `wss://resilient-fulfillment-production-3915.up.railway.app`
4. Click **"Create variable"** or **"Save"**

---

### **STEP 3: Trigger Rebuild** ⏱️ 2 minutes

**After adding variables, you MUST rebuild!**

**Option A: Manual Trigger**

1. Go to **"Deploys"** tab (top menu)
2. Click **"Trigger deploy"** dropdown
3. Click **"Deploy site"**
4. Wait 2-3 minutes

**Option B: Push Commit**

```bash
cd /Users/sanjay/eaas
git commit --allow-empty -m "Trigger Netlify rebuild with env vars"
git push origin main
```

---

### **STEP 4: Verify in Build Logs** ⏱️ 1 minute

**Check that variables were used:**

1. **Netlify** → **Deploys** tab
2. Click on the **running/latest deployment**
3. **Check build logs:**
   - Should show environment variables being used
   - Should NOT see `localhost:5001` anywhere

---

### **STEP 5: Test** ⏱️ 1 minute

1. **Wait for deployment to complete** (green checkmark)
2. **Visit:** `https://eaasproject.netlify.app/login`
3. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. **Check browser console** (F12):
   - Network tab
   - Should see requests to `resilient-fulfillment-production-3915.up.railway.app`
   - NOT `localhost:5001`

5. **Try login:**
   - Email: `demo1@eaas.com`
   - Password: `Demo@123`
   - Should work! ✅

---

## 🔍 Why This is Critical

**Code in `constants.js`:**
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Without `VITE_API_URL` set:**
- Frontend uses fallback: `http://localhost:5000/api`
- Tries to connect to localhost ❌
- Can't reach Railway backend ❌

**With `VITE_API_URL` set:**
- Frontend uses Railway URL ✅
- Connects to backend ✅
- Login works ✅

---

## 📋 Environment Variables Summary

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://resilient-fulfillment-production-3915.up.railway.app/api` | ✅ YES |
| `VITE_WS_URL` | `wss://resilient-fulfillment-production-3915.up.railway.app` | ✅ YES |

**Important:**
- ✅ Must start with `VITE_` (Vite requirement)
- ✅ Must be in Netlify (not Railway)
- ✅ Must rebuild after adding
- ✅ Must be scoped to Production

---

## 🐛 Common Mistakes

**Mistake #1: Adding variables to Railway instead of Netlify**
- ❌ Railway = Backend environment variables
- ✅ Netlify = Frontend environment variables

**Mistake #2: Not rebuilding after adding variables**
- Variables are baked into build
- Must trigger new deployment

**Mistake #3: Wrong variable names**
- ❌ `API_URL` (missing VITE_ prefix)
- ✅ `VITE_API_URL` (correct)

**Mistake #4: Testing before deployment completes**
- Wait for green checkmark in Netlify
- Then test

---

## 🎯 What to Do RIGHT NOW

1. **Netlify:** https://app.netlify.com
2. **Site:** `eaasproject`
3. **Site configuration** → **Environment variables**
4. **Add:**
   - `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`
5. **Deploys tab** → **Trigger deploy** → **Deploy site**
6. **Wait 2-3 minutes**
7. **Test:** `https://eaasproject.netlify.app/login`

---

## ✅ After Fix

Once variables are set and site rebuilds:
- ✅ Frontend connects to Railway backend
- ✅ No more localhost errors
- ✅ CORS works (already fixed in Railway)
- ✅ Login works
- ✅ Dashboard loads

**This is the CRITICAL step!** Without these environment variables, the frontend will ALWAYS try to connect to localhost! 🚨

