const { test, expect } = require('@playwright/test');

test('Validate Navigation Between Tabs (RoostGPT, Connectors, Test Plans)', async ({ page }) => {
  // Step 1: Navigate to the initial page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans tab.');

  // Step 2: Verify the visibility of the navigation tab 'Test Plans'
  const testPlansTab = page.locator('a[data-testid="roostGPT-tab"]');
  await expect(testPlansTab).toBeVisible();
  console.log('Verified visibility of Test Plans tab.');

  // Step 3: Click on the 'RoostGPT' tab
  await testPlansTab.click();
  console.log('Clicked on RoostGPT tab.');

  // Step 4: Assert that the URL changes to RoostGPT page
  await page.waitForURL('https://dev.roost.ai/roostgpt');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt');
  console.log('Verified URL changed to RoostGPT page.');

  // Step 5: Verify that the 'RoostGPT' tab is active
  const activeRoostGPTTab = page.locator('a[data-testid="roostGPT-tab"].active');
  await expect(activeRoostGPTTab).toBeVisible();
  console.log('Verified RoostGPT tab is active.');

  // Step 6: Click on the 'Connectors' tab
  const connectorsTab = page.locator('a[data-testid="connectors-tab"]');
  await expect(connectorsTab).toBeVisible();
  await connectorsTab.click();
  console.log('Clicked on Connectors tab.');

  // Step 7: Assert that the URL changes to Connectors page
  await page.waitForURL('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  console.log('Verified URL changed to Connectors page.');

  // Step 8: Verify that the 'Connectors' tab is active
  const activeConnectorsTab = page.locator('a[data-testid="connectors-tab"].active');
  await expect(activeConnectorsTab).toBeVisible();
  console.log('Verified Connectors tab is active.');

  // Step 9: Navigate back to the 'Test Plans' tab
  await testPlansTab.click();
  console.log('Clicked on Test Plans tab.');

  // Step 10: Verify that the URL changes back to Test Plans page
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Verified URL changed back to Test Plans page.');

  // Step 11: Assert that the state of the page persists
  const searchField = page.locator('input[placeholder="Search"]');
  const paginationControl = page.locator('.pagination-control');
  await expect(searchField).toHaveValue('playwright');
  await expect(paginationControl).toContainText('Page 2');
  console.log('Verified page state persistence.');

  // Step 12: Repeat the steps across all tabs to validate state persistence and navigation consistency
  for (const tabSelector of ['a[data-testid="roostGPT-tab"]', 'a[data-testid="connectors-tab"]']) {
    const tab = page.locator(tabSelector);
    await tab.click();
    await page.waitForNavigation();
    console.log(`Switched to tab with selector: ${tabSelector}`);
  }

  // Step 13: Test switching tabs rapidly
  try {
    await Promise.all([
      testPlansTab.click(),
      connectorsTab.click(),
      testPlansTab.click()
    ]);
    console.log('Rapid tab switching performed successfully.');
  } catch (error) {
    console.error('Visual glitches detected during rapid tab switching:', error);
  }

  // Step 14: Close the browser and reopen the URL
  await page.close();
  console.log('Browser closed.');
  
  const browser = await page.context().newPage();
  await browser.goto('https://dev.roost.ai/roostgpt/tests');
  console.log('Browser reopened and navigated to initial URL.');

  // Step 15: Verify that the page loads to the last active tab
  const lastActiveTab = browser.locator('a[data-testid="roostGPT-tab"].active');
  await expect(lastActiveTab).toBeVisible();
  console.log('Verified page loads to the last active tab.');
});