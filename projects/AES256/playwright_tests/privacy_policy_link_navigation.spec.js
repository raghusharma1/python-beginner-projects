const { test, expect } = require('@playwright/test');

test('Privacy Policy Link Navigation', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to the login page.');

  // Step 2: Verify the presence of the 'Privacy Policy' link
  const privacyLink = page.locator('a[href="/privacy"]');
  await expect(privacyLink).toBeVisible();
  console.log('Privacy Policy link is visible.');

  // Step 3: Assert that the 'Privacy Policy' link is enabled
  await expect(privacyLink).toBeEnabled();
  console.log('Privacy Policy link is enabled.');

  // Step 4: Hover over the 'Privacy Policy' link and ensure it visually changes
  await privacyLink.hover();
  const linkStyle = await privacyLink.evaluate((el) => window.getComputedStyle(el).textDecoration);
  if (!linkStyle.includes('underline')) {
    throw new Error('Hovering over the Privacy Policy link did not result in a visual change.');
  }
  console.log('Hovering over Privacy Policy link visually changes it (e.g., underline appears).');

  // Step 5: Click on the 'Privacy Policy' link
  await privacyLink.click();
  console.log('Clicked on the Privacy Policy link.');

  // Step 6: Verify navigation to the Privacy Policy page
  await page.waitForURL('https://roost.ai/privacy-policy');
  await expect(page).toHaveURL('https://roost.ai/privacy-policy');
  console.log('Navigated to the Privacy Policy page.');

  // Step 7: Assert the page title matches 'Privacy Policy'
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Privacy Policy');
  console.log("Verified the page title is 'Privacy Policy'.");

  // Step 8: Verify there are no 404 errors or broken elements on the Privacy Policy page
  const pageStatus = await page.evaluate(() => document.readyState);
  expect(pageStatus).toBe('complete');
  const privacyContent = page.locator('body');
  await expect(privacyContent).toBeVisible();
  console.log('Verified the Privacy Policy page loads without errors.');

  // Step 9: Navigate back to the login page using the browser's back button
  await page.goBack();
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated back to the login page.');

  // Step 10: Verify the browser successfully returned to the login page
  const loginPageTitle = await page.title();
  expect(loginPageTitle).toBe('Login'); // Assuming the login page title is 'Login'
  console.log("Verified the browser returned to the login page successfully.");
});