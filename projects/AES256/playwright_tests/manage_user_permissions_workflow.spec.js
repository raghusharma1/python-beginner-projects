const { test, expect } = require('@playwright/test');

test('Manage User Permissions Workflow', async ({ page }) => {
  // Step 1: Navigate to the Admin Page
  await page.goto('https://dev.roost.ai/admin/app');

  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Admin Page - Roost.ai');

  // Step 3: Assert visibility of the user permissions management section
  const userPermissionsSection = page.locator('div[data-testid="user-permissions-section"]');
  await expect(userPermissionsSection).toBeVisible();

  // Step 4: Select a user and click 'Make Admin' button
  try {
    const userRow = page.locator('tr[data-user-id="123456"]'); // Replace with valid user ID
    await expect(userRow).toBeVisible();
    await userRow.locator('button[data-testid="make-admin"]').click();
    console.log('Made user an Admin');
  } catch (error) {
    console.error('Error making user an Admin:', error);
  }

  // Step 5: Verify the role update to 'Admin'
  const adminBadge = page.locator('tr[data-user-id="123456"] span[data-role="admin"]');
  await expect(adminBadge).toBeVisible();

  // Step 6: Select an admin user and click 'Remove Admin' button
  try {
    const adminRow = page.locator('tr[data-user-id="123456"]');
    await expect(adminRow).toBeVisible();
    await adminRow.locator('button[data-testid="remove-admin"]').click();
    console.log('Removed Admin role from user');
  } catch (error) {
    console.error('Error removing Admin role:', error);
  }

  // Step 7: Verify the role update to 'User'
  const userBadge = page.locator('tr[data-user-id="123456"] span[data-role="user"]');
  await expect(userBadge).toBeVisible();

  // Step 8: Test 'Override' button to assign specific permissions
  try {
    const userRow = page.locator('tr[data-user-id="123456"]');
    await expect(userRow).toBeVisible();
    await userRow.locator('button[data-testid="override"]').click();
    console.log('Overridden permissions for user');
  } catch (error) {
    console.error('Error overriding permissions:', error);
  }

  // Step 9: Verify overridden permissions applied
  const overriddenBadge = page.locator('tr[data-user-id="123456"] span[data-role="overridden"]');
  await expect(overriddenBadge).toBeVisible();

  // Step 10: Attempt to delete a user
  try {
    const userRow = page.locator('tr[data-user-id="123456"]');
    await expect(userRow).toBeVisible();
    await userRow.locator('button[data-testid="delete-user"]').click();
    console.log('Clicked delete user button');
  } catch (error) {
    console.error('Error clicking delete user:', error);
  }

  // Step 11: Confirm deletion and verify user no longer exists
  const deletedUserRow = page.locator('tr[data-user-id="123456"]');
  await expect(deletedUserRow).not.toBeVisible();

  // Step 12: Reload the page and verify state persistence
  await page.reload();
  const reloadedAdminBadge = page.locator('tr[data-user-id="123456"] span[data-role="admin"]');
  await expect(reloadedAdminBadge).not.toBeVisible();
  const reloadedUserBadge = page.locator('tr[data-user-id="123456"] span[data-role="user"]');
  await expect(reloadedUserBadge).not.toBeVisible();

  // Step 13: Attempt to assign permissions to a deleted user
  try {
    const deletedUserRow = page.locator('tr[data-user-id="123456"]');
    await expect(deletedUserRow).not.toBeVisible();
    await deletedUserRow.locator('button[data-testid="make-admin"]').click();
  } catch (error) {
    console.log('Cannot assign permissions to a deleted user, expected behavior');
  }

  // Step 14: Verify error message is displayed
  const errorMessage = page.locator('div[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('User does not exist');

  // Step 15: Logout from the admin account
  await page.locator('a[href="/logout"]').click();
  console.log('Logged out successfully');

  // Step 16: Attempt to access admin page without logging in
  await page.goto('https://dev.roost.ai/admin/app');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Redirected to login page as expected');

  // Step 17: Log back in as an admin
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'password'); // Replace with valid password
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('https://dev.roost.ai/admin/app');
  console.log('Logged back in successfully');

  // Step 18: Verify all previously performed actions are saved and correct
  const finalUserRow = page.locator('tr[data-user-id="123456"]');
  await expect(finalUserRow).not.toBeVisible();
  console.log('Verified state persistence after re-login');
});