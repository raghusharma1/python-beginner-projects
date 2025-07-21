const { test, expect } = require('@playwright/test');

test('Pagination Functionality Validation', async ({ page }) => {
  // Step 1: Navigate to the Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans page.');

  // Step 2: Verify visibility and enabled state of pagination controls
  const paginationSelectors = [
    { selector: "button[data-testid='arrow-icon']", label: 'Next' },
    { selector: "button[data-testid='arrow-left']", label: 'Previous' },
    { selector: "button[data-testid='paginator-first-page-button']", label: 'First' },
    { selector: "button[data-testid='paginator-last-page-button']", label: 'Last' }
  ];
  for (const { selector, label } of paginationSelectors) {
    const element = page.locator(selector);
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
    console.log(`Verified visibility and enabled state of ${label} button.`);
  }

  // Step 3: Click the 'Next' button and verify navigation
  await page.locator("button[data-testid='arrow-icon']").click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests?page=2');
  console.log('Navigated to the next page.');

  // Step 4: Click the 'Previous' button and verify navigation
  await page.locator("button[data-testid='arrow-left']").click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests?page=1');
  console.log('Navigated to the previous page.');

  // Step 5: Click on a specific page number (e.g., '2') and ensure the correct page is displayed
  const pageNumber2 = page.locator("button[data-testid='paginator-page-button']:has-text('2')");
  await pageNumber2.click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests?page=2');
  console.log('Navigated to page 2.');

  // Step 6: Click the 'First' button to navigate to the first page and verify results
  await page.locator("button[data-testid='paginator-first-page-button']").click();
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests?page=1');
  console.log('Navigated to the first page.');

  // Step 7: Click the 'Last' button to navigate to the last page and verify results
  await page.locator("button[data-testid='paginator-last-page-button']").click();
  await page.waitForURL(/https:\/\/dev\.roost\.ai\/roostgpt\/tests\?page=\d+$/); // Dynamic last page number
  console.log('Navigated to the last page.');

  // Step 8: Reload the page and verify the pagination state resets to the first page
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests?page=1');
  console.log('Verified pagination state reset after page reload.');

  // Step 9: Simulate navigation to a page with no test plans and verify the message
  await page.goto('https://dev.roost.ai/roostgpt/tests?page=10'); // Assuming page 10 is empty
  const emptyMessage = page.locator("text='No test plans found'");
  await expect(emptyMessage).toBeVisible();
  console.log('Verified appropriate message displayed for empty page.');

  // Step 10: Test keyboard navigation for pagination controls
  await page.keyboard.press('Tab');
  const focusedElement = await page.evaluate(() => document.activeElement.getAttribute('data-testid'));
  console.log('Focused element after Tab key press:', focusedElement);

  // Step 11: Verify responsiveness in different viewport sizes
  const viewports = [
    { width: 1920, height: 1080 }, // Desktop
    { width: 768, height: 1024 }, // Tablet
    { width: 375, height: 812 }   // Mobile
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    console.log(`Set viewport size to ${viewport.width}x${viewport.height}.`);
    for (const { selector, label } of paginationSelectors) {
      const element = page.locator(selector);
      await expect(element).toBeVisible();
      console.log(`Verified ${label} button is visible in viewport ${viewport.width}x${viewport.height}.`);
    }
  }

  // Step 12: Perform rapid consecutive clicks on pagination controls to test stability
  for (let i = 0; i < 5; i++) {
    await page.locator("button[data-testid='arrow-icon']").click();
    await page.waitForURL(/https:\/\/dev\.roost\.ai\/roostgpt\/tests\?page=\d+/);
  }
  console.log('Performed rapid consecutive clicks on Next button.');

  // Step 13: Verify pagination controls are disabled when on the first/last page
  await page.goto('https://dev.roost.ai/roostgpt/tests?page=1');
  await expect(page.locator("button[data-testid='arrow-left']")).toBeDisabled();
  console.log('Verified Previous button is disabled on the first page.');

  const lastPage = '50'; // Assuming last page is page 50
  await page.goto(`https://dev.roost.ai/roostgpt/tests?page=${lastPage}`);
  await expect(page.locator("button[data-testid='arrow-icon']")).toBeDisabled();
  console.log('Verified Next button is disabled on the last page.');

  // Step 14: Simulate backend failure during pagination
  await page.route('/api/test-plans?page=9999', route => route.abort('failed'));
  await page.goto('https://dev.roost.ai/roostgpt/tests?page=9999');
  const errorMessage = page.locator("text='Error loading test plans'");
  await expect(errorMessage).toBeVisible();
  console.log('Verified error handling for backend failure during pagination.');
});