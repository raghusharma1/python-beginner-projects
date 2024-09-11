
# ********RoostGPT********
"""
Test generated by RoostGPT for test python-test5768 using AI Type  and AI Model 

ROOST_METHOD_HASH=who_won_87f5b3664a
ROOST_METHOD_SIG_HASH=who_won_55f93b97b9


Scenario 1: Player 1 Wins
Details:
  TestName: test_player1_wins
  Description: This test is intended to verify that the function correctly identifies and prints that Player 1 has won when Player 1's score is higher than Player 2's score.
Execution:
  Arrange: Initialize player1_score to a value higher than player2_score.
  Act: Invoke the function who_won with player1_score and player2_score as parameters.
  Assert: Check that the output includes "Player 1 won".
Validation:
  This test is important to ensure that the function correctly identifies the winner based on the scores. If Player 1 has a higher score, the function should state that Player 1 won.

Scenario 2: Player 2 Wins
Details:
  TestName: test_player2_wins
  Description: This test is intended to verify that the function correctly identifies and prints that Player 2 has won when Player 2's score is higher than Player 1's score.
Execution:
  Arrange: Initialize player2_score to a value higher than player1_score.
  Act: Invoke the function who_won with player1_score and player2_score as parameters.
  Assert: Check that the output includes "Player 2 won".
Validation:
  This test is important to ensure that the function correctly identifies the winner based on the scores. If Player 2 has a higher score, the function should state that Player 2 won.

Scenario 3: Match is a Draw
Details:
  TestName: test_draw_match
  Description: This test is intended to verify that the function correctly identifies and prints that the match is a draw when Player 1's score is equal to Player 2's score.
Execution:
  Arrange: Initialize player1_score and player2_score to the same value.
  Act: Invoke the function who_won with player1_score and player2_score as parameters.
  Assert: Check that the output includes "The match ended in a draw".
Validation:
  This test is important to ensure that the function correctly identifies a draw. If both players have the same score, the function should state that the match ended in a draw.

BEGIN_GUIDELINE
- Correctness: Make sure to test the function with diverse inputs to cover all possible scenarios: Player 1 winning, Player 2 winning, and a draw.
- Boundary Conditions: Test the function with minimum and maximum possible scores. Also, check how the function behaves with scores being 0, which is a valid score but also a boundary case.
- Error Handling: While the guidelines suggest not to test varying input data types, it's important to ensure the function behaves as expected with invalid input values. For example, negative scores or non-integer scores might be considered invalid.
- Performance: This function does not deal with large datasets or heavy computations, so performance testing may not be necessary.
- Security: This function does not handle any sensitive data or operations, so security testing may be not required.
END_GUIDELINE

roost_feedback [9/11/2024, 1:09:36 PM]:Print out {{FUNCTION_LOCATION}} string from prompt in every function please
"""

# ********RoostGPT********

import pytest
from main import who_won
import random

class Test_MainWhoWon:
    @pytest.mark.positive
    def test_player1_wins(self, capsys):
        print("{{FUNCTION_LOCATION}}")
        player1_score = random.randint(50, 100)
        player2_score = random.randint(1, 49)
        who_won(player1_score, player2_score)
        out, err = capsys.readouterr()
        assert "Player 1 won" in out

    @pytest.mark.positive
    def test_player2_wins(self, capsys):
        print("{{FUNCTION_LOCATION}}")
        player1_score = random.randint(1, 49)
        player2_score = random.randint(50, 100)
        who_won(player1_score, player2_score)
        out, err = capsys.readouterr()
        assert "Player 2 won" in out

    @pytest.mark.positive
    def test_draw_match(self, capsys):
        print("{{FUNCTION_LOCATION}}")
        player1_score = player2_score = random.randint(1, 100)
        who_won(player1_score, player2_score)
        out, err = capsys.readouterr()
        assert "The match ended in a draw" in out

    @pytest.mark.negative
    def test_negative_scores(self, capsys):
        print("{{FUNCTION_LOCATION}}")
        player1_score = player2_score = -1
        who_won(player1_score, player2_score)
        out, err = capsys.readouterr()
        assert "The match ended in a draw" not in out

    @pytest.mark.negative
    def test_non_integer_scores(self, capsys):
        print("{{FUNCTION_LOCATION}}")
        player1_score = player2_score = 0.5
        who_won(player1_score, player2_score)
        out, err = capsys.readouterr()
        assert "The match ended in a draw" not in out
