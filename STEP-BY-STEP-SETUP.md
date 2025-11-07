# 📝 Step-by-Step Setup Guide

Follow these steps **one at a time**. Don't move to the next step until the current one is complete.

---

## ✅ STEP 1: Set GitHub Secrets (5 minutes)

**What this does:** Tells your frontend where to find your backend.

### Step 1.1: Go to GitHub
1. Open: https://github.com/ecogetaway/eaas
2. Click **"Settings"** (top menu, far right)

### Step 1.2: Find Secrets Section
1. In left sidebar, click **"Secrets and variables"**
2. Click **"Actions"**

### Step 1.3: Add First Secret
1. Click **"New repository secret"** button (top right)
2. **Name:** Type exactly: `VITE_API_URL`
3. **Secret:** Type exactly: `https://resilient-fulfillment-production-3915.up.railway.app/api`
4. Click **"Add secret"**

### Step 1.4: Add Second Secret
1. Click **"New repository secret"** again
2. **Name:** Type exactly: `VITE_WS_URL`
3. **Secret:** Type exactly: `wss://resilient-fulfillment-production-3915.up.railway.app`
   - **Important:** Use `wss://` (with double 's'), not `ws://`
4. Click **"Add secret"**

### Step 1.5: Verify
You should now see 2 secrets listed:
- ✅ `VITE_API_URL`
- ✅ `VITE_WS_URL`

**✅ Step 1 Complete!** Move to Step 2.

---

## ✅ STEP 2: Set Railway Environment Variables (5 minutes)

**What this does:** Tells your backend to allow requests from your frontend.

### Step 2.1: Go to Railway
1. Open: https://railway.app
2. Click on your project (should be "friendly-passion")
3. Click on **"resilient-fulfillment"** service (left sidebar)

### Step 2.2: Open Variables Tab
1. Click **"Variables"** tab (top menu)

### Step 2.3: Generate JWT Secret
1. Open Terminal on your Mac
2. Type this command and press Enter:
   ```bash
   openssl rand -hex 32
   ```
3. **Copy the output** (it's a long random string)
4. Keep it handy - you'll paste it in Railway

### Step 2.4: Add Variables One by One

**Variable 1: FRONTEND_URL**
1. Click **"+ New Variable"** button
2. **Name:** Type: `FRONTEND_URL`
3. **Value:** Type: `https://ecogetaway.github.io`
4. Click **"Add"**

**Variable 2: NODE_ENV**
1. Click **"+ New Variable"** again
2. **Name:** Type: `NODE_ENV`
3. **Value:** Type: `production`
4. Click **"Add"**

**Variable 3: JWT_SECRET**
1. Click **"+ New Variable"** again
2. **Name:** Type: `JWT_SECRET`
3. **Value:** Paste the random string you copied from Terminal
4. Click **"Add"**

**Variable 4: JWT_EXPIRE**
1. Click **"+ New Variable"** again
2. **Name:** Type: `JWT_EXPIRE`
3. **Value:** Type: `7d`
4. Click **"Add"**

### Step 2.5: Verify
You should see these variables listed:
- ✅ `FRONTEND_URL`
- ✅ `NODE_ENV`
- ✅ `JWT_SECRET`
- ✅ `JWT_EXPIRE`
- ✅ `DATABASE_URL` (this appears automatically after Step 3)

**✅ Step 2 Complete!** Move to Step 3.

---

## ✅ STEP 3: Add PostgreSQL Database (2 minutes)

**What this does:** Creates a database to store your app data.

### Step 3.1: Add Database
1. In Railway, you should be in your project view
2. Click **"+ New"** button (top left or in project view)
3. Click **"Database"**
4. Click **"Add PostgreSQL"**

### Step 3.2: Wait for Creation
- Railway will create the database automatically
- Takes about 30 seconds
- You'll see a new service appear (usually named "Postgres")

### Step 3.3: Verify Connection
1. Click back on **"resilient-fulfillment"** service
2. Go to **"Variables"** tab
3. Look for `DATABASE_URL` - it should appear automatically
4. If you see it, Railway has linked the database ✅

**✅ Step 3 Complete!** Move to Step 4.

---

## ✅ STEP 4: Run Database Migrations (5 minutes)

**What this does:** Creates tables in your database.

### Step 4.1: Install Railway CLI
1. Open Terminal on your Mac
2. Type this command and press Enter:
   ```bash
   npm install -g @railway/cli
   ```
3. Wait for it to install (takes 1-2 minutes)

### Step 4.2: Login to Railway
1. In Terminal, type:
   ```bash
   railway login
   ```
2. Press Enter
3. Your browser will open automatically
4. Click **"Authorize"** or **"Allow"** in the browser
5. Come back to Terminal - it should say "Logged in successfully"

### Step 4.3: Link to Your Project
1. In Terminal, type:
   ```bash
   cd eaas-backend
   ```
2. Press Enter
3. Then type:
   ```bash
   railway link
   ```
4. Press Enter
5. You'll see a list of projects - select your project (probably "friendly-passion")
6. Press Enter

### Step 4.4: Run Migrations
1. In Terminal, type:
   ```bash
   railway run npm run migrate
   ```
2. Press Enter
3. Wait for it to complete (should say "All tables created successfully")

### Step 4.5: Seed Database (Add Demo Data)
1. In Terminal, type:
   ```bash
   railway run npm run seed
   ```
2. Press Enter
3. Wait for it to complete (should say "Database seeded successfully")

**✅ Step 4 Complete!** Move to Step 5.

---

## ✅ STEP 5: Trigger Frontend Rebuild (2 minutes)

**What this does:** Rebuilds your frontend with the new backend URL.

### Step 5.1: Go to GitHub Actions
1. Open: https://github.com/ecogetaway/eaas
2. Click **"Actions"** tab (top menu)

### Step 5.2: Trigger Workflow
**Option A: Manual Trigger**
1. Look for your workflow (probably "Deploy Frontend to GitHub Pages")
2. Click on it
3. Click **"Run workflow"** button (right side)
4. Click **"Run workflow"** again in the dropdown
5. Wait for it to run (2-3 minutes)

**Option B: Push a Commit**
1. Open Terminal
2. Type:
   ```bash
   cd eaas-frontend
   git commit --allow-empty -m "Rebuild with Railway backend"
   git push origin main
   ```
3. This will trigger the workflow automatically

### Step 5.3: Watch the Build
1. In GitHub Actions, click on the running workflow
2. Watch the logs
3. Look for:
   - ✅ "Build" step completes
   - ✅ "Deploy" step completes
   - ✅ Green checkmark appears

**✅ Step 5 Complete!** Move to Step 6.

---

## ✅ STEP 6: Test Everything (3 minutes)

**What this does:** Verifies everything is working.

### Step 6.1: Test Backend
1. Open Terminal
2. Type:
   ```bash
   curl https://resilient-fulfillment-production-3915.up.railway.app/health
   ```
3. Press Enter
4. Should return: `{"status":"ok","timestamp":"..."}`
5. If you see this, backend is working! ✅

### Step 6.2: Test Frontend
1. Open browser
2. Go to: `https://ecogetaway.github.io`
3. Open Developer Tools:
   - **Mac:** Press `Cmd + Option + I`
   - **Or:** Right-click → "Inspect"
4. Click **"Console"** tab
5. Click **"Network"** tab

### Step 6.3: Try to Login
1. On the website, try to login:
   - **Email:** `demo1@eaas.com`
   - **Password:** `Demo@123`
2. Click "Sign in"

### Step 6.4: Check What Happens
**In the Network tab, look for:**
- ✅ Requests going to: `resilient-fulfillment-production-3915.up.railway.app`
- ✅ Status codes: 200 (success) or 401 (auth required) - both are OK!
- ❌ NOT seeing: `localhost` or `Network Error` or CORS errors

**In the Console tab, look for:**
- ✅ No red error messages
- ✅ No CORS errors
- ❌ If you see errors, note what they say

**✅ Step 6 Complete!**

---

## 🎉 Success Checklist

Check each box as you complete:

- [ ] Step 1: GitHub Secrets added (VITE_API_URL, VITE_WS_URL)
- [ ] Step 2: Railway Variables added (FRONTEND_URL, JWT_SECRET, etc.)
- [ ] Step 3: PostgreSQL database added
- [ ] Step 4: Migrations run successfully
- [ ] Step 5: Frontend rebuilt and deployed
- [ ] Step 6: Test - Login works or shows proper errors (not network errors)

---

## 🐛 If Something Goes Wrong

**Problem: GitHub Secrets not working**
- Double-check the names are exactly: `VITE_API_URL` and `VITE_WS_URL`
- Make sure values start with `https://` and `wss://`
- Re-run the workflow after adding secrets

**Problem: Railway variables not saving**
- Make sure you click "Add" after typing each variable
- Check Variables tab to verify they're there
- Railway auto-redeploys when you add variables

**Problem: Database migrations fail**
- Make sure PostgreSQL service is running in Railway
- Check that `DATABASE_URL` exists in Variables
- Try running migrations again

**Problem: Frontend still shows localhost**
- Verify GitHub Secrets are set correctly
- Check GitHub Actions logs to see if secrets were used
- Re-run the workflow

**Problem: CORS errors**
- Verify `FRONTEND_URL` is set to `https://ecogetaway.github.io` in Railway
- Redeploy backend after setting variable

---

## 📞 Need Help?

If you get stuck on any step:
1. Tell me which step number you're on
2. Tell me what error message you see (if any)
3. I'll help you fix it!

---

## 🎯 Quick Reference

**Your Backend URL:**
```
https://resilient-fulfillment-production-3915.up.railway.app
```

**GitHub Secrets to Add:**
- `VITE_API_URL` = `https://resilient-fulfillment-production-3915.up.railway.app/api`
- `VITE_WS_URL` = `wss://resilient-fulfillment-production-3915.up.railway.app`

**Railway Variables to Add:**
- `FRONTEND_URL` = `https://ecogetaway.github.io`
- `JWT_SECRET` = (generate with `openssl rand -hex 32`)
- `NODE_ENV` = `production`
- `JWT_EXPIRE` = `7d`

