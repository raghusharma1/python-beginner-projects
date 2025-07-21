const { test, expect } = require('@playwright/test');

test('Documentation Navigation Workflow', async ({ page, browser }) => {
  // Step 1: Navigate to the main documentation page
  await page.goto('https://docs.roost.ai');
  
  // Step 2: Verify the page title
  await expect(page).toHaveTitle('Roost.ai Documentation');

  // Step 3: Click on the 'Roost Tutorial' category link
  const tutorialLink = page.locator("a[href='/shelves/roost-tutorial']");
  await expect(tutorialLink).toBeVisible();
  await tutorialLink.click();

  // Step 4: Validate navigation to the Roost Tutorial page
  await page.waitForURL('https://docs.roost.ai/shelves/roost-tutorial');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves/roost-tutorial');

  // Step 5: Verify tutorials are displayed correctly
  const tutorialsSection = page.locator('section:has-text("Tutorials")');
  await expect(tutorialsSection).toBeVisible();

  // Step 6: Return to the main documentation page
  await page.goBack();
  await expect(page).toHaveURL('https://docs.roost.ai');

  // Step 7: Click on the 'Roost User Guide' category link
  const userGuideLink = page.locator("a[href='/shelves/roost-user-guide']");
  await expect(userGuideLink).toBeVisible();
  await userGuideLink.click();

  // Step 8: Validate navigation to the Roost User Guide page
  await page.waitForURL('https://docs.roost.ai/shelves/roost-user-guide');
  await expect(page).toHaveURL('https://docs.roost.ai/shelves/roost-user-guide');

  // Step 9: Verify user guides are displayed correctly
  const userGuidesSection = page.locator('section:has-text("User Guides")');
  await expect(userGuidesSection).toBeVisible();

  // Step 10: Test responsiveness by resizing the browser window
  await page.setViewportSize({ width: 1024, height: 768 }); // Desktop size
  let layoutElement = page.locator('body'); // Verify layout changes
  await expect(layoutElement).toBeVisible();

  await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
  await expect(layoutElement).toBeVisible();

  // Step 11: Simulate mobile viewport with developer tools
  const context = browser.newContext({ viewport: { width: 375, height: 667 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Mobile Safari/537.36' });
  const mobilePage = await context.newPage();
  await mobilePage.goto('https://docs.roost.ai');
  await expect(mobilePage.locator('nav')).toBeVisible(); // Navigation links should be accessible in mobile view
  await mobilePage.close();

  // Step 12: Verify navigation links remain accessible in mobile view
  const navLinks = page.locator('nav a');
  await expect(navLinks).toBeVisible();

  // Step 13: Return again to the main documentation page
  await page.goto('https://docs.roost.ai');
  await expect(page).toHaveURL('https://docs.roost.ai');

  // Step 14: Reload the page and validate state persistence
  await page.reload();
  await expect(page.locator('body')).toBeVisible();

  // Step 15: Simulate a failed network condition and reload the page
  const contextWithOffline = await browser.newContext({ offline: true });
  const offlinePage = await contextWithOffline.newPage();
  try {
    await offlinePage.goto('https://docs.roost.ai');
  } catch (error) {
    console.log('Failed to load page in offline mode as expected');
  }
  const errorMessage = offlinePage.locator('text=Network Error');
  await expect(errorMessage).toBeVisible();
  await contextWithOffline.close();

  // Step 16: Restore network condition and reload the page
  const onlineContext = await browser.newContext();
  const onlinePage = await onlineContext.newPage();
  await onlinePage.goto('https://docs.roost.ai');
  await expect(onlinePage.locator('body')).toBeVisible();
  await onlinePage.close();

  // Step 17: Test accessibility features with keyboard navigation
  await page.focus('nav a:first-of-type');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible(); // Ensure focused element is visible

  // Step 18: Confirm WCAG compliance with aria-labels
  const linksWithAriaLabels = page.locator('a[aria-label]');
  await expect(linksWithAriaLabels).toHaveCount(await page.locator('a').count());

  // Step 19: Logout or close the documentation tab
  await page.close();
});