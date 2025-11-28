# Fix Railway Build Error: "Error creating build plan with Railpack"

## Problem
Railway is trying to build from the root directory (`eaas`) instead of `eaas-backend`, causing the build to fail.

## Solution: Set Root Directory in Railway Dashboard

### Step-by-Step:

1. **Go to Railway Dashboard**
   - Visit: https://railway.app
   - Navigate to: `outstanding-energy` → `production` → **`eaas`** service

2. **Open Settings**
   - Click on the **"Settings"** tab (at the top)

3. **Find Root Directory Setting**
   - Scroll down to find **"Root Directory"** or **"Source"** section
   - Look for a field that says "Root Directory" or "Working Directory"

4. **Set Root Directory**
   - Enter: `eaas-backend`
   - Click **"Save"** or **"Update"**

5. **Redeploy**
   - Railway should automatically trigger a new deployment
   - OR go to **"Deployments"** tab → Click **"Redeploy"**

6. **Wait for Build**
   - Wait 2-3 minutes for the build to complete
   - Check that it succeeds

---

## Alternative: Check Service Configuration

If you don't see "Root Directory" in Settings:

1. **Check Service Source**
   - In Settings, look for **"Source"** or **"Repository"**
   - Make sure it's connected to your GitHub repo

2. **Check Build Settings**
   - Look for **"Build Command"** or **"Build Settings"**
   - Should be empty (Railway will auto-detect from `package.json`)

3. **Check Start Command**
   - Should be: `npm start`
   - Or leave empty (Railway will use `package.json` scripts)

---

## Verify Configuration

After setting root directory, Railway should:
- ✅ Find `package.json` in `eaas-backend/`
- ✅ Run `npm install` in `eaas-backend/`
- ✅ Run `npm start` from `eaas-backend/`
- ✅ Use `nixpacks.toml` from `eaas-backend/`

---

## If Root Directory Setting is Missing

Some Railway projects don't show this option. In that case:

1. **Create a new service** (if possible):
   - Delete the current `eaas` service
   - Create a new service
   - Connect to the same GitHub repo
   - Set root directory to `eaas-backend` during creation

2. **Or use Railway CLI**:
   ```bash
   railway service
   # Select eaas service
   railway variables set RAILWAY_ROOT_DIRECTORY=eaas-backend
   ```

3. **Or contact Railway support** if the option is not available

---

## Expected Result

After setting root directory:
- ✅ Build should find `package.json`
- ✅ Dependencies install correctly
- ✅ Server starts successfully
- ✅ Deployment shows "Active" status

---

## Quick Checklist

- [ ] Root Directory set to `eaas-backend` in Railway Settings
- [ ] DATABASE_URL variable is set (for Supabase)
- [ ] Service is redeployed
- [ ] Build completes successfully
- [ ] Service shows "Active" status

