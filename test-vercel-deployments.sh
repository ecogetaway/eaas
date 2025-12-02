#!/bin/bash

# Test Vercel Deployments Script
# This script tests all three Vercel deployments and checks their status

echo "🔍 Testing Vercel Deployments..."
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URLs to test
declare -a urls=(
    "https://eaasp.vercel.app"
    "https://eaasp1.vercel.app"
    "https://eaas-snowy.vercel.app"
)

declare -a names=(
    "eaasp"
    "eaasp1"
    "eaas-snowy"
)

# Function to test a URL
test_url() {
    local url=$1
    local name=$2
    
    echo "Testing: $name ($url)"
    echo "-----------------------------------"
    
    # Check if URL is accessible
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$url")
    
    if [ "$http_code" == "200" ]; then
        echo -e "${GREEN}✅ Status: OK (HTTP $http_code)${NC}"
        
        # Check if page contains key content
        content=$(curl -s --max-time 10 "$url" | grep -o "EaaS\|Choose Your Energy\|DISCOM\|INR\|₹" | head -1)
        
        if [ ! -z "$content" ]; then
            echo -e "${GREEN}✅ Content: Found key elements${NC}"
        else
            echo -e "${YELLOW}⚠️  Content: May be loading or missing elements${NC}"
        fi
        
        # Check response time
        response_time=$(curl -s -o /dev/null -w "%{time_total}" --max-time 10 "$url")
        echo "⏱️  Response Time: ${response_time}s"
        
    elif [ "$http_code" == "000" ]; then
        echo -e "${RED}❌ Status: Timeout or unreachable${NC}"
    else
        echo -e "${RED}❌ Status: HTTP $http_code${NC}"
    fi
    
    echo ""
}

# Test all URLs
for i in "${!urls[@]}"; do
    test_url "${urls[$i]}" "${names[$i]}"
done

echo "=================================="
echo "📋 Summary"
echo "=================================="
echo ""
echo "Next Steps:"
echo "1. Visit each URL manually to verify:"
echo "   - https://eaasp.vercel.app"
echo "   - https://eaasp1.vercel.app"
echo "   - https://eaas-snowy.vercel.app"
echo ""
echo "2. Check for:"
echo "   ✓ INR pricing displays correctly"
echo "   ✓ DISCOM page works"
echo "   ✓ Real-time consumption tracking (if grid_connected)"
echo "   ✓ No console errors"
echo ""
echo "3. Choose the best working deployment"
echo "4. Archive/delete the others in Vercel dashboard"
echo ""

