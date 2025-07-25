# Generated Playwright Tests Summary

## Test Event Search Functionality
**Description:** This scenario tests the search functionality available on the events page to ensure that activities can be filtered by user input, results are accurate, and state persists.
**Priority**: high | **Complexity**: high
**Tags**: data_validation, network-resilience, api-integration, form-submission, auto-generated, accessibility, complex-scenario, performance, keyboard-navigation, ui-test
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/roostgpt/events
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/events.
2. 2. Verify the visibility of the search input box with placeholder 'Search for Activities'.
3. 3. Type a valid activity name into the search input box (e.g., 'java-filter-test').
4. 4. Press the 'Enter' key or trigger the search action.
5. 5. Verify that the table updates with filtered results matching the search term.
6. 6. Clear the search input box and verify the table resets to show all activities.
7. 7. Type an invalid or nonexistent activity name (e.g., 'nonexistent-test-name') and perform the search.
8. 8. Verify that the table displays 'No results found' or an equivalent message.
9. 9. Reload the page and verify that the search input and table state persist correctly.
10. 10. Type special characters into the search input (e.g., '!@#$%^&*') and verify proper handling.
11. 11. Test responsiveness by resizing the browser and verifying the search box remains functional.
12. 12. Verify accessibility by navigating to the search box using keyboard tabbing.
13. 13. Perform searches while toggling between the 'Show My Activities' and 'Show All Activities' filters.
14. 14. Assert that results are correctly filtered according to the selected filter option.
15. 15. Test concurrent searches in multiple tabs and verify state consistency.

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Activities', **Selector**: `input[data-testid='events-search-box']`, **Action**: type (Page: https://dev.roost.ai/roostgpt/events)
#### Expected Results:
- Search results update to display activities matching the search term.
- Search box remains functional across browser resizing.
- Invalid search terms display an appropriate 'No results found' message.
- Search input state persists after page reload.
- Accessibility navigation works for the search box using keyboard tabbing.

#### Edge Cases:
- Search using special characters and ensure no errors are thrown.
- Search using an excessively long string to test input limits.
- Perform searches with empty input and verify results remain unfiltered.
- Search while network connectivity is lost and verify error recovery.
- Test multiple searches in rapid succession to check for performance bottlenecks.

#### Data Requirements:
- valid_activity_name: 'java-filter-test'
- nonexistent_activity_name: 'nonexistent-test-name'
- special_characters: '!@#$%^&*'
- long_string: 'a'.repeat(500)
- empty_string: ''
**Test File:** [test_event_search_functionality.spec.js](./test_event_search_functionality.spec.js)
---

## Activity Filter Toggle Test
**Description:** This scenario tests the toggle functionality between 'Show My Activities' and 'Show All Activities' filters to ensure state management, data accuracy, and UI updates.
**Priority**: high | **Complexity**: high
**Tags**: network-resilience, api-integration, data-validation, auto-generated, workflow, accessibility, complex-scenario, performance, ui-test
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/events
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/events.
2. 2. Verify the visibility of the 'Show My Activities' filter toggle.
3. 3. Click on the 'Show My Activities' filter.
4. 4. Assert that the table updates to display activities belonging to the logged-in user.
5. 5. Verify that the toggle button is visually activated.
6. 6. Click on the 'Show All Activities' filter.
7. 7. Assert that the table updates to display all activities.
8. 8. Verify that the toggle button switches state correctly.
9. 9. Perform a search while the 'Show My Activities' filter is active.
10. 10. Assert that search results only contain the logged-in user's activities matching the search term.
11. 11. Perform a search while the 'Show All Activities' filter is active.
12. 12. Assert that search results contain all matching activities regardless of user ownership.
13. 13. Reload the page and verify persistence of the last toggle state.
14. 14. Test concurrent toggling in multiple tabs and assert state consistency.
15. 15. Toggle rapidly between the filters multiple times and verify performance stability.

#### Key Selectors:
- **Type**: button, **Text**: 'Show My Activities', **Selector**: `button[data-testid='activity-view-toggle']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/events)- **Type**: button, **Text**: 'Show All Activities', **Selector**: `button[data-testid='activity-view-toggle']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/events)
#### Expected Results:
- Table updates to display activities belonging to the logged-in user when 'Show My Activities' is selected.
- Table updates to display all activities when 'Show All Activities' is selected.
- Filter toggle state persists after page reload.
- Search results are correctly scoped to the selected filter.

#### Edge Cases:
- Rapid toggling between filters to test performance.
- Test filter functionality with no activities available.
- Verify toggle state when navigating away from the page and returning.
- Test on a mobile device with limited screen real estate.
- Simulate network failure during filter toggling.

#### Data Requirements:
- user_activities: ['java-filter-test', 'golang-unit-gowork-sandbox']
- global_activities: ['activity-1', 'activity-2']
- filter_state: 'Show My Activities'
**Test File:** [activity_filter_toggle_test.spec.js](./activity_filter_toggle_test.spec.js)
---

## Add New Connector Workflow with Validation and Error Handling
**Description:** This scenario tests the addition of a new connector, ensuring data is validated properly, error messages are displayed for invalid inputs, and the new connector is successfully added. It also checks state persistence and UI updates after submission.
**Priority**: high | **Complexity**: high
**Tags**: api-integration, data-validation, form-submission, workflow, auto-generated, accessibility, complex-scenario, performance, error-handling, ui-test
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of the 'Add Connector' button.
3. 3. Click on the 'Add Connector' button.
4. 4. Wait for a form or modal to appear for adding the new connector.
5. 5. Verify all required fields in the form are visible (e.g., Connector Name, URL).
6. 6. Enter valid data into the 'Connector Name' field.
7. 7. Enter an invalid URL into the URL field and attempt to submit the form.
8. 8. Verify that an error message is displayed for the invalid URL.
9. 9. Correct the URL to a valid one and resubmit the form.
10. 10. Verify that the form submits successfully and the new connector is displayed in the connector list.
11. 11. Verify that the new connector is persisted by refreshing the page and checking if the connector still exists.
12. 12. Search for the newly added connector using the search box.
13. 13. Verify that the search results include the new connector.
14. 14. Attempt to add another connector with the same name and verify that an error message is displayed for duplicate entries.
15. 15. Delete the newly created connector and verify it is removed from the list.
16. 16. Refresh the page and verify that the deleted connector does not persist.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Connector', **Selector**: `button[data-testid='add-connector-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[placeholder='Connector Name']`, **Action**: type, **Value**: 'Test Connector' (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[placeholder='URL']`, **Action**: type, **Value**: 'invalid-url' (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Submit', **Selector**: `button[data-testid='submit-connector']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type, **Value**: 'Test Connector' (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- The 'Add Connector' button is visible and functional.
- An error message is displayed for invalid URLs during connector creation.
- The new connector is successfully added and displayed in the list after submission.
- The connector persists on page refresh.
- The search results correctly display the newly added connector.
- An error message is displayed when attempting to add a connector with a duplicate name.
- The deleted connector is no longer visible in the list and does not persist on page refresh.

#### Edge Cases:
- Attempt to submit the form with all fields empty.
- Enter a connector URL that exceeds the maximum length allowed.
- Try adding a connector with special characters in the name.
- Submit the form while the server API is down.
- Attempt to delete a connector that does not exist.

#### Data Requirements:
- valid_connector_name: 'Test Connector'
- valid_connector_url: 'https://example.com/connector'
- invalid_connector_url: 'invalid-url'
- duplicate_connector_name: 'Test Connector'
- connector_name_with_special_chars: '!@#$%^&*()'
**Test File:** [add_new_connector_workflow_with_validation_and_error_handling.spec.js](./add_new_connector_workflow_with_validation_and_error_handling.spec.js)
---

## Pagination Navigation and Edge Handling
**Description:** This scenario tests the functionality of navigating through paginated connector entries. It ensures that all pagination controls (First, Previous, Next, Last) work correctly and verifies edge cases such as navigating beyond available pages.
**Priority**: high | **Complexity**: high
**Tags**: navigation, api-integration, auto-generated, accessibility, complex-scenario, performance, ui-test
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of all pagination controls (First, Previous, Next, Last).
3. 3. Click on the 'Next' button and verify that the next page of connectors is displayed.
4. 4. Click on the 'Last' button and verify that the last page is reached.
5. 5. Verify that the 'Next' button is disabled on the last page.
6. 6. Click on the 'Previous' button and verify that the previous page is displayed.
7. 7. Click on the 'First' button and verify that the first page is displayed.
8. 8. Verify that the 'Previous' button is disabled on the first page.
9. 9. Navigate to a specific page by clicking on its corresponding number.
10. 10. Verify that the correct page is displayed after the page number is clicked.
11. 11. Test rapid navigation by quickly clicking 'Next' multiple times.
12. 12. Verify that pagination updates are not delayed during rapid navigation.
13. 13. Refresh the page and verify that the current state persists to the first page.
14. 14. Attempt to navigate to a non-existent page via URL manipulation.
15. 15. Verify that an appropriate error message or fallback occurs.

#### Key Selectors:
- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '«', **Selector**: `button[data-testid='arrow-left']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Last', **Selector**: `button[data-testid='paginator-last-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '2', **Selector**: `button:contains('2')`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Pagination controls are visible and functional.
- Clicking 'Next' navigates to the next page.
- Clicking 'Last' navigates to the last page and disables 'Next'.
- Clicking 'First' navigates to the first page and disables 'Previous'.
- Rapid navigation via 'Next' does not cause delays.
- Navigating to a specific page number displays the correct page.
- Invalid page navigation displays an appropriate error or fallback.

#### Edge Cases:
- Attempt to navigate to a non-existent page number.
- Click 'Next' on the last page and verify no action occurs.
- Click 'Previous' on the first page and verify no action occurs.
- Rapidly click 'Next' to ensure no lag or UI freezes.
- Verify pagination controls for empty connector lists.

#### Data Requirements:
- total_connectors: Generate at least 25 connectors for multi-page testing.
- empty_connector_list: A scenario with no connectors.
- specific_page_number: Test navigation to the 3rd page.
- invalid_page_number: Test navigation to page '999'.
- boundary_page_number: Test navigation to the last page.
**Test File:** [pagination_navigation_and_edge_handling.spec.js](./pagination_navigation_and_edge_handling.spec.js)
---

## Add New Test Plan: Workflow and Validation
**Description:** This scenario tests the workflow to add a new test plan using the 'Add Test Plan' button. It covers form interactions, validation, and redirection after the test plan is added.
**Priority**: high | **Complexity**: high
**Tags**: api-integration, data-validation, form-submission, workflow, auto-generated, accessibility, complex-scenario, performance, ui-test
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests- https://dev.roost.ai/roostgpt/new-test-plan
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility and clickability of the 'Add Test Plan' button.
3. 3. Click on the 'Add Test Plan' button.
4. 4. Verify redirection to the form page at /roostgpt/new-test-plan.
5. 5. Verify the presence of required input fields (e.g., test plan name, description, etc.).
6. 6. Enter a valid test plan name into the 'Test Plan Name' input field.
7. 7. Enter a valid description into the 'Description' input field.
8. 8. Configure other optional fields, if any, with appropriate test data.
9. 9. Submit the form by clicking the 'Save' button.
10. 10. Intercept and validate the API call made to save the test plan (mock if necessary).
11. 11. Verify that the user is redirected back to https://dev.roost.ai/roostgpt/tests.
12. 12. Verify the new test plan appears in the list of Test Plans.
13. 13. Search for the newly added test plan using the search functionality.
14. 14. Verify that the search results display the newly added test plan.
15. 15. Reload the page and confirm the persistence of the new test plan in the list.
16. 16. Delete the newly added test plan to clean up the test data.

#### Key Selectors:
- **Type**: button, **Text**: 'Add Test Plan', **Selector**: `button[data-testid='add-test-plan-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: input, **Text**: '', **Selector**: `input[name='test-plan-name']`, **Action**: type, **Value**: 'New Test Plan' (Page: https://dev.roost.ai/roostgpt/new-test-plan)- **Type**: input, **Text**: '', **Selector**: `textarea[name='description']`, **Action**: type, **Value**: 'This is a test plan for validating workflows.' (Page: https://dev.roost.ai/roostgpt/new-test-plan)- **Type**: button, **Text**: 'Save', **Selector**: `button[type='submit']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/new-test-plan)- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'New Test Plan' (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- User is redirected to the test plan creation page upon clicking 'Add Test Plan'.
- Test plan is successfully added and appears in the list on the main page.
- Newly added test plan is searchable using the search functionality.
- All form validations pass for valid input data.
- Page state persists after reloading.

#### Edge Cases:
- Submit the form with an empty 'Test Plan Name' field.
- Submit the form with a very long test plan name exceeding the character limit.
- Submit the form with special characters in the 'Test Plan Name' field.
- Submit the form with an empty 'Description' field, if required.
- Test what happens if the API call fails (e.g., 500 Internal Server Error).

#### Data Requirements:
- test_plan_name: 'New Test Plan'
- description: 'This is a test plan for validating workflows.'
- invalid_test_plan_name: ''
- long_test_plan_name: 'A'.repeat(256)
- special_characters: '!@#$%^&*()'
**Test File:** [add_new_test_plan__workflow_and_validation.spec.js](./add_new_test_plan__workflow_and_validation.spec.js)
---

## Pagination Controls: Navigation and State Persistence
**Description:** This scenario tests the functionality of pagination controls for navigating through multiple pages of test plans.
**Priority**: high | **Complexity**: high
**Tags**: navigation, api-integration, auto-generated, accessibility, complex-scenario, performance, keyboard-navigation, ui-test
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of pagination controls (First, Last, Previous, Next).
3. 3. Click on 'Next' button to navigate to the second page.
4. 4. Verify that the URL contains the correct query parameter for page 2.
5. 5. Verify that the test plans displayed belong to page 2.
6. 6. Click the 'Last' button to navigate to the last page.
7. 7. Verify that the URL updates to reflect the last page.
8. 8. Click the 'Previous' button to navigate back one page.
9. 9. Verify the URL and test plans correspond to the previous page.
10. 10. Click the 'First' button to return to the first page.
11. 11. Verify that the URL and test plans correspond to the first page.
12. 12. Perform a search query and ensure that pagination updates reflect the filtered results.
13. 13. Test pagination using keyboard navigation (e.g., Tab key).
14. 14. Reload the page and ensure that the current pagination state persists.

#### Key Selectors:
- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'Last', **Selector**: `button[data-testid='paginator-last-page-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Pagination controls allow navigation between pages.
- The URL updates to reflect the current page number.
- Pagination state persists after page reload.
- Test plans displayed match the current page.

#### Edge Cases:
- Attempt to navigate to a page number beyond the total pages.
- Reload the page while on a non-first page and verify state persistence.
- Test keyboard navigation for pagination buttons.
- Test pagination with no test plans (empty state).
- Search for terms that result in fewer pages and verify pagination updates.

#### Data Requirements:
- total_pages: 5
- current_page: 1
- search_query: 'New Plan'
- filtered_results: 2
- invalid_page_number: -1
**Test File:** [pagination_controls__navigation_and_state_persistence.spec.js](./pagination_controls__navigation_and_state_persistence.spec.js)
---

