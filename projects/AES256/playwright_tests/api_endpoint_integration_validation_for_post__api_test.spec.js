const { test, expect, request } = require('@playwright/test');

// Test for API Endpoint Integration Validation for POST /api/test
test('API Endpoint Integration Validation for POST /api/test', async ({ page }) => {
  // Step 1: Navigate to the API documentation page
  await page.goto('https://dev.roost.ai/docs/api');
  await expect(page).toHaveURL('https://dev.roost.ai/docs/api');
  console.log('Navigated to API documentation page.');

  // Step 2: Identify the API endpoint documentation (assuming it is visible on the page)
  const endpointDocs = page.locator('text=POST /api/test');
  await expect(endpointDocs).toBeVisible();
  console.log('Verified visibility of /api/test endpoint documentation.');

  // Prepare common variables
  const apiBaseURL = 'https://dev.roost.ai';
  const endpoint = '/api/test';
  const validPayload = {
    appId: '12345',
    testName: 'Test Application',
    gitType: 'GitHub',
    aiModel: 'default',
    testConfigurations: {
      retries: 3,
      timeout: 3000
    }
  };
  const invalidPayload = {
    appId: '', // Missing required field
    testName: '',
    gitType: 'GitHub',
    aiModel: '',
    testConfigurations: {}
  };
  const malformedJSON = "{ 'appId': '12345', 'testName': 'Test Application', ... }"; // Invalid JSON string
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer VALID_TOKEN' // Replace with actual token
  };

  // Step 3: Validate successful request
  console.log('Sending valid POST request.');
  const responseSuccess = await request.post(`${apiBaseURL}${endpoint}`, {
    headers,
    data: validPayload
  });

  expect(responseSuccess.status()).toBeGreaterThanOrEqual(200);
  expect(responseSuccess.status()).toBeLessThanOrEqual(201);
  const responseData = await responseSuccess.json();
  expect(responseData).toHaveProperty('testId');
  expect(responseData).toHaveProperty('status', 'success');
  console.log('Successful POST request validated.');

  // Step 4: Validate missing required fields
  console.log('Sending POST request with missing required fields.');
  const responseMissingFields = await request.post(`${apiBaseURL}${endpoint}`, {
    headers,
    data: invalidPayload
  });

  expect(responseMissingFields.status()).toBe(400);
  const errorData = await responseMissingFields.json();
  expect(errorData).toHaveProperty('errorMessage');
  console.log('Error for missing required fields validated.');

  // Step 5: Validate unauthorized request
  console.log('Sending unauthorized POST request.');
  const responseUnauthorized = await request.post(`${apiBaseURL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' }, // No Authorization header
    data: validPayload
  });

  expect(responseUnauthorized.status()).toBe(401);
  console.log('Unauthorized request validated.');

  // Step 6: Validate invalid token
  console.log('Sending POST request with invalid token.');
  const responseInvalidToken = await request.post(`${apiBaseURL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer INVALID_TOKEN' // Replace with an invalid token
    },
    data: validPayload
  });

  expect(responseInvalidToken.status()).toBe(403);
  console.log('Invalid token request validated.');

  // Step 7: Validate payload exceeding limits
  console.log('Sending POST request with payload exceeding limits.');
  const largePayload = {
    ...validPayload,
    testName: 'A'.repeat(10000) // Exceeding allowed limits
  };
  const responseLargePayload = await request.post(`${apiBaseURL}${endpoint}`, {
    headers,
    data: largePayload
  });

  expect(responseLargePayload.status()).toBe(413);
  console.log('Payload exceeding limits validated.');

  // Step 8: Validate malformed JSON
  console.log('Sending POST request with malformed JSON.');
  const responseMalformedJSON = await request.post(`${apiBaseURL}${endpoint}`, {
    headers,
    data: malformedJSON // Invalid JSON
  });

  expect(responseMalformedJSON.status()).toBe(400);
  console.log('Malformed JSON request validated.');

  // Step 9: Test under high load (simulating multiple concurrent requests)
  console.log('Testing endpoint under high load.');
  const requests = [];
  for (let i = 0; i < 50; i++) {
    requests.push(
      request.post(`${apiBaseURL}${endpoint}`, {
        headers,
        data: validPayload
      })
    );
  }
  const responses = await Promise.all(requests);
  responses.forEach((response) => {
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThanOrEqual(201);
  });
  console.log('High load test validated.');

  // Document test results
  console.log('All test cases executed and results documented.');
});