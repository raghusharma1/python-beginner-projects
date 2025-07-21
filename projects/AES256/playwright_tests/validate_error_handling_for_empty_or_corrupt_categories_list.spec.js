const { test, expect } = require('@playwright/test');

// Utility function to mock API responses
async function mockApiResponse(page, endpoint, response, status = 200, delay = 0) {
  await page.route(endpoint, async (route) => {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

// Test: Validate Error Handling for Empty or Corrupt Categories List
test('Validate Error Handling for Empty or Corrupt Categories List', async ({ page, browser }) => {
  const categoriesEndpoint = 'https://api.roost.ai/categories';

  // Step 1: Navigate to the Shelves page
  await page.goto('https://docs.roost.ai/shelves');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves');

  // Step 2: Simulate an API failure that returns an empty categories list
  await mockApiResponse(page, categoriesEndpoint, []);
  await page.reload();
  await expect(page.locator('div.no-categories-message')).toBeVisible();
  await expect(page.locator('div.no-categories-message')).toContainText('No categories available');

  // Step 3: Simulate an API response with corrupt or malformed data for categories
  await mockApiResponse(page, categoriesEndpoint, { data: null });
  await page.reload();
  await expect(page.locator('div.no-categories-message')).toBeVisible();
  await expect(page.locator('div.no-categories-message')).toContainText('No categories available');

  // Step 4: Attempt to sort categories when the list is empty
  const sortDropdown = page.locator('select.sort-options');
  await expect(sortDropdown).toBeDisabled();

  // Step 5: Reload the page and simulate a delayed API response
  await mockApiResponse(page, categoriesEndpoint, [{ id: 1, name: 'Category 1' }], 200, 3000);
  await page.reload();
  const loadingSpinner = page.locator('div.loading-spinner');
  await expect(loadingSpinner).toBeVisible();
  await expect(page.locator('div.category-item')).toBeVisible();

  // Step 6: Simulate an API timeout for the categories endpoint
  await mockApiResponse(page, categoriesEndpoint, {}, 504);
  await page.reload();
  const networkError = page.locator('div.network-error');
  await expect(networkError).toBeVisible();
  await expect(networkError).toContainText('Network error. Please try again.');

  // Step 7: Navigate to another page and return to Shelves
  await page.goto('https://docs.roost.ai/otherpage');
  await expect(page).toHaveURL('https://docs.roost.ai/otherpage');
  await page.goto('https://docs.roost.ai/shelves');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves');
  await expect(page.locator('div.retry-button')).toBeVisible();
  await page.locator('div.retry-button').click();
  await expect(page.locator('div.category-item')).toBeVisible();

  // Step 8: Test the behavior on a mobile viewport
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('https://docs.roost.ai/shelves');
  await expect(mobilePage.locator('div.no-categories-message')).toBeVisible();
  await expect(mobilePage.locator('div.no-categories-message')).toContainText('No categories available');
  await mobileContext.close();

  // Step 9: Simulate simultaneous API requests for categories and sort data
  await mockApiResponse(page, categoriesEndpoint, [{ id: 1, name: 'Category 1' }]);
  const sortEndpoint = 'https://api.roost.ai/categories/sort';
  await mockApiResponse(page, sortEndpoint, { sorted: true });
  await Promise.all([
    page.reload(),
    page.locator('select.sort-options').selectOption('name'),
  ]);
  await expect(page.locator('div.category-item')).toBeVisible();
});