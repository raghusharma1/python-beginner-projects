const { test, expect } = require('@playwright/test');

test('Navigation Links Accessibility and Error Handling Test', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://dev.roost.ai/login');
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Navigated to the login page.');

  // Step 2: Verify the visibility of navigation links
  const links = [
    { selector: "a[href='/about']", text: 'About Roost', expectedURL: 'https://dev.roost.ai/about' },
    { selector: "a[href='/privacy']", text: 'Privacy Policy', expectedURL: 'https://dev.roost.ai/privacy' },
    { selector: "a[href='/documentation']", text: 'Documentation', expectedURL: 'https://dev.roost.ai/documentation' },
    { selector: "a[href='/api-reference']", text: 'API Reference', expectedURL: 'https://dev.roost.ai/api-reference' },
  ];

  for (const link of links) {
    const locator = page.locator(link.selector);
    await expect(locator).toBeVisible();
    console.log(`Verified visibility of link: ${link.text}`);
  }

  // Helper function to test navigation and return to login page
  const testLinkNavigation = async (link) => {
    const locator = page.locator(link.selector);
    await locator.click();
    await page.waitForURL(link.expectedURL);
    console.log(`Navigated to ${link.text} page.`);
    await expect(page).toHaveURL(link.expectedURL);

    // Return to login page
    await page.goto('https://dev.roost.ai/login');
    await expect(page).toHaveURL('https://dev.roost.ai/login');
    console.log(`Returned to the login page after visiting ${link.text}.`);
  };

  // Step 3-9: Test navigation for each link
  for (const link of links) {
    await testLinkNavigation(link);
  }

  // Step 10: Verify keyboard navigation
  for (const link of links) {
    const locator = page.locator(link.selector);
    await locator.focus();
    const isFocused = await page.evaluate(() => document.activeElement.tagName === 'A');
    expect(isFocused).toBeTruthy();
    console.log(`Verified keyboard focus on link: ${link.text}`);
  }

  // Step 11: Simulate a network failure and handle errors
  try {
    await page.route('**/*', (route) => route.abort()); // Simulate network failure
    const locator = page.locator(links[0].selector); // Test with the first link
    await locator.click();
    console.log('Clicked link during network failure.');
  } catch (error) {
    console.error('Error encountered during network failure simulation:', error);
  }
  await page.unroute('**/*'); // Restore normal network behavior

  // Step 12: Assert the presence of accessible link labels
  for (const link of links) {
    const locator = page.locator(link.selector);
    const ariaLabel = await locator.getAttribute('aria-label');
    expect(ariaLabel).not.toBeNull();
    console.log(`Verified accessible label for link: ${link.text}`);
  }

  // Step 13: Test responsiveness of links on different viewport sizes
  const viewports = [
    { width: 1280, height: 720, name: 'Desktop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 375, height: 812, name: 'Mobile' },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    console.log(`Testing links on ${viewport.name} viewport.`);
    for (const link of links) {
      const locator = page.locator(link.selector);
      await expect(locator).toBeVisible();
      console.log(`Verified visibility of link: ${link.text} on ${viewport.name} viewport.`);
    }
  }

  // Step 14: Reload the page and verify all links are still functional
  await page.reload();
  await expect(page).toHaveURL('https://dev.roost.ai/login');
  console.log('Page reloaded successfully.');
  for (const link of links) {
    const locator = page.locator(link.selector);
    await expect(locator).toBeVisible();
    console.log(`Verified visibility of link: ${link.text} after page reload.`);
  }

  console.log('All steps executed successfully.');
});