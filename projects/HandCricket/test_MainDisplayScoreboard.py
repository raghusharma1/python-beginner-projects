# ********RoostGPT********
"""
Test generated by RoostGPT for test python-test5768 using AI Type  and AI Model 

ROOST_METHOD_HASH=display_scoreboard_41d2872602
ROOST_METHOD_SIG_HASH=display_scoreboard_ed11966a39


Scenario 1: Displaying Scoreboard with Equal Scores
Details:
  TestName: test_display_scoreboard_equal_scores
  Description: This test is intended to verify if the function displays the scores correctly when both players have the same score.
Execution:
  Arrange: Initialize player1_score and player2_score with the same value. Set the over variable.
  Act: Call the function display_scoreboard with the initialized variables.
  Assert: Check if the displayed scores are correct and equal for both the players.
Validation:
  Rationalize: This test is important because it verifies the function's ability to handle the edge case where both players have the same score.

Scenario 2: Scoreboard display with zero scores
Details:
  TestName: test_display_scoreboard_zero_scores
  Description: This test verifies if the function correctly displays the scoreboard when both players have a score of zero.
Execution:
  Arrange: Initialize player1_score and player2_score with zero. Set the over variable.
  Act: Call the function display_scoreboard with the initialized variables.
  Assert: Check if the displayed scores are correct and zero for both players.
Validation:
  Rationalize: This test is crucial as it is necessary to verify that the function can handle the minimum possible score.

Scenario 3: Scoreboard display with maximum possible scores
Details:
  TestName: test_display_scoreboard_max_scores
  Description: This test verifies if the function correctly displays the scoreboard when both players have the maximum possible score.
Execution:
  Arrange: Initialize player1_score and player2_score with the maximum possible value. Set the over variable.
  Act: Call the function display_scoreboard with the initialized variables.
  Assert: Check if the displayed scores are correct and equal to the maximum possible score for both players.
Validation:
  Rationalize: This test is crucial as it is necessary to verify that the function can handle the maximum possible score. 

BEGIN_GUIDELINE 
Correctness: The function should correctly display the scores of the two players and the over number. This should be validated using a variety of test cases, including edge cases like zero and maximum scores.
Boundary Conditions: The function should be tested with the minimum and maximum possible scores for the players. This will ensure that the function can handle these edge cases without errors.
Error Handling: As this function does not accept any invalid values, there is no need for error handling tests in this context.
Performance: This function does not handle large data sets or undergo stress conditions, so no performance tests are needed in this context.
Security: This function does not handle any sensitive data or operations that could potentially breach data integrity or security, so no security tests are needed in this context.
END_GUIDELINE
"""

# ********RoostGPT********
import pytest
from main import display_scoreboard  # Corrected import statement
import random

class Test_MainDisplayScoreboard:
    @pytest.mark.regression
    def test_display_scoreboard_equal_scores(self, capsys):
        # Arrange
        player1_score = random.randint(1, 10)
        player2_score = player1_score
        over = random.randint(1, 5)

        # Act
        display_scoreboard(player1_score, player2_score, over)

        # Assert
        captured = capsys.readouterr()
        assert f"Over {over + 1}:\nPlayer 1: {player1_score} runs\nPlayer 2: {player2_score} runs" in captured.out

    @pytest.mark.smoke
    def test_display_scoreboard_zero_scores(self, capsys):
        # Arrange
        player1_score = 0
        player2_score = 0
        over = random.randint(1, 5)

        # Act
        display_scoreboard(player1_score, player2_score, over)

        # Assert
        captured = capsys.readouterr()
        assert f"Over {over + 1}:\nPlayer 1: {player1_score} runs\nPlayer 2: {player2_score} runs" in captured.out

    @pytest.mark.performance
    def test_display_scoreboard_max_scores(self, capsys):
        # Arrange
        player1_score = random.randint(100, 200)
        player2_score = player1_score
        over = random.randint(1, 5)

        # Act
        display_scoreboard(player1_score, player2_score, over)

        # Assert
        captured = capsys.readouterr()
        assert f"Over {over + 1}:\nPlayer 1: {player1_score} runs\nPlayer 2: {player2_score} runs" in captured.out
