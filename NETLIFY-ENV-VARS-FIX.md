# 🔧 Fix Netlify Environment Variables

## ❌ Current Problem

**Site:** `https://eaasproject.netlify.app` ✅ Deployed!  
**Error:** Frontend trying to connect to `localhost:5001` ❌  
**Issue:** Environment variables not set in Netlify

---

## ✅ SOLUTION: Add Environment Variables in Netlify

### **STEP 1: Go to Netlify Environment Variables** ⏱️ 1 minute

1. **Go to Netlify:** https://app.netlify.com
2. **Click on your site:** `eaasproject`
3. **Go to:** **Site settings** (top menu)
4. **Click:** **Environment variables** (left sidebar)

---

### **STEP 2: Add Environment Variables** ⏱️ 3 minutes

**Add Variable #1:**

1. **Click "Add variable"** button
2. **Key:** `VITE_API_URL`
3. **Value:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
4. **Scopes:** 
   - ✅ Production
   - ✅ Deploy previews
   - ✅ Branch deploys
5. **Click "Save variable"**

**Add Variable #2:**

1. **Click "Add variable"** again
2. **Key:** `VITE_WS_URL`
3. **Value:** `wss://resilient-fulfillment-production-3915.up.railway.app`
4. **Scopes:**
   - ✅ Production
   - ✅ Deploy previews
   - ✅ Branch deploys
5. **Click "Save variable"**

---

### **STEP 3: Trigger Redeploy** ⏱️ 2 minutes

**After adding variables, you MUST rebuild:**

**Option A: Manual Trigger (Easiest)**

1. **Go to:** **Deploys** tab
2. **Click "Trigger deploy"** dropdown
3. **Click "Deploy site"**
4. **Wait 2-3 minutes** for rebuild

**Option B: Push Commit**

```bash
cd /Users/sanjay/eaas
git commit --allow-empty -m "Trigger Netlify rebuild with env vars"
git push origin main
```

---

### **STEP 4: Verify Variables in Build** ⏱️ 1 minute

**Check build logs:**

1. **Netlify** → Your site → **Deploys** tab
2. **Click on latest deployment**
3. **Check build logs:**
   - Look for environment variables
   - Should NOT see `localhost:5001`
   - Should see Railway URL

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

## 🔍 Environment Variables Summary

**Required Variables:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://resilient-fulfillment-production-3915.up.railway.app/api` |
| `VITE_WS_URL` | `wss://resilient-fulfillment-production-3915.up.railway.app` |

**Important:**
- ✅ Must start with `VITE_` (Vite requirement)
- ✅ Must be scoped to Production
- ✅ Must rebuild after adding

---

## 🐛 Troubleshooting

**If still connecting to localhost:**

1. **Check variable names:**
   - Must be exactly: `VITE_API_URL` (not `API_URL`)
   - Must be exactly: `VITE_WS_URL` (not `WS_URL`)

2. **Check variable scopes:**
   - Must include "Production"
   - Not just "Deploy previews"

3. **Redeploy required:**
   - Variables are baked into build
   - Must rebuild after adding
   - Check "Deploys" tab for new deployment

4. **Clear browser cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or use incognito window

---

## 📋 Quick Checklist

- [ ] Go to Netlify → Site settings → Environment variables
- [ ] Add `VITE_API_URL` with Railway backend URL
- [ ] Add `VITE_WS_URL` with Railway WebSocket URL
- [ ] Set scopes to Production
- [ ] Trigger redeploy (manual or push commit)
- [ ] Wait for build to complete
- [ ] Test login at Netlify URL
- [ ] Verify Network tab shows Railway URL

---

## 🎯 What to Do Right Now

1. **Netlify:** https://app.netlify.com
2. **Click site:** `eaasproject`
3. **Site settings** → **Environment variables**
4. **Add:**
   - `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`
5. **Deploys tab** → **Trigger deploy** → **Deploy site**
6. **Wait 2-3 minutes**
7. **Test:** `https://eaasproject.netlify.app/login`

---

## 💡 Important Notes

- **Vite only reads variables starting with `VITE_`**
- **Variables are baked into build** - must rebuild after adding
- **Check scopes** - must include Production
- **Redeploy required** after adding/updating variables

---

## ✅ After Fix

Once variables are set and site is redeployed:
- ✅ Frontend connects to Railway backend
- ✅ No more localhost errors
- ✅ Login works
- ✅ All API calls work

**Your site is live - just need to connect it to the backend!** 🚀

