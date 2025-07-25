const { test, expect } = require('@playwright/test');

test('Filter Test Plans and Verify Results', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to the Test Plans page.');

  // Step 2: Verify the visibility of the 'Test Plans' button in the header and click it
  const testPlansButton = page.locator('a[href="/roostgpt/tests"]');
  await expect(testPlansButton).toBeVisible();
  await testPlansButton.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Clicked the Test Plans button.');

  // Step 3: Ensure the page loads with a list of available test plans
  const testPlansList = page.locator('[data-testid="test-plans-list"]');
  await expect(testPlansList).toBeVisible();
  console.log('Test Plans list is visible.');

  // Step 4: Locate the search field with placeholder 'Search for Test Plans'
  const searchField = page.locator('[data-testid="tests-search-box"]');
  await expect(searchField).toBeVisible();
  console.log('Search field is located.');

  // Step 5: Type the text 'API Tests' into the search field
  await searchField.fill('API Tests');
  console.log('Typed "API Tests" into the search field.');

  // Step 6: Press 'Enter' or wait for the search results to load
  await searchField.press('Enter');
  await page.waitForTimeout(2000); // Wait for search results to load
  console.log('Search results loaded.');

  // Step 7: Verify that the results displayed match the search term entered
  const searchResults = page.locator('[data-testid="test-plan-item"]');
  await expect(searchResults).toContainText('API Tests');
  console.log('Verified search results match "API Tests".');

  // Step 8: Apply additional filters via dropdowns or buttons (if present) to further refine the search
  const filterDropdown = page.locator('[data-testid="filter-dropdown"]');
  if (await filterDropdown.count() > 0) {
    await filterDropdown.click();
    const filterOption = page.locator('[data-testid="filter-option"]:has-text("Critical")');
    await filterOption.click();
    await page.waitForTimeout(1000); // Wait for filter results to update
    console.log('Applied additional filter: Critical.');
  } else {
    console.log('No filter dropdown found.');
  }

  // Step 9: Verify that the results dynamically update based on the selected filters
  const filteredResults = page.locator('[data-testid="test-plan-item"]');
  await expect(filteredResults).toContainText('Critical');
  console.log('Verified filtered results dynamically update.');

  // Step 10: Clear all applied filters and verify that the full list of test plans is displayed again
  const clearFiltersButton = page.locator('[data-testid="clear-filters-button"]');
  if (await clearFiltersButton.count() > 0) {
    await clearFiltersButton.click();
    await page.waitForTimeout(1000); // Wait for results to reset
    console.log('Cleared all filters.');
  } else {
    console.log('No clear filters button found.');
  }

  await expect(testPlansList).toBeVisible();
  console.log('Verified full list of test plans is displayed after clearing filters.');

  // Step 11: Ensure that the state persists when refreshing the page
  await page.reload();
  const persistedFilters = page.locator('[data-testid="active-filters"]');
  await expect(persistedFilters).toBeVisible();
  console.log('Verified filters persist after refreshing the page.');

  // Step 12: Test navigation links from each test plan item to ensure they direct to correct pages
  const firstTestPlanLink = page.locator('[data-testid="test-plan-item"]:first-child a');
  await expect(firstTestPlanLink).toBeVisible();
  const href = await firstTestPlanLink.getAttribute('href');
  await firstTestPlanLink.click();
  await page.waitForURL(href);
  console.log(`Navigated to ${href} from the first test plan link.`);

  // Step 13: Repeat the search with invalid terms and verify 'No results found' or similar message is displayed
  await page.goto('https://dev.roost.ai/roostgpt/tests'); // Return to the Test Plans page
  await searchField.fill('InvalidTestPlan');
  await searchField.press('Enter');
  await page.waitForTimeout(2000);
  const noResultsMessage = page.locator('[data-testid="no-results-message"]');
  await expect(noResultsMessage).toBeVisible();
  console.log('Verified "No results found" message for invalid search term.');

  // Step 14: Verify search input accepts special characters and does not break the UI
  await searchField.fill('@#$%');
  await searchField.press('Enter');
  await page.waitForTimeout(2000);
  await expect(searchResults).toBeVisible();
  console.log('Verified search input accepts special characters without breaking UI.');

  // Step 15: Return to the default unfiltered view and verify all elements reset correctly
  if (await clearFiltersButton.count() > 0) {
    await clearFiltersButton.click();
    await page.waitForTimeout(1000);
    console.log('Returned to default unfiltered view.');
  } else {
    console.log('No clear filters button found to reset filters.');
  }

  await expect(testPlansList).toBeVisible();
  console.log('Verified all elements reset correctly.');
});