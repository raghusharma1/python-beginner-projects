const { test, expect } = require('@playwright/test');

test('Pagination Navigation and Edge Handling', async ({ page }) => {
  const baseUrl = 'https://dev.roost.ai/connectors';

  // Step 1: Navigate to the page
  await page.goto(baseUrl);
  await expect(page).toHaveURL(baseUrl);
  console.log('Navigated to connectors page');

  // Step 2: Verify visibility of pagination controls
  const firstButton = page.locator('button[data-testid="paginator-first-page-button"]');
  const previousButton = page.locator('button[data-testid="arrow-left"]');
  const nextButton = page.locator('button[data-testid="arrow-icon"]');
  const lastButton = page.locator('button[data-testid="paginator-last-page-button"]');
  
  await expect(firstButton).toBeVisible();
  await expect(previousButton).toBeVisible();
  await expect(nextButton).toBeVisible();
  await expect(lastButton).toBeVisible();
  console.log('Pagination controls are visible');

  // Step 3: Click on 'Next' button and verify navigation
  await nextButton.click();
  await page.waitForURL(/page=\d+/); // Wait for page change query param
  console.log('Navigated to next page');

  // Step 4: Click on 'Last' button and verify navigation
  await lastButton.click();
  await page.waitForURL(/page=\d+/);
  console.log('Navigated to last page');

  // Step 5: Verify 'Next' button is disabled on the last page
  await expect(nextButton).toBeDisabled();
  console.log('Verified Next button is disabled on the last page');

  // Step 6: Click on 'Previous' button and verify navigation
  await previousButton.click();
  await page.waitForURL(/page=\d+/);
  console.log('Navigated to previous page');

  // Step 7: Click on 'First' button and verify navigation
  await firstButton.click();
  await page.waitForURL(baseUrl); // Verify URL is reset to the first page
  console.log('Navigated to first page');

  // Step 8: Verify 'Previous' button is disabled on the first page
  await expect(previousButton).toBeDisabled();
  console.log('Verified Previous button is disabled on the first page');

  // Step 9: Navigate to a specific page by clicking its number
  const pageTwoButton = page.locator('button:contains("2")');
  await pageTwoButton.click();
  await page.waitForURL(/page=2/);
  console.log('Navigated to the second page');

  // Step 10: Verify correct page is displayed after clicking page number
  await expect(page.locator('button:contains("2")')).toHaveClass(/active/);
  console.log('Verified correct page is displayed');

  // Step 11: Test rapid navigation by clicking 'Next' multiple times
  for (let i = 0; i < 5; i++) {
    await nextButton.click();
    await page.waitForURL(/page=\d+/);
  }
  console.log('Rapid navigation via Next button tested');

  // Step 12: Verify pagination updates are not delayed
  const currentPage = await page.locator('button:contains("active")').innerText();
  console.log(`Rapid navigation resulted in current page: ${currentPage}`);

  // Step 13: Refresh the page and verify state persists to first page
  await page.reload();
  await expect(page).toHaveURL(baseUrl);
  console.log('Verified state persists to the first page after refresh');

  // Step 14: Attempt to navigate to a non-existent page via URL manipulation
  await page.goto(`${baseUrl}?page=999`);
  await expect(page.locator('text="Error: Page not found"')).toBeVisible();
  console.log('Verified error message for non-existent page');

  // Step 15: Verify fallback for invalid page navigation
  await page.goto(`${baseUrl}?page=-1`);
  await expect(page).toHaveURL(baseUrl);
  console.log('Verified fallback to first page for invalid navigation');
});