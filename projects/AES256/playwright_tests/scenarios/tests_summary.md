# Generated Playwright Tests Summary

## Search Test Plans with Pagination and Validation
**Description:** Tests the ability to search for test plans, navigate through paginated results, and validate the returned results for accuracy.
**Priority**: high | **Complexity**: high
**Tags**: auto-generated, complex-scenario, performance, ui-test, workflow, accessibility, api-integration
**Type:** workflow
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the 'Search for Test Plans' input field.
3. 3. Type 'playwright' into the search field.
4. 4. Assert that the search results update dynamically to show relevant test plans.
5. 5. Verify that the paginator elements (First, Previous, page numbers, Next, Last) are visible and enabled.
6. 6. Click on page number '2' in the paginator.
7. 7. Assert that the results change to reflect the second page and that the URL remains the same.
8. 8. Click on the 'Next' button.
9. 9. Validate that the results correspond to the third page of the search results.
10. 10. Click on the 'Last' button.
11. 11. Assert that the final page of results is displayed.
12. 12. Click on the 'First' button.
13. 13. Assert that the first page of results is displayed again.
14. 14. Clear the search input field.
15. 15. Assert that all test plans are displayed with pagination reset to the first page.
16. 16. Attempt a search with an invalid input string (e.g., 'invalid!@#').
17. 17. Verify that no results are shown and an appropriate 'No results found' message is displayed.
18. 18. Test with a partial string (e.g., 'play').
19. 19. Assert that relevant results containing the substring 'play' are displayed.
20. 20. Verify that the paginator works as expected while the search filter is active.

#### Key Selectors:
- **Type**: input, **Text**: '', **Selector**: `input[data-testid='tests-search-box']`, **Action**: type, **Value**: 'playwright' (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Search results update dynamically based on input.
- Paginator updates correctly when navigating between pages.
- Clearing search input resets results to display all test plans.
- Invalid search input displays 'No results found' message.
- Partial strings return accurate, filtered results.

#### Edge Cases:
- Search with special characters.
- Attempt pagination with no search results.
- Search with excessively long input strings.
- Search with numerical inputs only.
- Simultaneous use of Search and Pagination.

#### Data Requirements:
- valid_search_term: 'playwright'
- invalid_search_term: 'invalid!@#'
- partial_search_term: 'play'
- excessively_long_term: 'a'.repeat(1000)
- numerical_search_term: '12345'
**Test File:** [search_test_plans_with_pagination_and_validation.spec.js](./search_test_plans_with_pagination_and_validation.spec.js)
---

## Validate Navigation Between Tabs (RoostGPT, Connectors, Test Plans)
**Description:** Tests navigation between various tabs to ensure seamless user experience and proper state persistence.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, performance, ui-test, navigation, auto-generated, accessibility, api-integration
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/roostgpt/tests- https://dev.roost.ai/roostgpt- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/roostgpt/tests.
2. 2. Verify the visibility of the navigation tab 'Test Plans'.
3. 3. Click on the ‘RoostGPT’ tab.
4. 4. Assert that the URL changes to https://dev.roost.ai/roostgpt.
5. 5. Verify that the 'RoostGPT' tab is active.
6. 6. Click on the 'Connectors' tab.
7. 7. Assert that the URL changes to https://dev.roost.ai/connectors.
8. 8. Verify that the 'Connectors' tab is active.
9. 9. Navigate back to the 'Test Plans' tab.
10. 10. Verify that the URL changes back to https://dev.roost.ai/roostgpt/tests.
11. 11. Assert that the state of the page (e.g., search field input, pagination) persists.
12. 12. Repeat the steps across all tabs to validate state persistence and navigation consistency.
13. 13. Test switching tabs rapidly and ensure no visual glitches occur.
14. 14. Close the browser and reopen the URL.
15. 15. Verify that the page loads to the last active tab.

#### Key Selectors:
- **Type**: link, **Text**: 'RoostGPT', **Selector**: `a[data-testid='roostGPT-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)- **Type**: link, **Text**: 'Connectors', **Selector**: `a[data-testid='connectors-tab']`, **Action**: click (Page: https://dev.roost.ai/roostgpt/tests)
#### Expected Results:
- Navigation between tabs updates the URL correctly.
- Active tabs are highlighted.
- Page state persists when navigating back to 'Test Plans'.
- No visual glitches occur during rapid tab switching.

#### Edge Cases:
- Attempt navigation with expired session.
- Switch tabs during an ongoing search.
- Test slow internet connections.
- Validate tab navigation on mobile devices.

#### Data Requirements:
- active_tab_index: 0
- previous_tab_state: {searchTerm: 'playwright', pagination: 2}
**Test File:** [validate_navigation_between_tabs__roostgpt__connectors__test_plans_.spec.js](./validate_navigation_between_tabs__roostgpt__connectors__test_plans_.spec.js)
---

## Connector Search Functionality
**Description:** This scenario tests the ability to search for connectors using various input terms, validates the search results, and ensures the functionality works across multiple edge cases.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, form-submission, performance, keyboard-navigation, ui-test, data_validation, auto-generated, accessibility, api-integration
**Type:** data_validation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility of the search input field with placeholder 'Search for Connectors'.
3. 3. Type a valid connector name into the search box (e.g., 'Connector123').
4. 4. Press the 'Enter' key or wait for the search to auto-submit.
5. 5. Verify that the results table updates to show only connectors matching the search term.
6. 6. Clear the search term and verify that all connectors reappear in the list.
7. 7. Enter a partial connector name (e.g., 'Conn') and verify that multiple matching results are displayed.
8. 8. Enter a non-existent connector name (e.g., 'NonExistentConnector') and verify that the results table displays 'No connectors found' or similar message.
9. 9. Test special characters in the search box (e.g., '@#$%^&*') and ensure the application handles them gracefully.
10. 10. Perform a search for a connector, reload the page, and verify that the search term persists in the search box.
11. 11. Check the impact of search functionality on pagination elements (e.g., ensure pagination updates to reflect filtered results).
12. 12. Test search functionality using keyboard-only navigation (Tab and Enter).
13. 13. Verify that the search box is accessible with proper ARIA attributes.
14. 14. Enter a very long string into the search box and ensure it does not break the UI.
15. 15. Type a valid connector name into the search box and verify any API requests made during the search.

#### Key Selectors:
- **Type**: input, **Text**: 'Search for Connectors', **Selector**: `input[data-testid='Connector-search-box']`, **Action**: type (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Search results update dynamically as search terms are entered.
- No results are shown when a non-existent connector is searched.
- Pagination updates correctly based on the filtered results.
- Search functionality is responsive and performs well even with special characters or long strings.
- Search terms persist after a page reload.

#### Edge Cases:
- Search for a connector using special characters such as '@#$%^&*'.
- Enter an excessively long search term that exceeds typical input length.
- Search for a connector name that does not exist in the database.
- Perform a search and navigate to a different page, then return to check if the search state is preserved.
- Submit an empty search term and verify that all connectors are displayed.

#### Data Requirements:
- connector_name_valid: 'Connector123'
- connector_name_partial: 'Conn'
- connector_name_nonexistent: 'NonExistentConnector'
- connector_name_special_chars: '@#$%^&*'
- connector_name_long: 'ConnectorNameThatExceedsTypicalLength'
**Test File:** [connector_search_functionality.spec.js](./connector_search_functionality.spec.js)
---

## Pagination Controls Functionality
**Description:** This test verifies the proper functioning of pagination controls on the Connectors page, including navigation to specific pages, handling edge cases, and evaluating accessibility.
**Priority**: high | **Complexity**: high
**Tags**: complex-scenario, performance, keyboard-navigation, network-resilience, ui-test, navigation, auto-generated, accessibility, api-integration
**Type:** navigation
**Pages Involved:**- https://dev.roost.ai/connectors
#### Steps:
1. 1. Navigate to https://dev.roost.ai/connectors.
2. 2. Verify the visibility and enablement of all pagination controls (First, Last, arrow buttons, and individual page numbers).
3. 3. Click the '2' pagination button and verify that the table updates to show the second page of results.
4. 4. Click the 'Next' button ('»') and verify that the next page of results is displayed.
5. 5. Click the 'Previous' button ('«') and verify that the previous page of results is displayed.
6. 6. Click the 'First' button and ensure the first page of results is displayed.
7. 7. Click the 'Last' button and verify the last page of results is displayed.
8. 8. Attempt to navigate to a page with no results and verify proper error handling (e.g., no page navigation).
9. 9. Test navigating through pages using keyboard shortcuts (Tab and Enter).
10. 10. Verify that the pagination controls are accessible with proper ARIA attributes.
11. 11. Reload the page while on a specific page (e.g., page 3) and verify that the pagination state persists.
12. 12. Verify that pagination loads correctly when the screen size is reduced (responsive behavior).
13. 13. Simulate a slow network and verify proper loading indicators or fallback UI during pagination.
14. 14. Test concurrent interactions by clicking multiple pagination buttons quickly and verify application stability.
15. 15. Monitor API requests triggered by pagination and validate the request/response flow.

#### Key Selectors:
- **Type**: button, **Text**: 'First', **Selector**: `button[data-testid='paginator-first-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '«', **Selector**: `button[data-testid='arrow-left']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: '»', **Selector**: `button[data-testid='arrow-icon']`, **Action**: click (Page: https://dev.roost.ai/connectors)- **Type**: button, **Text**: 'Last', **Selector**: `button[data-testid='paginator-last-page-button']`, **Action**: click (Page: https://dev.roost.ai/connectors)
#### Expected Results:
- Pagination controls correctly navigate to the specified pages.
- Reloading the page retains the current pagination state.
- The application handles invalid page navigation gracefully.
- Pagination is responsive across different screen sizes.
- All pagination controls are accessible and functional using keyboard navigation.

#### Edge Cases:
- Attempt to navigate to a page number that exceeds the total number of pages.
- Rapidly click pagination buttons to test for race conditions.
- Test pagination behavior when the connectors list is empty.
- Simulate a slow network and verify loading indicators during pagination.
- Attempt to navigate to a page using keyboard shortcuts only.

#### Data Requirements:
- total_connectors: At least 50 connectors to enable multi-page navigation.
- page_size: 10 connectors per page.
- invalid_page_number: A page number greater than the total pages.
**Test File:** [pagination_controls_functionality.spec.js](./pagination_controls_functionality.spec.js)
---

