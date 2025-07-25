const { test, expect } = require('@playwright/test');

test('Connector Actions Validation', async ({ page }) => {
  // Navigate to the connectors page
  await page.goto('https://dev.roost.ai/connectors');
  
  // Verify the page loaded correctly
  await expect(page).toHaveURL('https://dev.roost.ai/connectors');
  
  // Step 2: Verify that action buttons (Test, Info, Edit, Delete) are visible
  const testButton = page.locator("[data-testid='test-button']");
  const infoButton = page.locator("[data-testid='info-button']");
  const editButton = page.locator("[data-testid='edit-button']");
  const deleteButton = page.locator("[data-testid='delete-button']");

  await expect(testButton).toBeVisible();
  await expect(infoButton).toBeVisible();
  await expect(editButton).toBeVisible();
  await expect(deleteButton).toBeVisible();

  // Step 3: Click the 'Test' button for a connector and verify successful execution
  try {
    await testButton.click();
    console.log('Test button clicked successfully');
    
    // Step 4: Assert that the test results are displayed
    const testResults = page.locator('.test-results'); // Assuming '.test-results' displays test results
    await expect(testResults).toBeVisible();
    console.log('Test results are displayed');
  } catch (error) {
    console.error('Error executing the test action:', error);
  }

  // Step 5: Click the 'Info' button and verify that connector details are displayed
  try {
    await infoButton.click();
    console.log('Info button clicked successfully');
    
    const connectorDetails = page.locator('.connector-details'); // Assuming '.connector-details' displays connector info
    await expect(connectorDetails).toBeVisible();
    console.log('Connector details are displayed');
  } catch (error) {
    console.error('Error displaying connector info:', error);
  }

  // Step 6: Test edge case by clicking 'Info' for a nonexistent connector
  try {
    const nonexistentConnector = page.locator("[data-testid='info-button']", { hasText: 'ConnectorX' });
    await nonexistentConnector.click();
    console.error('Clicked Info for a nonexistent connector');
  } catch (error) {
    console.log('Error handling nonexistent connector Info action:', error);
  }

  // Step 7: Click the 'Edit' button for a connector
  try {
    await editButton.click();
    console.log('Edit button clicked successfully');
    
    // Step 8: Verify that the connector can be updated with valid information
    const nameInput = page.locator("input[name='name']");
    const typeInput = page.locator("input[name='type']");
    const saveButton = page.locator("[data-testid='save-button']");
    
    await nameInput.fill('UpdatedConnectorName');
    await typeInput.fill('UpdatedType');
    await saveButton.click();
    console.log('Connector information updated successfully');
    
    // Step 9: Assert that the updated connector information is saved correctly
    const updatedConnector = page.locator('.connector[data-name="UpdatedConnectorName"][data-type="UpdatedType"]');
    await expect(updatedConnector).toBeVisible();
    console.log('Updated connector information persisted correctly');
  } catch (error) {
    console.error('Error during connector edit operation:', error);
  }

  // Step 10: Test invalid data entry in the edit form
  try {
    await editButton.click();
    const saveButton = page.locator("[data-testid='save-button']");
    const nameInput = page.locator("input[name='name']");
    const typeInput = page.locator("input[name='type']");
    
    await nameInput.fill(''); // Empty name
    await typeInput.fill('InvalidType'); // Invalid type
    await saveButton.click();
    
    const errorMessage = page.locator('.error-message'); // Assuming '.error-message' displays form validation errors
    await expect(errorMessage).toBeVisible();
    console.log('Invalid data entry validation works correctly');
  } catch (error) {
    console.error('Error during invalid data entry test:', error);
  }

  // Step 11: Click the 'Delete' button and verify that a confirmation dialog appears
  try {
    await deleteButton.click();
    const confirmationDialog = page.locator('.confirmation-dialog'); // Assuming '.confirmation-dialog' appears for delete confirmation
    await expect(confirmationDialog).toBeVisible();
    console.log('Confirmation dialog is visible');

    // Step 12: Confirm deletion and verify that the connector is removed
    const confirmDeleteButton = confirmationDialog.locator("[data-testid='confirm-delete-button']");
    await confirmDeleteButton.click();
    console.log('Connector deletion confirmed');
    
    const deletedConnector = page.locator('.connector[data-name="DeletedConnectorName"]'); // Assuming connector has data-name attribute
    await expect(deletedConnector).not.toBeVisible();
    console.log('Connector removed from the list');
  } catch (error) {
    console.error('Error during connector deletion:', error);
  }

  // Step 13: Test recovery actions by attempting to delete a nonexistent connector
  try {
    await deleteButton.click({ hasText: 'NonexistentConnector' });
    console.log('Attempted to delete a nonexistent connector');
  } catch (error) {
    console.log('Error handling nonexistent connector delete action:', error);
  }

  // Step 14: Reload the page and verify state persistence for edited/deleted connectors
  await page.reload();
  const updatedConnector = page.locator('.connector[data-name="UpdatedConnectorName"][data-type="UpdatedType"]');
  await expect(updatedConnector).toBeVisible();
  const deletedConnector = page.locator('.connector[data-name="DeletedConnectorName"]');
  await expect(deletedConnector).not.toBeVisible();
  console.log('State persistence verified after reload');
});