# Deployment Guide - CORS Configuration

## Problem Fixed

The backend now properly handles CORS for both local development and production deployments.

## Backend CORS Configuration

The backend (`src/server.js`) now allows requests from:
- `http://localhost:5173` - Local Vite dev server
- `http://localhost:3000` - Alternative local port
- `https://ecogetaway.github.io` - GitHub Pages production frontend
- Custom URL from `FRONTEND_URL` environment variable

## Steps to Fix Your Deployment

### 1. Update Backend Environment Variables

In your backend deployment (Railway/Render/Heroku), set the `FRONTEND_URL` environment variable:

```bash
FRONTEND_URL=https://ecogetaway.github.io
```

Or add it via your hosting platform's dashboard.

### 2. Deploy Updated Backend

After updating the environment variable, redeploy your backend so the CORS changes take effect.

### 3. Update Frontend Environment Variables

Your frontend needs to point to your **actual backend URL**, not `localhost`. 

**For GitHub Pages (production):**

1. Get your backend URL (e.g., `https://eaas-backend.railway.app`)

2. Update your frontend `.env` or build-time environment variables:

```bash
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_WS_URL=wss://your-backend-url.railway.app
```

**Important:** In GitHub Actions or your build process, you need to set these as environment variables before building:

```yaml
# Example GitHub Actions
env:
  VITE_API_URL: https://your-backend-url.railway.app/api
  VITE_WS_URL: wss://your-backend-url.railway.app
```

### 4. Rebuild and Redeploy Frontend

After updating the environment variables, rebuild and redeploy your frontend:

```bash
npm run build
# Then deploy the dist/ folder
```

## Testing

After deployment:

1. Check backend CORS: Visit `https://your-backend-url/api/health` - should return JSON
2. Check frontend: Visit `https://ecogetaway.github.io` - should connect to backend
3. Test login: Try logging in - should work without CORS errors

## Troubleshooting

**Still seeing CORS errors?**
- Ensure backend `FRONTEND_URL` includes your frontend domain
- Check browser console for exact error message
- Verify backend is running and accessible
- Check that environment variables are set correctly in deployment platform

**Backend not accessible?**
- Verify backend URL is correct
- Check backend logs for errors
- Ensure backend port is correct (often platforms use PORT env var)

