const { test, expect } = require('@playwright/test');

test('Login Failure with Invalid Credentials', async ({ page }) => {
  // Test data
  const invalidEmail = 'invalid@example.com';
  const invalidPassword = 'InvalidPassword!';
  const validEmail = 'valid@example.com'; // Replace with a real valid email for testing
  const maliciousPayload = "xyz' OR 1=1"; // SQL injection payload

  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to login page');

  // Step 2: Wait for the page to load completely
  await page.waitForLoadState('load');
  console.log('Page loaded completely');

  // Step 3-10: Test invalid credentials
  try {
    // Locate the email and password fields
    const emailInput = page.locator("input[name='email']");
    const passwordInput = page.locator("input[name='password']");
    const loginButton = page.locator("button[type='submit']");

    // Enter invalid email and password
    await emailInput.fill(invalidEmail);
    await passwordInput.fill(invalidPassword);

    // Ensure the login button is enabled
    await expect(loginButton).toBeEnabled();
    console.log('Login button is enabled');

    // Click the login button
    await loginButton.click();
    console.log('Clicked login button');

    // Wait for error message
    const errorMessage = page.locator("text='Invalid email or password'");
    await expect(errorMessage).toBeVisible({ timeout: 1000 });
    console.log('Error message is displayed');

    // Verify the URL remains unchanged
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log('URL did not change after invalid login attempt');

    // Verify no session token in local storage or cookies
    const localStorageKeys = await page.evaluate(() => Object.keys(localStorage));
    const cookies = await page.context().cookies();
    expect(localStorageKeys).not.toContain('session_token');
    expect(cookies.find(cookie => cookie.name === 'session_token')).toBeUndefined();
    console.log('No session token found in local storage or cookies');
  } catch (error) {
    console.error('Error during invalid login test:', error);
    throw error;
  }

  // Step 13: Test valid email with incorrect password
  try {
    const emailInput = page.locator("input[name='email']");
    const passwordInput = page.locator("input[name='password']");
    const loginButton = page.locator("button[type='submit']");

    await emailInput.fill(validEmail);
    await passwordInput.fill(invalidPassword);

    await loginButton.click();
    console.log('Attempted login with valid email and incorrect password');

    const errorMessage = page.locator("text='Invalid email or password'");
    await expect(errorMessage).toBeVisible({ timeout: 1000 });
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log('Error message displayed and URL unchanged');
  } catch (error) {
    console.error('Error during valid email test:', error);
    throw error;
  }

  // Step 14: Test empty email and password fields
  try {
    const emailInput = page.locator("input[name='email']");
    const passwordInput = page.locator("input[name='password']");
    const loginButton = page.locator("button[type='submit']");

    await emailInput.fill('');
    await passwordInput.fill('');

    await loginButton.click();
    console.log('Attempted login with empty email and password fields');

    const errorMessage = page.locator("text='Invalid email or password'");
    await expect(errorMessage).toBeVisible({ timeout: 1000 });
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log('Error message displayed and URL unchanged');
  } catch (error) {
    console.error('Error during empty fields test:', error);
    throw error;
  }

  // Step 15: Confirm no access to the dashboard without authentication
  try {
    const dashboardURL = 'https://dev.roost.ai/dashboard'; // Replace with actual dashboard URL
    await page.goto(dashboardURL);
    await expect(page).not.toHaveURL(dashboardURL);
    console.log('Verified no access to dashboard without authentication');
  } catch (error) {
    console.error('Error during dashboard access verification:', error);
    throw error;
  }

  // Edge case: Test SQL injection payload
  try {
    const emailInput = page.locator("input[name='email']");
    const passwordInput = page.locator("input[name='password']");
    const loginButton = page.locator("button[type='submit']");

    await emailInput.fill(maliciousPayload);
    await passwordInput.fill(invalidPassword);

    await loginButton.click();
    console.log('Attempted login with SQL injection payload');

    const errorMessage = page.locator("text='Invalid email or password'");
    await expect(errorMessage).toBeVisible({ timeout: 1000 });
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log('Error message displayed and URL unchanged for SQL injection test');
  } catch (error) {
    console.error('Error during SQL injection test:', error);
    throw error;
  }
});