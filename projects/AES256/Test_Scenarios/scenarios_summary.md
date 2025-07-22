# Generated Test Scenarios Summary

## Overview

- **Total Scenarios**: 3
- **Application Base URL**: https://dev.roost.ai
- **Login URL**: https://dev.roost.ai/login
- **Generated On**: 2025-07-22 13:31:08

## Scenarios

### 1. Sign In via Okta Authentication Flow
_This scenario verifies the functionality of signing into the application using Okta as an authentication provider. It ensures proper redirection, login flow, and session persistence after authentication._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: 
**Est. Execution Time**: N/A seconds | **Flakiness Potential**: medium

**Type**: authentication
**Pages Involved:**
- https://dev.roost.ai/login
- https://www.okta.com/?internal_link=wic_login

#### Steps:
- 1. Navigate to https://dev.roost.ai/login.
- 2. Verify the presence of the 'Sign in via Okta' link on the page.
- 3. Assert that the 'Sign in via Okta' link is visible and enabled.
- 4. Click on the 'Sign in via Okta' link.
- 5. Verify that the browser is redirected to https://www.okta.com/?internal_link=wic_login.
- 6. On the Okta page, enter valid credentials (username and password).
- 7. Submit the login form on the Okta page.
- 8. Verify redirection back to https://dev.roost.ai/login with a valid session token.
- 9. Assert that the user is logged in by checking for user-specific elements (e.g., dashboard elements, user avatar).
- 10. Perform a hard browser refresh and verify session persistence.
- 11. Log out of the application and verify redirection to the login page.
- 12. Repeat the login process and attempt to log in with an invalid password.
- 13. Assert that an error message (e.g., 'Invalid credentials') is displayed on the Okta page.
- 14. Navigate back to the login page and verify that the 'Sign in via Okta' link still works.
- 15. Repeat the login with a valid Okta account to confirm successful reauthentication.

#### Selectors Used:
- **Type**: link, **Text**: 'Okta', **Selector**: `a[href='https://www.okta.com/?internal_link=wic_login']`, **Action**: click (Page: https://dev.roost.ai/login)

#### Expected Results:
- User is redirected to the Okta login page when clicking on the 'Sign in via Okta' link.
- User is successfully authenticated and redirected back to the application.
- Session persists across browser refresh.
- Invalid login credentials produce an appropriate error message.
- Logout clears the session and redirects back to the login page.

#### Edge Cases:
- Attempt to log in with a non-existent Okta account.
- Network failure during the redirection to Okta.
- Okta service is down (simulate a 500 error).
- Session token gets expired during active usage.
- Attempt to bypass login and directly access a secure page.

#### Data Requirements:
- valid_username: 'testuser@okta.com'
- valid_password: 'SecurePass123!'
- invalid_password: 'WrongPass123'
- non_existent_username: 'doesnotexist@okta.com'
- expired_session_token: 'expired_token_123'

#### Dependencies:
- Okta should be configured as an authentication provider for the application.
- Test Okta account must exist with valid credentials.
- Application should handle redirection and session token from Okta.

#### API Interactions:
- /oauth2/v1/authorize
- /oauth2/v1/token

#### Performance Metrics:
- Time taken to load the login page.
- Redirection latency to and from Okta.

#### Accessibility Requirements:
- WCAG 2.1 compliance for all interactive elements.
- Ensure keyboard navigability for the 'Sign in via Okta' link.

---

### 2. Privacy Policy Link Navigation
_This scenario verifies that the 'Privacy Policy' link navigates to the correct URL and that the page is accessible._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: 
**Est. Execution Time**: N/A seconds | **Flakiness Potential**: medium

**Type**: navigation
**Pages Involved:**
- https://dev.roost.ai/login
- https://roost.ai/privacy-policy

#### Steps:
- 1. Navigate to https://dev.roost.ai/login.
- 2. Verify the presence of the 'Privacy Policy' link on the page.
- 3. Assert that the 'Privacy Policy' link is visible and enabled.
- 4. Hover over the 'Privacy Policy' link and ensure it visually changes (e.g., underline appears).
- 5. Click on the 'Privacy Policy' link.
- 6. Verify that the browser navigates to https://roost.ai/privacy-policy.
- 7. Assert the page title of the Privacy Policy page matches 'Privacy Policy'.
- 8. Verify that there are no 404 errors or broken elements on the Privacy Policy page.
- 9. Navigate back to the login page using the browser's back button.
- 10. Verify that the browser successfully returns to https://dev.roost.ai/login.

#### Selectors Used:
- **Type**: link, **Text**: 'Privacy Policy', **Selector**: `a[href='/privacy']`, **Action**: click (Page: https://dev.roost.ai/login)

#### Expected Results:
- The 'Privacy Policy' link is visible and clickable.
- Clicking the link navigates the user to the Privacy Policy page.
- The Privacy Policy page loads without errors.
- Navigating back returns the user to the login page.

#### Edge Cases:
- The Privacy Policy link points to a non-existent URL.
- Network failure during navigation to the Privacy Policy page.
- The Privacy Policy page fails WCAG accessibility checks.
- The Privacy Policy page takes longer than 3 seconds to load.
- The browser's back button does not return to the login page.

#### Dependencies:
- The Privacy Policy page must exist and be accessible.
- The 'Privacy Policy' link must be correctly configured on the login page.
- Browser must allow navigation back to previous pages.

#### Performance Metrics:
- Time taken to load the Privacy Policy page.

#### Accessibility Requirements:
- WCAG 2.1 compliance for the Privacy Policy page.
- Ensure the 'Privacy Policy' link is navigable via keyboard.

---

### 3. Complete Test Configuration Setup Workflow
_This scenario tests the end-to-end workflow of configuring test parameters such as Test Name, Test Type, Code Language, Test Framework, etc., ensuring proper validation, state persistence, and error handling._

**Complexity**: medium | **Priority**: normal | **Risk Level**: medium
**Tags**: 
**Est. Execution Time**: N/A seconds | **Flakiness Potential**: medium

**Type**: workflow
**Pages Involved:**
- https://dev.roost.ai/gptCLIForm

#### Steps:
- 1. Navigate to https://dev.roost.ai/gptCLIForm.
- 2. Verify that the 'Roost Token' input field is visible and enabled.
- 3. Enter a valid Roost Token into the 'Roost Token' field.
- 4. Verify the presence of 'Test Configuration' dropdown elements and ensure they are enabled.
- 5. Select 'Test Name' from the dropdown and input an appropriate test name (e.g., 'SampleUnitTest').
- 6. Select 'Test Type' dropdown and choose 'Unit Test'.
- 7. Select 'Code Language' dropdown and choose 'Java'.
- 8. Select 'Test Framework' dropdown and choose 'JUnit5'.
- 9. Select 'Java Version' dropdown and choose 'Java SE 21 (Default)'.
- 10. Select 'Maven Version' dropdown and choose 'Maven 3.8.6 (Default)'.
- 11. Submit the form and verify that the form inputs are validated and saved correctly.
- 12. Reload the page and verify that the previously entered configuration values persist.
- 13. Attempt to modify the 'Test Name' field to an invalid value (e.g., '!InvalidTestName') and submit the form.
- 14. Verify that an appropriate error message is displayed for the invalid input.
- 15. Test field-specific validation (e.g., ensure dropdowns reject unsupported values).
- 16. Test session persistence when navigating away from and returning to the page.
- 17. Verify that all dropdown options are correctly populated.
- 18. Validate the interaction between dependent fields (e.g., 'Code Language' affects 'Test Framework').
- 19. Logout and log back into the application to verify that the configuration persists across sessions.
- 20. Confirm that the configuration can be reset and start fresh.

#### Selectors Used:
- **Type**: input, **Text**: 'Roost Token', **Selector**: `input[data-testid='roost-token']`, **Action**: type (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Test Name', **Selector**: `select[data-testid='test-name']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Test Type', **Selector**: `select[data-testid='test-type']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Code Language', **Selector**: `select[data-testid='code-language']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Test Framework', **Selector**: `select[data-testid='test-framework']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Java Version', **Selector**: `select[data-testid='java-version']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)
- **Type**: dropdown, **Text**: 'Maven Version', **Selector**: `select[data-testid='maven-version']`, **Action**: select (Page: https://dev.roost.ai/gptCLIForm)

#### Expected Results:
- All dropdown options populate correctly.
- Valid inputs are saved and persist across reloads.
- Error messages appear for invalid inputs (e.g., '!InvalidTestName').
- Dependent fields (e.g., 'Code Language' and 'Test Framework') interact as expected.
- Configuration persists across user sessions.

#### Edge Cases:
- Enter an invalid Roost Token and verify that an error message appears.
- Attempt to select unsupported dropdown values and verify rejection.
- Submit the form with all fields left empty.
- Reload the page during active form submission and verify data integrity.
- Enter excessively long strings into the 'Test Name' field and check validation.

#### Data Requirements:
- valid_roost_token: 'sample-valid-token'
- invalid_roost_token: '123-invalid-token'
- test_name: ['SampleUnitTest', '!InvalidTestName', 'Name*With$SpecialChars']
- valid_dropdown_values: ['Unit Test', 'Java', 'JUnit5']
- invalid_dropdown_values: ['InvalidType', 'UnsupportedLanguage']

#### Dependencies:
- User must be logged in successfully.
- Roost Token must have been provisioned to the user account.
- Dropdown options for all fields must be correctly populated.

#### API Interactions:
- {'endpoint': '/api/test-config', 'method': 'POST', 'description': 'Save test configuration settings.', 'mock_response': "{ 'status': 'success', 'message': 'Configuration saved successfully.' }"}
- {'endpoint': '/api/test-config', 'method': 'GET', 'description': 'Fetch saved test configuration.', 'mock_response': "{ 'status': 'success', 'config': { 'testName': 'SampleUnitTest', 'testType': 'Unit Test', 'codeLanguage': 'Java' } }"}

#### Performance Metrics:
- Page load time under 2 seconds.
- Form submission response time under 1 second.
- Dropdown rendering time under 500ms.

#### Accessibility Requirements:
- WCAG 2.1 Level AA compliance.
- Keyboard navigation for all dropdown elements.
- Screen reader compatibility for form fields.

---

