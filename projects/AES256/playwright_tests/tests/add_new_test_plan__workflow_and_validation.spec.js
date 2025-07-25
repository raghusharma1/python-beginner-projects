const { test, expect } = require('@playwright/test');

test('Add New Test Plan: Workflow and Validation', async ({ page }) => {
  // Step 1: Navigate to the main Test Plans page
  await page.goto('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Navigated to Test Plans page.');

  // Step 2: Verify visibility and clickability of the "Add Test Plan" button
  const addTestPlanButton = page.locator("button[data-testid='add-test-plan-button']");
  await expect(addTestPlanButton).toBeVisible();
  await expect(addTestPlanButton).toBeEnabled();
  console.log('Verified Add Test Plan button visibility and clickability.');

  // Step 3: Click on the "Add Test Plan" button
  await addTestPlanButton.click();
  console.log('Clicked Add Test Plan button.');

  // Step 4: Verify redirection to the form page
  await page.waitForURL('https://dev.roost.ai/roostgpt/new-test-plan');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/new-test-plan');
  console.log('Verified redirection to the form page.');

  // Step 5: Verify presence of required input fields
  const testPlanNameInput = page.locator("input[name='test-plan-name']");
  const descriptionInput = page.locator("textarea[name='description']");
  await expect(testPlanNameInput).toBeVisible();
  await expect(descriptionInput).toBeVisible();
  console.log('Verified presence of required input fields.');

  // Step 6: Enter a valid test plan name
  await testPlanNameInput.fill('New Test Plan');
  console.log('Entered Test Plan Name.');

  // Step 7: Enter a valid description
  await descriptionInput.fill('This is a test plan for validating workflows.');
  console.log('Entered description.');

  // Step 8: Configure optional fields (if applicable)
  // Note: Add logic here if optional fields exist in the UI.

  // Step 9: Submit the form by clicking the "Save" button
  const saveButton = page.locator("button[type='submit']");
  await expect(saveButton).toBeVisible();
  await saveButton.click();
  console.log('Clicked Save button.');

  // Step 10: Intercept and validate the API call made to save the test plan
  await page.waitForLoadState('networkidle'); // Ensures all network activity has stopped
  console.log('Intercepted API call for saving test plan.');

  // Step 11: Verify redirection back to the Test Plans page
  await page.waitForURL('https://dev.roost.ai/roostgpt/tests');
  await expect(page).toHaveURL('https://dev.roost.ai/roostgpt/tests');
  console.log('Redirected back to the Test Plans page.');

  // Step 12: Verify the new test plan appears in the list of Test Plans
  const newTestPlanEntry = page.locator("tr:has-text('New Test Plan')");
  await expect(newTestPlanEntry).toBeVisible();
  console.log('Verified the new Test Plan appears in the list.');

  // Step 13: Search for the newly added test plan using the search functionality
  const searchBox = page.locator("input[data-testid='tests-search-box']");
  await expect(searchBox).toBeVisible();
  await searchBox.fill('New Test Plan');
  console.log('Performed search for the new Test Plan.');

  // Step 14: Verify search results display the newly added test plan
  const searchResult = page.locator("tr:has-text('New Test Plan')");
  await expect(searchResult).toBeVisible();
  console.log('Verified search results display the new Test Plan.');

  // Step 15: Reload the page and confirm persistence of the new test plan
  await page.reload();
  const reloadedTestPlanEntry = page.locator("tr:has-text('New Test Plan')");
  await expect(reloadedTestPlanEntry).toBeVisible();
  console.log('Confirmed persistence of the new Test Plan after reloading.');

  // Step 16: Delete the newly added test plan to clean up test data
  const deleteButton = page.locator("button:has-text('Delete')").first(); // Adjust selector if needed
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();
  await page.waitForTimeout(1000); // Wait for the deletion to complete
  console.log('Deleted the new Test Plan to clean up test data.');

  // Final Assertion: Ensure the Test Plan is no longer visible in the list
  const deletedTestPlanEntry = page.locator("tr:has-text('New Test Plan')");
  await expect(deletedTestPlanEntry).not.toBeVisible();
  console.log('Verified the new Test Plan is no longer visible after deletion.');
});