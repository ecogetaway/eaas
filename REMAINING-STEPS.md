# 📋 Remaining Deployment Steps

## ✅ What's Already Done

- [x] Backend deployed to Railway
- [x] Database (Postgres) created
- [x] Database linked to backend
- [x] Migrations completed (all tables created)
- [x] Seed data added (demo users, subscriptions, etc.)

---

## ⏭️ Remaining Steps (4 steps, ~10 minutes total)

### **STEP 1: Set Railway Environment Variables** ⏱️ 3 minutes

**Where:** Railway → resilient-fulfillment service → Variables tab

**Add these variables:**

1. **FRONTEND_URL**
   - Name: `FRONTEND_URL`
   - Value: `https://ecogetaway.github.io`
   - Why: Allows backend to accept requests from your frontend

2. **NODE_ENV**
   - Name: `NODE_ENV`
   - Value: `production`
   - Why: Sets production mode

3. **JWT_SECRET**
   - Name: `JWT_SECRET`
   - Value: Generate with: `openssl rand -hex 32`
   - Why: Secret key for JWT tokens (security)

4. **JWT_EXPIRE**
   - Name: `JWT_EXPIRE`
   - Value: `7d`
   - Why: Token expiration time

**How to generate JWT_SECRET:**
```bash
openssl rand -hex 32
```
Copy the output and paste it as the value.

---

### **STEP 2: Set GitHub Secrets** ⏱️ 3 minutes

**Where:** GitHub → Settings → Secrets and variables → Actions

**Add these secrets:**

1. **VITE_API_URL**
   - Name: `VITE_API_URL`
   - Value: `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - Why: Frontend needs to know where your backend API is

2. **VITE_WS_URL**
   - Name: `VITE_WS_URL`
   - Value: `wss://resilient-fulfillment-production-3915.up.railway.app`
   - Why: Frontend needs WebSocket URL for real-time features
   - **Important:** Use `wss://` (secure WebSocket), not `ws://`

**Steps:**
1. Go to: https://github.com/ecogetaway/eaas/settings/secrets/actions
2. Click "New repository secret"
3. Add each secret one by one
4. Save

---

### **STEP 3: Rebuild Frontend** ⏱️ 2 minutes

**Option A: Push Empty Commit (Easiest)**
```bash
cd eaas-frontend
git commit --allow-empty -m "Rebuild with Railway backend URLs"
git push origin main
```

**Option B: Manual GitHub Actions Trigger**
1. Go to: https://github.com/ecogetaway/eaas/actions
2. Find "Deploy Frontend to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"
4. Wait 2-3 minutes for build to complete

**What happens:**
- GitHub Actions builds your frontend
- Uses the secrets you just added (VITE_API_URL, VITE_WS_URL)
- Deploys to GitHub Pages
- Frontend now points to Railway backend

---

### **STEP 4: Test Everything** ⏱️ 2 minutes

**Test Backend:**
```bash
curl https://resilient-fulfillment-production-3915.up.railway.app/health
```
Should return: `{"status":"ok",...}`

**Test Frontend:**
1. Visit: `https://ecogetaway.github.io`
2. Open browser console (F12)
3. Click "Network" tab
4. Try to login:
   - Email: `demo1@eaas.com`
   - Password: `Demo@123`
5. **Check:**
   - ✅ Requests go to `resilient-fulfillment-production-3915.up.railway.app`
   - ✅ No CORS errors
   - ✅ Login works
   - ✅ Dashboard loads

---

## 🎯 Quick Summary

**Step 1:** Railway Variables (FRONTEND_URL, JWT_SECRET, etc.)  
**Step 2:** GitHub Secrets (VITE_API_URL, VITE_WS_URL)  
**Step 3:** Rebuild frontend (push commit or trigger workflow)  
**Step 4:** Test login and dashboard

**Total time:** ~10 minutes

---

## 📝 Detailed Instructions

### **Step 1: Railway Variables**

1. Go to Railway: https://railway.app
2. Click "resilient-fulfillment" service
3. Click "Variables" tab
4. Click "+ New Variable" for each:

   **Variable 1:**
   - Name: `FRONTEND_URL`
   - Value: `https://ecogetaway.github.io`

   **Variable 2:**
   - Name: `NODE_ENV`
   - Value: `production`

   **Variable 3:**
   - Name: `JWT_SECRET`
   - Value: (run `openssl rand -hex 32` in terminal, copy output)

   **Variable 4:**
   - Name: `JWT_EXPIRE`
   - Value: `7d`

5. Railway will auto-redeploy after adding variables

---

### **Step 2: GitHub Secrets**

1. Go to: https://github.com/ecogetaway/eaas/settings/secrets/actions
2. Click "New repository secret"

   **Secret 1:**
   - Name: `VITE_API_URL`
   - Secret: `https://resilient-fulfillment-production-3915.up.railway.app/api`
   - Click "Add secret"

   **Secret 2:**
   - Click "New repository secret" again
   - Name: `VITE_WS_URL`
   - Secret: `wss://resilient-fulfillment-production-3915.up.railway.app`
   - Click "Add secret"

3. Verify both secrets are listed

---

### **Step 3: Rebuild Frontend**

**Easiest method:**
```bash
cd eaas-frontend
git commit --allow-empty -m "Rebuild with Railway backend"
git push origin main
```

This triggers GitHub Actions automatically.

**Or manually:**
- GitHub → Actions → Run workflow

---

### **Step 4: Test**

1. **Backend health check:**
   ```bash
   curl https://resilient-fulfillment-production-3915.up.railway.app/health
   ```

2. **Frontend test:**
   - Visit: `https://ecogetaway.github.io`
   - Login: `demo1@eaas.com` / `Demo@123`
   - Should see dashboard with energy data

---

## ✅ Success Checklist

After completing all steps:

- [ ] Railway Variables set (FRONTEND_URL, JWT_SECRET, etc.)
- [ ] GitHub Secrets set (VITE_API_URL, VITE_WS_URL)
- [ ] Frontend rebuilt and deployed
- [ ] Backend health check works
- [ ] Frontend login works
- [ ] Dashboard loads with data
- [ ] No CORS errors in browser console

---

## 🐛 Troubleshooting

**If frontend still shows localhost:**
- Verify GitHub Secrets are set correctly
- Check GitHub Actions logs to see if secrets were used
- Re-run the workflow

**If CORS errors:**
- Verify `FRONTEND_URL` is set to `https://ecogetaway.github.io` in Railway
- Redeploy backend after setting variable

**If login fails:**
- Check browser console for errors
- Verify backend is running (health check)
- Check Railway logs for errors

---

## 🎉 After All Steps Complete

Your full-stack EaaS platform will be live:
- ✅ Backend: Railway
- ✅ Database: Railway Postgres
- ✅ Frontend: GitHub Pages
- ✅ Real-time features: WebSocket via Railway

**Demo credentials:**
- demo1@eaas.com / Demo@123
- demo2@eaas.com / Demo@123
- (and demo3, demo4, demo5)

---

## 📞 Need Help?

If you get stuck on any step:
1. Tell me which step number
2. Share any error messages
3. I'll help you fix it!

