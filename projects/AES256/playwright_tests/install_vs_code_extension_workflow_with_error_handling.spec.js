const { test, expect } = require('@playwright/test');

test('Install VS Code Extension Workflow with Error Handling', async ({ page, browserName }) => {
  // Step 1: Navigate to the products page
  await page.goto('https://dev.roost.ai/products');
  
  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Roost.ai | Your Testing Co-Pilot Powered by Generative AI and Large Language Models');

  // Step 3: Locate the "Install VS Code Extension" button
  const installButton = page.locator('button[aria-label="Install VS Code Extension"]');
  await expect(installButton).toBeVisible();
  await expect(installButton).toHaveText('Install VS Code Extension');

  // Step 4: Click the "Install VS Code Extension" button
  await installButton.click();

  // Step 5: Verify the user is redirected to the correct marketplace page
  const expectedMarketplaceURL = 'https://marketplace.visualstudio.com/items?itemName=some-extension-id';
  await page.waitForURL(expectedMarketplaceURL);
  await expect(page).toHaveURL(expectedMarketplaceURL);

  // Step 6: Assert the marketplace page loads within an acceptable time frame
  const marketplaceLoadTimeout = 5000; // 5 seconds
  await page.waitForLoadState('load', { timeout: marketplaceLoadTimeout });

  // Step 7: Intercept the redirect and simulate a 404 error to verify error handling
  const mock404Message = 'Unable to load marketplace page. Please try again later.';
  await page.route(expectedMarketplaceURL, route => route.fulfill({ status: 404, body: mock404Message }));
  await installButton.click();
  await expect(page.locator('text="Unable to load marketplace page. Please try again later."')).toBeVisible();

  // Step 8: Simulate a network timeout during the redirect and verify user guidance
  await page.route(expectedMarketplaceURL, route => route.abort('internetdisconnected'));
  await installButton.click();
  await expect(page.locator('text="Network error. Please check your connection and try again."')).toBeVisible();

  // Step 9: Test the workflow on a mobile device
  const mobileViewport = { width: 375, height: 667 };
  await page.setViewportSize(mobileViewport);
  await installButton.click();
  await expect(page).toHaveURL(expectedMarketplaceURL);

  // Step 10: Test cross-browser compatibility
  const compatibleBrowsers = ['chromium', 'firefox', 'webkit'];
  for (const browser of compatibleBrowsers) {
    const context = await browser.newContext();
    const newPage = await context.newPage();
    await newPage.goto('https://dev.roost.ai/products');
    const button = newPage.locator('button[aria-label="Install VS Code Extension"]');
    await button.click();
    await newPage.waitForURL(expectedMarketplaceURL);
    await expect(newPage).toHaveURL(expectedMarketplaceURL);
    await context.close();
  }

  // Step 11: Verify proper state management by returning to the products page
  await page.goto('https://dev.roost.ai/products');
  await expect(page).toHaveURL('https://dev.roost.ai/products');

  // Step 12: Ensure focus is correctly managed during and after redirect
  await installButton.focus();
  await expect(page.locator(':focus')).toBe(installButton);

  // Step 13: Verify the button is accessible via keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBe(installButton);

  // Step 14: Test the workflow with screen readers
  const ariaLabel = await installButton.getAttribute('aria-label');
  expect(ariaLabel).toBe('Install VS Code Extension');

  // Step 15: Verify the marketplace URL matches the expected link
  await installButton.click();
  await page.waitForURL(expectedMarketplaceURL);
  const currentURL = page.url();
  expect(currentURL).toBe(expectedMarketplaceURL);

  // Error handling for edge cases
  try {
    // Simulate invalid marketplace URL
    await page.route(expectedMarketplaceURL, route => route.fulfill({ status: 500 }));
    await installButton.click();
    await expect(page.locator('text="Server error. Please try again later."')).toBeVisible();
  } catch (error) {
    console.error('Error during edge case simulation:', error);
    throw error;
  }

  console.log('Test completed successfully.');
});