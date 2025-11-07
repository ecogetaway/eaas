# 🔧 Fix Netlify Backend Connection Error

## ❌ Current Problem

Error: "Unable to connect to backend API. The backend server needs to be deployed and running. For local development, ensure the backend is running on http://localhost:5001"

**What this means:** Frontend is trying to connect to `localhost:5001` instead of Railway backend.

**Site URL:** `https://eaasproject.netlify.app`

---

## ✅ SOLUTION: Set Environment Variables in Netlify

The environment variables (`VITE_API_URL` and `VITE_WS_URL`) are either:
1. Not set in Netlify
2. Set incorrectly
3. Need to trigger a rebuild

---

## 🔧 Step-by-Step Fix

### **STEP 1: Check Netlify Environment Variables** ⏱️ 2 minutes

1. **Go to Netlify:** https://app.netlify.com
2. **Click on your site:** `eaasproject`
3. **Go to:** **Site settings** → **Environment variables**
4. **Check if these exist:**
   - `VITE_API_URL`
   - `VITE_WS_URL`

---

### **STEP 2: Add/Update Environment Variables** ⏱️ 2 minutes

**If variables don't exist or are wrong:**

1. **Click "Add variable"** (or edit existing)

2. **Variable #1:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - **Scopes:** Production, Deploy previews, Branch deploys (select all)
   - Click **"Save"**

3. **Variable #2:**
   - **Key:** `VITE_WS_URL`
   - **Value:** `wss://resilient-fulfillment-production-3915.up.railway.app`
   - **Scopes:** Production, Deploy previews, Branch deploys (select all)
   - Click **"Save"**

---

### **STEP 3: Trigger Redeploy** ⏱️ 1 minute

**After adding/updating variables:**

1. **Go to:** **Deploys** tab
2. **Click "Trigger deploy"** → **"Deploy site"**
3. **Wait 2-3 minutes** for rebuild

**OR:**

1. **Push a commit** to trigger auto-deploy:
   ```bash
   cd /Users/sanjay/eaas
   git commit --allow-empty -m "Trigger Netlify rebuild with env vars"
   git push origin main
   ```

---

### **STEP 4: Verify Build Used Variables** ⏱️ 1 minute

**Check build logs:**

1. **Netlify** → Your site → **Deploys** tab
2. **Click on latest deployment**
3. **Check build logs** for:
   - Should show environment variables being used
   - Should NOT show `localhost:5001`

---

### **STEP 5: Test** ⏱️ 1 minute

1. **Visit:** `https://eaasproject.netlify.app/login`
2. **Open browser console** (F12)
3. **Check Network tab:**
   - Requests should go to: `resilient-fulfillment-production-3915.up.railway.app`
   - NOT: `localhost:5001`

4. **Try login:**
   - Email: `demo1@eaas.com`
   - Password: `Demo@123`
   - Should work! ✅

---

## 🔍 How to Verify Environment Variables

**In Netlify:**

1. **Site settings** → **Environment variables**
2. **Should see:**
   - ✅ `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - ✅ `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`

**If you see:**
- ❌ Variables missing
- ❌ Values are `localhost:5001`
- ❌ Values are empty

**Then you need to add/update them!**

---

## 🐛 Troubleshooting

**If error persists after adding variables:**

1. **Check variable names:**
   - Must be exactly: `VITE_API_URL` (not `API_URL`)
   - Must be exactly: `VITE_WS_URL` (not `WS_URL`)
   - Vite only reads variables starting with `VITE_`

2. **Check variable scopes:**
   - Make sure variables are available for "Production"
   - Not just "Deploy previews"

3. **Redeploy required:**
   - Environment variables are baked into build
   - Must rebuild after adding/updating
   - Trigger new deployment

4. **Check build logs:**
   - Look for environment variable values
   - Should show Railway URL, not localhost

---

## 📋 Quick Checklist

- [ ] Netlify environment variables exist
- [ ] `VITE_API_URL` = Railway backend URL
- [ ] `VITE_WS_URL` = Railway WebSocket URL
- [ ] Variables scoped to Production
- [ ] Site redeployed after adding variables
- [ ] Build logs show correct URLs
- [ ] Frontend connects to Railway backend

---

## 🎯 What to Do Right Now

1. **Go to Netlify:** https://app.netlify.com
2. **Click site:** `eaasproject`
3. **Site settings** → **Environment variables**
4. **Add/update:**
   - `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`
5. **Trigger deploy** (or push commit)
6. **Wait 2-3 minutes**
7. **Test login again**

---

## 💡 Important Notes

- **Vite environment variables** must start with `VITE_`
- **Variables are baked into build** - must rebuild after adding
- **Check variable scopes** - must include Production
- **Redeploy required** after adding/updating variables

---

## ✅ After Fix

Once environment variables are set and site is redeployed:
- ✅ Frontend connects to Railway backend
- ✅ No more localhost errors
- ✅ Login works
- ✅ All API calls work

**Your site is deployed - just need to connect it to the backend!** 🚀

