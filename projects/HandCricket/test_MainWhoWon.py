# ********RoostGPT********
"""
Test generated by RoostGPT for test python-test5768 using AI Type  and AI Model 

ROOST_METHOD_HASH=who_won_87f5b3664a
ROOST_METHOD_SIG_HASH=who_won_55f93b97b9


Scenario 1: Player 1 has a higher score than Player 2
Details:
  TestName: test_player1_wins
  Description: This test verifies that the function correctly identifies when Player 1 has a higher score than Player 2.
Execution:
  Arrange: Initialize player1_score with a value greater than player2_score.
  Act: Invoke the function who_won with the initialized scores.
  Assert: The expected outcome is a message saying "Player 1 won".
Validation:
  This test is essential to ensure that the function correctly identifies the winner when Player 1 has a higher score. It verifies the core functionality of the function, as per the business logic.

Scenario 2: Player 2 has a higher score than Player 1
Details:
  TestName: test_player2_wins
  Description: This test verifies that the function correctly identifies when Player 2 has a higher score than Player 1.
Execution:
  Arrange: Initialize player2_score with a value greater than player1_score.
  Act: Invoke the function who_won with the initialized scores.
  Assert: The expected outcome is a message saying "Player 2 won".
Validation:
  This test is important to ensure that the function correctly identifies the winner when Player 2 has a higher score. It verifies the core functionality of the function, as per the business logic.

Scenario 3: Player 1 and Player 2 have equal scores
Details:
  TestName: test_draw
  Description: This test verifies that the function correctly identifies when the match ends in a draw.
Execution:
  Arrange: Initialize player1_score and player2_score with the same value.
  Act: Invoke the function who_won with the initialized scores.
  Assert: The expected outcome is a message saying "The match ended in a draw".
Validation:
  This test is important to ensure that the function correctly identifies when the match ends in a draw. It verifies the core functionality of the function, as per the business logic.

Scenario 4: Player 1 and Player 2 have zero scores
Details:
  TestName: test_zero_scores
  Description: This test verifies that the function correctly identifies when both players have zero scores.
Execution:
  Arrange: Initialize player1_score and player2_score with zero.
  Act: Invoke the function who_won with the initialized scores.
  Assert: The expected outcome is a message saying "The match ended in a draw".
Validation:
  This test is important to ensure that the function correctly handles the edge case when both players have zero scores. It verifies the robustness of the function, as per the business logic.

Scenario 5: Very large scores for both players
Details:
  TestName: test_large_scores
  Description: This test verifies that the function can handle very large scores for both players.
Execution:
  Arrange: Initialize player1_score and player2_score with very large numbers.
  Act: Invoke the function who_won with the initialized scores.
  Assert: The expected outcome is a message indicating the winner or a draw, depending on the initialized scores.
Validation:
  This test is important to ensure that the function can handle very large scores, verifying the function's robustness and scalability as per the business logic.
"""

# ********RoostGPT********
import pytest
from main import who_won

class Test_MainWhoWon:

    def test_player1_wins(self, capsys):
        player1_score = 10
        player2_score = 5
        who_won(player1_score, player2_score)
        captured = capsys.readouterr()
        assert "Player 1 won" in captured.out

    def test_player2_wins(self, capsys):
        player1_score = 5
        player2_score = 10
        who_won(player1_score, player2_score)
        captured = capsys.readouterr()
        assert "Player 2 won" in captured.out

    def test_draw(self, capsys):
        player1_score = 10
        player2_score = 10
        who_won(player1_score, player2_score)
        captured = capsys.readouterr()
        assert "The match ended in a draw" in captured.out

    def test_zero_scores(self, capsys):
        player1_score = 0
        player2_score = 0
        who_won(player1_score, player2_score)
        captured = capsys.readouterr()
        assert "The match ended in a draw" in captured.out

    def test_large_scores(self, capsys):
        player1_score = 10**18
        player2_score = 10**18
        who_won(player1_score, player2_score)
        captured = capsys.readouterr()
        assert "The match ended in a draw" in captured.out
