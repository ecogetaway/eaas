# 🔗 How to Manually Link Database in Railway

## Step-by-Step Instructions

### **STEP 1: Go to Your Backend Service**

1. In Railway, click on **"resilient-fulfillment"** service (bottom left card)
2. This opens the service details page

### **STEP 2: Open Variables Tab**

1. Click **"Variables"** tab (top menu)
2. You should see a list of variables (might be empty or have some)

### **STEP 3: Link Database Variable**

**Method A: Reference Variable (Recommended)**

1. Click **"+ New Variable"** button
2. Look for **"Reference Variable"** or **"Link Variable"** option
   - This might be a button or dropdown option
   - Sometimes it says "Connect" or "Link"
3. Click it
4. You'll see a list of services/resources
5. **Select "Postgres"** (your database service)
6. You'll see available variables from Postgres
7. **Select `DATABASE_URL`**
8. Click **"Add"** or **"Save"**

**Method B: Manual Entry**

If "Reference Variable" doesn't work:

1. Click **"+ New Variable"**
2. **Name:** Type exactly: `DATABASE_URL`
3. **Value:** You need to get this from Postgres service:
   - Go back to project view
   - Click on **"Postgres"** service (top right card)
   - Click **"Variables"** tab
   - Look for `DATABASE_URL` or `POSTGRES_URL`
   - Copy the entire connection string
   - Go back to "resilient-fulfillment" service
   - Paste it as the value
4. Click **"Add"**

---

## 🎯 Alternative: Connect via Service Settings

### **Method C: Service Connections**

1. Click on **"resilient-fulfillment"** service
2. Go to **"Settings"** tab
3. Look for **"Connections"** or **"Dependencies"** section
4. Click **"Connect"** or **"Add Connection"**
5. Select **"Postgres"** service
6. Railway should automatically create `DATABASE_URL`

---

## 🔍 What the DATABASE_URL Should Look Like

After linking, `DATABASE_URL` should look like:
```
postgresql://postgres:password@hostname:5432/postgres
```

Or Railway's format:
```
${{Postgres.DATABASE_URL}}
```
(If using reference variable)

---

## ✅ Verify It's Linked

After adding `DATABASE_URL`:

1. Go to **"resilient-fulfillment"** → **"Variables"** tab
2. You should see `DATABASE_URL` listed
3. The value should be a PostgreSQL connection string
4. Railway will automatically redeploy your service

---

## 🐛 Troubleshooting

**Can't find "Reference Variable" option?**
- Try Method B (manual entry)
- Or check Postgres service Variables tab for the connection string

**Still not working?**
- Make sure both services are in the same project
- Try refreshing the page
- Check Railway documentation or support

---

## 📋 Quick Checklist

- [ ] Clicked "resilient-fulfillment" service
- [ ] Opened "Variables" tab
- [ ] Clicked "+ New Variable"
- [ ] Found "Reference Variable" or manually entered DATABASE_URL
- [ ] Selected Postgres service
- [ ] Selected DATABASE_URL variable
- [ ] Saved/Added the variable
- [ ] Verified DATABASE_URL appears in Variables list

