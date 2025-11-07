# ✅ Next Steps After Successful Railway Deployment

Congratulations! Your backend is deployed successfully. Now let's complete the setup.

---

## 🎯 Current Status

✅ Backend deployed to Railway  
✅ Service is "Active"  
⏭️ Next: Configure environment variables, database, and frontend

---

## 📋 Steps to Complete (15 minutes total)

### **STEP 1: Get Your Backend URL** ⏱️ 30 seconds

1. In Railway dashboard, click on **"resilient-fulfillment"** service
2. Click **"Settings"** tab
3. Scroll to **"Networking"** section
4. Find your **Public Domain** - it should look like:
   - `https://resilient-fulfillment-production.up.railway.app`
   - or `https://resilient-fulfillment.railway.app`
5. **Copy this URL** - you'll need it for frontend configuration

**Test it:**
```bash
curl https://your-backend-url.railway.app/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

### **STEP 2: Set Environment Variables** ⏱️ 2 minutes

In Railway dashboard, click on your service → **"Variables"** tab → Click **"+ New Variable"**:

Add these variables one by one:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `FRONTEND_URL` | `https://ecogetaway.github.io` | Critical for CORS |
| `NODE_ENV` | `production` | |
| `PORT` | `5000` | Railway usually sets this automatically |
| `JWT_SECRET` | `[generate random]` | See below |
| `JWT_EXPIRE` | `7d` | Token expiration |

**Generate JWT_SECRET:**
```bash
openssl rand -hex 32
```
Copy the output and use it as `JWT_SECRET` value.

**Important:** Railway will automatically redeploy when you add variables (auto-save).

---

### **STEP 3: Add PostgreSQL Database** ⏱️ 1 minute

1. In your Railway project, click **"+ New"** (top left or in project view)
2. Click **"Database"** → **"Add PostgreSQL"**
3. Railway creates it automatically
4. Railway automatically links it to your backend (creates `DATABASE_URL` variable)
5. Verify: Go to your service → Variables tab → Should see `DATABASE_URL`

---

### **STEP 4: Run Database Migrations** ⏱️ 2 minutes

**Option A: Using Railway CLI (Recommended)**

```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login to Railway
railway login
# This opens browser - authorize it

# Link to your project
cd eaas-backend
railway link
# Select your project when prompted

# Run migrations
railway run npm run migrate

# Seed database (adds demo data)
railway run npm run seed
```

**Option B: Direct Connection**

1. In Railway → PostgreSQL service → **"Connect"** or **"Variables"** tab
2. Copy the `DATABASE_URL` 
3. Run locally:
```bash
cd eaas-backend
export DATABASE_URL="postgresql://..."
npm run migrate
npm run seed
```

---

### **STEP 5: Verify Backend is Working** ⏱️ 1 minute

**Test Health Endpoint:**
```bash
curl https://your-backend-url.railway.app/health
# Should return: {"status":"ok",...}
```

**Test API Endpoint:**
```bash
curl https://your-backend-url.railway.app/api/subscriptions/plans
# Should return list of plans (or empty array if no data)
```

**Check Logs:**
- Railway dashboard → Your service → **"Logs"** tab
- Should see: "Server running on port..." or similar

---

### **STEP 6: Configure GitHub Secrets for Frontend** ⏱️ 2 minutes

1. **Go to GitHub:** https://github.com/ecogetaway/eaas
2. Click **"Settings"** (top menu)
3. Click **"Secrets and variables"** → **"Actions"**
4. Click **"New repository secret"**

**Add Secret #1:**
- **Name:** `VITE_API_URL`
- **Value:** `https://your-backend-url.railway.app/api`
  - Replace `your-backend-url.railway.app` with your actual Railway URL from Step 1
- Click **"Add secret"**

**Add Secret #2:**
- **Name:** `VITE_WS_URL`
- **Value:** `wss://your-backend-url.railway.app`
  - Same URL as above, but with `wss://` instead of `https://`
  - Important: Use `wss://` (WebSocket Secure), not `ws://`
- Click **"Add secret"**

---

### **STEP 7: Trigger Frontend Rebuild** ⏱️ 2 minutes

**Option A: Automatic (if workflow exists)**
- Just push any change to trigger rebuild
- Or go to Actions tab → Select workflow → Click "Run workflow"

**Option B: Manual Trigger**
```bash
cd eaas-frontend
# Make a small change to trigger rebuild
git commit --allow-empty -m "Trigger rebuild with new backend URL"
git push origin main
```

**Check GitHub Actions:**
- Go to your repo → **"Actions"** tab
- Watch the workflow run
- Verify it uses your secrets (check build logs)
- Wait for deployment (2-3 minutes)

---

### **STEP 8: Enable GitHub Pages** ⏱️ 30 seconds

1. Repository → **Settings** → **Pages**
2. Under **"Source"**, select **"GitHub Actions"**
3. If already set, verify deployment completed
4. Your site: `https://ecogetaway.github.io`

---

### **STEP 9: Test Everything** ⏱️ 2 minutes

1. **Visit Frontend:**
   - Go to: `https://ecogetaway.github.io`
   
2. **Open Browser Console:**
   - Press F12 or Cmd+Option+I
   - Go to **"Network"** tab
   
3. **Try to Login:**
   - Use demo credentials: `demo1@eaas.com` / `Demo@123`
   
4. **Verify:**
   - ✅ No CORS errors in console
   - ✅ Network requests go to your Railway URL (not localhost)
   - ✅ Requests succeed (status 200 or 401, not errors)
   - ✅ Login works or shows appropriate error (not network error)

---

## ✅ Completion Checklist

Backend:
- [ ] Backend URL retrieved from Railway
- [ ] Environment variables set (FRONTEND_URL, JWT_SECRET, etc.)
- [ ] PostgreSQL database added
- [ ] Database migrations run successfully
- [ ] Database seeded (demo data)
- [ ] Backend health endpoint works

Frontend:
- [ ] GitHub Secrets configured (VITE_API_URL, VITE_WS_URL)
- [ ] GitHub Actions workflow ran successfully
- [ ] Frontend rebuilt with correct backend URL
- [ ] GitHub Pages deployed

Testing:
- [ ] Frontend loads at `https://ecogetaway.github.io`
- [ ] No CORS errors
- [ ] API requests go to Railway backend
- [ ] Login works (or shows proper authentication errors)

---

## 🐛 Troubleshooting

**Backend not responding?**
- Check Railway logs: Service → Logs tab
- Verify PORT is correct (5000)
- Check if service is "Active" (not sleeping)

**Database errors?**
- Verify PostgreSQL is running
- Check DATABASE_URL exists in Variables
- Run migrations again if needed

**Frontend still shows localhost?**
- Verify GitHub Secrets are set
- Check GitHub Actions logs
- Re-run workflow manually

**CORS errors?**
- Verify `FRONTEND_URL` is set to `https://ecogetaway.github.io`
- Redeploy backend after setting variable

---

## 🎉 Success!

When everything is complete:
- ✅ Backend: `https://your-backend-url.railway.app`
- ✅ Frontend: `https://ecogetaway.github.io`
- ✅ Connected and working!

---

## 📞 Quick Reference

**Railway Backend URL:**
- Find in: Service → Settings → Networking

**Test Backend:**
```bash
curl https://your-backend-url.railway.app/health
```

**Run Migrations:**
```bash
railway run npm run migrate
railway run npm run seed
```

**GitHub Secrets:**
- Settings → Secrets and variables → Actions
- Add: `VITE_API_URL` and `VITE_WS_URL`

