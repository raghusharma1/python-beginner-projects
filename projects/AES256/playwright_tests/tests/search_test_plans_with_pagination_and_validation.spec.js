const { test, expect } = require('@playwright/test');

test('Search Test Plans with Pagination and Validation', async ({ page }) => {
  // Step 1: Navigate to the test plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to the test plans page.');

  // Step 2: Verify visibility of the search input field
  const searchInput = page.locator('input[data-testid="tests-search-box"]');
  await expect(searchInput).toBeVisible();
  console.log('Search input field is visible.');

  // Step 3: Type 'playwright' into the search field
  await searchInput.fill('playwright');
  console.log('Entered "playwright" into the search field.');

  // Step 4: Assert that search results update dynamically
  const resultsContainer = page.locator('.results-container'); // Assuming the results container has this class
  await expect(resultsContainer).toContainText('playwright');
  console.log('Search results updated dynamically to show relevant test plans.');

  // Step 5: Verify paginator elements are visible and enabled
  const paginator = page.locator('.paginator'); // Assuming paginator has this class
  await expect(paginator).toBeVisible();
  const firstPageButton = page.locator('button[data-testid="paginator-first-page-button"]');
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  await expect(firstPageButton).toBeEnabled();
  await expect(nextButton).toBeEnabled();
  console.log('Paginator elements are visible and enabled.');

  // Step 6: Click on page number '2'
  const pageTwoButton = page.locator('button:has-text("2")');
  await pageTwoButton.click();
  console.log('Clicked on page number "2".');

  // Step 7: Assert that results change and URL remains the same
  await expect(resultsContainer).toContainText('Page 2 results'); // Adjust based on actual content
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Results changed to reflect the second page, and the URL remained the same.');

  // Step 8: Click on the 'Next' button
  await nextButton.click();
  console.log('Clicked on the "Next" button.');

  // Step 9: Validate results correspond to the third page
  await expect(resultsContainer).toContainText('Page 3 results'); // Adjust based on actual content
  console.log('Results correspond to the third page.');

  // Step 10: Click on the 'Last' button
  const lastPageButton = page.locator('button:has-text("Last")');
  await lastPageButton.click();
  console.log('Clicked on the "Last" button.');

  // Step 11: Assert that final page of results is displayed
  await expect(resultsContainer).toContainText('Final page results'); // Adjust based on actual content
  console.log('Final page of results is displayed.');

  // Step 12: Click on the 'First' button
  await firstPageButton.click();
  console.log('Clicked on the "First" button.');

  // Step 13: Assert that the first page of results is displayed again
  await expect(resultsContainer).toContainText('Page 1 results'); // Adjust based on actual content
  console.log('First page of results is displayed again.');

  // Step 14: Clear the search input field
  await searchInput.fill('');
  console.log('Cleared the search input field.');

  // Step 15: Assert that all test plans are displayed with pagination reset
  await expect(resultsContainer).toContainText('All test plans'); // Adjust based on actual content
  await expect(firstPageButton).toBeEnabled();
  console.log('All test plans are displayed, and pagination reset to the first page.');

  // Step 16: Attempt a search with invalid input
  await searchInput.fill('invalid!@#');
  console.log('Entered invalid input into the search field.');

  // Step 17: Verify 'No results found' message is displayed
  const noResultsMessage = page.locator('.no-results-message'); // Assuming this class is used
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No results found');
  console.log('No results found message is displayed.');

  // Step 18: Test with a partial string
  await searchInput.fill('play');
  console.log('Entered partial string "play" into the search field.');

  // Step 19: Assert relevant results are displayed
  await expect(resultsContainer).toContainText('play');
  console.log('Relevant results containing "play" are displayed.');

  // Step 20: Verify paginator works as expected with search filter active
  await nextButton.click();
  await expect(resultsContainer).toContainText('Page 2 filtered results'); // Adjust based on actual content
  console.log('Paginator works as expected while search filter is active.');
});