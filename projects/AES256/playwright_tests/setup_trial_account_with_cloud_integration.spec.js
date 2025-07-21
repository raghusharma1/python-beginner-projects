const { test, expect } = require('@playwright/test');

test('Setup Trial Account with Cloud Integration', async ({ page }) => {
  // Predefined data from the scenario
  const validEmail = 'testuser@roost.ai';
  const invalidEmail = 'invalid-email.com';
  const validPassword = 'StrongPassword123!';
  const weakPassword = '12345';
  const awsCredentials = { access_key: 'AWSKEY123', secret_key: 'SECRET123' };

  // Step 1: Navigate to the trial page
  await page.goto('https://app.roost.ai/tryRoostAI');
  await expect(page).toHaveURL('https://app.roost.ai/tryRoostAI');

  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Roost.ai | Your Testing Co-Pilot Powered by Generative AI and Large Language Models');

  // Step 3: Verify all form fields are visible and enabled
  const emailField = page.locator('input[name="email"]');
  const passwordField = page.locator('input[name="password"]');
  const cloudProviderDropdown = page.locator('select[name="cloud_provider"]');
  const termsCheckbox = page.locator('input[type="checkbox"]');
  const submitButton = page.locator('button[type="submit"]');

  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(cloudProviderDropdown).toBeVisible();
  await expect(termsCheckbox).toBeVisible();
  await expect(submitButton).toBeEnabled();

  // Step 4: Enter a valid email address
  await emailField.fill(validEmail);

  // Step 5: Enter a valid password
  await passwordField.fill(validPassword);

  // Step 6: Select 'AWS' from the cloud integration dropdown
  await cloudProviderDropdown.selectOption('AWS');

  // Step 7: Provide valid AWS credentials
  await page.locator('input[name="access_key"]').fill(awsCredentials.access_key);
  await page.locator('input[name="secret_key"]').fill(awsCredentials.secret_key);

  // Step 8: Agree to the terms and conditions
  await termsCheckbox.click();

  // Step 9: Click the 'Submit' button
  await submitButton.click();

  // Step 10: Wait for the API response and verify success message
  const successMessage = page.locator('text=Trial account successfully created');
  await expect(successMessage).toBeVisible();

  // Step 11: Check if the user is redirected to the dashboard
  await page.waitForURL('https://app.roost.ai/dashboard');
  await expect(page).toHaveURL('https://app.roost.ai/dashboard');

  // Step 12: Verify the welcome message on the dashboard
  const welcomeMessage = page.locator('text=Welcome to Roost.ai Trial');
  await expect(welcomeMessage).toBeVisible();

  // Step 13: Log out of the account
  await page.locator('button:has-text("Log Out")').click();
  await page.waitForURL('https://app.roost.ai/login');
  await expect(page).toHaveURL('https://app.roost.ai/login');

  // Step 14: Attempt to log back in
  await emailField.fill(validEmail);
  await passwordField.fill(validPassword);
  await submitButton.click();

  // Step 15: Verify successful login and redirection to the dashboard
  await page.waitForURL('https://app.roost.ai/dashboard');
  await expect(page).toHaveURL('https://app.roost.ai/dashboard');
  await expect(welcomeMessage).toBeVisible();

  // Step 16: Test state persistence by refreshing the dashboard
  await page.reload();
  await expect(page).toHaveURL('https://app.roost.ai/dashboard');
  await expect(welcomeMessage).toBeVisible();

  // Step 17: Verify AWS integration settings in account settings
  await page.locator('a:has-text("Account Settings")').click();
  const cloudProvider = page.locator('text=AWS');
  await expect(cloudProvider).toBeVisible();

  // Step 18: Log out again
  await page.locator('button:has-text("Log Out")').click();
  await page.waitForURL('https://app.roost.ai/login');
  await expect(page).toHaveURL('https://app.roost.ai/login');

  // Close the browser (handled automatically by Playwright)
});