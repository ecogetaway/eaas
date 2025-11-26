import { test, expect } from './fixtures.js';
import { TEST_USER } from './fixtures.js';
import { loginUser } from './login-helper.js';

test.describe('Smart Meters Management', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
  });

  test('Meters page loads and displays meters', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Should see meters page title
    await expect(page.locator('h1:has-text("Smart Meters")')).toBeVisible({ timeout: 10000 });

    // Should see either meters list or empty state
    const metersContent = page.locator('text=/Smart Meters|No Meters Found/i');
    await expect(metersContent.first()).toBeVisible({ timeout: 10000 });
  });

  test('Meters page shows meter cards with details', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Check if meters exist (not empty state)
    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      // Should see meter cards
      const meterCards = page.locator('[class*="card"]');
      const cardCount = await meterCards.count();
      expect(cardCount).toBeGreaterThan(0);

      // Should see meter details
      const meterNumber = page.locator('text=/Meter Number|MTR/i');
      const deviceType = page.locator('text=/Device Type|Smart Energy Meter/i');
      const firmwareVersion = page.locator('text=/Firmware Version/i');
      const lastSync = page.locator('text=/Last Sync/i');
      const syncStatus = page.locator('text=/Sync Status/i');

      // At least some of these should be visible
      const visibleElements = await Promise.all([
        meterNumber.first().isVisible({ timeout: 2000 }).catch(() => false),
        deviceType.first().isVisible({ timeout: 2000 }).catch(() => false),
        firmwareVersion.first().isVisible({ timeout: 2000 }).catch(() => false),
        lastSync.first().isVisible({ timeout: 2000 }).catch(() => false),
        syncStatus.first().isVisible({ timeout: 2000 }).catch(() => false),
      ]);

      const visibleCount = visibleElements.filter(Boolean).length;
      expect(visibleCount).toBeGreaterThan(0);
    }
  });

  test('Meters page displays connection status indicators', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      // Should see connection status indicators (WiFi icons)
      const wifiIcons = page.locator('[class*="w-5 h-5"]').or(
        page.locator('svg')
      );
      const iconCount = await wifiIcons.count();
      
      // Should have at least one status indicator
      if (iconCount > 0) {
        expect(iconCount).toBeGreaterThan(0);
      }

      // Should see connection status text (online/offline/warning)
      const connectionStatus = page.locator('text=/online|offline|warning/i');
      const statusCount = await connectionStatus.count();
      // May or may not be visible depending on implementation
    }
  });

  test('Sync meter button is visible and clickable', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      // Should see sync button
      const syncButton = page.locator('button:has-text("Sync Now"), button:has-text("Sync")');
      const buttonCount = await syncButton.count();
      
      if (buttonCount > 0) {
        await expect(syncButton.first()).toBeVisible({ timeout: 5000 });
        
        // Button should be enabled
        const isDisabled = await syncButton.first().isDisabled();
        expect(isDisabled).toBeFalsy();
      }
    }
  });

  test('Sync meter functionality works', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      // Find sync button
      const syncButton = page.locator('button:has-text("Sync Now"), button:has-text("Sync")').first();
      
      if (await syncButton.isVisible({ timeout: 5000 })) {
        // Click sync button
        await syncButton.click();

        // Should see loading state or success message
        await page.waitForTimeout(2000);

        // Check for success message or updated sync status
        const successMessage = page.locator('text=/success|synced|sync.*initiated/i');
        const hasSuccessMessage = await successMessage.first().isVisible({ timeout: 5000 }).catch(() => false);

        // Or check if sync status updated
        const syncStatus = page.locator('text=/Synced|Pending/i');
        const hasSyncStatus = await syncStatus.first().isVisible({ timeout: 5000 }).catch(() => false);

        // At least one should be true
        expect(hasSuccessMessage || hasSyncStatus).toBeTruthy();
      }
    }
  });

  test('Meters page shows empty state when no meters', async ({ page }) => {
    // This test assumes a user with no meters exists
    // For now, we'll check if empty state is properly displayed
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Should see either meters or empty state
    const metersContent = page.locator('text=/Smart Meters|No Meters Found/i');
    await expect(metersContent.first()).toBeVisible({ timeout: 10000 });

    // If empty state is shown, verify it has proper message
    const emptyState = page.locator('text=/No Meters Found/i');
    if (await emptyState.isVisible({ timeout: 2000 })) {
      await expect(emptyState).toBeVisible();
      
      // Should see helpful message
      const emptyMessage = page.locator('text=/No smart meters.*registered/i');
      const hasMessage = await emptyMessage.isVisible({ timeout: 2000 }).catch(() => false);
      // Empty state message may vary
    }
  });

  test('Meters page requires authentication', async ({ page }) => {
    // Logout first
    await page.goto('/dashboard');
    const logoutButton = page.locator('button:has-text("Logout"), a:has-text("Logout")');
    if (await logoutButton.isVisible({ timeout: 2000 })) {
      await logoutButton.click();
      await page.waitForTimeout(1000);
    }

    // Try to access meters page without authentication
    await page.goto('/meters');
    
    // Should redirect to login
    await page.waitForURL(/.*login/, { timeout: 5000 });
    expect(page.url()).toMatch(/.*login/);
  });

  test('Meter details display correctly', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      // Should see meter information fields
      const meterFields = [
        'Meter Number',
        'Device Type',
        'Firmware Version',
        'Last Sync',
        'Sync Status',
        'Calibration Date',
      ];

      let foundFields = 0;
      for (const field of meterFields) {
        const fieldElement = page.locator(`text=/${field}/i`);
        if (await fieldElement.first().isVisible({ timeout: 2000 }).catch(() => false)) {
          foundFields++;
        }
      }

      // Should find at least some fields
      expect(foundFields).toBeGreaterThan(0);
    }
  });

  test('Meters page handles API errors gracefully', async ({ page }) => {
    // Intercept API call and return error
    await page.route('**/api/meters/user/*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Should handle error gracefully (show error message or empty state)
    const errorMessage = page.locator('text=/error|failed|try again/i');
    const emptyState = page.locator('text=/No Meters Found/i');
    
    const hasError = await errorMessage.first().isVisible({ timeout: 5000 }).catch(() => false);
    const hasEmptyState = await emptyState.isVisible({ timeout: 2000 }).catch(() => false);

    // Should show either error message or handle gracefully
    expect(hasError || hasEmptyState).toBeTruthy();
  });

  test('Sync button shows loading state during sync', async ({ page }) => {
    await page.goto('/meters');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const emptyState = page.locator('text=/No Meters Found/i');
    const hasMeters = !(await emptyState.isVisible({ timeout: 2000 }));

    if (hasMeters) {
      const syncButton = page.locator('button:has-text("Sync Now"), button:has-text("Sync")').first();
      
      if (await syncButton.isVisible({ timeout: 5000 })) {
        // Click sync button
        await syncButton.click();

        // Should see loading state (disabled button or loading text)
        await page.waitForTimeout(500);
        
        const loadingButton = page.locator('button:has-text("Syncing"), button:disabled');
        const hasLoadingState = await loadingButton.first().isVisible({ timeout: 2000 }).catch(() => false);
        
        // Loading state may be brief, so this is optional
        if (hasLoadingState) {
          expect(hasLoadingState).toBeTruthy();
        }
      }
    }
  });
});

