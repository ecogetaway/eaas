# 🔍 How to Get Railway Postgres DATABASE_URL

## ✅ Two Ways to Get It

### **Method 1: From Railway Dashboard (Easiest)**

1. **Go to Railway:** https://railway.app
2. **Click "Postgres" service** (top right card with elephant icon)
3. **Click "Variables" tab** (top menu)
4. **Find `DATABASE_URL`** in the list
5. **Click the eye icon (👁️)** to reveal the value
6. **Click the copy icon** to copy it

**The URL will look like:**
```
postgresql://postgres:password@shortline.proxy.rlwy.net:44908/railway
```

OR:

```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

---

### **Method 2: Use Railway CLI**

```bash
cd eaas-backend

# Get all variables (shows DATABASE_URL)
railway variables

# Or get JSON format
railway variables --json | grep DATABASE_URL
```

---

## 🎯 What You'll See

Railway has **two** DATABASE_URL variables:

1. **`DATABASE_URL`** - Internal URL (only works inside Railway)
   - Format: `postgresql://postgres:password@postgres.railway.internal:5432/railway`
   - **Use this for Railway deployment** ✅

2. **`DATABASE_PUBLIC_URL`** - Public URL (works from anywhere)
   - Format: `postgresql://postgres:password@shortline.proxy.rlwy.net:44908/railway`
   - **Use this for local development** ✅

---

## 💡 Best Practice: Use Reference Variable

**Instead of copying the URL manually, use Railway's reference variable:**

1. **Go to Railway** → **resilient-fulfillment** service → **Variables**
2. **Click "+ New Variable"**
3. **Click "Reference Variable"** (or "Link Variable")
4. **Select "Postgres" service**
5. **Select `DATABASE_URL`**
6. **Save**

**This creates:** `DATABASE_URL=${{Postgres.DATABASE_URL}}`

**Why this is better:**
- ✅ Railway automatically resolves it
- ✅ Updates automatically if Postgres URL changes
- ✅ No need to copy/paste URLs
- ✅ Less chance of errors

---

## 🔧 If You Need the Actual Value

**For Railway deployment:**
- Use reference variable: `${{Postgres.DATABASE_URL}}` ✅ (Recommended)

**For local development:**
- Use `DATABASE_PUBLIC_URL` from Postgres service
- Or get it via: `railway variables --json | grep DATABASE_PUBLIC_URL`

---

## 📋 Quick Steps Right Now

1. **Go to Railway:** https://railway.app
2. **Click "Postgres" service** → **Variables tab**
3. **Find `DATABASE_URL`** → Click eye icon → Copy
4. **OR use reference variable** (better option)

---

## 🎯 What to Do

**Option A: Use Reference Variable (Recommended)**
- Railway → resilient-fulfillment → Variables
- Add reference to Postgres.DATABASE_URL
- Railway handles it automatically ✅

**Option B: Copy Actual URL**
- Railway → Postgres → Variables → Copy DATABASE_URL
- Paste in resilient-fulfillment → Variables
- Works but requires manual updates ❌

**I recommend Option A!** It's cleaner and more reliable.

