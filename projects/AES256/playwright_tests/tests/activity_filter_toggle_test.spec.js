const { test, expect } = require('@playwright/test');

test('Activity Filter Toggle Test', async ({ page, context }) => {
  // Step 1: Navigate to the page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  console.log('Navigated to the events page.');

  // Step 2: Verify the visibility of the "Show My Activities" filter toggle
  const showMyActivitiesButton = page.locator('button[data-testid="activity-view-toggle"]:has-text("Show My Activities")');
  await expect(showMyActivitiesButton).toBeVisible();
  console.log('Verified visibility of "Show My Activities" filter toggle.');

  // Step 3: Click on the "Show My Activities" filter
  await showMyActivitiesButton.click();
  console.log('Clicked on "Show My Activities" filter toggle.');

  // Step 4: Assert that the table updates to display activities belonging to the logged-in user
  const activitiesTable = page.locator('table[data-testid="activities-table"]');
  await expect(activitiesTable).toContainText('java-filter-test');
  await expect(activitiesTable).toContainText('golang-unit-gowork-sandbox');
  console.log('Verified the table displays activities belonging to the logged-in user.');

  // Step 5: Verify that the toggle button is visually activated
  await expect(showMyActivitiesButton).toHaveClass(/active/);
  console.log('Verified "Show My Activities" toggle button is active.');

  // Step 6: Click on the "Show All Activities" filter
  const showAllActivitiesButton = page.locator('button[data-testid="activity-view-toggle"]:has-text("Show All Activities")');
  await showAllActivitiesButton.click();
  console.log('Clicked on "Show All Activities" filter toggle.');

  // Step 7: Assert that the table updates to display all activities
  await expect(activitiesTable).toContainText('activity-1');
  await expect(activitiesTable).toContainText('activity-2');
  console.log('Verified the table displays all activities.');

  // Step 8: Verify that the toggle button switches state correctly
  await expect(showAllActivitiesButton).toHaveClass(/active/);
  console.log('Verified "Show All Activities" toggle button is active.');

  // Step 9: Perform a search while "Show My Activities" filter is active
  await showMyActivitiesButton.click();
  const searchInput = page.locator('input[placeholder="Search"]');
  await searchInput.fill('java');
  await page.keyboard.press('Enter');
  console.log('Performed search while "Show My Activities" filter is active.');

  // Step 10: Assert that search results only contain the logged-in user's activities matching the search term
  await expect(activitiesTable).toContainText('java-filter-test');
  await expect(activitiesTable).not.toContainText('activity-1');
  console.log('Verified search results are scoped to logged-in user activities.');

  // Step 11: Perform a search while "Show All Activities" filter is active
  await showAllActivitiesButton.click();
  await searchInput.fill('activity');
  await page.keyboard.press('Enter');
  console.log('Performed search while "Show All Activities" filter is active.');

  // Step 12: Assert that search results contain all matching activities regardless of user ownership
  await expect(activitiesTable).toContainText('activity-1');
  await expect(activitiesTable).toContainText('activity-2');
  console.log('Verified search results contain all matching activities.');

  // Step 13: Reload the page and verify persistence of the last toggle state
  await page.reload();
  await expect(showAllActivitiesButton).toHaveClass(/active/);
  console.log('Verified toggle state persists after page reload.');

  // Step 14: Test concurrent toggling in multiple tabs and assert state consistency
  const newTab = await context.newPage();
  await newTab.goto('https://dev.roost.ai/roostgpt/events');
  const newTabToggleButton = newTab.locator('button[data-testid="activity-view-toggle"]:has-text("Show All Activities")');
  await expect(newTabToggleButton).toHaveClass(/active/);
  console.log('Verified toggle state consistency across multiple tabs.');

  // Step 15: Toggle rapidly between the filters multiple times and verify performance stability
  for (let i = 0; i < 5; i++) {
    await showMyActivitiesButton.click();
    await showAllActivitiesButton.click();
  }
  await expect(showAllActivitiesButton).toHaveClass(/active/);
  console.log('Verified performance stability after rapid toggling.');

  console.log('Test completed successfully.');
});