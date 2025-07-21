const { test, expect } = require('@playwright/test');

test('Invalid Trial Account Creation with Missing Data', async ({ page }) => {
  // Step 1: Navigate to the trial account page
  await page.goto('https://app.roost.ai/tryRoostAI');

  // Step 2: Leave all form fields blank and click the 'Submit' button
  const submitButton = page.locator("button[type='submit']");
  await submitButton.click();

  // Step 3: Verify error messages are displayed for each required field
  const emailError = page.locator("text=Email is required");
  const passwordError = page.locator("text=Password is required");
  const awsError = page.locator("text=AWS credentials are required");
  const termsError = page.locator("text=You must agree to terms");
  await expect(emailError).toBeVisible();
  await expect(passwordError).toBeVisible();
  await expect(awsError).toBeVisible();
  await expect(termsError).toBeVisible();

  // Step 4: Enter only an email address and click 'Submit'
  const emailInput = page.locator("input[name='email']");
  await emailInput.fill('test@example.com');
  await submitButton.click();

  // Step 5: Verify password and cloud provider error messages
  await expect(passwordError).toBeVisible();
  await expect(awsError).toBeVisible();

  // Step 6: Enter a weak password and attempt to submit
  const passwordInput = page.locator("input[name='password']");
  await passwordInput.fill('12345');
  await submitButton.click();

  // Step 7: Verify 'Password too weak' error message is displayed
  const weakPasswordError = page.locator("text=Password too weak");
  await expect(weakPasswordError).toBeVisible();

  // Step 8: Enter invalid AWS credentials and click 'Submit'
  const awsAccessKeyInput = page.locator("input[name='aws_access_key']");
  const awsSecretKeyInput = page.locator("input[name='aws_secret_key']");
  await awsAccessKeyInput.fill('INVALID_ACCESS_KEY');
  await awsSecretKeyInput.fill('INVALID_SECRET_KEY');
  await submitButton.click();

  // Step 9: Verify 'Invalid AWS credentials' error message is displayed
  const invalidAwsError = page.locator("text=Invalid AWS credentials");
  await expect(invalidAwsError).toBeVisible();

  // Step 10: Leave the terms and conditions checkbox unchecked and attempt to submit
  await emailInput.fill('valid@example.com');
  await passwordInput.fill('StrongPassword123!');
  await awsAccessKeyInput.fill('VALID_ACCESS_KEY');
  await awsSecretKeyInput.fill('VALID_SECRET_KEY');
  await submitButton.click();

  // Verify 'You must agree to terms' error message is displayed
  await expect(termsError).toBeVisible();

  // Step 11: Correct all inputs except one and verify corresponding error messages
  const termsCheckbox = page.locator("input[name='terms']");
  await termsCheckbox.check();
  await emailInput.fill('invalid-email');
  await submitButton.click();

  // Verify invalid email format error
  const invalidEmailError = page.locator("text=Invalid email format");
  await expect(invalidEmailError).toBeVisible();

  // Correct the email and submit again
  await emailInput.fill('valid@example.com');
  await submitButton.click();

  // Verify no error messages remain
  await expect(emailError).not.toBeVisible();
  await expect(passwordError).not.toBeVisible();
  await expect(awsError).not.toBeVisible();
  await expect(termsError).not.toBeVisible();
  await expect(invalidAwsError).not.toBeVisible();
  await expect(weakPasswordError).not.toBeVisible();

  console.log('Test completed successfully.');
});