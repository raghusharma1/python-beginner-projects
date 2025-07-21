const { test, expect } = require('@playwright/test');

test('Search Functionality Validation for Test Plans', async ({ page }) => {
  // Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  
  // Selector for the search box
  const searchBox = page.locator("input[data-testid='tests-search-box']");

  // Step 2: Verify visibility and enabled state of the search box
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();

  // Step 3: Type a valid search query and verify filtered results
  await searchBox.fill('test plan A');
  const validResult = page.locator('.test-plan-item:has-text("test plan A")');
  await expect(validResult).toBeVisible();

  // Step 5: Type an invalid query and verify no results are displayed
  await searchBox.fill('random_string');
  const noResultsMessage = page.locator('.no-results-message');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No test plans found');

  // Step 7: Type an edge case query and verify application stability
  await searchBox.fill('@#$%^&*');
  await expect(searchBox).toHaveValue('@#$%^&*');
  const edgeCaseResult = page.locator('.test-plan-item');
  await expect(edgeCaseResult).toHaveCount(0);

  // Step 9: Perform a case-insensitive search
  await searchBox.fill('TEST PLAN A');
  await expect(validResult).toBeVisible();

  // Step 10: Reload the page and ensure search box resets
  await page.reload();
  await expect(searchBox).toHaveValue('');

  // Step 11: Type a partial search query and verify matching results
  await searchBox.fill('test plan');
  const partialResults = page.locator('.test-plan-item');
  await expect(partialResults).toHaveCountGreaterThan(0);

  // Step 12: Test search with whitespace-only characters
  await searchBox.fill('     ');
  await expect(noResultsMessage).toBeVisible();
  await expect(noResultsMessage).toContainText('No test plans found');

  // Step 13: Verify accessibility with keyboard navigation
  await page.keyboard.press('Tab');
  await expect(searchBox).toBeFocused();

  // Step 14: Test responsiveness in different viewport sizes
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 768, height: 1024 },
    { width: 375, height: 667 },
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await expect(searchBox).toBeVisible();
  }

  // Step 15: Ensure results update dynamically without page reload
  const dynamicSearchQuery = 'test plan B';
  await searchBox.fill(dynamicSearchQuery);
  const dynamicResult = page.locator('.test-plan-item:has-text("test plan B")');
  await expect(dynamicResult).toBeVisible();

  // Edge case: Enter a very long string as the search query
  const longQuery = 'a'.repeat(1000);
  await searchBox.fill(longQuery);
  await expect(noResultsMessage).toBeVisible();

  // Edge case: Enter SQL injection-like strings
  const sqlInjectionQuery = "DROP TABLE test_plans;";
  await searchBox.fill(sqlInjectionQuery);
  await expect(noResultsMessage).toBeVisible();

  // Edge case: Enter query in non-supported language/encoding
  const nonSupportedQuery = '你好';
  await searchBox.fill(nonSupportedQuery);
  await expect(noResultsMessage).toBeVisible();

  // Edge case: Perform rapid consecutive searches
  const queries = ['test plan A', 'random_string', '@#$%^&*'];
  for (const query of queries) {
    await searchBox.fill(query);
    await page.waitForTimeout(200); // Simulate rapid input
  }

  // Performance and stability checks
  const startTime = Date.now();
  await searchBox.fill('test plan B');
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  console.log(`Search response time: ${responseTime}ms`);
  expect(responseTime).toBeLessThan(500);

  console.log('Search functionality validation completed successfully.');
});