const { test, expect } = require('@playwright/test');

test('Test Invalid Login Attempts and Account Lockout', async ({ page }) => {
  // Test data
  const invalidEmail = 'notanemail';
  const validEmail = 'user@example.com';
  const invalidPassword = 'wrongpassword';
  const deactivatedAccountEmail = 'deactivated@example.com';

  // Step 1: Navigate to login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to login page');

  // Step 2: Attempt login with invalid email format
  await page.locator('input[name="email"]').fill(invalidEmail);
  await page.locator('input[name="password"]').fill('password'); // Generic placeholder password
  await page.locator('button[type="submit"]').click();
  const invalidEmailError = page.locator('text=Invalid email format');
  await expect(invalidEmailError).toBeVisible();
  console.log('Verified invalid email format error message');

  // Step 3: Attempt login with valid email but incorrect password
  await page.locator('input[name="email"]').fill(validEmail);
  await page.locator('input[name="password"]').fill(invalidPassword);
  await page.locator('button[type="submit"]').click();
  const incorrectPasswordError = page.locator('text=Incorrect password');
  await expect(incorrectPasswordError).toBeVisible();
  console.log('Verified incorrect password error message');

  // Step 4: Trigger account lockout
  for (let attempt = 1; attempt <= 5; attempt++) {
    await page.locator('input[name="email"]').fill(validEmail);
    await page.locator('input[name="password"]').fill(invalidPassword);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(500); // Slight pause between attempts
  }
  const accountLockedError = page.locator('text=Account locked due to multiple failed login attempts');
  await expect(accountLockedError).toBeVisible();
  console.log('Verified account lockout error message');

  // Step 5: Wait for lockout duration to expire (simulate if necessary)
  console.log('Simulating lockout duration expiration...');
  await page.waitForTimeout(2000); // Adjust based on actual lockout duration
  await page.reload();
  await page.locator('input[name="email"]').fill(validEmail);
  await page.locator('input[name="password"]').fill('correctpassword'); // Simulated correct password
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL('https://dev.roost.ai/dashboard'); // Assuming successful login redirects to dashboard
  console.log('Verified account can be accessed after lockout duration');

  // Step 6: Test login with deactivated account
  await page.goto('https://dev.roost.ai/login');
  await page.locator('input[name="email"]').fill(deactivatedAccountEmail);
  await page.locator('input[name="password"]').fill('password'); // Generic placeholder password
  await page.locator('button[type="submit"]').click();
  const deactivatedAccountError = page.locator('text=Account is deactivated');
  await expect(deactivatedAccountError).toBeVisible();
  console.log('Verified distinct error message for deactivated accounts');

  // Step 7: Simulate backend server error during login
  console.log('Simulating backend server error...');
  await page.route('**/api/login', (route) =>
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    })
  );
  await page.locator('input[name="email"]').fill(validEmail);
  await page.locator('input[name="password"]').fill('password'); // Generic placeholder password
  await page.locator('button[type="submit"]').click();
  const backendErrorMessage = page.locator('text=Something went wrong. Please try again later.');
  await expect(backendErrorMessage).toBeVisible();
  console.log('Verified generic error message for backend server error');

  // Step 8: Reload the page and confirm error state is cleared
  await page.reload();
  const errorStateCleared = page.locator('text=Something went wrong. Please try again later.');
  await expect(errorStateCleared).not.toBeVisible();
  console.log('Verified error state is cleared after reload');
});