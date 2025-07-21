const { test, expect } = require('@playwright/test');

test('Accessing Demo and Trial Options', async ({ page, context, browser }) => {
  // Step 1: Navigate to https://roost.ai
  await page.goto('https://roost.ai');

  // Step 2: Verify the presence of the 'Watch Demo' and 'Try RoostGPT' buttons
  const watchDemoButton = page.locator("button[data-testid='watch-demo']");
  const tryRoostGPTButton = page.locator("button[data-testid='try-roostgpt']");

  await expect(watchDemoButton).toBeVisible();
  await expect(tryRoostGPTButton).toBeVisible();

  // Step 3: Click on the 'Watch Demo' button
  await watchDemoButton.click();

  // Step 4: Assert that the demo video page or modal is displayed
  await page.waitForURL('https://roost.ai/how-roostgpt-works');
  const demoVideoPlayer = page.locator('video');
  await expect(demoVideoPlayer).toBeVisible();

  // Step 5: Verify the video player loads correctly and is functional
  try {
    await expect(demoVideoPlayer).toHaveAttribute('src', /.+/); // Ensure video source exists
    console.log('Demo video source is valid.');
  } catch (error) {
    console.error('Demo video failed to load:', error);
    throw error;
  }

  // Step 6: Return to the homepage
  await page.goto('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');

  // Step 7: Click on the 'Try RoostGPT' button
  await tryRoostGPTButton.click();

  // Step 8: Verify that the page navigates to https://app.roost.ai/tryRoostAI
  await page.waitForURL('https://app.roost.ai/tryRoostAI');
  await expect(page).toHaveURL('https://app.roost.ai/tryRoostAI');

  // Step 9: Assert the presence of a 'Start Trial' or signup form
  const trialForm = page.locator('form');
  await expect(trialForm).toBeVisible();

  // Step 10: Fill out the trial form with valid data
  await trialForm.locator('input[name="name"]').fill('Test User');
  await trialForm.locator('input[name="email"]').fill('testuser@example.com');
  await trialForm.locator('input[name="password"]').fill('TestPassword123!');

  // Step 11: Submit the form and verify success confirmation
  const submitButton = trialForm.locator('button[type="submit"]');
  await submitButton.click();

  try {
    const successMessage = page.locator('text="Thank you for starting your trial!"');
    await expect(successMessage).toBeVisible();
  } catch (error) {
    console.error('Trial form submission failed:', error);
    throw error;
  }

  // Step 12: Log out or navigate back to the homepage
  await page.goto('https://roost.ai');
  await expect(page).toHaveURL('https://roost.ai');

  // Step 13: Reload the homepage and verify state persistence
  await page.reload();
  await expect(watchDemoButton).toBeVisible();
  await expect(tryRoostGPTButton).toBeVisible();

  // Step 14: Test the 'Watch Demo' button in a new browser tab
  const newPage = await context.newPage();
  await newPage.goto('https://roost.ai');
  await newPage.locator("button[data-testid='watch-demo']").click();
  await newPage.waitForURL('https://roost.ai/how-roostgpt-works');
  const demoVideoPlayerInNewTab = newPage.locator('video');
  await expect(demoVideoPlayerInNewTab).toBeVisible();
  await newPage.close();

  // Step 15: Test the 'Try RoostGPT' button in a private browsing window
  const privateContext = await browser.newContext({ viewport: null });
  const privatePage = await privateContext.newPage();
  await privatePage.goto('https://roost.ai');
  await privatePage.locator("button[data-testid='try-roostgpt']").click();
  await privatePage.waitForURL('https://app.roost.ai/tryRoostAI');
  await expect(privatePage).toHaveURL('https://app.roost.ai/tryRoostAI');

  const privateTrialForm = privatePage.locator('form');
  await expect(privateTrialForm).toBeVisible();
  await privateContext.close();
});