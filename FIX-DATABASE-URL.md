# 🔧 Fix DATABASE_URL Error

## ❌ Error You're Seeing

```
TypeError: Cannot read properties of undefined (reading 'searchParams')
```

**What this means:** `DATABASE_URL` is not set or is empty.

---

## ✅ SOLUTION: Set DATABASE_URL

### **Step 1: Get DATABASE_URL from Railway**

1. **Go to Railway:** https://railway.app
2. **Click "Postgres" service** (top right card)
3. **Click "Variables" tab**
4. **Find `DATABASE_URL`** - it should look like:
   ```
   postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```
5. **Copy the ENTIRE string**

---

### **Step 2: Set DATABASE_URL in Terminal**

**Option A: Set Temporarily (For This Session)**

```bash
cd eaas-backend

# Replace with your actual DATABASE_URL from Railway
export DATABASE_URL="postgresql://postgres:password@hostname.railway.app:5432/railway"

# Verify it's set
echo $DATABASE_URL

# Now run migrations
npm run migrate
npm run seed
```

**Option B: Create .env File (Permanent)**

```bash
cd eaas-backend

# Create .env file
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:password@hostname.railway.app:5432/railway
EOF

# Replace the DATABASE_URL above with your actual one from Railway

# Now run migrations
npm run migrate
npm run seed
```

---

### **Step 3: Verify DATABASE_URL Format**

Your DATABASE_URL should:
- ✅ Start with `postgresql://`
- ✅ Include username:password
- ✅ Include hostname (like `xxx.railway.app`)
- ✅ Include port `:5432`
- ✅ Include database name `/railway` or `/postgres`

**Example:**
```
postgresql://postgres:abc123@containers-us-west-123.railway.app:5432/railway
```

---

## 🚀 Quick Fix Commands

**Get DATABASE_URL from Railway, then:**

```bash
cd eaas-backend

# Set it (replace with your actual URL)
export DATABASE_URL="your-actual-database-url-here"

# Verify
echo $DATABASE_URL

# Run migrations
npm run migrate
npm run seed
```

---

## 🔍 How to Get DATABASE_URL from Railway

### **Method 1: From Postgres Service**

1. Railway → **Postgres** service → **Variables** tab
2. Look for `DATABASE_URL` or `POSTGRES_URL`
3. Click the **eye icon** or **copy icon** to reveal/copy it
4. Copy the entire string

### **Method 2: From Backend Service**

1. Railway → **resilient-fulfillment** service → **Variables** tab
2. If `DATABASE_URL` exists there, copy it
3. If not, you need to link it first (see below)

---

## 🔗 Link DATABASE_URL in Railway (If Not Linked)

1. **Click "resilient-fulfillment"** service
2. **Variables** tab → **"+ New Variable"**
3. **Look for "Reference Variable"** button
4. **Select "Postgres"** → **Select `DATABASE_URL`**
5. **Save**

**OR manually:**

1. **Get DATABASE_URL from Postgres** (Method 1 above)
2. **Go to resilient-fulfillment** → **Variables**
3. **"+ New Variable"**
4. **Name:** `DATABASE_URL`
5. **Value:** Paste the connection string
6. **Save**

---

## ✅ After Setting DATABASE_URL

Run migrations:

```bash
cd eaas-backend

# Make sure DATABASE_URL is set
export DATABASE_URL="your-url-here"

# Run migrations
npm run migrate

# Seed database
npm run seed
```

---

## 🐛 Troubleshooting

**Still getting error?**
- Verify DATABASE_URL is set: `echo $DATABASE_URL`
- Check it's not empty
- Verify format is correct (starts with `postgresql://`)
- Make sure you're in `eaas-backend` directory

**DATABASE_URL looks wrong?**
- Should NOT have `.railway.internal` (that's internal only)
- Should have `.railway.app` or similar public hostname
- Should include port `:5432`

---

## 📋 Checklist

- [ ] Got DATABASE_URL from Railway Postgres service
- [ ] DATABASE_URL is a valid connection string
- [ ] Set DATABASE_URL in Terminal: `export DATABASE_URL="..."`
- [ ] Verified: `echo $DATABASE_URL` shows the URL
- [ ] Run migrations: `npm run migrate`
- [ ] Seed database: `npm run seed`

