# ********RoostGPT********
"""
Test generated by RoostGPT for test pythinunittesting2 using AI Type Open AI and AI Model gpt-4

ROOST_METHOD_HASH=main_2e91109ffc
ROOST_METHOD_SIG_HASH=main_105191a9d8


```
Scenario 1: Valid Height and Weight inputs
Details:
  TestName: test_valid_height_weight
  Description: This test verifies that the main function correctly calculates and interprets the BMI when valid height and weight inputs are provided.
Execution:
  Arrange: Mock the input function to return valid height and weight values. Mock the print function to capture the output.
  Act: Invoke the main function.
  Assert: Check that the print function was called with the correct BMI interpretation.
Validation:
  This test is important because it verifies the main function's ability to correctly calculate and interpret BMI from user inputs, which is its primary function.

Scenario 2: Invalid Height input
Details:
  TestName: test_invalid_height
  Description: This test verifies that the main function correctly handles a case where an invalid height (zero or negative) is provided.
Execution:
  Arrange: Mock the input function to return an invalid height and a valid weight. Mock the print function to capture the output.
  Act: Invoke the main function.
  Assert: Check that the print function was called with the correct error message.
Validation:
  This test is important because it verifies the main function's ability to correctly handle invalid inputs, which is a critical part of its error handling capabilities.

Scenario 3: Invalid Weight input
Details:
  TestName: test_invalid_weight
  Description: This test verifies that the main function correctly handles a case where an invalid weight (negative) is provided.
Execution:
  Arrange: Mock the input function to return a valid height and an invalid weight. Mock the print function to capture the output.
  Act: Invoke the main function.
  Assert: Check that the print function was called with the correct error message.
Validation:
  This test is important because it verifies the main function's ability to correctly handle invalid inputs, which is a critical part of its error handling capabilities.

Scenario 4: Non-numeric inputs
Details:
  TestName: test_non_numeric_inputs
  Description: This test verifies that the main function correctly handles a case where non-numeric inputs are provided for height and weight.
Execution:
  Arrange: Mock the input function to return non-numeric values for height and weight. Mock the print function to capture the output.
  Act: Invoke the main function.
  Assert: Check that the print function was called with the correct error message.
Validation:
  This test is important because it verifies the main function's ability to correctly handle non-numeric inputs, which is a critical part of its error handling capabilities.

Scenario 5: Test the BMI categories
Details:
  TestName: test_bmi_categories
  Description: This test verifies that the main function correctly classifies the BMI into the appropriate category.
Execution:
  Arrange: Mock the input function to return height and weight values that correspond to each BMI category. Mock the print function to capture the output.
  Act: Invoke the main function for each set of input values.
  Assert: Check that the print function was called with the correct BMI category for each set of input values.
Validation:
  This test is important because it verifies the main function's ability to correctly classify BMI, which is a critical part of its functionality.
```
"""

# ********RoostGPT********
import pytest
import mock
from BMI_calculator.BMI_calculator import main, calculate_bmi, interpret_bmi

class Test_BmiCalculatorMain:
    @mock.patch('builtins.input', side_effect=['1.75', '75'])
    @mock.patch('builtins.print')
    def test_valid_height_weight(self, mock_print, mock_input):
        main()
        bmi = calculate_bmi(1.75, 75)
        result = interpret_bmi(bmi)
        mock_print.assert_called_with(result)

    @mock.patch('builtins.input', side_effect=['0', '75'])
    @mock.patch('builtins.print')
    def test_invalid_height(self, mock_print, mock_input):
        main()
        mock_print.assert_called_with("Invalid input. Height should be greater than 0.")

    @mock.patch('builtins.input', side_effect=['1.75', '-75'])
    @mock.patch('builtins.print')
    def test_invalid_weight(self, mock_print, mock_input):
        main()
        mock_print.assert_called_with("Invalid input. Please enter numerical values for height and weight.")

    @mock.patch('builtins.input', side_effect=['abc', 'def'])
    @mock.patch('builtins.print')
    def test_non_numeric_inputs(self, mock_print, mock_input):
        main()
        mock_print.assert_called_with("Invalid input. Please enter numerical values for height and weight.")

    @pytest.mark.parametrize("height, weight, message", [
        ('1.45', '45', 'Your BMI is 21.4, you have a normal weight.'),
        ('1.75', '85', 'Your BMI is 27.76, you are overweight.'),
        ('1.85', '105', 'Your BMI is 30.71, you are obese (Class I).'),
        ('1.95', '125', 'Your BMI is 32.9, you are obese (Class I).'),
        ('2.05', '145', 'Your BMI is 34.42, you are obese (Class I).'),
        ('2.15', '165', 'Your BMI is 35.64, you are obese (Class II).'),
        ('2.25', '185', 'Your BMI is 36.59, you are obese (Class II).'),
        ('2.35', '205', 'Your BMI is 37.32, you are obese (Class II).'),
        ('2.45', '225', 'Your BMI is 37.9, you are obese (Class III).')
    ])
    @mock.patch('builtins.input')
    @mock.patch('builtins.print')
    def test_bmi_categories(self, mock_print, mock_input, height, weight, message):
        mock_input.side_effect = [height, weight]
        main()
        mock_print.assert_called_with(message)
