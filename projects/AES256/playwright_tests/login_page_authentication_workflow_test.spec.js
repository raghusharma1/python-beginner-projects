const { test, expect } = require('@playwright/test');

test('Login Page Authentication Workflow Test', async ({ page, context }) => {
  // Constants
  const loginPageURL = 'https://dev.roost.ai/login';
  const dashboardURL = 'https://dev.roost.ai';
  const validEmail = 'user@example.com';
  const invalidEmail = 'invalidemail';
  const validPassword = 'SecurePass123!';
  const invalidPassword = 'wrongpassword';

  // Step 1: Navigate to the login page
  await page.goto(loginPageURL);
  await expect(page).toHaveURL(loginPageURL);

  // Step 2: Verify page title
  await expect(page).toHaveTitle('Roost Enterprise Login | Software as a Service');

  // Step 3: Assert visibility of third-party login options
  const thirdPartyLogins = [
    { name: 'Google', selector: "button[data-testid='google-login']" },
    { name: 'Github', selector: "button[data-testid='github-login']" },
    { name: 'Microsoft', selector: "button[data-testid='microsoft-login']" },
    { name: 'Okta', selector: "button[data-testid='okta-login']" },
    { name: 'Auth0', selector: "button[data-testid='auth0-login']" },
    { name: 'PingID', selector: "button[data-testid='pingid-login']" }
  ];

  for (const login of thirdPartyLogins) {
    await expect(page.locator(login.selector)).toBeVisible();
  }

  // Step 4-8: Test OAuth flows for third-party logins
  for (const login of thirdPartyLogins) {
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.locator(login.selector).click()
    ]);
    await popup.waitForLoadState();
    await expect(popup).toHaveURL(/.*oauth.*/); // Verify OAuth popup
    await popup.close(); // Cancel login and return to login page
  }

  // Step 9: Enter invalid email format
  await page.locator("input[data-testid='email-input']").fill(invalidEmail);

  // Step 10: Submit form and verify error message
  await page.locator("button[data-testid='submit-login']").click();
  await expect(page.locator('text=Invalid email format')).toBeVisible();

  // Step 11: Enter valid email with invalid password
  await page.locator("input[data-testid='email-input']").fill(validEmail);
  await page.locator("input[type='password']").fill(invalidPassword);

  // Step 12: Submit form and verify error message
  await page.locator("button[data-testid='submit-login']").click();
  await expect(page.locator('text=Invalid email or password')).toBeVisible();

  // Step 13: Enter valid credentials
  await page.locator("input[data-testid='email-input']").fill(validEmail);
  await page.locator("input[type='password']").fill(validPassword);

  // Step 14: Submit form and verify successful login
  await page.locator("button[data-testid='submit-login']").click();
  await page.waitForURL(dashboardURL);
  await expect(page).toHaveURL(dashboardURL);

  // Step 15: Log out and return to login page
  await page.locator("button[data-testid='logout-button']").click();
  await page.waitForURL(loginPageURL);
  await expect(page).toHaveURL(loginPageURL);

  // Step 16: Test session persistence across browser refresh
  await page.reload();
  await expect(page).toHaveURL(loginPageURL);

  // Step 17: Attempt to log in with expired credentials
  await page.locator("input[data-testid='email-input']").fill(validEmail);
  await page.locator("input[type='password']").fill('ExpiredPass123!');
  await page.locator("button[data-testid='submit-login']").click();
  await expect(page.locator('text=Your password has expired')).toBeVisible();

  // Step 18: Test password reset functionality
  const forgotPasswordLink = page.locator('text=Forgot Password');
  if (await forgotPasswordLink.isVisible()) {
    await forgotPasswordLink.click();
    await expect(page).toHaveURL(/.*reset-password.*/);
    await page.locator("input[data-testid='email-input']").fill(validEmail);
    await page.locator("button[data-testid='submit-reset']").click();
    await expect(page.locator('text=Password reset link sent')).toBeVisible();
  }
});