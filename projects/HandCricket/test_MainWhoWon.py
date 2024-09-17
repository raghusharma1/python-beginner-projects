# ********RoostGPT********
"""
Test generated by RoostGPT for test python-test5768 using AI Type  and AI Model 

ROOST_METHOD_HASH=who_won_87f5b3664a
ROOST_METHOD_SIG_HASH=who_won_55f93b97b9


### Test Scenarios for `who_won` function

#### Scenario 1: Player 1 has a higher score than Player 2
Details:
  TestName: test_player1_wins
  Description: Verify that the function correctly identifies when Player 1 has a higher score than Player 2 and prints the appropriate win message.
Execution:
  Arrange: Prepare the scores where player1_score > player2_score.
  Act: Call the who_won function with the prepared scores.
  Assert: Check if the output correctly states "Player 1 won".
Validation:
  Rationalize the importance of the test by ensuring the function adheres to the expected game result logic when Player 1 has a higher score.

#### Scenario 2: Player 2 has a higher score than Player 1
Details:
  TestName: test_player2_wins
  Description: Verify that the function correctly identifies when Player 2 has a higher score than Player 1 and prints the appropriate win message.
Execution:
  Arrange: Prepare the scores where player2_score > player1_score.
  Act: Call the who_won function with the prepared scores.
  Assert: Check if the output correctly states "Player 2 won".
Validation:
  Rationalize the importance of the test by ensuring the function adheres to the expected game result logic when Player 2 has a higher score.

#### Scenario 3: Player 1 and Player 2 have the same score
Details:
  TestName: test_draw_match
  Description: Verify that the function correctly identifies when both players have the same score and prints a draw message.
Execution:
  Arrange: Prepare the scores where player1_score == player2_score.
  Act: Call the who_won function with the prepared scores.
  Assert: Check if the output correctly states "The match ended in a draw".
Validation:
  Rationalize the importance of the test by ensuring the function correctly implements the game logic for a draw scenario.

### Test Guidelines

BEGIN_GUIDELINE
**Correctness**: The function should accurately report the game outcome based on the provided scores. Each condition (win, loss, draw) needs to be tested with scores that clearly fall into these categories.

**Boundary Conditions**: While the function does not limit score values, testing with extreme values (such as very high or low integers) can be useful to ensure that the function handles a wide range of integers correctly without errors.

**Error Handling**: Although the prompt specifies avoiding tests for input types, it's generally good practice to ensure that the function can handle unexpected input gracefully. However, for this specific guideline, focus will remain on the logical correctness of score comparisons.

**Performance**: Given the simplicity of the function (simple comparisons and print statements), performance tests are not critical. However, ensuring that the function executes in a reasonable time frame even with a high number of function calls could be considered in a more complex scenario.

**Security**: Security considerations are minimal for this function as it does not interact with external systems or manage sensitive data. Ensure that the inputs are integers and consider testing unintended input manipulations if extending the function's features.
END_GUIDELINE

These guidelines and scenarios ensure comprehensive testing of the `who_won` function, focusing on validating its logic and behavior as per the requirements.
"""

# ********RoostGPT********
import pytest
from main import who_won
from io import StringIO
import sys

class Test_MainWhoWon:
    @pytest.mark.positive
    def test_player1_wins(self, monkeypatch):
        # Arrange
        player1_score = 100
        player2_score = 50
        expected_output = "Player 1 won"
        
        # Act & Assert
        with monkeypatch.context() as m:
            m.setattr(sys, 'stdout', StringIO())
            who_won(player1_score, player2_score)
            output = sys.stdout.getvalue()
            assert expected_output in output

    @pytest.mark.positive
    def test_player2_wins(self, monkeypatch):
        # Arrange
        player1_score = 30
        player2_score = 80
        expected_output = "Player 2 won"
        
        # Act & Assert
        with monkeypatch.context() as m:
            m.setattr(sys, 'stdout', StringIO())
            who_won(player1_score, player2_score)
            output = sys.stdout.getvalue()
            assert expected_output in output

    @pytest.mark.positive
    def test_draw_match(self, monkeypatch):
        # Arrange
        player1_score = 70
        player2_score = 70
        expected_output = "The match ended in a draw"
        
        # Act & Assert
        with monkeypatch.context() as m:
            m.setattr(sys, 'stdout', StringIO())
            who_won(player1_score, player2_score)
            output = sys.stdout.getvalue()
            assert expected_output in output

if __name__ == '__main__':
    pytest.main()
