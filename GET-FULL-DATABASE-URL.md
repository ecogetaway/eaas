# 🔍 Get Full Railway DATABASE_URL

## Current Situation

Railway CLI shows `DATABASE_URL` but it's truncated. We need the **full connection string**.

---

## ✅ SOLUTION: Get Full DATABASE_URL

### **Method 1: From Railway Dashboard (Easiest)**

1. **Go to Railway:** https://railway.app
2. **Click "Postgres" service** (top right card with elephant icon)
3. **Click "Variables" tab**
4. **Find `DATABASE_URL`** in the list
5. **Click the eye icon (👁️)** or **copy icon** next to it
6. **Copy the ENTIRE connection string**

The full string should look like:
```
postgresql://postgres:longpassword@containers-us-west-123.railway.app:5432/railway
```

---

### **Method 2: Export from Railway CLI**

Try this command:

```bash
cd eaas-backend

# Get DATABASE_URL value
railway variables --output json | grep DATABASE_URL

# Or try:
railway run printenv DATABASE_URL
```

---

### **Method 3: Use Railway Run with Echo**

```bash
cd eaas-backend

# This should print the full DATABASE_URL
railway run node -e "console.log(process.env.DATABASE_URL)"
```

---

## 🚀 Once You Have the Full DATABASE_URL

**Update .env file:**

```bash
cd eaas-backend

# Edit .env file
# Replace the DATABASE_URL line with:
DATABASE_URL=postgresql://postgres:password@hostname.railway.app:5432/railway
# (Use your actual Railway URL)
```

**Then run migrations:**

```bash
npm run migrate
npm run seed
```

---

## 💡 Alternative: Use Railway Run (Should Work)

Railway CLI should inject DATABASE_URL automatically:

```bash
cd eaas-backend

# Make sure you're linked
railway link

# Run migrations (Railway injects DATABASE_URL automatically)
railway run npm run migrate
railway run npm run seed
```

---

## 📋 What to Do Right Now

**Option 1: Get from Railway Dashboard**
- Postgres service → Variables → Copy full DATABASE_URL
- Update .env file
- Run: `npm run migrate && npm run seed`

**Option 2: Try Railway Run Again**
- Make sure `railway link` is done
- Run: `railway run npm run migrate`
- If it works, great! If not, use Option 1

---

## 🔍 Quick Test

Try this to see if Railway can inject it:

```bash
cd eaas-backend
railway run node -e "console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')"
```

If it says "SET", then `railway run` should work. If "NOT SET", get the value from Railway dashboard.

