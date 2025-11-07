# 🔧 Set Railway DATABASE_URL

## Current Problem

Your `.env` file has DATABASE_URL for localhost/Supabase, but you need the Railway one.

---

## ✅ SOLUTION: Get Railway DATABASE_URL and Update .env

### **Step 1: Get DATABASE_URL from Railway**

1. **Go to Railway:** https://railway.app
2. **Click "Postgres" service** (top right card)
3. **Click "Variables" tab**
4. **Find `DATABASE_URL`**
5. **Click the eye icon** (👁️) or **copy icon** to reveal/copy it
6. **Copy the ENTIRE connection string**

It should look like:
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

---

### **Step 2: Update .env File**

**Option A: Edit .env File Manually**

1. Open `.env` file in `eaas-backend` folder
2. **Remove or comment out** the old DATABASE_URL lines:
   ```
   # DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eaas_db
   # DATABASE_URL=postgresql://postgres:Maggie2025$@db.znrijfsbcovdggwvifbw.supabase.co:5432/postgres
   ```
3. **Add your Railway DATABASE_URL:**
   ```
   DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
   ```
   (Replace with your actual Railway URL)

**Option B: Use Terminal**

```bash
cd eaas-backend

# Backup current .env
cp .env .env.backup

# Add Railway DATABASE_URL (replace with your actual URL)
echo "DATABASE_URL=postgresql://postgres:password@your-railway-host.railway.app:5432/railway" >> .env
```

**Better: Replace all DATABASE_URL entries:**

```bash
cd eaas-backend

# Create new .env with Railway DATABASE_URL
cat > .env << 'EOF'
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@your-railway-host.railway.app:5432/railway
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
FRONTEND_URL=http://localhost:5173
EOF

# Then edit .env and replace DATABASE_URL with your actual Railway URL
```

---

### **Step 3: Run Migrations**

After updating .env:

```bash
cd eaas-backend

# Verify DATABASE_URL is set
grep DATABASE_URL .env

# Run migrations
npm run migrate

# Seed database
npm run seed
```

---

## 🎯 Quick Steps Right Now

1. **Get DATABASE_URL from Railway:**
   - Postgres service → Variables → Copy `DATABASE_URL`

2. **Update .env file:**
   ```bash
   cd eaas-backend
   # Edit .env and replace DATABASE_URL with Railway one
   ```

3. **Run migrations:**
   ```bash
   npm run migrate
   npm run seed
   ```

---

## 📋 What Your .env Should Look Like

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
FRONTEND_URL=http://localhost:5173
```

**Important:** Replace the DATABASE_URL with your actual Railway connection string!

---

## 🔍 How to Get Railway DATABASE_URL

1. Railway dashboard → **Postgres** service
2. **Variables** tab
3. Find `DATABASE_URL`
4. Click **eye icon** (👁️) to reveal it
5. Click **copy icon** to copy it
6. Paste it in your `.env` file

---

## ✅ After Setting DATABASE_URL

Run:
```bash
npm run migrate
npm run seed
```

Should work now! ✅

