const { test, expect } = require('@playwright/test');

test('Verify Blog Article Navigation Workflow', async ({ page, browser }) => {
  // Step 1: Navigate to the main blog page
  const blogUrl = 'https://roost.ai/blog';
  await page.goto(blogUrl);
  
  // Step 2: Verify the page title
  const expectedTitle = 'Roost.ai Blog on Generative AI and Large Language Models';
  await expect(page).toHaveTitle(expectedTitle);

  // Step 3: Scroll down to the list of blog articles
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // Allow time for lazy-loaded content, if any

  // Step 4: Assert that each article entry displays a title, date, and 'Read this Article >>' link
  const articleLinks = page.locator("a[href*='Read this Article']");
  const articleTitles = page.locator("h2.article-title"); // Example: Ensure to replace with the actual title selector
  const articleDates = page.locator("span.article-date"); // Example: Ensure to replace with the actual date selector

  const articleCount = await articleLinks.count();
  expect(articleCount).toBeGreaterThanOrEqual(3); // Ensure there are at least three articles

  for (let i = 0; i < articleCount; i++) {
    await expect(articleTitles.nth(i)).toBeVisible();
    await expect(articleDates.nth(i)).toBeVisible();
    await expect(articleLinks.nth(i)).toContainText('Read this Article >>');
  }

  // Step 5-12: Click on the first 'Read this Article >>' link, verify navigation, and test browser back/forward navigation
  for (let articleIndex = 0; articleIndex < 3; articleIndex++) {
    // Click on the 'Read this Article >>' link
    const currentArticleLink = articleLinks.nth(articleIndex);
    const currentArticleTitle = await articleTitles.nth(articleIndex).textContent();
    await currentArticleLink.click();

    // Step 6: Verify user is redirected to the correct article page
    await page.waitForURL(/\/blog\/.+/, { timeout: 5000 }); // Ensure URL matches an article page
    const articlePageTitle = await page.locator('h1.article-title').textContent(); // Example: Replace with actual selector
    await expect(articlePageTitle).toContain(currentArticleTitle);

    // Step 7: Validate presence of article content
    const articleContent = page.locator('div.article-content'); // Example: Replace with actual selector
    await expect(articleContent).toBeVisible();

    // Step 8: Use browser's back button to return to the main blog page
    await page.goBack();
    await expect(page).toHaveURL(blogUrl);

    // Step 9: Verify the state of the scrolled position persists
    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(0); // Ensure the scroll position is not at the top

    // Step 10: Repeat for the next article
  }

  // Step 11: Use the browser's forward button to return to a previously viewed article
  const context = await browser.newContext(); // Create a new browser context
  const newPage = await context.newPage();
  await newPage.goto(blogUrl);

  // Click on the first article again to create a forward navigation state
  const firstArticleLink = newPage.locator("a[href*='Read this Article']").first();
  await firstArticleLink.click();
  await newPage.waitForURL(/\/blog\/.+/);

  // Step 12: Verify the previously viewed article is displayed correctly
  await newPage.goBack(); // Go back to the blog page
  await newPage.goForward(); // Go forward to the article page again
  const forwardArticleTitle = await newPage.locator('h1.article-title').textContent();
  await expect(forwardArticleTitle).not.toBeNull(); // Ensure the article content is displayed

  console.log('Test completed successfully!');
});