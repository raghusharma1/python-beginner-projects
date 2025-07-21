const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Download and Verify RoostGPT CLI Installation', async ({ page }) => {
  // Step 1: Navigate to the 'Products' page
  const productsPageUrl = 'https://dev.roost.ai/products';
  await page.goto(productsPageUrl);

  // Step 2: Verify the page has loaded correctly
  await expect(page).toHaveURL(productsPageUrl);
  await expect(page).toHaveTitle(/Products/i); // Assuming the page title contains "Products"

  // Step 3: Locate the download button for the CLI
  const downloadButton = page.locator('button[data-testid="download-cli"]');
  await expect(downloadButton).toBeVisible();

  // Step 4: Click the download button and confirm download starts
  const downloadPath = path.join(__dirname, 'downloads'); // Directory for downloads
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }
  await page.setDownloadBehavior({
    behavior: 'allow',
    downloadPath: downloadPath,
  });
  await downloadButton.click();

  // Step 5: Monitor download progress and ensure file is downloaded
  let downloadedFilePath;
  try {
    const download = await page.waitForEvent('download', { timeout: 60000 }); // Wait for download event
    downloadedFilePath = await download.path();
    console.log(`Downloaded file path: ${downloadedFilePath}`);
    expect(downloadedFilePath).toBeTruthy(); // Ensure the download path exists
  } catch (error) {
    console.error('Error during download:', error);
    throw error;
  }

  // Step 6: Verify the downloaded file's properties
  try {
    const fileStats = fs.statSync(downloadedFilePath);
    expect(fileStats.size).toBeGreaterThan(0); // Ensure file is not empty
    console.log(`Downloaded file size: ${fileStats.size} bytes`);
  } catch (error) {
    console.error('Error verifying downloaded file:', error);
    throw error;
  }

  // Step 7: Locate and click the CLI Documentation link
  const cliDocumentationLink = page.locator('a[href*="/documentation/cli"]');
  await expect(cliDocumentationLink).toBeVisible();
  await cliDocumentationLink.click();

  // Step 8: Verify navigation to the CLI documentation page
  await page.waitForNavigation();
  await expect(page).toHaveURL(/\/documentation\/cli/);

  // Step 9: Validate CLI installation instructions are present
  const installationInstructions = page.locator('text=Installation Instructions');
  await expect(installationInstructions).toBeVisible();

  // Step 10: Validate CLI command examples are accessible
  const sampleCommand = page.locator('code:has-text("roostgpt --help")');
  await expect(sampleCommand).toBeVisible();

  // Step 11: Check accessibility of download button
  await expect(downloadButton).toHaveAttribute('role', 'button');
  await expect(downloadButton).toBeEnabled();

  console.log('Web-based steps completed successfully.');
});