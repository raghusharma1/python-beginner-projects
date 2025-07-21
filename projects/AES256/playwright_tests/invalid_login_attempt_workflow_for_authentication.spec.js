const { test, expect } = require('@playwright/test');

test('Invalid Login Attempt Workflow for Authentication', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 2: Locate the email input field and ensure it is visible
  const emailInput = page.locator("input[name='email']");
  await expect(emailInput).toBeVisible();

  // Step 3: Type an invalid email format
  await emailInput.fill('user@invalid');

  // Step 4: Locate the password input field and ensure it is visible
  const passwordInput = page.locator("input[name='password']");
  await expect(passwordInput).toBeVisible();

  // Step 5: Type an incorrect password
  await passwordInput.fill('wrongpassword');

  // Step 6: Locate the login button and ensure it is visible
  const loginButton = page.locator("button[type='submit']");
  await expect(loginButton).toBeVisible();

  // Step 7: Click the login button
  await loginButton.click();

  // Step 8: Verify error message for invalid credentials
  const errorMessage = page.locator('text=Invalid email or password');
  await expect(errorMessage).toBeVisible();

  // Step 9: Attempt login again with valid email but incorrect password
  await emailInput.fill('user@example.com'); // Valid email
  await passwordInput.fill('wrongpassword'); // Invalid password
  await loginButton.click();

  // Step 10: Verify error message for invalid password
  const passwordErrorMessage = page.locator('text=Invalid password');
  await expect(passwordErrorMessage).toBeVisible();

  // Step 11: Try logging in multiple times to trigger account lockout
  for (let i = 0; i < 5; i++) {
    await loginButton.click();
  }

  // Step 12: Verify account lockout message
  const lockoutMessage = page.locator('text=Your account has been temporarily locked');
  await expect(lockoutMessage).toBeVisible();

  // Step 13: Navigate to the password reset page
  await page.goto('https://dev.roost.ai/password-reset');
  await expect(page).toHaveURL('https://dev.roost.ai/password-reset');

  // Step 14: Submit an invalid email address to reset password
  const resetEmailInput = page.locator("input[name='email']");
  await resetEmailInput.fill('invalid@example.com'); // Invalid email
  const resetButton = page.locator("button[type='submit']");
  await resetButton.click();

  // Step 15: Verify error message for invalid email
  const invalidEmailMessage = page.locator('text=Email does not exist');
  await expect(invalidEmailMessage).toBeVisible();

  // Step 16: Submit a valid email to reset password
  await resetEmailInput.fill('user@example.com'); // Valid email
  await resetButton.click();

  // Step 17: Verify receipt of password reset confirmation message
  const resetConfirmationMessage = page.locator('text=Password reset link sent to your email');
  await expect(resetConfirmationMessage).toBeVisible();

  // Step 18: Attempt to reuse the password reset link after successfully changing password
  await page.goto('https://dev.roost.ai/password-reset-link-used');
  const reuseMessage = page.locator('text=This password reset link has already been used');
  await expect(reuseMessage).toBeVisible();

  // Step 19: Verify proper handling of reused password reset link
  const reusePageMessage = page.locator('text=Please request a new password reset link');
  await expect(reusePageMessage).toBeVisible();

  // Step 20: Test session timeout after login and attempt re-login
  await page.goto('https://dev.roost.ai/login');
  await emailInput.fill('user@example.com'); // Valid email
  await passwordInput.fill('NewSecurePass123!'); // Valid password
  await loginButton.click();
  await expect(page).toHaveURL('https://dev.roost.ai/dashboard');

  // Simulate session timeout by waiting and navigating back
  await page.waitForTimeout(5000); // Simulate timeout
  await page.goto('https://dev.roost.ai/dashboard');
  const timeoutMessage = page.locator('text=Session expired, please log in again');
  await expect(timeoutMessage).toBeVisible();

  console.log('Test completed successfully.');
});