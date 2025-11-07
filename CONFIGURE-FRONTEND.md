# 🔗 Configure Frontend with Your Railway Backend

## ✅ Your Backend URL

**Backend URL:** `https://resilient-fulfillment-production-3915.up.railway.app`

---

## 🚀 Next Steps

### **STEP 1: Test Your Backend** ⏱️ 30 seconds

Test that your backend is working:

```bash
curl https://resilient-fulfillment-production-3915.up.railway.app/health
```

Should return: `{"status":"ok","timestamp":"..."}`

---

### **STEP 2: Set Railway Environment Variables** ⏱️ 2 minutes

In Railway dashboard → Your service → **Variables** tab → Add:

| Variable | Value |
|----------|-------|
| `FRONTEND_URL` | `https://ecogetaway.github.io` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Generate with: `openssl rand -hex 32` |
| `JWT_EXPIRE` | `7d` |

**Generate JWT_SECRET:**
```bash
openssl rand -hex 32
```
Copy the output and paste as `JWT_SECRET` value.

---

### **STEP 3: Add PostgreSQL Database** ⏱️ 1 minute

1. In Railway project, click **"+ New"**
2. Click **"Database"** → **"Add PostgreSQL"**
3. Railway creates it automatically
4. Railway automatically links it (creates `DATABASE_URL`)

---

### **STEP 4: Run Database Migrations** ⏱️ 2 minutes

```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Login
railway login

# Link to project
cd eaas-backend
railway link
# Select your project when prompted

# Run migrations
railway run npm run migrate

# Seed database
railway run npm run seed
```

---

### **STEP 5: Configure GitHub Secrets** ⏱️ 2 minutes

**This is critical for your frontend to connect!**

1. **Go to GitHub:** https://github.com/ecogetaway/eaas
2. **Settings** → **Secrets and variables** → **Actions**
3. **Click "New repository secret"**

**Add Secret #1:**
- **Name:** `VITE_API_URL`
- **Value:** `https://resilient-fulfillment-production-3915.up.railway.app/api`
- Click **"Add secret"**

**Add Secret #2:**
- **Name:** `VITE_WS_URL`
- **Value:** `wss://resilient-fulfillment-production-3915.up.railway.app`
- Click **"Add secret"**

**Important:** Use `wss://` (WebSocket Secure), not `ws://`

---

### **STEP 6: Trigger Frontend Rebuild** ⏱️ 2 minutes

**Option A: Push a commit**
```bash
cd eaas-frontend
git commit --allow-empty -m "Trigger rebuild with Railway backend URL"
git push origin main
```

**Option B: Manual trigger**
- Go to GitHub → **Actions** tab
- Select your workflow
- Click **"Run workflow"** → **"Run workflow"**

**Option C: Wait for auto-deploy**
- If workflow triggers on push, it will run automatically

---

### **STEP 7: Verify Frontend Deployment** ⏱️ 1 minute

1. Go to GitHub → **Actions** tab
2. Watch the workflow run
3. Check build logs - should show:
   - ✅ Using `VITE_API_URL` from secrets
   - ✅ Building successfully
   - ✅ Deploying to Pages

---

### **STEP 8: Test Everything** ⏱️ 2 minutes

1. **Visit:** `https://ecogetaway.github.io`
2. **Open browser console:** F12 or Cmd+Option+I
3. **Go to Network tab**
4. **Try to login:** `demo1@eaas.com` / `Demo@123`
5. **Verify:**
   - ✅ Requests go to: `resilient-fulfillment-production-3915.up.railway.app`
   - ✅ No CORS errors
   - ✅ No "Network Error" messages
   - ✅ Login works (or shows proper auth errors)

---

## ✅ Quick Checklist

- [ ] Backend URL: `https://resilient-fulfillment-production-3915.up.railway.app`
- [ ] Backend health check works
- [ ] Railway environment variables set (FRONTEND_URL, JWT_SECRET)
- [ ] PostgreSQL database added
- [ ] Database migrations run
- [ ] GitHub Secrets configured (VITE_API_URL, VITE_WS_URL)
- [ ] Frontend rebuilt with new backend URL
- [ ] Frontend deployed to GitHub Pages
- [ ] Test: Login works on production site

---

## 🐛 Troubleshooting

**Backend not responding?**
```bash
# Test health endpoint
curl https://resilient-fulfillment-production-3915.up.railway.app/health

# Check Railway logs
# Railway dashboard → Service → Logs tab
```

**Frontend still shows localhost?**
- Verify GitHub Secrets are set correctly
- Check GitHub Actions logs
- Re-run workflow manually

**CORS errors?**
- Verify `FRONTEND_URL` is set in Railway
- Redeploy backend after setting variable

---

## 📋 Your URLs

**Backend:** `https://resilient-fulfillment-production-3915.up.railway.app`  
**Frontend:** `https://ecogetaway.github.io`

**API Endpoint:** `https://resilient-fulfillment-production-3915.up.railway.app/api`  
**WebSocket:** `wss://resilient-fulfillment-production-3915.up.railway.app`

---

## 🎉 Almost There!

Once you complete these steps, your full-stack app will be live and connected!

