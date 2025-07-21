const { test, expect } = require('@playwright/test');

test('Analyze Test Activities Workflow', async ({ page }) => {
  // Step 1: Navigate to the analyses page
  await page.goto('https://dev.roost.ai/roostgpt/analyses');
  
  // Step 2: Assert the page title
  await expect(page).toHaveTitle('Roost AI | Your Testing Co-Pilot Powered by Generative AI and Large Language Models');

  // Step 3: Verify the presence of filters for test activity status
  const filterDropdown = page.locator('select[data-testid="activity-filter-dropdown"]');
  await expect(filterDropdown).toBeVisible();
  
  // Step 4: Select the 'In Progress' filter and assert results
  await filterDropdown.selectOption('In Progress');
  const inProgressActivities = page.locator('div[data-status="In Progress"]');
  await expect(inProgressActivities).toBeVisible();

  // Step 5: Select the 'Failed' filter and assert results
  await filterDropdown.selectOption('Failed');
  const failedActivities = page.locator('div[data-status="Failed"]');
  await expect(failedActivities).toBeVisible();

  // Step 6: Toggle 'Auto-refresh' and assert periodic updates
  const autoRefreshCheckbox = page.locator('input[data-testid="auto-refresh-checkbox"]');
  await autoRefreshCheckbox.check();
  await page.waitForTimeout(6000); // Assuming the auto-refresh interval is 5 seconds
  await expect(autoRefreshCheckbox).toBeChecked();

  // Step 7: Select 'My Activities' and verify results
  const myActivitiesButton = page.locator('button:has-text("My Activities")');
  await myActivitiesButton.click();
  const myActivities = page.locator('div[data-user="current"]'); // Adjust selector based on implementation
  await expect(myActivities).toBeVisible();

  // Step 8: Select 'All Activities' and verify results
  const allActivitiesButton = page.locator('button:has-text("All Activities")');
  await allActivitiesButton.click();
  const allActivities = page.locator('div[data-user]');
  await expect(allActivities).toBeVisible();

  // Step 9: Refresh the page and assert persistent filters
  await page.reload();
  await expect(filterDropdown).toHaveValue('Failed'); // Assuming 'Failed' was the last selected value

  // Step 10: Perform a manual refresh and verify data updates
  await page.locator('button[data-testid="refresh-button"]').click();
  await page.waitForTimeout(1000); // Wait for manual refresh to complete
  await expect(failedActivities).toBeVisible();

  // Step 11: Click a specific test activity and navigate to detailed view
  const activityDetailLink = page.locator('a[data-testid="activity-detail-link"]').first();
  await activityDetailLink.click();
  await page.waitForURL(/\/analyses\/\d+/); // Assume the URL changes to include the activity ID

  // Step 12: Verify detailed activity information
  const testName = page.locator('h1[data-testid="test-name"]');
  const updateTimestamps = page.locator('span[data-testid="update-timestamp"]');
  const analysisStatus = page.locator('div[data-testid="analysis-status"]');
  await expect(testName).toBeVisible();
  await expect(updateTimestamps).toBeVisible();
  await expect(analysisStatus).toBeVisible();

  // Step 13: Navigate back to the main analyses page and assert filters
  await page.goto('https://dev.roost.ai/roostgpt/analyses');
  await expect(filterDropdown).toHaveValue('Failed');

  // Step 14: Simulate a network failure during auto-refresh
  await page.route('**/api/test-activities', route => route.abort('failed'));
  await autoRefreshCheckbox.check();
  await page.waitForTimeout(6000);
  const errorMessage = page.locator('div[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();

  // Step 15: Restore network connectivity and assert auto-refresh resumes
  await page.unroute('**/api/test-activities');
  await page.route('**/api/test-activities', route => route.continue());
  await page.waitForTimeout(6000);
  await expect(errorMessage).not.toBeVisible();

  // Step 16: Validate sorting by timestamp
  const timestampSortButton = page.locator('button[data-testid="sort-timestamp"]');
  await timestampSortButton.click();
  const firstActivityTimestamp = await page.locator('div[data-testid="activity-timestamp"]').first().innerText();
  const lastActivityTimestamp = await page.locator('div[data-testid="activity-timestamp"]').last().innerText();
  expect(new Date(firstActivityTimestamp) <= new Date(lastActivityTimestamp)).toBeTruthy();

  // Step 17: Validate sorting by status
  const statusSortButton = page.locator('button[data-testid="sort-status"]');
  await statusSortButton.click();
  const firstActivityStatus = await page.locator('div[data-testid="activity-status"]').first().innerText();
  const lastActivityStatus = await page.locator('div[data-testid="activity-status"]').last().innerText();
  expect(firstActivityStatus.localeCompare(lastActivityStatus)).toBeLessThanOrEqual(0);

  // Step 18: Test search functionality
  const searchInput = page.locator('input[data-testid="search-input"]');
  await searchInput.fill('TestActivity123');
  await page.waitForTimeout(1000); // Allow time for search results to populate
  const searchResults = page.locator('div[data-testid="search-result"]');
  await expect(searchResults).toContainText('TestActivity123');
});