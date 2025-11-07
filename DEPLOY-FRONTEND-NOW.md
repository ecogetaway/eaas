# 🚀 Deploy Frontend to GitHub Pages - Quick Fix

## ❌ Current Problem

404 error at `https://ecogetaway.github.io` means frontend isn't deployed yet.

---

## ✅ Fix in 3 Steps (5 minutes)

### **STEP 1: Enable GitHub Pages** ⏱️ 2 minutes

1. **Go to:** https://github.com/ecogetaway/eaas/settings/pages

2. **Under "Source" section:**
   - Select: **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **"Save"**

3. **Wait 1-2 minutes** for GitHub to set up Pages environment

**What this does:** Enables GitHub Pages and creates the deployment environment.

---

### **STEP 2: Set GitHub Secrets** ⏱️ 2 minutes

**Go to:** https://github.com/ecogetaway/eaas/settings/secrets/actions

**Add Secret #1:**
- Click **"New repository secret"**
- **Name:** `VITE_API_URL`
- **Secret:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
- Click **"Add secret"**

**Add Secret #2:**
- Click **"New repository secret"** again
- **Name:** `VITE_WS_URL`
- **Secret:** `wss://resilient-fulfillment-production-3915.up.railway.app`
- Click **"Add secret"**

**What this does:** Tells frontend where your backend API is located.

---

### **STEP 3: Trigger Deployment** ⏱️ 1 minute

**Option A: Push Empty Commit (Easiest)**
```bash
cd eaas-frontend
git commit --allow-empty -m "Deploy to GitHub Pages"
git push origin main
```

**Option B: Manual Trigger**
1. Go to: https://github.com/ecogetaway/eaas/actions
2. Click **"Deploy Frontend to GitHub Pages"** (left sidebar)
3. Click **"Run workflow"** button (top right)
4. Click **"Run workflow"** again

**What this does:** Triggers GitHub Actions to build and deploy your frontend.

---

## 🌐 Your Site URL

**After deployment, visit:**
```
https://ecogetaway.github.io/eaas/
```

**NOT:** `https://ecogetaway.github.io` (that's for user/org pages)

**Why `/eaas/`?** Because your repo is named `eaas`, so GitHub Pages URL includes the repo name.

---

## ⏱️ Wait Time

- **First deployment:** 2-3 minutes
- **GitHub Actions will:**
  1. Install dependencies
  2. Build frontend
  3. Deploy to GitHub Pages

---

## ✅ Check Deployment Status

1. **GitHub Actions:** https://github.com/ecogetaway/eaas/actions
   - Look for "Deploy Frontend to GitHub Pages" workflow
   - Should show green checkmark ✅ when done

2. **GitHub Pages:** https://github.com/ecogetaway/eaas/settings/pages
   - Should show "Your site is live at..."
   - Should show deployment status

---

## 🐛 Troubleshooting

**If workflow doesn't run:**
- ✅ Make sure GitHub Pages is enabled (Step 1)
- ✅ Wait 1-2 minutes after enabling Pages
- ✅ Check if workflow file exists: `.github/workflows/deploy-frontend.yml`

**If build fails:**
- ✅ Check GitHub Secrets are set correctly
- ✅ Check Actions logs for specific errors
- ✅ Verify secrets have correct values

**If site still shows 404:**
- ✅ Make sure you're using correct URL: `https://ecogetaway.github.io/eaas/`
- ✅ Wait a few minutes for DNS propagation
- ✅ Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**If site loads but API doesn't work:**
- ✅ Check GitHub Secrets are set
- ✅ Verify backend is running: `curl https://resilient-fulfillment-production-3915.up.railway.app/health`
- ✅ Check browser console for CORS errors

---

## 📋 Quick Checklist

- [ ] GitHub Pages enabled (Settings → Pages → GitHub Actions)
- [ ] GitHub Secrets set (VITE_API_URL, VITE_WS_URL)
- [ ] Workflow triggered (push or manual)
- [ ] Deployment successful (green checkmark)
- [ ] Site accessible at `https://ecogetaway.github.io/eaas/`

---

## 🎯 Do This Right Now

1. **Enable Pages:** https://github.com/ecogetaway/eaas/settings/pages
2. **Set Secrets:** https://github.com/ecogetaway/eaas/settings/secrets/actions
3. **Trigger:** Push commit or manual trigger
4. **Wait:** 2-3 minutes
5. **Visit:** `https://ecogetaway.github.io/eaas/`

---

## 💡 Important Notes

- **First time setup takes 2-3 minutes**
- **URL includes `/eaas/` because repo name is `eaas`**
- **GitHub Pages only hosts static files** (frontend)
- **Backend is separate** (already on Railway ✅)

---

## 🎉 After Deployment

Once deployed, you can:
- ✅ Visit: `https://ecogetaway.github.io/eaas/`
- ✅ Login: `demo1@eaas.com` / `Demo@123`
- ✅ See dashboard with energy data
- ✅ Test all features

**Your full-stack app will be live!** 🚀

