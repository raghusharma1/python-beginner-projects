const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Install and Verify VS Code Extension', async ({ page }) => {
  // Step 1: Navigate to https://dev.roost.ai/products
  const productsPageUrl = 'https://dev.roost.ai/products';
  await page.goto(productsPageUrl);

  // Step 2: Verify that the page title and URL match the expected values
  await expect(page).toHaveURL(productsPageUrl);
  await expect(page).toHaveTitle(/Roost\.ai Products/i);

  // Step 3: Locate the link or button to download the VS Code extension
  const downloadButton = page.locator('button[data-testid="download-vscode-extension"]');
  await expect(downloadButton).toBeVisible();

  // Step 4: Click the download button and confirm the download starts
  try {
    const downloadPromise = page.waitForEvent('download'); // Wait for the download event
    await downloadButton.click();
    const download = await downloadPromise;
    const downloadPath = await download.path();

    // Step 5: Verify the downloaded file's properties (e.g., correct file format for VS Code extensions)
    const fileName = path.basename(downloadPath);
    const fileExtension = path.extname(fileName);
    console.log(`Downloaded file: ${fileName}`);

    // Assert file extension is .vsix (expected format for VS Code extensions)
    expect(fileExtension).toBe('.vsix');
    console.log('Verified file format is correct for VS Code extensions.');

    // Optional: Check file exists on disk
    if (fs.existsSync(downloadPath)) {
      console.log(`File exists at path: ${downloadPath}`);
    } else {
      throw new Error('Downloaded file does not exist.');
    }
  } catch (error) {
    console.error('Error during file download verification:', error);
    throw error;
  }

  // Remaining steps for installing the extension, testing its functionality, and validating integration
  // cannot be automated using Playwright alone as they require interaction with VS Code. These steps
  // would need to be performed manually or with a specialized testing framework for desktop applications.

  console.log('Browser-related workflow steps completed successfully.');
});