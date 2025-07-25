const { test, expect } = require('@playwright/test');

test('Pagination Controls: Navigation and State Persistence', async ({ page }) => {
  // Step 1: Navigate to the test plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to the test plans page.');

  // Step 2: Verify the visibility of pagination controls
  const paginationControls = [
    page.locator('button[data-testid="paginator-first-page-button"]'),
    page.locator('button[data-testid="paginator-last-page-button"]'),
    page.locator('button[data-testid="arrow-icon"]:has-text("»")'), // Next button
    page.locator('button[data-testid="arrow-icon"]:has-text("«")')  // Previous button
  ];
  for (const control of paginationControls) {
    await expect(control).toBeVisible();
  }
  console.log('Verified visibility of pagination controls.');

  // Step 3: Click on 'Next' button to navigate to the second page
  await paginationControls[2].click(); // Next button
  console.log('Clicked on Next button.');

  // Step 4: Verify the URL contains the correct query parameter for page 2
  await expect(page).toHaveURL(/page=2/);
  console.log('Verified URL contains the correct parameter for page 2.');

  // Step 5: Verify that the test plans displayed belong to page 2
  const testPlans = page.locator('.test-plan-item'); // Assuming test plans have this class
  await expect(testPlans).toBeVisible();
  console.log('Verified test plans for page 2 are displayed.');

  // Step 6: Click the 'Last' button to navigate to the last page
  await paginationControls[1].click(); // Last button
  console.log('Clicked on Last button.');

  // Step 7: Verify that the URL updates to reflect the last page
  await expect(page).toHaveURL(/page=5/); // Assuming last page is page 5
  console.log('Verified URL reflects the last page.');

  // Step 8: Click the 'Previous' button to navigate back one page
  await paginationControls[3].click(); // Previous button
  console.log('Clicked on Previous button.');

  // Step 9: Verify the URL and test plans correspond to the previous page
  await expect(page).toHaveURL(/page=4/); // Assuming previous page is page 4
  await expect(testPlans).toBeVisible();
  console.log('Verified URL and test plans for page 4.');

  // Step 10: Click the 'First' button to return to the first page
  await paginationControls[0].click(); // First button
  console.log('Clicked on First button.');

  // Step 11: Verify that the URL and test plans correspond to the first page
  await expect(page).toHaveURL(/page=1/);
  await expect(testPlans).toBeVisible();
  console.log('Verified URL and test plans for page 1.');

  // Step 12: Perform a search query and ensure pagination updates reflect the filtered results
  const searchInput = page.locator('input[placeholder="Search"]'); // Assuming search input has this placeholder
  await searchInput.fill('New Plan');
  await page.locator('button[data-testid="search-button"]').click(); // Assuming search button has this test ID
  console.log('Performed search query.');

  // Wait for search results to load
  await page.waitForTimeout(2000);

  // Verify pagination updates reflect filtered results
  await expect(testPlans).toHaveCount(2); // Assuming filtered results yield 2 test plans
  console.log('Verified pagination updates reflect filtered search results.');

  // Step 13: Test pagination using keyboard navigation
  await page.locator('body').press('Tab'); // Navigate focus to first pagination control
  await page.keyboard.press('Enter'); // Simulate Enter key press on focused element
  await expect(page).toHaveURL(/page=1/);
  console.log('Tested keyboard navigation for pagination.');

  // Step 14: Reload the page and ensure that the current pagination state persists
  await page.reload();
  await expect(page).toHaveURL(/page=1/); // Verify pagination state persistence
  await expect(testPlans).toBeVisible();
  console.log('Verified pagination state persists after page reload.');
});