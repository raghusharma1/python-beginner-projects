# ********RoostGPT********
"""
Test generated by RoostGPT for test pythinunittesting2 using AI Type Open AI and AI Model gpt-4

ROOST_METHOD_HASH=main_2e91109ffc
ROOST_METHOD_SIG_HASH=main_105191a9d8


```
Scenario 1: Test for normal weight category
Details:
  TestName: test_bmi_normal
  Description: This test verifies that the function correctly interprets the BMI and returns the correct classification for a person with normal weight.
Execution:
  Arrange: Initialize a height and weight that would result in a BMI within the normal range (18.5 - 24.9).
  Act: Call the function calculate_bmi with the initialized height and weight, and pass the result to interpret_bmi.
  Assert: Check that the returned string correctly classifies the person as having a normal weight.
Validation:
  This test ensures that the function correctly classifies a person with a normal BMI, which is crucial for the correct usage of the application.

Scenario 2: Test for underweight category
Details:
  TestName: test_bmi_underweight
  Description: This test verifies that the function correctly interprets the BMI and returns the correct classification for an underweight person.
Execution:
  Arrange: Initialize a height and weight that would result in a BMI under 18.5.
  Act: Call the function calculate_bmi with the initialized height and weight, and pass the result to interpret_bmi.
  Assert: Check that the returned string correctly classifies the person as underweight.
Validation:
  This test ensures that the function correctly classifies an underweight person, which is crucial for the correct usage of the application.

Scenario 3: Test for overweight category
Details:
  TestName: test_bmi_overweight
  Description: This test verifies that the function correctly interprets the BMI and returns the correct classification for an overweight person.
Execution:
  Arrange: Initialize a height and weight that would result in a BMI between 25 and 29.9.
  Act: Call the function calculate_bmi with the initialized height and weight, and pass the result to interpret_bmi.
  Assert: Check that the returned string correctly classifies the person as overweight.
Validation:
  This test ensures that the function correctly classifies an overweight person, which is crucial for the correct usage of the application.

Scenario 4: Test for obese categories
Details:
  TestName: test_bmi_obese
  Description: This test verifies that the function correctly interprets the BMI and returns the correct classification for an obese person.
Execution:
  Arrange: Initialize a height and weight that would result in a BMI above 30.
  Act: Call the function calculate_bmi with the initialized height and weight, and pass the result to interpret_bmi.
  Assert: Check that the returned string correctly classifies the person as obese.
Validation:
  This test ensures that the function correctly classifies an obese person, which is crucial for the correct usage of the application.

Scenario 5: Test for invalid input
Details:
  TestName: test_invalid_input
  Description: This test verifies that the function correctly handles invalid inputs and returns the appropriate error message.
Execution:
  Arrange: Initialize a height and weight that would result in a BMI of None (eg. height=0).
  Act: Call the function calculate_bmi with the initialized height and weight, and pass the result to interpret_bmi.
  Assert: Check that the returned string correctly informs about the invalid input.
Validation:
  This test ensures that the function correctly handles invalid inputs, which is important for robustness and usability of the application.
```

"""

# ********RoostGPT********
import pytest
from BMI_calculator.BMI_calculator import calculate_bmi, interpret_bmi

class Test_BmiCalculatorMain:
    @pytest.mark.positive
    def test_bmi_normal(self):
        height = 1.75
        weight = 70
        bmi = calculate_bmi(height, weight)
        result = interpret_bmi(bmi)
        assert result == f"Your BMI is {bmi}, you have a normal weight."
        
    @pytest.mark.positive
    def test_bmi_underweight(self):
        height = 1.75
        weight = 50
        bmi = calculate_bmi(height, weight)
        result = interpret_bmi(bmi)
        assert result == f"Your BMI is {bmi}, you are underweight."

    @pytest.mark.positive
    def test_bmi_overweight(self):
        height = 1.75
        weight = 80
        bmi = calculate_bmi(height, weight)
        result = interpret_bmi(bmi)
        assert result == f"Your BMI is {bmi}, you are overweight."

    @pytest.mark.positive
    def test_bmi_obese(self):
        height = 1.75
        weight = 100
        bmi = calculate_bmi(height, weight)
        result = interpret_bmi(bmi)
        assert result == f"Your BMI is {bmi}, you are obese (Class I)."

    @pytest.mark.negative
    def test_invalid_input(self):
        height = 0
        weight = 70
        bmi = calculate_bmi(height, weight)
        result = interpret_bmi(bmi)
        assert result == "Invalid input. Height should be greater than 0."
