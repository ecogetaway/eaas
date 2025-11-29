# Vercel Deployment - Ready for UAT

## ✅ Changes Pushed to GitHub

All mock data system changes have been pushed to GitHub. Vercel should automatically detect and deploy.

## Vercel Configuration

The frontend is configured for Vercel with:
- **Root Directory:** `eaas-frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework Preset:** Vite

## Environment Variables (Optional for Demo)

Since we're using mock data, **no environment variables are required** for the demo. However, if you want to test with real backend later, you can add:

- `VITE_API_URL` - Backend API URL (optional for demo)
- `VITE_WS_URL` - WebSocket URL (optional for demo)

## Deployment Steps

### Option 1: Automatic Deployment (Recommended)
1. Vercel should automatically detect the GitHub push
2. Check Vercel dashboard for deployment status
3. Wait for build to complete (~2-3 minutes)

### Option 2: Manual Deployment
1. Go to Vercel Dashboard
2. Select your project
3. Click "Redeploy" or trigger new deployment

## UAT Testing Checklist

Once deployed, test these features:

### Authentication
- [ ] Login with `demo@eaas.com` / `demo123`
- [ ] Login with `demo2@eaas.com` / `demo123`
- [ ] Register new user (creates mock user)

### Dashboard
- [ ] View real-time energy metrics (updates every 5 seconds)
- [ ] Check energy charts (day/week/month)
- [ ] View savings and carbon impact cards
- [ ] Check DISCOM status card

### Subscription
- [ ] View all plans (3 plans available)
- [ ] Get plan recommendation (enter monthly bill)
- [ ] Complete onboarding flow
- [ ] Select plan and make payment (Razorpay mock)

### Billing
- [ ] View all bills
- [ ] View current month bill
- [ ] Make payment (test all payment methods)
- [ ] Download invoice

### Smart Meters
- [ ] View registered meters
- [ ] Sync meter
- [ ] Register new meter

### Support
- [ ] Create support ticket
- [ ] View all tickets
- [ ] Add reply to ticket
- [ ] Update ticket status

### DISCOM
- [ ] View net-metering application status
- [ ] Submit new application
- [ ] Check grid sync status
- [ ] View timeline

### Notifications & Alerts
- [ ] View notifications
- [ ] Mark notifications as read
- [ ] View alerts
- [ ] Acknowledge/resolve alerts

## Demo Credentials

**User 1:**
- Email: `demo@eaas.com`
- Password: `demo123`

**User 2:**
- Email: `demo2@eaas.com`
- Password: `demo123`

## Features Working

✅ All features work with mock data
✅ Real-time updates simulated (5-second intervals)
✅ Payment flows fully functional
✅ Charts and visualizations working
✅ No backend required

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure `eaas-frontend` is set as root directory
- Verify `package.json` has correct build script

### Blank Page
- Check browser console for errors
- Verify Vercel routing is configured (vercel.json exists)
- Check if build completed successfully

### Features Not Working
- Open browser console (F12)
- Check for any JavaScript errors
- Verify mock data is loading (check Network tab)

## Post-Deployment

1. **Test all features** with demo credentials
2. **Share Vercel URL** with UAT testers
3. **Provide demo credentials** to testers
4. **Monitor Vercel logs** for any issues
5. **Collect feedback** from testers

## Next Steps After UAT

Once UAT is complete:
1. Collect feedback
2. Fix any issues found
3. Switch to real backend (set `USE_MOCK_DATA = false` in services)
4. Configure environment variables for production

## Notes

- **Mock data is primary source** - All services use `USE_MOCK_DATA = true`
- **No backend needed** - Everything works independently
- **Realistic experience** - API delays and real-time updates simulated
- **Perfect for demo** - Judges can explore all features

