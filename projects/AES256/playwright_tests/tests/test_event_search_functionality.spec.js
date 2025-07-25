const { test, expect } = require('@playwright/test');

test('Test Event Search Functionality', async ({ page, browser }) => {
  // Data requirements
  const validActivityName = 'java-filter-test';
  const nonexistentActivityName = 'nonexistent-test-name';
  const specialCharacters = '!@#$%^&*';
  const longString = 'a'.repeat(500);
  const emptyString = '';

  // Navigate to the events page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');

  // Step 2: Verify the visibility of the search input box
  const searchBox = page.locator("input[data-testid='events-search-box']");
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toHaveAttribute('placeholder', 'Search for Activities');

  // Step 3: Type a valid activity name and perform the search
  await searchBox.fill(validActivityName);
  await searchBox.press('Enter'); // Simulate pressing Enter key
  await page.waitForTimeout(1000); // Wait for potential UI updates

  // Step 5: Verify filtered results
  const tableRows = page.locator('table tbody tr');
  await expect(tableRows).toContainText(validActivityName); // Verify table displays matching results

  // Step 6: Clear the search box and verify table resets
  await searchBox.fill(emptyString);
  await searchBox.press('Enter');
  await page.waitForTimeout(1000);
  await expect(tableRows).not.toContainText(validActivityName); // Verify all activities are displayed

  // Step 7: Search with an invalid activity name
  await searchBox.fill(nonexistentActivityName);
  await searchBox.press('Enter');
  await page.waitForTimeout(1000);

  // Step 8: Verify "No results found" message
  const noResultsMessage = page.locator('text=No results found');
  await expect(noResultsMessage).toBeVisible();

  // Step 9: Reload the page and verify state persistence
  await page.reload();
  await expect(searchBox).toHaveValue(nonexistentActivityName); // Verify search input retains its value

  // Step 10: Search with special characters
  await searchBox.fill(specialCharacters);
  await searchBox.press('Enter');
  await page.waitForTimeout(1000);
  await expect(tableRows).toContainText('No results found', { timeout: 3000 }); // Ensure no crash or unexpected behavior

  // Step 11: Test responsiveness by resizing the browser
  const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const mobilePage = await context.newPage();
  await mobilePage.goto('https://dev.roost.ai/roostgpt/events');
  const mobileSearchBox = mobilePage.locator("input[data-testid='events-search-box']");
  await expect(mobileSearchBox).toBeVisible(); // Verify search box remains functional
  await mobilePage.close();

  // Step 12: Verify accessibility via keyboard navigation
  await page.keyboard.press('Tab');
  await expect(searchBox).toBeFocused();

  // Step 13: Test filters with searches
  const showMyActivitiesButton = page.locator('button:has-text("Show My Activities")');
  const showAllActivitiesButton = page.locator('button:has-text("Show All Activities")');

  // Toggle "Show My Activities" filter
  await showMyActivitiesButton.click();
  await searchBox.fill(validActivityName);
  await searchBox.press('Enter');
  await page.waitForTimeout(1000);
  await expect(tableRows).toContainText(validActivityName);

  // Toggle "Show All Activities" filter
  await showAllActivitiesButton.click();
  await searchBox.fill(validActivityName);
  await searchBox.press('Enter');
  await page.waitForTimeout(1000);
  await expect(tableRows).toContainText(validActivityName);

  // Step 15: Test concurrent searches across tabs
  const secondPage = await browser.newPage();
  await secondPage.goto('https://dev.roost.ai/roostgpt/events');
  const secondSearchBox = secondPage.locator("input[data-testid='events-search-box']");
  await secondSearchBox.fill(validActivityName);
  await secondSearchBox.press('Enter');
  await secondPage.waitForTimeout(1000);
  const secondTableRows = secondPage.locator('table tbody tr');
  await expect(secondTableRows).toContainText(validActivityName);
  await secondPage.close();

  console.log('Test completed successfully!');
});