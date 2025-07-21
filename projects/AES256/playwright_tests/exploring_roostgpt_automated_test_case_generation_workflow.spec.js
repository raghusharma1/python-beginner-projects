const { test, expect } = require('@playwright/test');

test('Exploring RoostGPT Automated Test Case Generation Workflow', async ({ page }) => {
  // Step 1: Navigate to the main page
  const url = 'https://roost.ai/how-roostgpt-works';
  await page.goto(url);

  // Step 2: Verify the page title
  const expectedTitle = 'Discover How RoostGPT Works: Automated Test Case Generation Unveiled';
  await expect(page).toHaveTitle(expectedTitle);

  // Step 3: Check that the main content explaining RoostGPT's functionality is visible
  const mainContent = page.locator('main');
  await expect(mainContent).toBeVisible();

  // Step 4: Verify presence of links to related resources
  const relatedLinks = [
    { selector: "a[href='/what-is-roostgpt']", text: 'What is RoostGPT' },
    { selector: "a[href='/java-unit-test-cases']", text: 'Java Unit Test Cases' },
    { selector: "a[href='/api-test-cases']", text: 'API Test Cases' },
    { selector: "a[href='/getting-started']", text: 'Getting Started' }
  ];
  for (const link of relatedLinks) {
    const element = page.locator(link.selector);
    await expect(element).toBeVisible();
    await expect(element).toHaveText(link.text);
  }

  // Step 5: Click on the link 'What is RoostGPT' and ensure navigation
  await page.locator("a[href='/what-is-roostgpt']").click();
  await page.waitForURL('**/what-is-roostgpt');
  await expect(page).toHaveURL('https://roost.ai/what-is-roostgpt');

  // Step 6: Return to the original page using browser back button
  await page.goBack();
  await expect(page).toHaveURL(url);

  // Step 7, 8: Test navigation for 'Java Unit Test Cases' and other links
  for (const link of relatedLinks.slice(1)) {
    await page.locator(link.selector).click();
    await page.waitForURL(`**${link.selector.split("'")[1]}`);
    await expect(page).toHaveURL(`https://roost.ai${link.selector.split("'")[1]}`);
    await page.goBack();
    await expect(page).toHaveURL(url);
  }

  // Step 9: Interact with any visible buttons or interactive elements
  const buttons = page.locator('button, [role="button"]');
  if (await buttons.count() > 0) {
    await buttons.first().click();
  }

  // Step 10: Reload the page and verify static content
  await page.reload();
  await expect(page).toHaveURL(url);
  await expect(mainContent).toBeVisible();

  // Step 11: Check alignment and spacing (manual inspection required)
  console.log('Please manually inspect content alignment and spacing.');

  // Step 12: Verify no broken links or missing images
  const links = page.locator('a');
  for (let i = 0; i < await links.count(); i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href) {
      const response = await page.context().request.get(href.startsWith('http') ? href : url + href);
      expect(response.status()).toBeLessThan(400);
    }
  }

  const images = page.locator('img');
  for (let i = 0; i < await images.count(); i++) {
    const src = await images.nth(i).getAttribute('src');
    if (src) {
      const response = await page.context().request.get(src.startsWith('http') ? src : url + src);
      expect(response.status()).toBeLessThan(400);
    }
  }

  // Step 13: Test keyboard navigation
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  // Step 14: Validate hover effects or tooltips
  const hoverElements = page.locator('[data-tooltip], [title]');
  for (let i = 0; i < await hoverElements.count(); i++) {
    await hoverElements.nth(i).hover();
  }

  // Step 15: Test responsiveness by resizing the browser window
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1280, height: 720 },
    { width: 375, height: 667 }
  ];
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await expect(mainContent).toBeVisible();
  }

  // Step 16: Validate semantic HTML usage (manual inspection recommended)
  console.log('Please manually inspect DOM structure for semantic HTML.');

  // Step 17: Test page load time on slow network
  const slowNetwork = { offline: false, downloadThroughput: 50 * 1024, uploadThroughput: 20 * 1024, latency: 1000 };
  await page.context().setNetworkConditions(slowNetwork);
  const startTime = Date.now();
  await page.goto(url);
  const loadTime = Date.now() - startTime;
  console.log(`Page load time under slow network: ${loadTime}ms`);
  expect(loadTime).toBeLessThan(3000);
  await page.context().setNetworkConditions(null);

  // Step 18: Validate content text
  const contentText = await mainContent.innerText();
  expect(contentText).toContain('RoostGPT');

  // Step 19: Validate meta tags and SEO attributes
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toBeTruthy();

  // Step 20: Check accessibility features
  const imagesWithAlt = page.locator('img[alt]');
  expect(await imagesWithAlt.count()).toBe(await images.count());
  const interactiveElements = page.locator('[role], button, a');
  for (let i = 0; i < await interactiveElements.count(); i++) {
    const role = await interactiveElements.nth(i).getAttribute('role');
    expect(role).toBeTruthy();
  }
});