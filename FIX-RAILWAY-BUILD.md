# 🔧 Fix Railway Build Errors

## Problem
Railway shows: "Railpack could not determine how to build the app"

## Solution

Railway needs explicit configuration since your backend is in a subfolder. I've created the necessary config files.

---

## ✅ What I Fixed

1. **Created `nixpacks.toml`** - Explicit build configuration
2. **Created `railway.toml`** - Railway deployment config
3. **Verified `package.json`** - Start script is correct

---

## 🚀 Steps to Fix

### Step 1: Commit the New Config Files

```bash
cd eaas-backend
git add nixpacks.toml railway.toml
git commit -m "Add Railway build configuration files"
git push origin main
```

### Step 2: Verify Railway Service Settings

In Railway dashboard:

1. **Click on your "eaas" service**
2. **Go to "Settings" tab**
3. **Check "Root Directory":**
   - Should be: `eaas-backend` (if your repo root is `/` and backend is in subfolder)
   - OR: leave blank if Railway is already pointing to the right folder
   
4. **Check "Build Command":**
   - Leave empty (Railway will use npm ci from nixpacks.toml)
   - OR: `npm install` if needed

5. **Check "Start Command":**
   - Should be: `npm start`
   - Railway should detect this from package.json

### Step 3: Redeploy

Railway should automatically redeploy when you push. If not:

1. **Click "Deployments" tab**
2. **Click "Redeploy"** (three dots menu)
3. **Or trigger a new deploy** by pushing any change

---

## 📋 Alternative: Manual Railway Config

If Railway still doesn't detect, set these manually in Railway Settings:

1. **Go to Service Settings → Variables tab**
2. **Add these if not present:**
   - `NIXPACKS_BUILD_CMD` = `npm ci`
   - `NIXPACKS_START_CMD` = `npm start`

---

## 🔍 Verify Configuration

Your files should look like this:

**nixpacks.toml:**
```toml
[phases.setup]
nixPkgs = ["nodejs-18_x", "npm-9_x"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = []

[start]
cmd = "npm start"
```

**railway.toml:**
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
```

**package.json:**
```json
{
  "scripts": {
    "start": "node src/server.js"
  }
}
```

---

## 🐛 Still Failing?

If Railway still fails:

1. **Check Railway Settings:**
   - Go to Settings → General
   - Verify "Root Directory" = `eaas-backend` (without leading slash)
   
2. **Check Build Logs:**
   - Look for specific error messages
   - Verify Node.js version is detected
   - Check if npm install runs

3. **Try Manual Configuration:**
   - In Railway Settings → Build & Deploy:
     - Build Command: `npm ci`
     - Start Command: `npm start`

4. **Common Issues:**
   - Wrong root directory
   - Package.json not found
   - Node version mismatch
   - Missing environment variables

---

## ✅ Success Indicators

When build succeeds, you should see:
- ✅ "Build Succeeded" 
- ✅ npm install/ci completes
- ✅ Deploy starts
- ✅ Service becomes "Active"

---

## 📞 Next Steps After Build Succeeds

1. Set environment variables (FRONTEND_URL, JWT_SECRET, etc.)
2. Add PostgreSQL database
3. Run migrations
4. Test backend URL

