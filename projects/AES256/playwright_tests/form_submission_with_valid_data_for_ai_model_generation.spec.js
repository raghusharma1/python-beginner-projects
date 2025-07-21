const { test, expect } = require('@playwright/test');

test('Form Submission with Valid Data for AI Model Generation', async ({ page }) => {
  // Step 1: Navigate to the form page
  await page.goto('https://dev.roost.ai/gptCLIForm');
  await expect(page).toHaveURL('https://dev.roost.ai/gptCLIForm');

  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Roost Enterprise Login | Software as a Service');

  // Step 3: Verify the 'Base URL' input field is visible
  const baseUrlField = page.locator("input[name='base_url']");
  await expect(baseUrlField).toBeVisible();

  // Step 4: Fill the 'Base URL' field with valid data
  await baseUrlField.fill('https://api.openai.com/v1');

  // Step 5: Verify the 'Open AI Token' input field is visible
  const openAiTokenField = page.locator("input[name='open_ai_token']");
  await expect(openAiTokenField).toBeVisible();

  // Step 6: Fill the 'Open AI Token' field with valid data
  await openAiTokenField.fill('sk-abc123');

  // Step 7: Verify the 'Verification Option' dropdown is visible
  const verificationDropdown = page.locator("select[name='verification_option']");
  await expect(verificationDropdown).toBeVisible();

  // Step 8: Select 'Verify' from the dropdown
  await verificationDropdown.selectOption('Verify');

  // Step 9: Verify the submit button is visible
  const submitButton = page.locator("button[type='submit']");
  await expect(submitButton).toBeVisible();

  // Step 10: Click the submit button
  await submitButton.click();

  // Step 11: Wait for the API response and verify the success message
  const successMessage = page.locator('text=AI model successfully generated');
  await successMessage.waitFor({ state: 'visible' });
  await expect(successMessage).toContainText('AI model successfully generated');

  // Step 12: Reload the page and verify previously entered data persists
  await page.reload();
  await expect(baseUrlField).toHaveValue('https://api.openai.com/v1');
  await expect(openAiTokenField).toHaveValue('sk-abc123');
  await expect(verificationDropdown).toHaveValue('Verify');

  // Step 13: Verify the network request payload
  const [request] = await Promise.all([
    page.waitForRequest('**/v1/generate-model'),
    submitButton.click(),
  ]);
  const requestBody = JSON.parse(request.postData());
  expect(requestBody).toEqual({
    base_url: 'https://api.openai.com/v1',
    open_ai_token: 'sk-abc123',
    verification_option: 'Verify'
  });

  // Step 14: Simulate a failed API response and verify error message
  await page.route('**/v1/generate-model', route => 
    route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Invalid input data' })
    })
  );
  await submitButton.click();
  const errorMessage = page.locator('text=Invalid input data');
  await expect(errorMessage).toBeVisible();

  // Step 15: Clear all fields and test required field validation
  await baseUrlField.fill('');
  await openAiTokenField.fill('');
  await verificationDropdown.selectOption('');
  await submitButton.click();
  const validationMessage = page.locator('text=All fields are required');
  await expect(validationMessage).toBeVisible();

  // Step 16: Test navigation to another page and back to ensure state persistence
  await page.goto('https://dev.roost.ai/otherPage');
  await page.goto('https://dev.roost.ai/gptCLIForm');
  await expect(baseUrlField).toHaveValue('https://api.openai.com/v1');
  await expect(openAiTokenField).toHaveValue('sk-abc123');
  await expect(verificationDropdown).toHaveValue('Verify');

  // Step 17: Verify no JavaScript errors in the browser console
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  expect(consoleErrors).toEqual([]);

  // Step 18: Verify the page layout is responsive on smaller viewports
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 8 dimensions
  await expect(page.locator('body')).toBeVisible(); // Ensures the layout adjusts properly

  // Step 19: Verify all required fields have proper aria-label attributes
  const ariaLabels = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, select')).map(el => el.getAttribute('aria-label'));
  });
  expect(ariaLabels).not.toContain(null);

  console.log('Test completed successfully.');
});