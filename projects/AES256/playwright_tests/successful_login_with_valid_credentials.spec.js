const { test, expect } = require('@playwright/test');

test('Successful Login with Valid Credentials', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  console.log('Navigated to login page.');

  // Step 2: Wait for the page to load completely
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Login page loaded successfully.');

  // Step 3: Identify the username/email input field
  const emailInput = page.locator("input[name='email']");
  await expect(emailInput).toBeVisible();
  console.log('Email input field is visible.');

  // Step 4: Type a valid email into the email input field
  await emailInput.fill('user@example.com');
  console.log('Entered valid email address into email input field.');

  // Step 5: Identify the password input field
  const passwordInput = page.locator("input[name='password']");
  await expect(passwordInput).toBeVisible();
  console.log('Password input field is visible.');

  // Step 6: Enter a valid password into the password field
  await passwordInput.fill('CorrectPassword123!');
  console.log('Entered valid password into password input field.');

  // Step 7: Locate the 'Login' button and ensure it is enabled
  const loginButton = page.locator("button[type='submit']");
  await expect(loginButton).toBeEnabled();
  console.log('Login button is enabled.');

  // Step 8: Click the 'Login' button
  await loginButton.click();
  console.log('Clicked the login button.');

  // Step 9: Wait for the page to redirect to the dashboard URL
  await page.waitForURL('https://dev.roost.ai');
  console.log('Redirected to the dashboard.');

  // Step 10: Assert that the URL has changed to the dashboard URL
  await expect(page).toHaveURL('https://dev.roost.ai');
  console.log('Verified that the current URL is the dashboard URL.');

  // Step 11: Verify that a profile picture or username is displayed on the dashboard
  const profileElement = page.locator("img[alt='Profile Picture'], span[class*='username']");
  await expect(profileElement).toBeVisible();
  console.log('Profile picture or username is displayed on the dashboard.');

  // Step 12: Confirm that the login session token is stored in the browser's cookies or local storage
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(cookie => cookie.name === 'session_token');
  expect(sessionCookie).not.toBeNull();
  console.log('Verified that the session token is stored in cookies.');

  const localStorageToken = await page.evaluate(() => localStorage.getItem('session_token'));
  expect(localStorageToken).not.toBeNull();
  console.log('Verified that the session token is stored in local storage.');

  // Step 13: Refresh the page and verify that the user remains logged in
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai');
  await expect(profileElement).toBeVisible();
  console.log('User remains logged in after page refresh.');

  // Step 14: Log out of the application via the dashboard logout button
  const logoutButton = page.locator("button[aria-label='Logout'], a[href='/logout']");
  await expect(logoutButton).toBeVisible();
  await logoutButton.click();
  console.log('Clicked the logout button.');

  // Step 15: Verify redirection to the login page after logout
  await page.waitForURL('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Redirected to login page after logout.');
});