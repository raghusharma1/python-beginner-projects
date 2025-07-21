const { test, expect } = require('@playwright/test');

test('Navigation Through Product Offerings Menu', async ({ page }) => {
  // Step 1: Navigate to https://roost.ai
  await page.goto('https://roost.ai');

  // Step 2: Verify the page title
  await expect(page).toHaveTitle('LLM Driven Testing Copilot | Test Case Generation & Code Scanning');

  // Step 3: Locate the product offerings menu and click 'What is RoostGPT'
  const whatIsRoostGPTLink = page.locator('a[href="/how-roostgpt-works"]');
  await expect(whatIsRoostGPTLink).toBeVisible(); // Ensure the link is visible
  await whatIsRoostGPTLink.click();

  // Step 4: Verify navigation to the correct URL
  await expect(page).toHaveURL('https://roost.ai/how-roostgpt-works');

  // Step 5: Assert visibility of the 'How RoostGPT Works?' heading
  const howRoostGPTWorksHeading = page.locator('h1:has-text("How RoostGPT Works?")');
  await expect(howRoostGPTWorksHeading).toBeVisible();

  // Step 6: Return to the homepage
  await page.goto('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');

  // Step 7: Locate and click the 'API Test Cases' link
  const apiTestCasesLink = page.locator('a[href="/blog"]');
  await expect(apiTestCasesLink).toBeVisible(); // Ensure the link is visible
  await apiTestCasesLink.click();

  // Step 8: Verify navigation to the correct URL
  await expect(page).toHaveURL('https://roost.ai/blog');

  // Step 9: Assert visibility of API-related blog content
  const blogContent = page.locator('h1:has-text("API Test Cases")');
  await expect(blogContent).toBeVisible();

  // Step 10: Return to the homepage
  await page.goto('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');

  // Step 11: Locate and click the 'Try RoostGPT' button
  const tryRoostGPTButton = page.locator('button[data-testid="try-roostgpt"]');
  await expect(tryRoostGPTButton).toBeVisible(); // Ensure the button is visible
  await tryRoostGPTButton.click();

  // Step 12: Verify navigation to the correct URL
  await expect(page).toHaveURL('https://app.roost.ai/tryRoostAI');

  // Step 13: Assert presence of the 'Start Trial' button
  const startTrialButton = page.locator('button:has-text("Start Trial")');
  await expect(startTrialButton).toBeVisible();

  // Step 14: Return to the homepage
  await page.goto('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');

  // Step 15: Assert the homepage is still functional
  const homepageHeading = page.locator('h1:has-text("LLM Driven Testing Copilot")');
  await expect(homepageHeading).toBeVisible();

  // Log completion of the scenario
  console.log('Navigation Through Product Offerings Menu test completed successfully.');
});