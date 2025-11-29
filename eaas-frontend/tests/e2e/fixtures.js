import { test as base, expect } from '@playwright/test';

// Test data matching mock data
export const TEST_USER = {
  email: 'demo@eaas.com',
  password: 'demo123',
  name: 'Demo User',
};

export const TEST_USER_INVALID = {
  email: 'nonexistent@eaas.com',
  password: 'WrongPassword123',
};

export const NEW_USER = {
  email: `test_${Date.now()}@eaas.com`,
  password: 'Test@123456',
  name: 'Test User',
  phone: '9876543210',
  address: '123 Test Street, Test City',
};

export const test = base.extend({
  // Custom fixture for authenticated page
  authenticatedPage: async ({ page }, use) => {
    // Login before using the page
    await page.goto('/login');
    await page.fill('input[type="email"]', TEST_USER.email);
    await page.fill('input[type="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard', { timeout: 10000 });
    await use(page);
  },
});

export { expect };

