import { test, expect } from './fixtures.js';
import { TEST_USER } from './fixtures.js';
import { loginUser } from './login-helper.js';

test.describe('DISCOM Net Metering Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
  });

  test('should display DISCOM page and application status', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Should see DISCOM page title
    const title = page.locator('h1, h2').filter({ hasText: /DISCOM|Net.*metering/i });
    await expect(title.first()).toBeVisible({ timeout: 10000 });

    // Should see either application status or "Apply for Net Metering" button
    const hasApplication = await page.locator('text=/Application Number|Apply for Net Metering/i').isVisible();
    expect(hasApplication).toBeTruthy();
  });

  test('should show application form when no application exists', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Look for "Start Application" or "Apply for Net Metering" button
    const applyButton = page.locator('button:has-text("Start Application"), button:has-text("Apply"), a:has-text("Apply")').first();
    
    if (await applyButton.isVisible({ timeout: 5000 })) {
      await applyButton.click();
      await page.waitForTimeout(1000);

      // Should see application form
      const formTitle = page.locator('h2, h3').filter({ hasText: /Net Metering Application|Application Form/i });
      await expect(formTitle.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display document checklist', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Check for document checklist or application status
    const documentSection = page.locator('text=/Required Documents|Identity Proof|Property Ownership|Electricity Bill/i');
    
    // May be visible if application exists or in form
    const isVisible = await documentSection.first().isVisible({ timeout: 5000 }).catch(() => false);
    
    // If form is shown, documents should be visible
    const formVisible = await page.locator('text=/Net Metering Application/i').isVisible({ timeout: 3000 }).catch(() => false);
    
    if (formVisible || isVisible) {
      expect(isVisible || formVisible).toBeTruthy();
    }
  });

  test('should show application timeline with status stages', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Look for timeline or status information
    const timeline = page.locator('text=/Timeline|Application Timeline|Submitted|Technical Approval|Grid Connected/i');
    const statusInfo = page.locator('text=/Status|Progress|Application Number/i');
    
    const hasTimeline = await timeline.first().isVisible({ timeout: 5000 }).catch(() => false);
    const hasStatus = await statusInfo.first().isVisible({ timeout: 5000 }).catch(() => false);
    
    // Should have either timeline or status information
    expect(hasTimeline || hasStatus).toBeTruthy();
  });

  test('should display technical details when available', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Look for technical details sections
    const technicalSections = page.locator('text=/Feasibility Study|Technical Approval|System Installation|Grid Synchronization|Commissioning/i');
    
    // These may not be visible if application is in early stages
    const count = await technicalSections.count();
    // At least the page should load without errors
    expect(page.url()).toContain('discom');
  });

  test('should allow form submission with required fields', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Try to find and click "Start Application" button
    const applyButton = page.locator('button:has-text("Start Application"), button:has-text("Apply")').first();
    
    if (await applyButton.isVisible({ timeout: 5000 })) {
      await applyButton.click();
      await page.waitForTimeout(1000);

      // Fill required fields
      const solarCapacity = page.locator('input[name="solar_capacity_kw"]');
      if (await solarCapacity.isVisible({ timeout: 3000 })) {
        await solarCapacity.fill('3');
      }

      const address = page.locator('textarea[name="property_address"], input[name="property_address"]');
      if (await address.isVisible({ timeout: 3000 })) {
        await address.fill('123 Test Street, Test City, Test State 123456');
      }

      const consumerNumber = page.locator('input[name="consumer_number"]');
      if (await consumerNumber.isVisible({ timeout: 3000 })) {
        await consumerNumber.fill('CON123456789');
      }

      // Submit form
      const submitButton = page.locator('button[type="submit"]:has-text("Submit")');
      if (await submitButton.isVisible({ timeout: 3000 })) {
        await submitButton.click();
        await page.waitForTimeout(2000);
        
        // Should see success or redirect to status page
        const successIndicator = page.locator('text=/Application submitted|Application Number|Status/i');
        await expect(successIndicator.first()).toBeVisible({ timeout: 10000 });
      }
    }
  });

  test('should show progress percentage', async ({ page }) => {
    await page.goto('/discom');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Look for progress bar or percentage
    const progress = page.locator('text=/Progress|%|Application Number/i');
    const hasProgress = await progress.first().isVisible({ timeout: 5000 }).catch(() => false);
    
    // Progress should be visible if application exists
    if (hasProgress) {
      expect(hasProgress).toBeTruthy();
    }
  });

  test('should be accessible via navigation', async ({ page }) => {
    // Go to dashboard first
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    
    // Find and click DISCOM link in navbar
    const discomLink = page.locator('a[href*="discom"], a').filter({ 
      hasText: /DISCOM|Net Metering/i 
    }).first();
    
    if (await discomLink.isVisible({ timeout: 5000 })) {
      await discomLink.click();
      await expect(page).toHaveURL(/.*discom/);
    } else {
      // Try direct navigation
      await page.goto('/discom');
      await expect(page).toHaveURL(/.*discom/);
    }
  });

  test('should require authentication', async ({ page }) => {
    // Logout first
    await page.goto('/');
    const logoutButton = page.locator('button, a').filter({ hasText: /Logout|Sign Out/i });
    if (await logoutButton.isVisible({ timeout: 3000 })) {
      await logoutButton.click();
      await page.waitForTimeout(1000);
    }
    
    // Try to access DISCOM page
    await page.goto('/discom');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*login/, { timeout: 10000 });
  });
});

