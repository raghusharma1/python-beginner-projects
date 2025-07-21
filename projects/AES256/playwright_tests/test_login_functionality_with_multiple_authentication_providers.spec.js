const { test, expect } = require('@playwright/test');

test('Test Login Functionality with Multiple Authentication Providers', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 2: Verify the visibility of authentication provider buttons
  const googleLoginButton = page.locator('button[data-testid="google-login"]');
  const githubLoginButton = page.locator('button[data-testid="github-login"]');
  await expect(googleLoginButton).toBeVisible();
  await expect(githubLoginButton).toBeVisible();

  // Helper function to simulate third-party login flow
  async function testProviderLogin(providerButton, providerName, validAccount) {
    console.log(`Testing login with provider: ${providerName}`);

    // Step 3: Click on the provider login button
    await providerButton.click();

    // Step 4: Verify redirection to the provider's OAuth page
    await page.waitForURL(/accounts\.google\.com|github\.com|microsoft\.com|okta\.com|auth0\.com|pingidentity\.com/); // Adjust regex for actual provider URLs
    console.log(`Redirected to ${providerName} OAuth page`);

    // Step 5: Simulate entering valid credentials
    // Note: Playwright cannot interact directly with third-party OAuth pages; this step assumes mocked credentials and flows.
    await page.fill('input[type="email"], input[type="text"]', validAccount);
    await page.click('button[type="submit"], input[type="submit"]');

    // Step 6: Verify redirection back to the login page with a successful login message
    await page.waitForURL('https://dev.roost.ai/login');
    console.log(`Redirected back to login page after successful authentication with ${providerName}`);
    const successMessage = page.locator('text=Login successful');
    await expect(successMessage).toBeVisible();

    // Step 7: Log out
    const logoutButton = page.locator('button[data-testid="logout"]');
    await logoutButton.click();
    await expect(logoutButton).not.toBeVisible(); // Ensure logout clears the session
  }

  // Test Google login flow
  await testProviderLogin(googleLoginButton, 'Google', 'valid_user@gmail.com');

  // Test Github login flow
  await testProviderLogin(githubLoginButton, 'Github', 'valid_user@github.com');

  // Step 8: Simulate invalid login attempt
  console.log('Simulating invalid login attempt');
  await googleLoginButton.click();
  await page.waitForURL(/accounts\.google\.com/);
  await page.fill('input[type="email"], input[type="text"]', 'invalid_user@gmail.com');
  await page.click('button[type="submit"], input[type="submit"]');
  const errorMessage = page.locator('text=Invalid credentials');
  await expect(errorMessage).toBeVisible();

  // Step 9: Simulate canceling the login process
  console.log('Simulating login cancellation');
  await page.click('button[data-testid="cancel-login"]');
  await page.waitForURL('https://dev.roost.ai/login');
  const sessionInfo = page.locator('text=Logged in');
  await expect(sessionInfo).not.toBeVisible();

  // Step 10: Ensure no session is set after cancellation
  console.log('Verifying session information is cleared');
  const dashboardAccess = page.goto('https://dev.roost.ai/dashboard');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  // Step 11: Simulate network failure during redirect
  console.log('Simulating network failure during login redirect');
  await page.route('https://dev.roost.ai/login', route => route.abort());
  await googleLoginButton.click();
  const networkErrorMessage = page.locator('text=Network error occurred');
  await expect(networkErrorMessage).toBeVisible();

  // Step 12: Test session persistence after successful login
  console.log('Testing session persistence');
  await googleLoginButton.click();
  await page.waitForURL('https://dev.roost.ai/login');
  await page.reload();
  const persistentSessionInfo = page.locator('text=Logged in');
  await expect(persistentSessionInfo).toBeVisible();

  // Step 13: Log out and verify session clearance
  console.log('Logging out and verifying session clearance');
  const logoutButton = page.locator('button[data-testid="logout"]');
  await logoutButton.click();
  await expect(logoutButton).not.toBeVisible();

  // Step 14: Verify redirection to login page when accessing dashboard without authentication
  console.log('Verifying access redirection to login page');
  await page.goto('https://dev.roost.ai/dashboard');
  await expect(page).toHaveURL('https://dev.roost.ai/login');

  console.log('Test completed successfully');
});