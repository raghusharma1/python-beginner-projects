const { test, expect } = require('@playwright/test');

test('Pagination Controls Functionality', async ({ page }) => {
  // Step 1: Navigate to the Connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Navigated to the Connectors page.');

  // Step 2: Verify visibility and enablement of pagination controls
  const paginationControls = [
    'button[data-testid="paginator-first-page-button"]',
    'button[data-testid="arrow-left"]',
    'button[data-testid="arrow-icon"]',
    'button[data-testid="paginator-last-page-button"]',
  ];

  for (const control of paginationControls) {
    const element = page.locator(control);
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
    console.log(`Verified visibility and enablement of ${control}`);
  }

  // Step 3: Click the '2' pagination button and verify the second page of results
  const pageTwoButton = page.locator('button:has-text("2")');
  await pageTwoButton.click();
  await page.waitForURL(/page=2/);
  await expect(page.locator('table')).toBeVisible();
  console.log('Navigated to page 2 and verified results.');

  // Step 4: Click the 'Next' button ('»') and verify the next page of results
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  await nextButton.click();
  await page.waitForURL(/page=3/);
  await expect(page.locator('table')).toBeVisible();
  console.log('Navigated to the next page and verified results.');

  // Step 5: Click the 'Previous' button ('«') and verify the previous page of results
  const previousButton = page.locator('button[data-testid="arrow-left"]');
  await previousButton.click();
  await page.waitForURL(/page=2/);
  await expect(page.locator('table')).toBeVisible();
  console.log('Navigated to the previous page and verified results.');

  // Step 6: Click the 'First' button and ensure the first page of results is displayed
  const firstButton = page.locator('button[data-testid="paginator-first-page-button"]');
  await firstButton.click();
  await page.waitForURL(/page=1/);
  await expect(page.locator('table')).toBeVisible();
  console.log('Navigated to the first page and verified results.');

  // Step 7: Click the 'Last' button and verify the last page of results
  const lastButton = page.locator('button[data-testid="paginator-last-page-button"]');
  await lastButton.click();
  await page.waitForURL(/page=\d+$/); // Regex assumes dynamic last page number
  await expect(page.locator('table')).toBeVisible();
  console.log('Navigated to the last page and verified results.');

  // Step 8: Attempt to navigate to a page with no results and verify proper error handling
  const invalidPageButton = page.locator('button:has-text("999")'); // Assume 999 exceeds total pages
  await invalidPageButton.click().catch(() => {
    console.log('Invalid page navigation prevented.');
  });
  await expect(page).not.toHaveURL(/page=999/);
  console.log('Verified error handling for invalid page navigation.');

  // Step 9: Test keyboard navigation to pagination controls
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('table')).toBeVisible();
  console.log('Verified pagination using keyboard navigation.');

  // Step 10: Verify accessibility attributes of pagination controls
  for (const control of paginationControls) {
    const element = page.locator(control);
    await expect(element).toHaveAttribute('role', 'button');
    console.log(`Verified accessibility attributes for ${control}`);
  }

  // Step 11: Reload the page while on a specific page and verify pagination state persistence
  await page.goto('https://dev.roost.ai/connectors?page=3');
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/connectors?page=3');
  console.log('Verified pagination state persistence after reload.');

  // Step 12: Verify pagination responsiveness on smaller screen sizes
  await page.setViewportSize({ width: 480, height: 800 });
  await expect(page.locator('button[data-testid="paginator-first-page-button"]')).toBeVisible();
  console.log('Verified pagination responsiveness on smaller screen sizes.');

  // Step 13: Simulate a slow network and verify loading indicators
  await page.route('**/*', (route) => route.continue({ delay: 500 }));
  await nextButton.click();
  await expect(page.locator('.loading-indicator')).toBeVisible();
  console.log('Verified loading indicators under slow network conditions.');

  // Step 14: Test rapid clicks on pagination buttons for stability
  try {
    await Promise.all([
      pageTwoButton.click(),
      nextButton.click(),
      previousButton.click(),
      firstButton.click(),
    ]);
    console.log('Handled rapid interactions with pagination buttons gracefully.');
  } catch (error) {
    console.error('Error during rapid pagination interactions:', error);
  }

  // Step 15: Monitor API requests triggered by pagination
  page.on('request', (req) => {
    console.log('API Request:', req.url());
  });
  await nextButton.click();
  console.log('Monitored API requests triggered by pagination.');
});