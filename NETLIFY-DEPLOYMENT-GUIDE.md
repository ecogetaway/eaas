# 🚀 Netlify Deployment - Step by Step

## ✅ What's Already Configured

- ✅ `netlify.toml` - SPA routing configured
- ✅ `vite.config.js` - Base path set to `/`
- ✅ `App.jsx` - Router configured for Netlify
- ✅ Build command: `npm run build`
- ✅ Publish directory: `dist`

---

## 📋 Step-by-Step Deployment

### **STEP 1: Go to Netlify** ⏱️ 1 minute

1. **Visit:** https://app.netlify.com
2. **Sign in** with your account (you have a subscription)

---

### **STEP 2: Add New Site** ⏱️ 1 minute

1. **Click "Add new site"** (top right or main button)
2. **Click "Import an existing project"**
3. **Choose "GitHub"** (or Git provider you're using)

---

### **STEP 3: Connect Repository** ⏱️ 2 minutes

1. **Authorize Netlify** to access GitHub (if first time)
2. **Search for repository:** `eaas`
3. **Select:** `ecogetaway/eaas`
4. **Click "Connect"**

---

### **STEP 4: Configure Build Settings** ⏱️ 3 minutes

**Important settings:**

1. **Base directory:**
   - Click "Show advanced"
   - **Base directory:** `eaas-frontend`
   - ⚠️ **This is critical!** Your frontend is in a subfolder

2. **Build command:**
   - Should auto-fill: `npm run build`
   - If not, enter: `npm run build`

3. **Publish directory:**
   - Should auto-fill: `dist`
   - If not, enter: `dist`

---

### **STEP 5: Add Environment Variables** ⏱️ 2 minutes

**Before clicking "Deploy site", add environment variables:**

1. **Click "Show advanced"** → **"New variable"**

2. **Add Variable #1:**
   - **Key:** `VITE_API_URL`
   - **Value:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - Click **"Add variable"**

3. **Add Variable #2:**
   - **Key:** `VITE_WS_URL`
   - **Value:** `wss://resilient-fulfillment-production-3915.up.railway.app`
   - Click **"Add variable"**

---

### **STEP 6: Deploy** ⏱️ 1 minute

1. **Click "Deploy site"** button
2. **Wait for deployment** (2-3 minutes)
3. **Watch the build logs** in real-time

---

### **STEP 7: Get Your Netlify URL** ⏱️ 1 minute

After deployment completes:

1. **Netlify shows your site URL:**
   - Format: `https://random-name-123.netlify.app`
   - Or your custom domain if configured

2. **Copy this URL** - you'll need it for Railway CORS

---

### **STEP 8: Update Railway CORS** ⏱️ 2 minutes

**Add Netlify URL to Railway CORS:**

1. **Go to Railway:** https://railway.app
2. **Click "resilient-fulfillment"** service
3. **Click "Variables" tab**
4. **Find `FRONTEND_URL`** variable
5. **Update value:**
   - If it exists: Add Netlify URL (comma-separated if multiple)
   - If not exists: Create new variable
   - **Value:** `https://your-site-name.netlify.app`
   - Replace with your actual Netlify URL

6. **Save** - Railway auto-redeploys

---

### **STEP 9: Test** ⏱️ 2 minutes

1. **Visit your Netlify URL:**
   - Should load homepage ✅

2. **Test routes:**
   - `/` - Homepage ✅
   - `/login` - Login page ✅
   - `/register` - Register page ✅

3. **Test login:**
   - Email: `demo1@eaas.com`
   - Password: `Demo@123`
   - Should work! ✅

---

## 🔍 Build Settings Summary

**For Netlify:**

| Setting | Value |
|---------|-------|
| **Base directory** | `eaas-frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | `18` (or latest) |

**Environment Variables:**

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://resilient-fulfillment-production-3915.up.railway.app/api` |
| `VITE_WS_URL` | `wss://resilient-fulfillment-production-3915.up.railway.app` |

---

## 🐛 Troubleshooting

**If build fails:**

1. **Check build logs** in Netlify dashboard
2. **Common issues:**
   - Wrong base directory (should be `eaas-frontend`)
   - Missing environment variables
   - Node version mismatch

**If routes don't work:**

1. **Verify `netlify.toml`** has redirects:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Clear browser cache** (Ctrl+Shift+R or Cmd+Shift+R)

**If API calls fail:**

1. **Check environment variables** are set correctly
2. **Verify Railway backend** is running
3. **Check Railway CORS** includes Netlify URL

---

## ✅ Success Checklist

- [ ] Site connected to GitHub repository
- [ ] Base directory set to `eaas-frontend`
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Environment variables added (VITE_API_URL, VITE_WS_URL)
- [ ] Deployment successful (green checkmark)
- [ ] Netlify URL obtained
- [ ] Railway FRONTEND_URL updated with Netlify URL
- [ ] Site accessible at Netlify URL
- [ ] All routes work (/login, /register, etc.)
- [ ] Login works

---

## 🎯 Quick Reference

**Netlify Dashboard:** https://app.netlify.com

**Your Repository:** ecogetaway/eaas

**Backend URL:** https://resilient-fulfillment-production-3915.up.railway.app

**Environment Variables:**
- `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
- `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`

---

## 🎉 After Deployment

**Your setup:**
- ✅ **Frontend:** Netlify (with your subscription)
- ✅ **Backend:** Railway (hobby plan)
- ✅ **Database:** Railway Postgres
- ✅ **SPA Routing:** Works perfectly! 🚀

**No more 404 errors!** Netlify handles SPA routing automatically.

---

## 📝 Notes

- **Base directory is critical** - don't forget to set it to `eaas-frontend`
- **Environment variables** must be set before first deployment
- **Railway CORS** needs Netlify URL after deployment
- **Netlify auto-deploys** on every push to main branch

---

**Ready to deploy? Follow the steps above!** 🚀

