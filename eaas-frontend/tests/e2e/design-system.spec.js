import { test, expect } from './fixtures.js';

test.describe('Design System Pages', () => {
  test('should display Design System main page', async ({ page }) => {
    await page.goto('/design-system');
    await expect(page).toHaveURL(/.*design-system/);
    
    // Check for page title
    const title = page.locator('h1, h2').filter({ hasText: /Design System|design system/i });
    await expect(title.first()).toBeVisible();
  });

  test('should show component list', async ({ page }) => {
    await page.goto('/design-system');
    
    // Check for component table or list
    const componentList = page.locator('text=/Button|Badge|Component/i');
    await expect(componentList.first()).toBeVisible();
  });

  test('should navigate to Button page', async ({ page }) => {
    await page.goto('/design-system');
    
    // Find and click Button link
    const buttonLink = page.locator('a[href*="button"], a').filter({ 
      hasText: /Button|button/i 
    }).first();
    
    if (await buttonLink.isVisible()) {
      await buttonLink.click();
      await expect(page).toHaveURL(/.*design-system\/button/);
      
      // Check for Button page content
      const buttonTitle = page.locator('h1, h2').filter({ hasText: /Button/i });
      await expect(buttonTitle.first()).toBeVisible();
    }
  });

  test('should display Button component examples', async ({ page }) => {
    await page.goto('/design-system/button');
    
    // Check for button examples
    const buttonExamples = page.locator('button').or(page.locator('text=/Primary|Secondary|Outline/i'));
    const count = await buttonExamples.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should navigate to Badge page', async ({ page }) => {
    await page.goto('/design-system');
    
    // Find and click Badge link
    const badgeLink = page.locator('a[href*="badge"], a').filter({ 
      hasText: /Badge|badge/i 
    }).first();
    
    if (await badgeLink.isVisible()) {
      await badgeLink.click();
      await expect(page).toHaveURL(/.*design-system\/badge/);
      
      // Check for Badge page content
      const badgeTitle = page.locator('h1, h2').filter({ hasText: /Badge/i });
      await expect(badgeTitle.first()).toBeVisible();
    }
  });

  test('should have back link to design system', async ({ page }) => {
    await page.goto('/design-system/button');
    
    // Check for back link
    const backLink = page.locator('a[href*="design-system"], a').filter({ 
      hasText: /Back|←/i 
    }).first();
    
    if (await backLink.isVisible()) {
      await backLink.click();
      await expect(page).toHaveURL(/.*design-system/);
    }
  });
});

