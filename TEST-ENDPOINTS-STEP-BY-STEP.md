# Step-by-Step: Test Database Connection and Endpoints

## Prerequisites
- Railway deployment should be complete (check Railway Dashboard)
- Wait 2-3 minutes after code push for Railway to redeploy

---

## Step 1: Check Railway Deployment Status

1. **Open Railway Dashboard**
   - Go to: https://railway.app
   - Navigate to: `outstanding-energy` → `production` → `eaas` service
   - Click **"Deployments"** tab
   - Check the latest deployment shows **"Active"** (green checkmark)
   - If still deploying, wait until it shows "Active"

---

## Step 2: Test Database Connection Endpoint

### Option A: Using Terminal (Mac/Linux)

1. **Open Terminal** (Applications → Utilities → Terminal)

2. **Test the database connection:**
   ```bash
   curl https://eaas-production.up.railway.app/api/test/db
   ```

3. **What to expect:**
   - Should return JSON with:
     - `success: true`
     - `connection` info (database name, schema)
     - `tables` array (list of all tables)
     - `tableCount` (number of tables)
     - `planCatalogExists: true` or `false`

4. **If you see an error:**
   - Check that Railway deployment is complete
   - Wait a few more minutes and try again

### Option B: Using Browser

1. **Open your web browser** (Chrome, Safari, Firefox)

2. **Go to this URL:**
   ```
   https://eaas-production.up.railway.app/api/test/db
   ```

3. **What you'll see:**
   - JSON data displayed in the browser
   - Look for `"planCatalogExists": true` or `false`
   - Check the `tables` array to see all tables

### Option C: Using Postman (if installed)

1. **Open Postman**
2. **Create new GET request**
3. **URL:** `https://eaas-production.up.railway.app/api/test/db`
4. **Click "Send"**
5. **View response** in the bottom panel

---

## Step 3: Test Plans Endpoint

### Using Terminal:

```bash
curl https://eaas-production.up.railway.app/api/subscriptions/plans
```

**Expected Result:**
- Should return JSON with `plans` array
- Should show 3 plans (or 6 if duplicates): Basic Solar, Solar + Battery, Premium
- **If you see error:** `"relation plan_catalog does not exist"` → Database connection issue

### Using Browser:

1. **Go to:**
   ```
   https://eaas-production.up.railway.app/api/subscriptions/plans
   ```

2. **What you'll see:**
   - JSON with plans data
   - Or an error message if connection failed

---

## Step 4: Test Recommendation Endpoint

### Using Terminal:

```bash
curl "https://eaas-production.up.railway.app/api/subscriptions/plans/recommend?monthlyBill=5000"
```

**Expected Result:**
- Should return JSON with `plans` array and `recommended` plan_id
- Should recommend a plan based on monthly bill amount

### Using Browser:

1. **Go to:**
   ```
   https://eaas-production.up.railway.app/api/subscriptions/plans/recommend?monthlyBill=5000
   ```

---

## Step 5: Test Health Endpoint (Quick Check)

```bash
curl https://eaas-production.up.railway.app/health
```

**Expected Result:**
```json
{"status":"ok","timestamp":"2025-11-29T..."}
```

---

## Step 6: Interpret Results

### ✅ Success Indicators:

**Database Test Endpoint (`/api/test/db`):**
```json
{
  "success": true,
  "connection": {
    "now": "2025-11-29T...",
    "current_database": "postgres",
    "current_schema": "public"
  },
  "tables": [
    {"table_schema": "public", "table_name": "plan_catalog"},
    {"table_schema": "public", "table_name": "users"},
    ...
  ],
  "tableCount": 14,
  "planCatalogExists": true
}
```

**Plans Endpoint (`/api/subscriptions/plans`):**
```json
{
  "plans": [
    {
      "plan_id": "...",
      "plan_name": "Basic Solar",
      "monthly_fee": 799,
      ...
    },
    ...
  ]
}
```

### ❌ Error Indicators:

**If you see:**
```json
{"error": "relation \"plan_catalog\" does not exist"}
```
→ Database connection issue - Railway can't see the tables

**If you see:**
```json
{"success": false, "error": "..."}
```
→ Check the error message for details

---

## Step 7: Troubleshooting

### If Database Test Shows No Tables:

1. **Check DATABASE_URL in Railway:**
   - Railway Dashboard → `eaas` service → Variables
   - Verify `DATABASE_URL` is correct
   - Should match Supabase project where you created tables

2. **Check Supabase:**
   - Go to Supabase Dashboard → Table Editor
   - Verify `plan_catalog` table exists
   - Check it has rows

3. **Restart Railway Service:**
   - Railway Dashboard → Deployments → Redeploy
   - Wait for deployment to complete

### If Plans Endpoint Still Fails:

1. **Wait for Railway to redeploy** (after our code changes)
2. **Check Railway logs:**
   - Railway Dashboard → `eaas` service → Logs tab
   - Look for database connection errors

3. **Verify schema:**
   - Run database test endpoint first
   - Check if `planCatalogExists: true`

---

## Quick Test Commands (Copy & Paste)

```bash
# 1. Health check
curl https://eaas-production.up.railway.app/health

# 2. Database connection test
curl https://eaas-production.up.railway.app/api/test/db

# 3. Get all plans
curl https://eaas-production.up.railway.app/api/subscriptions/plans

# 4. Get plan recommendation
curl "https://eaas-production.up.railway.app/api/subscriptions/plans/recommend?monthlyBill=5000"
```

---

## Visual Guide: Using Browser

1. **Open Chrome/Safari**
2. **Type in address bar:**
   ```
   https://eaas-production.up.railway.app/api/test/db
   ```
3. **Press Enter**
4. **You'll see JSON response** - look for `planCatalogExists`
5. **Then test plans:**
   ```
   https://eaas-production.up.railway.app/api/subscriptions/plans
   ```

---

## Next Steps After Testing

✅ **If all tests pass:**
- Database is connected correctly
- Tables are accessible
- API endpoints work
- You can proceed with testing the frontend

❌ **If tests fail:**
- Share the error message
- Check Railway logs
- Verify DATABASE_URL in Railway Variables
- Check Supabase table exists

