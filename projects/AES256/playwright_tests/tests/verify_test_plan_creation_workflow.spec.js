const { test, expect } = require('@playwright/test');

test('Verify Test Plan Creation Workflow', async ({ page }) => {
  // Step 1: Navigate to the test plans page
  const testPlansPageURL = 'https://dev.roost.ai/roostgpt/tests';
  await page.goto(testPlansPageURL);

  // Verify the URL to ensure navigation was successful
  await expect(page).toHaveURL(testPlansPageURL);

  // Step 2: Verify the presence of the 'Add Test Plan' button and click it
  const addTestPlanButton = page.locator('[data-testid="add-test-plan-button"]');
  await expect(addTestPlanButton).toBeVisible(); // Ensure the button is visible
  await addTestPlanButton.click();

  // Step 3: Ensure a modal or new page opens for test plan creation
  const modalForm = page.locator('form[data-testid="create-test-plan-form"]');
  await expect(modalForm).toBeVisible(); // Verify the modal or form is visible

  // Step 4: Fill in the required fields
  await modalForm.locator('input[name="testPlanName"]').fill('Automated Test Plan');
  await modalForm.locator('textarea[name="description"]').fill('This is a test plan created via Playwright automation.');
  await modalForm.locator('input[name="creator"]').fill('Test Automation User');

  // Step 5: Select the AI model to be associated with the test plan
  const aiModelDropdown = modalForm.locator('select[name="aiModel"]');
  await aiModelDropdown.selectOption('gpt-4'); // Assuming 'gpt-4' is a valid option

  // Step 6: Choose the test type from a predefined list
  const testTypeDropdown = modalForm.locator('select[name="testType"]');
  await testTypeDropdown.selectOption('ui-test'); // Assuming 'ui-test' is a valid option

  // Step 7: Submit the form and verify a success message is displayed
  const submitButton = modalForm.locator('button[type="submit"]');
  await submitButton.click();

  // Wait for the success message
  const successMessage = page.locator('[data-testid="success-message"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Test Plan created successfully');

  // Step 8: Confirm that the newly created test plan is added to the list of test plans
  const testPlanList = page.locator('[data-testid="test-plan-list"]');
  await expect(testPlanList).toContainText('Automated Test Plan'); // Verify the new test plan appears in the list

  // Step 9: Search for the newly added test plan using the search functionality
  const searchInput = page.locator('input[data-testid="search-test-plan"]');
  await searchInput.fill('Automated Test Plan'); // Enter the name of the test plan
  await searchInput.press('Enter'); // Trigger search

  // Step 10: Verify that the test plan appears in the search results
  const searchResults = page.locator('[data-testid="search-results"]');
  await expect(searchResults).toContainText('Automated Test Plan'); // Verify the test plan appears in search results

  // Edge case handling: Submit the form without filling any fields
  await addTestPlanButton.click(); // Open the form again
  await submitButton.click(); // Try submitting without filling fields
  const validationErrors = page.locator('[data-testid="validation-error"]');
  await expect(validationErrors).toBeVisible(); // Ensure validation errors are displayed

  // Edge case: Attempt to create a duplicate test plan
  await modalForm.locator('input[name="testPlanName"]').fill('Automated Test Plan'); // Duplicate name
  await modalForm.locator('textarea[name="description"]').fill('Duplicate test plan description.');
  await submitButton.click(); // Submit the form
  const duplicateError = page.locator('[data-testid="error-message"]');
  await expect(duplicateError).toBeVisible(); // Verify duplicate error message is displayed
  await expect(duplicateError).toContainText('Test Plan with this name already exists');

  // Edge case: Test form submission under network failure
  // Simulating network failure can be done via intercepting network requests
  await page.route('**/api/testplans', route => route.abort());
  await addTestPlanButton.click(); // Open the form
  await modalForm.locator('input[name="testPlanName"]').fill('Network Failure Test Plan');
  await submitButton.click(); // Submit the form
  const networkError = page.locator('[data-testid="error-message"]');
  await expect(networkError).toBeVisible(); // Verify network error is displayed
  await expect(networkError).toContainText('Network error occurred. Please try again.');

  // Clean up: Ensure no lingering network interception
  await page.unroute('**/api/testplans');
});