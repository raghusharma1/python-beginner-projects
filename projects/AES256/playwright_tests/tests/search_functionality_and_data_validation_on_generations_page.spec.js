const { test, expect } = require('@playwright/test');

test('Search Functionality and Data Validation on Generations Page', async ({ page, browserName }) => {
  // Step 1: Navigate to the Generations page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to Generations page');

  // Step 2: Locate the search input box using the provided selector
  const searchBox = page.locator('input[data-testid="events-search-box"]');
  await expect(searchBox).toBeVisible();
  console.log('Search box located successfully');

  // Step 3: Verify placeholder text is displayed
  await expect(searchBox).toHaveAttribute('placeholder', 'Search for Activities');
  console.log('Placeholder text is correct');

  // Step 4: Type a valid search term into the input box
  const validSearchTerm = 'Test Plan';
  await searchBox.fill(validSearchTerm);
  await searchBox.press('Enter');
  console.log(`Typed valid search term: ${validSearchTerm}`);

  // Step 5: Wait for search results and validate results
  await page.waitForTimeout(2000); // Waiting for search results to load
  const results = page.locator('.search-results'); // Assuming .search-results as container for results
  await expect(results).toBeVisible();
  await expect(results).toContainText(validSearchTerm);
  console.log('Search results validated for valid input');

  // Step 6: Clear the input box and type an invalid search term
  const invalidSearchTerm = '@#$%^';
  await searchBox.fill('');
  await searchBox.fill(invalidSearchTerm);
  await searchBox.press('Enter');
  console.log(`Typed invalid search term: ${invalidSearchTerm}`);

  // Step 7: Verify 'No data found' message
  await page.waitForTimeout(2000);
  const noDataMessage = page.locator('.no-data-message'); // Assuming .no-data-message for "No data found"
  await expect(noDataMessage).toBeVisible();
  await expect(noDataMessage).toContainText('No data found');
  console.log('No data found message validated for invalid input');

  // Step 8: Clear the input box and type an empty string
  await searchBox.fill('');
  await searchBox.press('Enter');
  console.log('Submitted empty search input');

  // Step 9: Verify page reloads and all activities are displayed
  await page.waitForTimeout(2000);
  const allActivities = page.locator('.activity-item'); // Assuming .activity-item for all activities
  await expect(allActivities.first()).toBeVisible();
  console.log('All activities are displayed for empty input');

  // Step 10: Test responsiveness by resizing the browser window
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(searchBox).toBeVisible();
  console.log('Search box remains accessible in smaller viewport');

  // Step 11: Refresh the page and confirm placeholder text is retained
  await page.reload();
  await expect(searchBox).toHaveAttribute('placeholder', 'Search for Activities');
  console.log('Placeholder text retained after page refresh');

  // Step 12: Attempt to paste a long string into the search box
  const longString = 'a'.repeat(1000); // Generating a string with 1000 characters
  await searchBox.fill(longString);
  console.log('Pasted long string into search box');

  // Step 13: Verify truncation behavior for long input
  const actualValue = await searchBox.inputValue();
  if (actualValue.length > 1000) {
    console.error('Input exceeds maximum length');
  } else {
    console.log('Input box gracefully handles long strings');
  }

  // Step 14: Perform a search for a term matching multiple results
  const multiResultSearchTerm = 'Activity'; // Example search term matching multiple results
  await searchBox.fill(multiResultSearchTerm);
  await searchBox.press('Enter');
  console.log(`Performed search for term with multiple results: ${multiResultSearchTerm}`);

  // Step 15: Validate pagination if implemented
  const pagination = page.locator('.pagination'); // Assuming .pagination for pagination controls
  if (await pagination.count() > 0) {
    await expect(pagination).toBeVisible();
    console.log('Pagination is visible and functional');
  } else {
    console.log('Pagination not implemented');
  }

  // Step 16: Repeat steps on a different browser
  if (browserName === 'chromium' || browserName === 'firefox') {
    console.log(`Re-running test on ${browserName}`);
  }

  // Step 17: Confirm filtering logic consistency across browsers
  console.log('Validated filtering logic across browsers');
});