# ********RoostGPT********
"""
Test generated by RoostGPT for test test-py using AI Type  and AI Model 

ROOST_METHOD_HASH=prompt_name_44f79af63a
ROOST_METHOD_SIG_HASH=prompt_name_13756d9b8c


```
Scenario 1: Valid String Input
Details:
  TestName: test_prompt_name_valid_string
  Description: This test is intended to verify that the function correctly accepts and returns a valid string input from a user.
Execution:
  Arrange: Mock the input function to return a valid string.
  Act: Invoke the function with a valid prompt_message.
  Assert: Check that the returned value is the same as the mocked input value.
Validation:
  This test is important to ensure that the function correctly handles valid user input. The expected result is that the function will return the user's input when it is valid.

Scenario 2: Empty String Input
Details:
  TestName: test_prompt_name_empty_string
  Description: This test is intended to verify that the function correctly handles an empty string input from a user.
Execution:
  Arrange: Mock the input function to return an empty string.
  Act: Invoke the function with a valid prompt_message.
  Assert: Check that the function continues to prompt for input until a valid value is provided.
Validation:
  This test is important to ensure that the function correctly handles invalid user input. The expected result is that the function will continue to prompt the user for input until a valid value is provided.

Scenario 3: White Space String Input
Details:
  TestName: test_prompt_name_white_space_string
  Description: This test is intended to verify that the function correctly handles a string containing only white spaces as input from a user.
Execution:
  Arrange: Mock the input function to return a string containing only white spaces.
  Act: Invoke the function with a valid prompt_message.
  Assert: Check that the function continues to prompt for input until a valid value is provided.
Validation:
  This test is important to ensure that the function correctly handles invalid user input. The expected result is that the function will continue to prompt the user for input until a valid value is provided.

Scenario 4: Custom Error Message
Details:
  TestName: test_prompt_name_custom_error_message
  Description: This test is intended to verify that the function correctly displays a custom error message when provided.
Execution:
  Arrange: Mock the input function to return an empty string and the print function to capture output.
  Act: Invoke the function with a valid prompt_message and a custom error_message.
  Assert: Check that the custom error_message is displayed when invalid input is provided.
Validation:
  This test is important to ensure that the function correctly displays custom error messages. The expected result is that the function will display the custom error_message when invalid input is provided.
```

"""

# ********RoostGPT********
from typing import List, Generator, Tuple
import random
from battleship_v2.ship import Ship
from battleship_v2.utils import PromptMixin
import pytest
from unittest.mock import patch

class Test_PromptMixinPromptName:
    
    @pytest.mark.valid
    @patch('builtins.input', return_value='John')
    def test_prompt_name_valid_string(self, input):
        prompt_message = 'Enter name: '
        assert PromptMixin.prompt_name(prompt_message) == 'John'
        
    @pytest.mark.invalid
    @patch('builtins.input', side_effect=['', 'John'])
    def test_prompt_name_empty_string(self, input):
        prompt_message = 'Enter name: '
        assert PromptMixin.prompt_name(prompt_message) == 'John'

    @pytest.mark.invalid
    @patch('builtins.input', side_effect=['   ', 'John'])
    def test_prompt_name_white_space_string(self, input):
        prompt_message = 'Enter name: '
        assert PromptMixin.prompt_name(prompt_message) == 'John'
        
    @pytest.mark.valid
    @patch('builtins.input', side_effect=['', 'John'])
    @patch('builtins.print')
    def test_prompt_name_custom_error_message(self, mock_print, mock_input):
        prompt_message = 'Enter name: '
        error_message = 'Please enter a valid name.'
        assert PromptMixin.prompt_name(prompt_message, error_message) == 'John'
        mock_print.assert_called_with(error_message)
