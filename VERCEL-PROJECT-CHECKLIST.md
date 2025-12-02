# 🔍 Vercel Project Configuration Checklist

## Current Projects
You have **3 Vercel projects** pointing to the same repository:
- `eaasp` → `https://eaasp.vercel.app`
- `eaasp1` → `https://eaasp1.vercel.app`
- `eaas-snowy` → `https://eaas-snowy.vercel.app`

---

## ✅ Step 1: Check Each Project's Configuration

### For EACH project, verify these settings:

#### **A. Root Directory** ⚠️ **CRITICAL**
1. Go to Vercel Dashboard → Select Project
2. Click **"Settings"** tab
3. Scroll to **"General"** section
4. Check **"Root Directory"**
   - ✅ Should be: `eaas-frontend`
   - ❌ If blank or wrong: Click "Edit" → Set to `eaas-frontend` → Save

#### **B. Framework Preset**
1. Same Settings page → **"General"** section
2. Check **"Framework Preset"**
   - ✅ Should be: `Vite`
   - ❌ If wrong: Select "Vite" from dropdown

#### **C. Build & Output Settings**
1. Same Settings page → **"Build & Development Settings"**
2. Verify:
   - **Build Command**: `npm run build` (or auto-detected)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or auto-detected)

#### **D. Environment Variables** ⚠️ **IMPORTANT**
1. Same Settings page → **"Environment Variables"** section
2. Check for these variables:

   **Required Variables:**
   ```
   VITE_API_URL = https://your-railway-backend-url.up.railway.app/api
   VITE_WS_URL = wss://your-railway-backend-url.up.railway.app
   ```

   **For all environments:**
   - ✅ Production
   - ✅ Preview
   - ✅ Development

   **If missing:**
   - Click "Add New"
   - Add each variable
   - Check all three environment boxes
   - Save

---

## 🧪 Step 2: Test Each Deployment

### Manual Testing Checklist

Visit each URL and test:

#### **1. Homepage/Landing Page**
- [ ] Page loads without errors
- [ ] No blank white screen
- [ ] Navigation menu visible

#### **2. Services & Plans Page** (`/services-plans`)
- [ ] INR pricing displays correctly
- [ ] Grid Electricity shows ₹7/kWh
- [ ] All plans show INR ranges (₹1,500-2,000, etc.)
- [ ] Pricing examples visible
- [ ] No console errors

#### **3. DISCOM Page** (`/discom`)
- [ ] Login works (`demo@eaas.com` / `demo123`)
- [ ] DISCOM page loads
- [ ] Application status displays
- [ ] Real-time consumption tracking (if status = grid_connected)
- [ ] No console errors

#### **4. Dashboard** (`/dashboard`)
- [ ] Dashboard loads after login
- [ ] Energy metrics display
- [ ] Navigation works

---

## 📊 Step 3: Compare Results

### Create a comparison table:

| Project | Root Dir | Env Vars | Homepage | Pricing | DISCOM | Status |
|---------|----------|----------|----------|---------|--------|--------|
| eaasp   | ?        | ?        | ✅/❌    | ✅/❌    | ✅/❌   | ?      |
| eaasp1  | ?        | ?        | ✅/❌    | ✅/❌    | ✅/❌   | ?      |
| eaas-snowy | ?     | ?        | ✅/❌    | ✅/❌    | ✅/❌   | ?      |

---

## 🎯 Step 4: Choose Your Primary Project

### Decision Criteria (in order of importance):

1. **✅ Correct Configuration**
   - Root directory = `eaas-frontend`
   - Environment variables set correctly
   - Build settings correct

2. **✅ Working Features**
   - All pages load correctly
   - INR pricing displays
   - DISCOM features work
   - No console errors

3. **✅ Best URL**
   - Shortest/most memorable
   - Professional name
   - Easy to share

### Recommendation:
- **Primary:** `eaasp1` (if working correctly)
- **Backup:** Keep one other as backup
- **Delete:** Remove the third one

---

## 🗑️ Step 5: Clean Up Duplicate Projects

### In Vercel Dashboard:

1. **For projects you want to DELETE:**
   - Go to project → **Settings** → Scroll to bottom
   - Click **"Delete Project"**
   - Type project name to confirm
   - Click **"Delete"**

2. **For projects you want to ARCHIVE:**
   - Go to project → **Settings** → Scroll to bottom
   - Click **"Archive Project"**
   - Confirm

---

## 🔧 Step 6: Set Up Custom Domain (Optional)

### If you want a custom domain:

1. Go to your **primary project** → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `eaas.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 📝 Quick Test Script

Run this command to test all URLs:

```bash
./test-vercel-deployments.sh
```

Or manually test:

```bash
curl -I https://eaasp.vercel.app
curl -I https://eaasp1.vercel.app
curl -I https://eaas-snowy.vercel.app
```

---

## ✅ Final Checklist

Before sharing with users:

- [ ] One primary project selected
- [ ] Root directory = `eaas-frontend`
- [ ] Environment variables configured
- [ ] All features tested and working
- [ ] INR pricing displays correctly
- [ ] DISCOM page works
- [ ] No console errors
- [ ] Duplicate projects archived/deleted
- [ ] Primary URL documented

---

## 🎉 After Setup

**Share this URL with users:**
```
https://[your-primary-project].vercel.app
```

**Demo Credentials:**
- Email: `demo@eaas.com`
- Password: `demo123`

---

## Need Help?

If you find issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check browser console for errors
4. Verify Railway backend is running

