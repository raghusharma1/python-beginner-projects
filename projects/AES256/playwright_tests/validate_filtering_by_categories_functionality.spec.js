const { test, expect } = require('@playwright/test');

test('Validate Filtering by Categories Functionality', async ({ page }) => {
  // Step 1: Navigate to the blog page
  await page.goto('https://roost.ai/blog');

  // Step 2: Verify the presence of a 'Categories' section on the page
  const categoriesSection = page.locator('section:has-text("Categories")');
  await expect(categoriesSection).toBeVisible();
  console.log("Verified 'Categories' section is visible.");

  // Step 3: Validate the categories listed include the specified ones
  const expectedCategories = ['generative AI', 'large language models', 'chatGPT', 'software testing'];
  for (const category of expectedCategories) {
    const categoryLink = categoriesSection.locator(`a:has-text("${category}")`);
    await expect(categoryLink).toBeVisible();
    console.log(`Verified category "${category}" is listed.`);
  }

  // Step 4: Click on the 'generative AI' category link
  const generativeAILink = categoriesSection.locator('a:has-text("generative AI")');
  await generativeAILink.click();
  console.log("Clicked on 'generative AI' category link.");

  // Step 5: Verify that the articles displayed belong to the 'generative AI' category only
  const articleTags = page.locator('.article-tag'); // Assuming articles have tags displayed
  const articlesCount = await articleTags.count();
  for (let i = 0; i < articlesCount; i++) {
    await expect(articleTags.nth(i)).toContainText('generative AI');
  }
  console.log("Verified all articles belong to the 'generative AI' category.");

  // Step 6: Click on the 'large language models' category link
  const llmLink = categoriesSection.locator('a:has-text("large language models")');
  await llmLink.click();
  console.log("Clicked on 'large language models' category link.");

  // Step 7: Verify that the articles displayed belong to the 'large language models' category only
  const llmArticlesCount = await articleTags.count();
  for (let i = 0; i < llmArticlesCount; i++) {
    await expect(articleTags.nth(i)).toContainText('large language models');
  }
  console.log("Verified all articles belong to the 'large language models' category.");

  // Step 8: Test selecting a category with no articles available
  const noArticlesCategoryLink = categoriesSection.locator('a:has-text("No Articles Category")'); // Mocked category link
  await noArticlesCategoryLink.click();
  console.log("Clicked on a category with no articles.");

  // Step 9: Validate that a user-friendly message is displayed
  const noArticlesMessage = page.locator('text="No articles available"');
  await expect(noArticlesMessage).toBeVisible();
  console.log("Verified user-friendly message is displayed for no articles.");

  // Step 10: Test switching between categories multiple times to ensure filtering persists
  await generativeAILink.click();
  console.log("Switched back to 'generative AI' category.");
  await expect(articleTags.first()).toContainText('generative AI');

  await llmLink.click();
  console.log("Switched back to 'large language models' category.");
  await expect(articleTags.first()).toContainText('large language models');

  // Step 11: Reset the filtering by clicking a 'Clear All Filters' link, if available
  const clearFiltersLink = page.locator('a:has-text("Clear All Filters")');
  if (await clearFiltersLink.count() > 0) {
    await clearFiltersLink.click();
    console.log("Clicked on 'Clear All Filters' link.");
  }

  // Step 12: Validate that all articles are displayed again
  const allArticles = page.locator('.article'); // Assuming all articles have a shared class
  await expect(allArticles).toHaveCountGreaterThan(1);
  console.log("Verified all articles are displayed after resetting filters.");
});