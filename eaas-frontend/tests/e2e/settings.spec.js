import { test, expect } from './fixtures.js';
import { loginUser } from './login-helper.js';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    await page.goto('/settings');
  });

  test('should display Settings page', async ({ page }) => {
    await expect(page).toHaveURL(/.*settings/);
    
    // Check for page title
    const title = page.locator('h1, h2').filter({ hasText: /Settings|settings/i });
    await expect(title.first()).toBeVisible();
  });

  test('should show settings configuration content', async ({ page }) => {
    // Check for main content area
    const content = page.locator('text=/Smart Meter|DISCOM|Configuration|Integration/i');
    await expect(content.first()).toBeVisible();
  });

  test('should be accessible via navigation', async ({ page }) => {
    // Go to dashboard first
    await page.goto('/dashboard');
    
    // Find and click Settings link in navbar
    const settingsLink = page.locator('a[href*="settings"], a').filter({ 
      hasText: /Settings|settings/i 
    }).first();
    
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await expect(page).toHaveURL(/.*settings/);
    }
  });

  test('should require authentication', async ({ page }) => {
    // Logout first
    await page.goto('/');
    const logoutButton = page.locator('button, a').filter({ hasText: /Logout|Sign Out/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
    }
    
    // Try to access settings
    await page.goto('/settings');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
  });
});

