#!/bin/bash
# Quick Railway Deployment Commands

echo "🚂 Railway Deployment Helper"
echo ""
echo "Step 1: Commit backend code"
echo "cd eaas-backend && git add . && git commit -m 'Railway deployment setup' && git push"
echo ""
echo "Step 2: After Railway setup, get your URL from Railway dashboard"
echo ""
echo "Step 3: Test backend"
echo "curl https://your-backend-url.railway.app/health"
echo ""
echo "Step 4: Run migrations (after connecting database)"
echo "railway run npm run migrate"
echo "railway run npm run seed"
