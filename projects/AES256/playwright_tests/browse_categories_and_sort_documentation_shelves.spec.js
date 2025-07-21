const { test, expect } = require('@playwright/test');

test('Browse Categories and Sort Documentation Shelves', async ({ page }) => {
  // Step 1: Navigate to https://docs.roost.ai/shelves
  await page.goto('https://docs.roost.ai/shelves');

  // Step 2: Verify the page title is 'Shelves | roost.ai'
  await expect(page).toHaveTitle('Shelves | roost.ai');

  // Step 3: Confirm that the categories are visible
  const categories = [
    'Roost User Guide',
    'Roost Admin Guide',
    'Roost Tutorial'
  ];
  for (const category of categories) {
    await expect(page.getByText(category)).toBeVisible();
  }

  // Step 4: Click on the sorting menu and choose 'Name'
  const sortingDropdown = page.locator('select.sorting-options');
  await sortingDropdown.click();
  await sortingDropdown.selectOption({ label: 'Name' });

  // Step 5: Verify that the categories are sorted alphabetically by name
  const sortedCategoriesByName = await page.locator('.category-list').allTextContents();
  expect(sortedCategoriesByName).toEqual([...sortedCategoriesByName].sort());

  // Step 6: Click on the sorting menu and select 'Created Date'
  await sortingDropdown.click();
  await sortingDropdown.selectOption({ label: 'Created Date' });

  // Step 7: Verify that the categories are sorted by creation date (ascending order)
  const sortedCategoriesByCreatedDate = await page.locator('.category-list').allTextContents();
  expect(sortedCategoriesByCreatedDate).toEqual([...sortedCategoriesByCreatedDate].sort((a, b) => {
    return new Date(a.createdDate) - new Date(b.createdDate);
  }));

  // Step 8: Click on the sorting menu and select 'Updated Date'
  await sortingDropdown.click();
  await sortingDropdown.selectOption({ label: 'Updated Date' });

  // Step 9: Verify that the categories are sorted by last updated date (descending order)
  const sortedCategoriesByUpdatedDate = await page.locator('.category-list').allTextContents();
  expect(sortedCategoriesByUpdatedDate).toEqual([...sortedCategoriesByUpdatedDate].sort((a, b) => {
    return new Date(b.updatedDate) - new Date(a.updatedDate);
  }));

  // Step 10: Reload the page
  await page.reload();

  // Step 11: Verify that the previously selected sorting option persists after a reload
  const persistedSortingOption = await sortingDropdown.inputValue();
  expect(persistedSortingOption).toEqual('Updated Date');

  // Step 12: Interact with a specific category link (e.g., 'Roost User Guide')
  const categoryLink = page.locator('a[href="/roost-user-guide"]');
  await categoryLink.click();

  // Step 13: Confirm navigation to the respective documentation page
  await expect(page).toHaveURL('https://docs.roost.ai/roost-user-guide');

  // Step 14: Return to the Shelves page and verify the sorting state remains intact
  await page.goto('https://docs.roost.ai/shelves');
  const sortingOptionAfterReturn = await sortingDropdown.inputValue();
  expect(sortingOptionAfterReturn).toEqual('Updated Date');

  // Step 15: Test the functionality on a mobile viewport by resizing the browser window
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 size

  // Step 16: Verify that the sorting options and categories are still accessible on smaller screens
  await expect(sortingDropdown).toBeVisible();
  for (const category of categories) {
    await expect(page.getByText(category)).toBeVisible();
  }

  // Step 17: Log out of the application (if any logout button is visible)
  const logoutButton = page.locator('button:has-text("Logout")');
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
    await expect(page).toHaveURL(/login|sign-in/i);
  }

  // Step 18: Log back in and navigate to the Shelves page to confirm state persistence
  // Assuming login page has fields for username and password
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="password"]', 'password123');
  await page.locator('button:has-text("Login")').click();
  await page.waitForURL('https://docs.roost.ai/shelves');
  const finalSortingOption = await sortingDropdown.inputValue();
  expect(finalSortingOption).toEqual('Updated Date'); // Sorting state should persist
});