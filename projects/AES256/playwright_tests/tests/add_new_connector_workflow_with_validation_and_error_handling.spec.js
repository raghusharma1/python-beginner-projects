const { test, expect } = require('@playwright/test');

test('Add New Connector Workflow with Validation and Error Handling', async ({ page }) => {
  // Navigate to the Connectors page
  await page.goto('https://dev.roost.ai/connectors');
  
  // Verify the 'Add Connector' button is visible
  const addConnectorButton = page.locator('button[data-testid="add-connector-button"]');
  await expect(addConnectorButton).toBeVisible();
  
  // Click on the 'Add Connector' button
  await addConnectorButton.click();
  
  // Wait for the form/modal to appear
  const connectorNameInput = page.locator('input[placeholder="Connector Name"]');
  const connectorUrlInput = page.locator('input[placeholder="URL"]');
  const submitButton = page.locator('button[data-testid="submit-connector"]');
  await expect(connectorNameInput).toBeVisible();
  await expect(connectorUrlInput).toBeVisible();
  
  // Enter valid data into the 'Connector Name' field
  await connectorNameInput.fill('Test Connector');
  
  // Enter an invalid URL into the 'URL' field and attempt to submit the form
  await connectorUrlInput.fill('invalid-url');
  await submitButton.click();
  
  // Verify that an error message is displayed for the invalid URL
  const urlErrorMessage = page.locator('text=Invalid URL'); // Modify the selector if necessary
  await expect(urlErrorMessage).toBeVisible();
  
  // Correct the URL to a valid one and resubmit the form
  await connectorUrlInput.fill('https://example.com/connector');
  await submitButton.click();
  
  // Verify that the form submits successfully and the new connector is displayed in the list
  const newConnectorItem = page.locator('text=Test Connector'); // Modify the selector if necessary
  await expect(newConnectorItem).toBeVisible();
  
  // Verify that the new connector persists by refreshing the page
  await page.reload();
  await expect(newConnectorItem).toBeVisible();
  
  // Search for the newly added connector using the search box
  const searchBox = page.locator('input[data-testid="Connector-search-box"]');
  await searchBox.fill('Test Connector');
  
  // Verify that the search results include the new connector
  const searchResult = page.locator('text=Test Connector'); // Modify the selector if necessary
  await expect(searchResult).toBeVisible();
  
  // Attempt to add another connector with the same name and verify that an error message is displayed
  await addConnectorButton.click();
  await connectorNameInput.fill('Test Connector');
  await connectorUrlInput.fill('https://example.com/connector2');
  await submitButton.click();
  const duplicateErrorMessage = page.locator('text=Duplicate connector name'); // Modify the selector if necessary
  await expect(duplicateErrorMessage).toBeVisible();
  
  // Delete the newly created connector and verify it is removed from the list
  const deleteButton = page.locator('button[data-testid="delete-connector-button"]'); // Modify the selector if necessary
  await deleteButton.click();
  await expect(newConnectorItem).not.toBeVisible();
  
  // Refresh the page and verify that the deleted connector does not persist
  await page.reload();
  await expect(newConnectorItem).not.toBeVisible();
});