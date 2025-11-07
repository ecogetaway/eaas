# 🔧 Fix CORS Error - Netlify to Railway

## ❌ Current Error

```
Access to XMLHttpRequest at 'https://resilient-fulfillment-production-3915.up.railway.app/api/auth/login' 
from origin 'https://eaasproject.netlify.app' has been blocked by CORS policy
```

**What this means:** Railway backend doesn't allow requests from Netlify frontend.

---

## ✅ SOLUTION: Update Railway CORS Configuration

### **STEP 1: Update Railway FRONTEND_URL** ⏱️ 2 minutes

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment" service**
3. **Click "Variables" tab**
4. **Find `FRONTEND_URL` variable**
5. **Update value to:**
   ```
   https://eaasproject.netlify.app
   ```
   
   **If you want multiple origins (optional):**
   ```
   https://eaasproject.netlify.app,https://ecogetaway.github.io
   ```

6. **Save** - Railway auto-redeploys

---

### **STEP 2: Wait for Railway Redeploy** ⏱️ 1-2 minutes

Railway automatically redeploys when you change variables.

**Check deployment:**
1. Railway → resilient-fulfillment → **Deployments** tab
2. Wait for latest deployment
3. Look for green checkmark ✅

---

### **STEP 3: Test** ⏱️ 1 minute

1. **Go to:** `https://eaasproject.netlify.app/login`
2. **Clear browser cache:** Ctrl+Shift+R or Cmd+Shift+R
3. **Try login:**
   - Email: `demo1@eaas.com`
   - Password: `Demo@123`
4. **Should work now!** ✅

---

## 🔍 What's Happening

**Frontend URL:** `https://eaasproject.netlify.app`  
**Backend URL:** `https://resilient-fulfillment-production-3915.up.railway.app`

**Problem:** Backend CORS doesn't include Netlify URL  
**Solution:** Add Netlify URL to `FRONTEND_URL` in Railway

---

## 🐛 If Error Persists

**Check Railway Variables:**

1. **Go to Railway → Variables**
2. **Verify `FRONTEND_URL` includes:**
   ```
   https://eaasproject.netlify.app
   ```

**Check Railway Logs:**

1. **Railway → resilient-fulfillment → Logs**
2. **Look for CORS messages**
3. **Should show allowed origins**

**Try Hard Refresh:**
- Clear browser cache completely
- Or use incognito window

---

## 📋 Quick Checklist

- [ ] Railway → resilient-fulfillment → Variables
- [ ] Find or create `FRONTEND_URL` variable
- [ ] Set value to: `https://eaasproject.netlify.app`
- [ ] Save (Railway auto-redeploys)
- [ ] Wait 1-2 minutes for redeploy
- [ ] Test login at Netlify URL

---

## 🎯 What to Do Right Now

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment"** → **Variables**
3. **Update `FRONTEND_URL`:** `https://eaasproject.netlify.app`
4. **Save** (wait for redeploy)
5. **Test:** `https://eaasproject.netlify.app/login`

---

## ✅ After Fix

Once FRONTEND_URL is updated and Railway redeploys:
- ✅ CORS allows Netlify requests
- ✅ Login works
- ✅ All API calls work
- ✅ No more CORS errors

**Just need to tell Railway to allow requests from Netlify!** 🚀

