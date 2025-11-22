# Backend Server Start Guide

## Quick Start

The backend needs to be running on port 5000 for the frontend to work properly.

### Option 1: Start Backend Manually

1. **Open a new terminal window** (keep frontend running in current terminal)

2. **Navigate to backend directory:**
   ```bash
   cd /Users/sanjay/eaas/eaas-backend
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   OR for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Verify it's running:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"ok","timestamp":"..."}`

### Option 2: Check if Backend is Already Running

```bash
# Check if something is on port 5000
lsof -i :5000

# If backend is running, you should see node process
# If not, start it with npm start
```

### Port Conflict Resolution

If port 5000 is already in use:

1. **Find what's using it:**
   ```bash
   lsof -i :5000
   ```

2. **Kill the process (if it's not needed):**
   ```bash
   kill -9 <PID>
   ```

3. **Or change backend port:**
   - Edit `eaas-backend/.env` and set `PORT=5001`
   - Update `eaas-frontend/vite.config.js` proxy target to match

### Verify Connection

Once backend is running:

1. **Test health endpoint:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Test API root:**
   ```bash
   curl http://localhost:5000/
   ```

3. **In browser, test frontend:**
   - Open http://localhost:5173
   - Try logging in
   - Check browser console (F12) for any API errors

### Troubleshooting

**Backend won't start:**
- Check database connection: `psql -d eaas_db -c "SELECT 1;"`
- Check Redis: `redis-cli ping` (should return PONG)
- Check .env file has correct DATABASE_URL

**Frontend still can't connect:**
- Verify backend is running: `curl http://localhost:5000/health`
- Check vite.config.js proxy target is `http://localhost:5000`
- Restart frontend dev server after changing vite.config.js
- Check browser console for specific error messages

**Database connection errors:**
- Ensure PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in .env file
- Run migrations: `cd eaas-backend && npm run migrate`

### Current Configuration

- **Backend Port:** 5000 (from server.js: `process.env.PORT || 5000`)
- **Frontend Port:** 5173 (Vite default)
- **Frontend Proxy:** `/api` → `http://localhost:5000` (updated in vite.config.js)

