# 🔧 Quick Fix: Use Local Backend with Deployed Frontend

## For Demo/Hackathon Purposes

If you need the login to work **right now** for a demo, you can:

### Option 1: Run Backend Locally (Easiest)

1. **Start backend locally**:
   ```bash
   cd eaas-backend
   npm run dev
   ```
   Backend runs on `http://localhost:5001`

2. **Update frontend temporarily**:
   - Since GitHub Pages can't access localhost, you'll need to:
   - Either: Deploy backend to Railway/Render (15 minutes)
   - Or: Use local frontend for demo (`npm run dev`)

### Option 2: Deploy Backend Quickly (15 minutes)

**Railway Quick Deploy**:
1. https://railway.app → New Project → GitHub → Select `eaas-backend`
2. Add PostgreSQL → Copy DATABASE_URL
3. Set environment variables
4. In Railway shell: `npm run migrate && npm run seed`
5. Copy backend URL
6. Update GitHub secrets (VITE_API_URL, VITE_WS_URL)
7. Redeploy frontend

---

**Recommendation**: Deploy backend to Railway (free, fast, easy)

