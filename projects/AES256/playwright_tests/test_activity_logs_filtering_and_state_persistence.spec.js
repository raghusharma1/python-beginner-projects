const { test, expect } = require('@playwright/test');

test('Test Activity Logs Filtering and State Persistence', async ({ page }) => {
  // Step 1: Navigate to the test activity logs page
  await page.goto('https://dev.roost.ai/roostgpt/events');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');

  // Step 2: Assert that the logs table is visible and populated
  const logsTable = page.locator('table[data-testid="logs-table"]');
  await expect(logsTable).toBeVisible();
  await expect(logsTable.locator('tbody > tr')).toHaveCountGreaterThan(0);

  // Step 3: Click on the filter dropdown and select 'In-Progress'
  const filterDropdown = page.locator('select[data-testid="filter-dropdown"]');
  await filterDropdown.click();
  await filterDropdown.selectOption({ label: 'In-Progress' });

  // Step 4: Verify that the table updates to display only 'In-Progress' tests
  const filteredLogs = page.locator('tbody > tr');
  await expect(filteredLogs).toHaveCountGreaterThan(0);
  await expect(filteredLogs.first()).toContainText('In-Progress');

  // Step 5: Enable the auto-refresh toggle
  const autoRefreshToggle = page.locator('input[data-testid="auto-refresh-toggle"]');
  await autoRefreshToggle.click();
  await expect(autoRefreshToggle).toBeChecked();

  // Step 6: Wait for 30 seconds and verify new logs are added (if applicable)
  await page.waitForTimeout(30000); // Simulate waiting for auto-refresh
  const refreshedLogs = page.locator('tbody > tr');
  await expect(refreshedLogs).toHaveCountGreaterThan(0);

  // Step 7: Reload the page
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');

  // Step 8: Verify that the filter setting persists after reload
  const persistedFilter = page.locator('select[data-testid="filter-dropdown"]');
  await expect(persistedFilter).toHaveValue('In-Progress');

  // Step 9: Clear the filter and verify the table displays all logs
  await filterDropdown.selectOption({ label: 'All' });
  const allLogs = page.locator('tbody > tr');
  await expect(allLogs).toHaveCountGreaterThan(0);

  // Step 10: Perform a search query in the search input field
  const searchInput = page.locator('input[data-testid="search-input"]');
  await searchInput.fill('Specific Test Name');
  await searchInput.press('Enter');

  // Step 11: Verify that the results match the search criteria
  const searchResults = page.locator('tbody > tr');
  await expect(searchResults).toHaveCountGreaterThan(0);
  await expect(searchResults.first()).toContainText('Specific Test Name');

  // Step 12: Click on a test activity log entry to view detailed information
  const logEntry = page.locator('a[data-testid="log-entry"]').first();
  await logEntry.click();

  // Step 13: Verify that the detailed information panel displays correct data
  const detailsPanel = page.locator('div[data-testid="log-details-panel"]');
  await expect(detailsPanel).toBeVisible();
  await expect(detailsPanel).toContainText('Specific Test Name');

  // Step 14: Close the detailed information panel
  const closeButton = page.locator('button[data-testid="close-details"]');
  await closeButton.click();
  await expect(detailsPanel).not.toBeVisible();

  // Step 15: Test the pagination controls
  const paginationNextButton = page.locator('button[data-testid="pagination-next"]');
  await paginationNextButton.click();

  // Step 16: Verify that the logs displayed match the expected data for the selected page
  const nextPageLogs = page.locator('tbody > tr');
  await expect(nextPageLogs).toHaveCountGreaterThan(0);

  // Step 17: Trigger an intentional network failure
  await page.context().setOffline(true);

  // Step 18: Verify that the application displays an appropriate error message
  const errorMessage = page.locator('div[data-testid="network-error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Network Error');

  // Step 19: Re-enable the network and refresh the page
  await page.context().setOffline(false);
  await page.reload();

  // Step 20: Verify that the application recovers gracefully
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/events');
  const recoveredLogs = page.locator('tbody > tr');
  await expect(recoveredLogs).toHaveCountGreaterThan(0);
});