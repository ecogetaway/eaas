# 🔧 Fix Railway Build Error - Step by Step

## ❌ Current Error
Railway shows: **"Railpack could not determine how to build the app"**

This happens because Railway can't detect your Node.js project when it's in a subfolder.

---

## ✅ SOLUTION - 3 Steps

### **STEP 1: Commit & Push Config Files** ⏱️ 30 seconds

```bash
cd eaas-backend
git add nixpacks.toml railway.toml
git commit -m "Add Railway build configuration"
git push origin main
```

These files tell Railway:
- ✅ This is a Node.js project
- ✅ Use Node.js 18
- ✅ Run `npm ci` to install
- ✅ Run `npm start` to start

---

### **STEP 2: Update Railway Settings** ⏱️ 1 minute

In Railway dashboard:

1. **Click on "eaas" service** (left sidebar)

2. **Click "Settings" tab** (top menu)

3. **Scroll to "Root Directory"** section
   - Set to: `eaas-backend`
   - This tells Railway where your code is
   
4. **Scroll to "Build Command"**
   - Leave it **EMPTY** (Railway will use `npm ci` from config)
   - OR set to: `npm ci`
   
5. **Scroll to "Start Command"**
   - Should be: `npm start`
   - (Railway should detect this automatically)

---

### **STEP 3: Redeploy** ⏱️ 2 minutes

**Option A: Automatic (Recommended)**
- Railway will auto-redeploy when you push
- Go to "Deployments" tab
- Watch for new deployment

**Option B: Manual**
- Click "Deployments" tab
- Click "..." (three dots) next to latest deployment
- Click "Redeploy"

---

## 🔍 Verification

After redeploy, check:

✅ **Build Logs show:**
```
Detecting Node.js
Installing dependencies (npm ci)
Build succeeded
```

✅ **Deploy Logs show:**
```
Starting application...
node src/server.js
```

✅ **Service status:**
- Changes from "Failed" → "Building" → "Active" ✅

---

## 🐛 If Still Failing

**Check 1: Root Directory**
- Must be exactly: `eaas-backend` (no trailing slash, no leading slash)
- Case-sensitive!

**Check 2: Config Files Exist**
Verify these files are in your repo:
```
eaas-backend/
  ├── nixpacks.toml ✅
  ├── railway.toml ✅
  ├── package.json ✅
  └── src/server.js ✅
```

**Check 3: Package.json Scripts**
Open `package.json` and verify:
```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

**Check 4: Manual Override**
If nothing works, try in Railway Settings:
- **Build Command:** `cd eaas-backend && npm ci`
- **Start Command:** `cd eaas-backend && npm start`

---

## 📋 Quick Reference

**Files Created:**
- ✅ `nixpacks.toml` - Build configuration
- ✅ `railway.toml` - Railway settings

**What They Do:**
- Tell Railway this is Node.js
- Specify Node.js 18
- Use `npm ci` for install
- Use `npm start` to run

**Next After Build Success:**
1. Set environment variables (FRONTEND_URL, JWT_SECRET)
2. Add PostgreSQL database
3. Run migrations
4. Get backend URL

---

## 💡 Railway Tips

- Railway reads config files automatically
- Root Directory is critical for subfolder projects
- Build usually takes 1-2 minutes
- Check logs if anything fails

---

## ✅ Success Checklist

- [ ] Config files committed and pushed
- [ ] Railway Root Directory set to `eaas-backend`
- [ ] New deployment triggered
- [ ] Build succeeds (check build logs)
- [ ] Deploy succeeds (check deploy logs)
- [ ] Service shows "Active" ✅

