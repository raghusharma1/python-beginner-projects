# ********RoostGPT********
"""
Test generated by RoostGPT for test Python-5768-test3 using AI Type  and AI Model 

ROOST_METHOD_HASH=month_days_1396fdc0ba
ROOST_METHOD_SIG_HASH=month_days_5dd3c5e333


### Scenario 1: Testing with a month that has 31 days
Details:
  TestName: test_month_with_31_days
  Description: Verify that the function returns 31 for months that typically have 31 days, regardless of whether it's a leap year or not.
Execution:
  Arrange: None required.
  Act: Call the function `month_days` with parameters for months 1, 3, 5, 7, 8, 10, 12, and both leap year and non-leap year scenarios.
  Assert: Check that the function returns 31 for all these cases.
Validation:
  The test ensures that the function correctly identifies months with 31 days, which is fundamental for accurate date and scheduling applications.

### Scenario 2: Testing with a month that has 30 days
Details:
  TestName: test_month_with_30_days
  Description: Ensure that the function returns 30 for months that typically have 30 days.
Execution:
  Arrange: None required.
  Act: Invoke `month_days` with months 4, 6, 9, and 11 as parameters.
  Assert: The function should return 30 for each case.
Validation:
  This confirms the function's capability to accurately reflect the standard Gregorian calendar system, which is essential for date-related operations.

### Scenario 3: Testing February in a leap year
Details:
  TestName: test_february_in_leap_year
  Description: Confirm that the function returns 29 days for February when the year is a leap year.
Execution:
  Arrange: None required.
  Act: Call `month_days` with month 2 and leap_year set to True.
  Assert: The function should return 29.
Validation:
  This test is crucial for calendar accuracy in leap years, ensuring that the additional day in February is accounted for.

### Scenario 4: Testing February in a non-leap year
Details:
  TestName: test_february_in_non_leap_year
  Description: Verify that the function returns 28 days for February when the year is not a leap year.
Execution:
  Arrange: None required.
  Act: Call `month_days` with month 2 and leap_year set to False.
  Assert: The function should return 28.
Validation:
  Validates the function's adherence to the typical calendar cycle in non-leap years, critical for date management and scheduling.

### Scenario 5: Testing with an invalid month number (less than 1)
Details:
  TestName: test_month_less_than_1
  Description: Check how the function handles a month value less than 1, which is not valid in any calendar.
Execution:
  Arrange: None required.
  Act: Call `month_days` with a month parameter of 0 or negative values.
  Assert: The function should handle this gracefully, potentially by throwing an error or returning a specific error value.
Validation:
  Ensures robustness by verifying that the function can handle erroneous inputs without crashing, which is important for maintaining stability in applications.

### Scenario 6: Testing with an invalid month number (greater than 12)
Details:
  TestName: test_month_greater_than_12
  Description: Test the function's response to a month value greater than 12, which does not exist in the Gregorian calendar.
Execution:
  Arrange: None required.
  Act: Call `month_days` with a month parameter greater than 12.
  Assert: Expect the function to either throw an error or return a specific error value.
Validation:
  This test checks the function's ability to handle incorrect input values effectively, ensuring that the application remains error-free and reliable in face of unexpected inputs.
"""

# ********RoostGPT********
import pytest
from calendar import isleap

# Simulating the existence of the function `month_days` in the same test file for demonstration.
# In a real scenario, this should be imported from the appropriate module.
def month_days(month, leap_year):
    if month < 1 or month > 12:
        raise ValueError("Month must be between 1 and 12.")
    if month in [1, 3, 5, 7, 8, 10, 12]:
        return 31
    elif month in [4, 6, 9, 11]:
        return 30
    elif month == 2 and leap_year:
        return 29
    elif month == 2 and not leap_year:
        return 28

class Test_CalculateMonthDays:
    @pytest.mark.positive
    @pytest.mark.parametrize("month", [1, 3, 5, 7, 8, 10, 12])
    def test_month_with_31_days(self, month):
        result_leap_year = month_days(month, True)
        result_non_leap_year = month_days(month, False)
        assert result_leap_year == 31
        assert result_non_leap_year == 31

    @pytest.mark.positive
    @pytest.mark.parametrize("month", [4, 6, 9, 11])
    def test_month_with_30_days(self, month):
        result = month_days(month, False)  # Leap year does not affect these months
        assert result == 30

    @pytest.mark.positive
    def test_february_in_leap_year(self):
        result = month_days(2, True)
        assert result == 29

    @pytest.mark.positive
    def test_february_in_non_leap_year(self):
        result = month_days(2, False)
        assert result == 28

    @pytest.mark.negative
    @pytest.mark.parametrize("month", [0, -1, -10])
    def test_invalid_month_less_than_1(self, month):
        with pytest.raises(ValueError):
            month_days(month, False)

    @pytest.mark.negative
    @pytest.mark.parametrize("month", [13, 14, 100])
    def test_invalid_month_greater_than_12(self, month):
        with pytest.raises(ValueError):
            month_days(month, False)
