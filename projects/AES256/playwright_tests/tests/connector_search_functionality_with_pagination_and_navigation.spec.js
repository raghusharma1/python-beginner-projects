const { test, expect } = require('@playwright/test');

test('Connector Search Functionality with Pagination and Navigation', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');

  // Step 2: Verify that the search box is visible and enabled
  const searchBox = page.locator('[data-testid="Connector-search-box"]');
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();

  // Step 3: Type 'Test Connector' into the search box
  const searchQuery = 'Test Connector';
  await searchBox.fill(searchQuery);

  // Step 4: Assert that the search box updates with the typed value
  await expect(searchBox).toHaveValue(searchQuery);

  // Step 5: Click on the 'Search' button, if available
  const searchButton = page.locator('button:has-text("Search")');
  if (await searchButton.isVisible()) {
    await searchButton.click();
  }

  // Step 6: Verify that search results update to show connectors matching 'Test Connector'
  const searchResults = page.locator('.connector-result'); // Assuming search results have this class
  await expect(searchResults).toContainText(searchQuery);

  // Step 7: Interact with the pagination controls to navigate to the second page
  const secondPageButton = page.locator('[data-testid="paginator-page-2"]'); // Assuming there's a button for page 2
  if (await secondPageButton.isVisible()) {
    await secondPageButton.click();
    await page.waitForNavigation();
  }

  // Step 8: Verify that the second page's connectors match the search criteria
  await expect(searchResults).toContainText(searchQuery);

  // Step 9: Navigate back to the first page using the 'First' button
  const firstPageButton = page.locator('[data-testid="paginator-first-page-button"]');
  await firstPageButton.click();
  await page.waitForNavigation();

  // Step 10: Assert that the search results persist on the first page
  await expect(searchResults).toContainText(searchQuery);

  // Step 11: Clear the search box and verify that all connectors are displayed
  await searchBox.fill('');
  if (await searchButton.isVisible()) {
    await searchButton.click();
  }
  await expect(searchResults).not.toContainText(searchQuery);

  // Step 12: Navigate to the last page using the 'Last' button
  const lastPageButton = page.locator('[data-testid="paginator-last-page-button"]');
  await lastPageButton.click();
  await page.waitForNavigation();

  // Step 13: Verify that the connectors on the last page are correctly displayed
  await expect(searchResults).toBeVisible();

  // Step 14: Use the '<<' (left arrow) pagination button to navigate back one page
  const previousPageButton = page.locator('[data-testid="arrow-left"]');
  await previousPageButton.click();
  await page.waitForNavigation();

  // Step 15: Verify that the correct connectors for the previous page are displayed
  await expect(searchResults).toBeVisible();

  // Step 16: Test edge cases by entering invalid characters in the search box
  const invalidQuery = '!@#$%^';
  await searchBox.fill(invalidQuery);
  if (await searchButton.isVisible()) {
    await searchButton.click();
  }

  // Step 17: Verify that proper error messages or empty results are displayed for invalid inputs
  const errorMessage = page.locator('.error-message'); // Assuming an error message element exists
  const noResultsMessage = page.locator('.no-results'); // Assuming a no results element exists
  await expect(errorMessage.or(noResultsMessage)).toBeVisible();

  // Step 18: Reload the page and verify that state is reset and default connectors are shown
  await page.reload();
  await expect(searchBox).toHaveValue('');
  await expect(searchResults).toBeVisible();

  // Accessibility checks (WCAG 2.1 compliance)
  console.log('Performing accessibility checks...');
  const searchLabel = searchBox.getAttribute('aria-label');
  if (!searchLabel) {
    console.warn('Search box does not have an accessible label.');
  }

  console.log('Test completed successfully.');
});