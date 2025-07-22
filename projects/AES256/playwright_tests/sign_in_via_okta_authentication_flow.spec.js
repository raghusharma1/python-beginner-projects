const { test, expect } = require('@playwright/test');

const validUsername = 'testuser@okta.com';
const validPassword = 'SecurePass123!';
const invalidPassword = 'WrongPass123';

test('Sign In via Okta Authentication Flow', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');

  // Step 2: Verify the presence of the 'Sign in via Okta' link on the page
  const oktaLink = page.locator('a[href="https://www.okta.com/?internal_link=wic_login"]');
  await expect(oktaLink).toBeVisible();

  // Step 3: Assert that the 'Sign in via Okta' link is visible and enabled
  await expect(oktaLink).toBeEnabled();

  // Step 4: Click on the 'Sign in via Okta' link
  await oktaLink.click();

  // Step 5: Verify redirection to the Okta login page
  await page.waitForURL('https://www.okta.com/?internal_link=wic_login');
  await expect(page).toHaveURL('https://www.okta.com/?internal_link=wic_login');

  // Step 6: Enter valid credentials on the Okta login page
  const usernameInput = page.locator('input[name="username"]');
  const passwordInput = page.locator('input[name="password"]');
  const loginButton = page.locator('button[type="submit"]');

  await usernameInput.fill(validUsername);
  await passwordInput.fill(validPassword);
  await loginButton.click();

  // Step 7: Submit the login form and verify redirection back to the application
  await page.waitForURL('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 8: Assert that the user is logged in by checking for user-specific elements
  const userAvatar = page.locator('.user-avatar'); // Replace with actual selector for user avatar or dashboard elements
  await expect(userAvatar).toBeVisible();

  // Step 9: Perform a hard browser refresh and verify session persistence
  await page.reload();
  await expect(userAvatar).toBeVisible();

  // Step 10: Log out of the application and verify redirection to the login page
  const logoutButton = page.locator('.logout-button'); // Replace with actual selector for logout button
  await logoutButton.click();
  await page.waitForURL('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 11: Repeat the login process with an invalid password
  await oktaLink.click();
  await page.waitForURL('https://www.okta.com/?internal_link=wic_login');
  await usernameInput.fill(validUsername);
  await passwordInput.fill(invalidPassword);
  await loginButton.click();

  // Step 12: Assert that an error message is displayed on the Okta page
  const errorMessage = page.locator('.error-message'); // Replace with actual selector for error message
  await expect(errorMessage).toContainText('Invalid credentials');

  // Step 13: Navigate back to the login page and verify that the 'Sign in via Okta' link still works
  await page.goto('https://dev.roost.ai/login');
  await expect(oktaLink).toBeVisible();
  await oktaLink.click();

  // Step 14: Repeat the login with a valid Okta account to confirm successful reauthentication
  await page.waitForURL('https://www.okta.com/?internal_link=wic_login');
  await usernameInput.fill(validUsername);
  await passwordInput.fill(validPassword);
  await loginButton.click();
  await page.waitForURL('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  await expect(userAvatar).toBeVisible();

  console.log('Test completed successfully');
});