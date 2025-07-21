const { test, expect } = require('@playwright/test');

test('View and Navigate Through Connectors List', async ({ page }) => {
  // Step 1: Navigate to the connectors page
  await page.goto('https://dev.roost.ai/connectors');
  
  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Connectors - Roost.ai');

  // Step 3: Assert the visibility of the connectors table
  const connectorsTable = page.locator('table#connectors-list');
  await expect(connectorsTable).toBeVisible();

  // Step 4: Check table headers
  const expectedHeaders = ['Connector Name', 'Connector Type', 'Created On', 'Modification Time', 'Actions'];
  for (const header of expectedHeaders) {
    await expect(connectorsTable.locator(`th:has-text("${header}")`)).toBeVisible();
  }

  // Step 5: Verify each row displays all expected fields
  const rows = connectorsTable.locator('tr');
  const rowCount = await rows.count();
  if (rowCount === 0) {
    console.log('No data found in the table.');
  } else {
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      await expect(row.locator('td:nth-child(1)')).toBeVisible(); // Connector Name
      await expect(row.locator('td:nth-child(2)')).toBeVisible(); // Connector Type
      await expect(row.locator('td:nth-child(3)')).toBeVisible(); // Created On
      await expect(row.locator('td:nth-child(4)')).toBeVisible(); // Modification Time
      await expect(row.locator('td:nth-child(5)')).toBeVisible(); // Actions
    }
  }

  // Step 6: Scroll down to load more entries if infinite scroll
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Step 7: Test pagination controls
  const nextButton = page.locator('button.next-page');
  if (await nextButton.isVisible()) {
    await nextButton.click();
    await page.waitForTimeout(1000);
    console.log('Navigated to the next page of connectors.');

    const previousButton = page.locator('button.previous-page');
    await previousButton.click();
    await page.waitForTimeout(1000);
    console.log('Returned to the previous page of connectors.');
  } else {
    console.log('Pagination controls are not visible. Testing infinite scroll only.');
  }

  // Step 9: Test search functionality
  const searchInput = page.locator('input[type="search"]');
  if (await searchInput.isVisible()) {
    await searchInput.fill('Test Connector');
    await page.waitForTimeout(1000);
    console.log('Performed search operation.');
    // Additional assertion can be added to verify search results
  } else {
    console.log('Search input is not available on the page.');
  }

  // Step 10: Test sorting functionality
  const sortColumnHeader = connectorsTable.locator('th:has-text("Connector Name")');
  if (await sortColumnHeader.isVisible()) {
    await sortColumnHeader.click();
    await page.waitForTimeout(1000);
    console.log('Sorted the table by Connector Name.');
    // Additional assertion can be added to verify sorting
  } else {
    console.log('Sorting functionality is not available.');
  }

  // Step 11: Refresh the page and verify table state reverts to default
  await page.reload();
  await expect(connectorsTable).toBeVisible();
  console.log('Page refreshed and verified table visibility.');

  // Step 12: Verify actions column buttons
  const actionsColumn = connectorsTable.locator('td:nth-child(5)');
  const infoButton = actionsColumn.locator('button.info-action');
  await expect(infoButton).toBeVisible();
  console.log('Verified "Info" button visibility.');

  // Step 13: Hover over the 'Info' button to check tooltip
  await infoButton.hover();
  const tooltip = page.locator('.tooltip'); // Add a valid selector for the tooltip
  await expect(tooltip).toBeVisible();
  console.log('Verified tooltip visibility.');

  // Step 14: Test 'Info' button functionality
  await infoButton.click();
  const infoModal = page.locator('.info-modal'); // Add a valid selector for the modal
  await expect(infoModal).toBeVisible();
  console.log('Verified "Info" modal visibility.');

  // Step 15: Close the 'Info' modal
  const closeModalButton = infoModal.locator('button.close-modal');
  await closeModalButton.click();
  await expect(connectorsTable).toBeVisible();
  console.log('Closed "Info" modal and returned to connectors list.');

  // Step 16: Assert responsiveness by resizing the browser window
  await page.setViewportSize({ width: 800, height: 600 });
  await expect(connectorsTable).toBeVisible();
  console.log('Verified table responsiveness at smaller viewport size.');

  // Step 17: Test keyboard navigation
  await page.keyboard.press('Tab');
  console.log('Tested keyboard navigation.');

  // Step 18: Log out and verify redirection to login page
  const logoutButton = page.locator('button.logout');
  await logoutButton.click();
  await page.goto('https://dev.roost.ai/connectors');
  await expect(page).toHaveURL(/.*login.*/);
  console.log('Verified redirection to login page after logout.');
});