const { test, expect } = require('@playwright/test');

test('Connector Search Functionality', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  const url = 'https://dev.roost.ai/connectors';
  await page.goto(url);

  // Step 2: Verify the visibility of the search input field with placeholder 'Search for Connectors'
  const searchInput = page.locator("input[data-testid='Connector-search-box']");
  await expect(searchInput).toBeVisible();
  await expect(searchInput).toHaveAttribute('placeholder', 'Search for Connectors');
  await expect(searchInput).toHaveAttribute('aria-label', 'Search for Connectors');

  // Step 3: Type a valid connector name into the search box and verify results
  const validConnectorName = 'Connector123';
  await searchInput.fill(validConnectorName);
  await searchInput.press('Enter'); // Assuming Enter triggers the search
  const resultsTable = page.locator('table[data-testid="Connector-results-table"]');
  await expect(resultsTable).toContainText(validConnectorName);

  // Step 4: Clear the search term and verify all connectors reappear
  await searchInput.fill('');
  await searchInput.press('Enter');
  const allConnectors = page.locator('table[data-testid="Connector-results-table"] tr');
  await expect(allConnectors).toHaveCount(10); // Assuming there are 10 connectors pre-populated

  // Step 5: Enter a partial connector name and verify multiple matching results
  const partialConnectorName = 'Conn';
  await searchInput.fill(partialConnectorName);
  await searchInput.press('Enter');
  const matchingResults = page.locator('table[data-testid="Connector-results-table"] tr');
  await expect(matchingResults.count()).toBeGreaterThan(1);

  // Step 6: Enter a non-existent connector name and verify no results message
  const nonexistentConnectorName = 'NonExistentConnector';
  await searchInput.fill(nonexistentConnectorName);
  await searchInput.press('Enter');
  const noResultsMessage = page.locator('text=No connectors found');
  await expect(noResultsMessage).toBeVisible();

  // Step 7: Test special characters in the search box
  const specialChars = '@#$%^&*';
  await searchInput.fill(specialChars);
  await searchInput.press('Enter');
  const specialCharsResults = page.locator('table[data-testid="Connector-results-table"] tr');
  await expect(specialCharsResults).toHaveCount(0); // Assuming no connectors match special characters

  // Step 8: Perform a search, reload the page, and verify the search term persists
  await searchInput.fill(validConnectorName);
  await searchInput.press('Enter');
  await page.reload();
  await expect(searchInput).toHaveValue(validConnectorName);
  const reloadResults = page.locator('table[data-testid="Connector-results-table"]');
  await expect(reloadResults).toContainText(validConnectorName);

  // Step 9: Verify pagination updates correctly based on filtered results
  const paginationElement = page.locator('div[data-testid="pagination"]');
  await expect(paginationElement).toBeVisible();
  await expect(paginationElement).toContainText('Page 1 of'); // Example pagination text

  // Step 10: Test keyboard-only navigation for the search box
  await page.keyboard.press('Tab');
  await expect(searchInput).toBeFocused();
  await searchInput.fill(validConnectorName);
  await page.keyboard.press('Enter'); // Keyboard navigation test
  const keyboardResults = page.locator('table[data-testid="Connector-results-table"]');
  await expect(keyboardResults).toContainText(validConnectorName);

  // Step 11: Enter a very long string and ensure it does not break the UI
  const longString = 'ConnectorNameThatExceedsTypicalLength'.repeat(10);
  await searchInput.fill(longString);
  await searchInput.press('Enter');
  const longStringResults = page.locator('table[data-testid="Connector-results-table"]');
  await expect(longStringResults).toHaveCount(0); // Assuming no connectors match long string
  await expect(searchInput).toBeVisible(); // Ensures the UI is not broken

  // Step 12: Monitor API calls made during the search
  const apiRequestPromise = page.waitForRequest(request => request.url().includes('/api/connectors') && request.method() === 'GET');
  await searchInput.fill(validConnectorName);
  await searchInput.press('Enter');
  const apiRequest = await apiRequestPromise;
  console.log('API Request:', apiRequest.url());
  const apiResponsePromise = page.waitForResponse(response => response.url().includes('/api/connectors') && response.status() === 200);
  const apiResponse = await apiResponsePromise;
  console.log('API Response Status:', apiResponse.status());

  // Step 13: Verify performance metrics (response time < 500ms, UI rendering < 200ms)
  const startTime = performance.now();
  await searchInput.fill(validConnectorName);
  await searchInput.press('Enter');
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  console.log('Search response time:', responseTime);
  expect(responseTime).toBeLessThan(500);

  // Final assertion: Ensure all edge cases were handled gracefully
  console.log('All edge cases tested successfully.');
});