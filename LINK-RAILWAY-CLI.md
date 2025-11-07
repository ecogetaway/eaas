# 🔗 Link Railway CLI to Your Project

## Step-by-Step Instructions

### **STEP 1: Make Sure You're in the Right Directory**

```bash
cd eaas-backend
```

You should be in: `/Users/sanjay/eaas/eaas-backend`

---

### **STEP 2: Login to Railway (If Not Already)**

```bash
railway login
```

**What happens:**
- Terminal will show: "Opening browser..."
- Browser opens automatically
- Click **"Authorize"** or **"Allow"** in the browser
- Come back to Terminal - should say "Logged in successfully"

**If browser doesn't open:**
- Copy the URL from Terminal
- Paste it in your browser manually

---

### **STEP 3: Link to Your Project**

```bash
railway link
```

**What happens:**
1. Railway CLI will show a list of your projects
2. You'll see something like:
   ```
   ? Select a project:
   > friendly-passion
     (other projects if you have any)
   ```
3. Use arrow keys to select **"friendly-passion"**
4. Press **Enter**

**If it asks for environment:**
- Select **"production"** (or the environment you're using)

---

### **STEP 4: Verify Link**

After linking, you should see:
```
✓ Linked to project friendly-passion
```

---

### **STEP 5: Now Run Migrations**

```bash
railway run npm run migrate
```

Should work now! ✅

---

## 🐛 Troubleshooting

**Problem: "railway: command not found"**
```bash
# Install Railway CLI
npm install -g @railway/cli
```

**Problem: "No projects found"**
- Make sure you're logged in: `railway login`
- Check that you have access to the project in Railway dashboard

**Problem: Can't select project**
- Use arrow keys (↑↓) to navigate
- Press Enter to select
- If stuck, press Ctrl+C and try again

**Problem: Wrong project selected**
- Run `railway link` again
- Select the correct project

---

## ✅ Success Checklist

- [ ] `railway login` - Successfully logged in
- [ ] `railway link` - Linked to "friendly-passion" project
- [ ] `railway run npm run migrate` - Runs successfully
- [ ] `railway run npm run seed` - Runs successfully

---

## 📋 Complete Command Sequence

Run these commands **one at a time**:

```bash
# 1. Go to backend directory
cd eaas-backend

# 2. Login (if needed)
railway login

# 3. Link to project
railway link
# Select "friendly-passion" when asked

# 4. Run migrations
railway run npm run migrate

# 5. Seed database
railway run npm run seed
```

---

## 💡 Tips

- **railway link** only needs to be done once per project
- After linking, Railway remembers the connection
- You can verify link by running `railway status` or `railway whoami`

