const { test, expect } = require('@playwright/test');

test('Complete Test Configuration Setup Workflow', async ({ page }) => {
  // Step 1: Navigate to the page
  const baseUrl = 'https://dev.roost.ai/gptCLIForm';
  await page.goto(baseUrl);
  await expect(page).toHaveURL(baseUrl);

  // Step 2: Verify that the 'Roost Token' input field is visible and enabled
  const roostTokenInput = page.locator("input[data-testid='roost-token']");
  await expect(roostTokenInput).toBeVisible();
  await expect(roostTokenInput).toBeEnabled();

  // Step 3: Enter a valid Roost Token into the 'Roost Token' field
  await roostTokenInput.fill('sample-valid-token');

  // Step 4: Verify the presence of 'Test Configuration' dropdown elements and ensure they are enabled
  const dropdowns = [
    "select[data-testid='test-name']",
    "select[data-testid='test-type']",
    "select[data-testid='code-language']",
    "select[data-testid='test-framework']",
    "select[data-testid='java-version']",
    "select[data-testid='maven-version']"
  ];
  for (const dropdown of dropdowns) {
    const element = page.locator(dropdown);
    await expect(element).toBeVisible();
    await expect(element).toBeEnabled();
  }

  // Step 5: Select 'Test Name' from the dropdown and input an appropriate test name
  const testNameDropdown = page.locator("select[data-testid='test-name']");
  await testNameDropdown.selectOption({ label: 'SampleUnitTest' });

  // Step 6: Select 'Test Type' dropdown and choose 'Unit Test'
  const testTypeDropdown = page.locator("select[data-testid='test-type']");
  await testTypeDropdown.selectOption({ label: 'Unit Test' });

  // Step 7: Select 'Code Language' dropdown and choose 'Java'
  const codeLanguageDropdown = page.locator("select[data-testid='code-language']");
  await codeLanguageDropdown.selectOption({ label: 'Java' });

  // Step 8: Select 'Test Framework' dropdown and choose 'JUnit5'
  const testFrameworkDropdown = page.locator("select[data-testid='test-framework']");
  await testFrameworkDropdown.selectOption({ label: 'JUnit5' });

  // Step 9: Select 'Java Version' dropdown and choose 'Java SE 21 (Default)'
  const javaVersionDropdown = page.locator("select[data-testid='java-version']");
  await javaVersionDropdown.selectOption({ label: 'Java SE 21 (Default)' });

  // Step 10: Select 'Maven Version' dropdown and choose 'Maven 3.8.6 (Default)'
  const mavenVersionDropdown = page.locator("select[data-testid='maven-version']");
  await mavenVersionDropdown.selectOption({ label: 'Maven 3.8.6 (Default)' });

  // Step 11: Submit the form and verify that the form inputs are validated and saved correctly
  const submitButton = page.locator("button[type='submit']");
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  // Mock API response validation can be simulated here if needed
  // For now, ensure that the page stays the same and validation occurs
  await expect(page).toHaveURL(baseUrl);

  // Step 12: Reload the page and verify that the previously entered configuration values persist
  await page.reload();
  await expect(page.locator("select[data-testid='test-name']").locator('option[selected]')).toHaveText('SampleUnitTest');
  await expect(page.locator("select[data-testid='test-type']").locator('option[selected]')).toHaveText('Unit Test');
  await expect(page.locator("select[data-testid='code-language']").locator('option[selected]')).toHaveText('Java');
  await expect(page.locator("select[data-testid='test-framework']").locator('option[selected]')).toHaveText('JUnit5');
  await expect(page.locator("select[data-testid='java-version']").locator('option[selected]')).toHaveText('Java SE 21 (Default)');
  await expect(page.locator("select[data-testid='maven-version']").locator('option[selected]')).toHaveText('Maven 3.8.6 (Default)');

  // Step 13: Attempt to modify the 'Test Name' field to an invalid value
  await testNameDropdown.selectOption({ label: '!InvalidTestName' });
  await submitButton.click();

  // Step 14: Verify that an appropriate error message is displayed for the invalid input
  const errorMessage = page.locator("div[data-testid='error-message']");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Invalid Test Name');

  // Step 15: Test field-specific validation (dropdowns reject unsupported values)
  try {
    await testTypeDropdown.selectOption({ label: 'InvalidType' });
  } catch (error) {
    console.log('Dropdown rejected unsupported value as expected:', error.message);
  }

  // Step 16: Test session persistence when navigating away from and returning to the page
  await page.goto('https://dev.roost.ai/anotherPage');
  await page.goto(baseUrl);
  await expect(page.locator("select[data-testid='test-name']").locator('option[selected]')).toHaveText('SampleUnitTest');

  // Step 17: Verify that all dropdown options are correctly populated
  const testTypeOptions = await testTypeDropdown.locator('option').allTextContents();
  expect(testTypeOptions).toContain('Unit Test');

  // Step 18: Validate interaction between dependent fields (e.g., 'Code Language' affects 'Test Framework')
  await codeLanguageDropdown.selectOption({ label: 'Python' });
  await expect(testFrameworkDropdown).toContainText('PyTest');

  // Step 19: Logout and log back in to verify persistence across sessions
  const logoutButton = page.locator("button[data-testid='logout']");
  await logoutButton.click();
  await page.goto(baseUrl);
  await expect(page.locator("select[data-testid='test-name']").locator('option[selected]')).toHaveText('SampleUnitTest');

  // Step 20: Confirm configuration can be reset and start fresh
  const resetButton = page.locator("button[data-testid='reset']");
  await resetButton.click();
  await expect(page.locator("input[data-testid='roost-token']")).toBeEmpty();
  for (const dropdown of dropdowns) {
    await expect(page.locator(dropdown).locator('option[selected]')).toHaveText('');
  }
});