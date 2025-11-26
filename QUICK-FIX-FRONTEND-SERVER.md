# ✅ Frontend Server - Fixed

## Problem
- **Error**: `ERR_CONNECTION_REFUSED` on `http://localhost:5173`
- **Cause**: Frontend development server (Vite) was not running

## Solution
✅ **Frontend server is now running** on `http://localhost:5173`

## How to Start/Stop

### Start Frontend Server:
```bash
cd eaas-frontend
npm run dev
```

### Stop Frontend Server:
Press `Ctrl+C` in the terminal where it's running

### Check if Server is Running:
```bash
curl http://localhost:5173
# Should return HTML content
```

## Important Notes

### Backend Server Port Configuration:
- **Frontend expects backend on**: `http://localhost:5001` (from vite.config.js)
- **Backend default port**: `5000` (from server.js)

**If backend is on port 5000**, you have two options:

1. **Update vite.config.js** to proxy to port 5000:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // Change from 5001 to 5000
    changeOrigin: true,
  },
}
```

2. **OR start backend on port 5001**:
```bash
cd eaas-backend
PORT=5001 npm run dev
```

### Verify Both Servers:
```bash
# Check frontend (should return HTML)
curl http://localhost:5173

# Check backend (should return JSON)
curl http://localhost:5000/health
# OR
curl http://localhost:5001/health
```

## Quick Start Guide

1. **Start Backend** (Terminal 1):
```bash
cd eaas-backend
npm run dev
```

2. **Start Frontend** (Terminal 2):
```bash
cd eaas-frontend
npm run dev
```

3. **Open Browser**:
   - Navigate to: `http://localhost:5173`
   - Should see the EaaS platform login page

## Troubleshooting

### If Frontend Still Shows Connection Refused:
1. Check if port 5173 is already in use:
   ```bash
   lsof -ti:5173
   ```
2. Kill existing process if needed:
   ```bash
   kill -9 $(lsof -ti:5173)
   ```
3. Restart frontend server

### If API Calls Fail:
- Verify backend is running
- Check backend port matches vite.config.js proxy setting
- Check browser console for CORS errors

---

**Status**: ✅ **Frontend server is running**  
**URL**: http://localhost:5173

