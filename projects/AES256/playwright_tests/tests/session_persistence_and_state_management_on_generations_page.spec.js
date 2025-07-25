const { test, expect } = require('@playwright/test');

test('Session Persistence and State Management on Generations Page', async ({ page }) => {
  // Step 1: Navigate to the Generations page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to Generations page.');

  // Step 2: Type a search term into the input box
  const searchBox = page.locator("input[data-testid='events-search-box']");
  await searchBox.fill('Recent Activities');
  console.log('Search term entered: "Recent Activities".');

  // Step 3: Verify the filtered results match the search term
  const filteredResults = page.locator('.filtered-results'); // Adjust selector based on actual DOM
  await expect(filteredResults).toContainText('Recent Activities');
  console.log('Verified filtered results match the search term.');

  // Step 4: Refresh the browser page
  await page.reload();
  console.log('Page refreshed.');

  // Step 5: Verify the search term persists and the results remain filtered
  await expect(searchBox).toHaveValue('Recent Activities');
  await expect(filteredResults).toContainText('Recent Activities');
  console.log('Verified search term and filtered results persist after refresh.');

  // Step 6: Clear the search box and confirm all activities reload correctly
  await searchBox.fill('');
  await searchBox.press('Enter'); // Assuming Enter triggers reload
  const allActivities = page.locator('.all-activities'); // Adjust selector based on actual DOM
  await expect(allActivities).toBeVisible();
  console.log('Cleared search box and verified all activities are visible.');

  // Step 7: Resize the browser window and confirm layout adjusts
  await page.setViewportSize({ width: 800, height: 600 });
  const responsiveLayout = page.locator('.responsive-layout'); // Adjust selector based on actual DOM
  await expect(responsiveLayout).toBeVisible();
  console.log('Verified responsive layout after resizing browser.');

  // Step 8: Navigate to a different tab or page
  const testPlansLink = page.locator("a[href='/roostgpt/tests']");
  await testPlansLink.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans page.');

  // Perform an action on the Test Plans page (dummy assertion for this example)
  const testPlansHeader = page.locator('h1:has-text("Test Plans")');
  await expect(testPlansHeader).toBeVisible();
  console.log('Verified Test Plans page loaded successfully.');

  // Step 9: Return to the Generations page via the navbar link
  const generationsLink = page.locator("a[href='/roostgpt/events']");
  await generationsLink.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/events');
  console.log('Returned to Generations page.');

  // Step 10: Verify the search term and results persist despite navigation
  await expect(searchBox).toHaveValue('Recent Activities');
  await expect(filteredResults).toContainText('Recent Activities');
  console.log('Verified search term and filtered results persist after navigation.');
});