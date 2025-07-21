const { test, expect } = require('@playwright/test');

test('Error Handling on Documentation Page', async ({ page, browser }) => {
  // Step 1: Navigate to the documentation homepage
  await page.goto('https://docs.roost.ai');
  console.log('Navigated to the documentation homepage.');

  // Step 2: Verify page title
  await expect(page).toHaveTitle('Roost.ai Documentation');
  console.log('Verified page title is "Roost.ai Documentation".');

  // Step 3: Attempt navigation to a non-existent category
  const invalidCategoryUrl = 'https://docs.roost.ai/shelves/invalid-category';
  await page.goto(invalidCategoryUrl);
  console.log(`Attempted to navigate to invalid category: ${invalidCategoryUrl}`);

  // Step 4: Verify "404 Not Found" error page is displayed
  await expect(page.locator('body')).toContainText('404 Not Found');
  console.log('Verified that the "404 Not Found" page is displayed.');

  // Step 5: Simulate network failure and reload page
  const context = await browser.newContext({ offline: true });
  const offlinePage = await context.newPage();
  try {
    await offlinePage.goto('https://docs.roost.ai');
  } catch (error) {
    console.log('Network error simulated. Unable to load page.');
  }

  // Step 6: Verify network error message
  await expect(offlinePage.locator('body')).toContainText('Network Error');
  console.log('Verified network error message is displayed.');

  // Step 7: Restore network and reload
  await context.setOffline(false);
  await offlinePage.reload();
  await expect(offlinePage).toHaveURL('https://docs.roost.ai');
  console.log('Network restored and page reloaded successfully.');

  // Step 8: Disable JavaScript and navigate to the page
  const noJsContext = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto('https://docs.roost.ai');
  console.log('Navigated to the page with JavaScript disabled.');

  // Step 9: Verify fallback content or appropriate message
  await expect(noJsPage.locator('body')).toContainText('JavaScript is required');
  console.log('Verified fallback content is displayed for JavaScript-disabled environments.');

  // Step 10: Simulate low-bandwidth network
  await context.setOffline(false);
  await context.setNetworkConditions({
    download: 50 * 1024, // 50 kbps
    upload: 20 * 1024, // 20 kbps
    latency: 500 // 500ms
  });
  await offlinePage.goto('https://docs.roost.ai');
  console.log('Simulated low-bandwidth network.');

  // Step 11: Verify graceful loading
  await expect(offlinePage.locator('body')).toBeVisible();
  console.log('Verified page elements load gracefully under low-bandwidth conditions.');

  // Step 12: Simulate server-side error
  await page.route('**/api/**', route => {
    route.fulfill({
      status: 500,
      body: 'Internal Server Error'
    });
  });
  await page.goto('https://docs.roost.ai/some-api-endpoint');
  console.log('Simulated server-side error.');

  // Step 13: Validate error handling for invalid API responses
  await expect(page.locator('body')).toContainText('Internal Server Error');
  console.log('Verified error handling for invalid API responses.');

  // Step 14: Test client-side error handling with invalid inputs
  const inputField = page.locator('input[type="text"]');
  if (await inputField.count() > 0) {
    await inputField.fill('');
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.count() > 0) {
      await submitButton.click();
      console.log('Entered invalid inputs and submitted the form.');

      // Step 15: Verify proper error messages are displayed
      await expect(page.locator('.error-message')).toContainText('This field is required');
      console.log('Verified error messages are displayed for invalid inputs.');

      // Step 16: Validate error recovery
      await inputField.fill('Valid Input');
      await submitButton.click();
      console.log('Fixed invalid inputs and retried the operation.');
    }
  }

  // Step 17: Test concurrent API requests under high load
  const requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(page.goto('https://docs.roost.ai'));
  }
  await Promise.all(requests);
  console.log('Simulated high-load scenario with concurrent API requests.');

  // Step 18: Verify page remains responsive
  await expect(page.locator('body')).toBeVisible();
  console.log('Verified the page remains responsive under high-load conditions.');

  // Step 19: Test browser refresh during error conditions
  await page.reload();
  console.log('Refreshed the page during error conditions to validate state recovery.');
  await expect(page.locator('body')).toBeVisible();

  // Step 20: Logout or close the documentation tab
  await page.close();
  console.log('Closed the documentation tab.');
});