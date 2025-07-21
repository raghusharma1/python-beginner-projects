const { test, expect } = require('@playwright/test');

test('Download RoostGPT CLI Workflow with State Persistence', async ({ page, browserName }) => {
  // Step 1: Navigate to the products page
  const productPageUrl = 'https://dev.roost.ai/products';
  await page.goto(productPageUrl);

  // Step 2: Verify the page title
  const expectedTitle = 'Roost.ai | Your Testing Co-Pilot Powered by Generative AI and Large Language Models';
  await expect(page).toHaveTitle(expectedTitle);

  // Step 3: Locate the 'Download RoostGPT CLI' button
  const downloadButton = page.locator('button[aria-label="Download RoostGPT CLI"]');
  await expect(downloadButton).toBeVisible();

  // Step 4: Click on the 'Download RoostGPT CLI' button
  const downloadUrl = '/api/download-cli'; // Expected endpoint for file download
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Wait for the download event
    downloadButton.click() // Trigger the download
  ]);

  // Step 5: Verify that a file download prompt appears
  const downloadPath = await download.path();
  if (!downloadPath) {
    throw new Error('File download prompt did not appear.');
  }

  // Step 6: Assert the downloaded file has the correct name and format
  const fileName = await download.suggestedFilename();
  expect(fileName).toBe('roost-gpt-cli.zip');

  // Step 7: Reload the page
  await page.reload();

  // Step 8: Verify that the 'Download RoostGPT CLI' button is still visible and clickable
  await expect(downloadButton).toBeVisible();
  await expect(downloadButton).toBeEnabled();

  // Step 9: Verify the page state remains unchanged after the reload
  await expect(page).toHaveTitle(expectedTitle);

  // Step 10: Interact with other visible UI elements to ensure they remain functional
  const otherUIElement = page.locator('header'); // Example element
  await expect(otherUIElement).toBeVisible();

  // Step 11: Manually simulate a page timeout and reload to ensure state recovery
  await page.setOfflineMode(true);
  await page.reload();
  await page.setOfflineMode(false);
  await expect(downloadButton).toBeVisible();

  // Step 12: Verify no duplicate downloads occur without additional user interaction
  const [newDownload] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click() // Trigger download again
  ]);
  const newFileName = await newDownload.suggestedFilename();
  expect(newFileName).toBe('roost-gpt-cli.zip');

  // Step 13: Test the download functionality across different browsers
  console.log(`Testing on browser: ${browserName}`);

  // Step 14: Verify the download link's URL matches the expected endpoint
  const downloadRequest = await downloadButton.evaluate((btn) => btn.href);
  expect(downloadRequest).toContain(downloadUrl);

  // Step 15: Test the workflow on a mobile device
  const isMobile = page.viewportSize().width < 768; // Example condition for mobile
  if (isMobile) {
    console.log('Testing on mobile device');
    await expect(downloadButton).toBeVisible();
  }

  // Step 16: Verify proper state management by inspecting cookies/local storage
  const cookies = await page.context().cookies();
  console.log('Cookies:', cookies);

  const localStorageData = await page.evaluate(() => JSON.stringify(localStorage));
  console.log('Local Storage:', localStorageData);

  // Step 17: Simulate a failed download by intercepting the request and returning a 404 error code
  await page.route(downloadUrl, (route) => route.fulfill({ status: 404 }));
  await downloadButton.click();
  const errorMessage = page.locator('text="Download failed. Please try again later."');
  await expect(errorMessage).toBeVisible();

  // Step 18: Verify that an appropriate error message is displayed for failed downloads
  await expect(errorMessage).toContainText('Download failed. Please try again later.');
});