# GitHub Actions Troubleshooting

## Common Issues

### 1. Workflow Fails - "Pages build failed"
**Solution**: Enable GitHub Pages first:
- Go to Settings → Pages
- Select "GitHub Actions" as source
- Save

### 2. Workflow Fails - "npm ci" errors
**Solution**: Use `npm install` fallback (already added to workflows)

### 3. Workflow Fails - Missing package-lock.json
**Solution**: Ensure package-lock.json is committed to git

### 4. Workflow Doesn't Trigger
**Solution**: 
- Check if files changed match workflow paths
- Or manually trigger via "Run workflow" button

### 5. Build Succeeds but Site Doesn't Load
**Solution**:
- Check GitHub Pages is enabled
- Verify base path in vite.config.js
- Wait 5-10 minutes for DNS propagation

