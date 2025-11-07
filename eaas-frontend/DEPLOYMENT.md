# Frontend Deployment Guide

## Environment Variables for Production

When deploying to GitHub Pages (or any static hosting), you need to set environment variables **before building**, as Vite injects them at build time.

### For GitHub Pages Deployment

1. **Get your backend URL** (e.g., `https://eaas-backend.railway.app`)

2. **Set environment variables before building:**

```bash
export VITE_API_URL=https://your-backend-url.railway.app/api
export VITE_WS_URL=wss://your-backend-url.railway.app
npm run build
```

3. **For GitHub Actions**, add to your workflow:

```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
  VITE_WS_URL: ${{ secrets.VITE_WS_URL }}

steps:
  - name: Build
    run: npm run build
    env:
      VITE_API_URL: ${{ secrets.VITE_API_URL }}
      VITE_WS_URL: ${{ secrets.VITE_WS_URL }}
```

4. **Add secrets in GitHub**:
   - Go to your repo → Settings → Secrets → Actions
   - Add `VITE_API_URL` with your backend API URL
   - Add `VITE_WS_URL` with your backend WebSocket URL (use `wss://` for HTTPS)

### For Netlify/Vercel

Add environment variables in the platform dashboard:
- `VITE_API_URL` = your backend API URL
- `VITE_WS_URL` = your backend WebSocket URL

The platform will automatically use them during build.

## Important Notes

1. **Use HTTPS/WSS for production**: Always use `https://` and `wss://` for production backends
2. **Build-time only**: Vite environment variables are replaced at build time, not runtime
3. **Check backend CORS**: Ensure backend allows your frontend domain (already configured)

## Testing After Deployment

1. Visit your deployed frontend
2. Open browser console (F12)
3. Try to login
4. Check Network tab for API requests
5. Should see successful requests to your backend URL (not localhost)

