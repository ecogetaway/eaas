# 🔧 Fix Database Connection Error

## ❌ Error You're Seeing

```
Error: getaddrinfo ENOTFOUND postgres.railway.internal
```

**What this means:** Railway CLI is trying to use an internal hostname that doesn't work locally.

---

## ✅ SOLUTION: Get DATABASE_URL from Railway

### **Method 1: Get from Railway Dashboard (Easiest)**

1. **Go to Railway:** https://railway.app
2. **Click on "Postgres" service** (top right card)
3. **Click "Variables" tab**
4. **Find `DATABASE_URL`** or `POSTGRES_URL`
5. **Copy the entire connection string** (starts with `postgresql://...`)

### **Method 2: Get from Backend Service**

1. **Click on "resilient-fulfillment" service**
2. **Click "Variables" tab**
3. **Look for `DATABASE_URL`**
4. **If it exists, copy it**
5. **If it doesn't exist, you need to link it first** (see below)

---

## 🔗 Step 1: Link Database in Railway Dashboard

### **If DATABASE_URL doesn't exist in backend service:**

1. **Click "resilient-fulfillment" service** → **Variables tab**
2. **Click "+ New Variable"**
3. **Look for "Reference Variable" or "Connect" button**
4. **Select "Postgres" service**
5. **Select `DATABASE_URL` variable**
6. **Save**

**OR manually:**

1. **Click "Postgres" service** → **Variables tab**
2. **Copy the `DATABASE_URL` value**
3. **Go to "resilient-fulfillment"** → **Variables tab**
4. **Click "+ New Variable"**
5. **Name:** `DATABASE_URL`
6. **Value:** Paste the connection string
7. **Save**

---

## 🚀 Step 2: Run Migrations with DATABASE_URL

### **Option A: Use Railway's DATABASE_URL (Recommended)**

After linking DATABASE_URL in Railway:

```bash
cd eaas-backend

# Railway will automatically inject DATABASE_URL
railway run npm run migrate
railway run npm run seed
```

### **Option B: Use DATABASE_URL Manually**

If Railway CLI still doesn't work:

1. **Get DATABASE_URL from Railway** (see Method 1 above)
2. **Run migrations locally:**

```bash
cd eaas-backend

# Set DATABASE_URL temporarily
export DATABASE_URL="postgresql://user:password@host:port/database"
# Replace with your actual DATABASE_URL from Railway

# Run migrations
npm run migrate

# Seed database
npm run seed
```

---

## 🔍 Step 3: Verify DATABASE_URL Format

Your DATABASE_URL should look like:

```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

**NOT:**
```
postgresql://postgres:password@postgres.railway.internal:5432/railway
```

The `.railway.internal` hostname only works inside Railway's network, not locally.

---

## ✅ Quick Fix Steps

1. **Get DATABASE_URL from Railway:**
   - Postgres service → Variables → Copy `DATABASE_URL`

2. **Link it to backend service:**
   - resilient-fulfillment → Variables → Add `DATABASE_URL`

3. **Run migrations:**
   ```bash
   cd eaas-backend
   railway run npm run migrate
   railway run npm run seed
   ```

---

## 🐛 If Still Failing

**Try running migrations directly with the connection string:**

```bash
cd eaas-backend

# Get DATABASE_URL from Railway dashboard first, then:
export DATABASE_URL="your-actual-connection-string-here"

npm run migrate
npm run seed
```

---

## 📋 Checklist

- [ ] DATABASE_URL exists in Postgres service Variables
- [ ] DATABASE_URL is linked to resilient-fulfillment service
- [ ] DATABASE_URL uses public hostname (not .railway.internal)
- [ ] Railway CLI is linked: `railway link`
- [ ] Migrations run successfully

