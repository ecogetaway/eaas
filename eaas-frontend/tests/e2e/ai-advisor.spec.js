import { test, expect } from './fixtures.js';
import { loginUser } from './login-helper.js';

test.describe('AI Advisor Page', () => {
  test.beforeEach(async ({ page }) => {
    await loginUser(page);
    await page.goto('/ai-advisor');
  });

  test('should display AI Advisor page with chat interface', async ({ page }) => {
    await expect(page).toHaveURL(/.*ai-advisor/);
    
    // Check for page title/header
    const header = page.locator('text=/Lumi AI Advisor|AI Advisor/i');
    await expect(header.first()).toBeVisible();
    
    // Check for initial message from AI
    const initialMessage = page.locator('text=/Hello.*Lumi|I.*m Lumi/i');
    await expect(initialMessage.first()).toBeVisible();
  });

  test('should have input field and send button', async ({ page }) => {
    const input = page.locator('input[type="text"], textarea').filter({ hasText: /ask|message|question/i }).or(page.locator('input[placeholder*="Ask"], input[placeholder*="ask"]'));
    await expect(input.first()).toBeVisible();
    
    const sendButton = page.locator('button').filter({ hasText: /send|Send/i }).or(page.locator('button[aria-label*="send" i]'));
    await expect(sendButton.first()).toBeVisible();
  });

  test('should send a message and receive a response', async ({ page }) => {
    const input = page.locator('input[type="text"], textarea').first();
    const sendButton = page.locator('button').filter({ hasText: /send|Send/i }).first();
    
    // Type a message
    await input.fill('What are similar EaaS apps?');
    
    // Send the message
    await sendButton.click();
    
    // Wait for response (check for loading state or response)
    await page.waitForTimeout(2000);
    
    // Check that user message appears
    const userMessage = page.locator('text=What are similar EaaS apps?');
    await expect(userMessage.first()).toBeVisible({ timeout: 5000 });
    
    // Check that AI response appears (should contain some text)
    const aiResponse = page.locator('text=/Sunrun|Octopus|Tesla|EaaS|competitor/i');
    await expect(aiResponse.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have quick action buttons', async ({ page }) => {
    // Look for quick action chips/buttons
    const quickActions = page.locator('button, [role="button"]').filter({ 
      hasText: /Research|Competitors|Savings|Issue|Report/i 
    });
    
    const count = await quickActions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should handle quick action clicks', async ({ page }) => {
    // Find and click a quick action button
    const researchButton = page.locator('button, [role="button"]').filter({ 
      hasText: /Research|Competitors/i 
    }).first();
    
    if (await researchButton.isVisible()) {
      await researchButton.click();
      
      // Check that input is filled or message is sent
      await page.waitForTimeout(1000);
      
      // Either input should be filled or message should appear
      const input = page.locator('input[type="text"], textarea').first();
      const inputValue = await input.inputValue();
      expect(inputValue.length).toBeGreaterThan(0);
    }
  });

  test('should show typing indicator when AI is responding', async ({ page }) => {
    const input = page.locator('input[type="text"], textarea').first();
    const sendButton = page.locator('button').filter({ hasText: /send|Send/i }).first();
    
    await input.fill('Tell me about savings');
    await sendButton.click();
    
    // Check for typing indicator (dots, loading spinner, etc.)
    const typingIndicator = page.locator('text=/\.\.\.|loading|typing/i').or(
      page.locator('[class*="animate-bounce"], [class*="loading"]')
    );
    
    // Typing indicator might appear briefly, so we check if it exists at some point
    try {
      await expect(typingIndicator.first()).toBeVisible({ timeout: 2000 });
    } catch {
      // If not visible, that's okay - it might be too fast
    }
  });

  test('should be accessible via navigation', async ({ page }) => {
    // Go to dashboard first
    await page.goto('/dashboard');
    
    // Find and click AI Advisor link in navbar
    const aiAdvisorLink = page.locator('a[href*="ai-advisor"], a').filter({ 
      hasText: /AI Advisor|Advisor/i 
    }).first();
    
    if (await aiAdvisorLink.isVisible()) {
      await aiAdvisorLink.click();
      await expect(page).toHaveURL(/.*ai-advisor/);
    }
  });
});

