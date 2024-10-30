# ********RoostGPT********
"""
Test generated by RoostGPT for test test-py using AI Type  and AI Model 

ROOST_METHOD_HASH=current_player_563a544538
ROOST_METHOD_SIG_HASH=current_player_87cbe85fd7


Scenario 1: Set Current Player to Player 1
Details:
  TestName: test_set_current_player_to_player_1
  Description: This test is intended to verify that the current player can be correctly set to Player 1.
Execution:
  Arrange: Initialize two Player objects, player_1 and player_2, and a Board object.
  Act: Invoke the current_player function with player_1 as the parameter.
  Assert: Check if the current player is indeed player_1.
Validation:
  The test is important to ensure that the function can correctly set the current player. This is essential for the game flow as the current player is expected to make a move.

Scenario 2: Set Current Player to Player 2
Details:
  TestName: test_set_current_player_to_player_2
  Description: This test is intended to verify that the current player can be correctly set to Player 2.
Execution:
  Arrange: Initialize two Player objects, player_1 and player_2, and a Board object.
  Act: Invoke the current_player function with player_2 as the parameter.
  Assert: Check if the current player is indeed player_2.
Validation:
  The test is important to ensure that the function can correctly set the current player. This is essential for the game flow as the current player is expected to make a move.

Scenario 3: Switch Current Player
Details:
  TestName: test_switch_current_player
  Description: This test is intended to verify that the current player can be switched from one player to another.
Execution:
  Arrange: Initialize two Player objects, player_1 and player_2, and a Board object. Initially, set the current player to player_1.
  Act: Invoke the current_player function with player_2 as the parameter.
  Assert: Check if the current player has been switched to player_2.
Validation:
  The test is important to ensure that the function can correctly switch the current player. This is crucial for the game flow as the current player should be switched after every move.

Scenario 4: Set Current Player to Non-Player Object
Details:
  TestName: test_set_current_player_to_non_player
  Description: This test is intended to verify that the current player cannot be set to an object that is not a Player.
Execution:
  Arrange: Initialize a Player object, player_1, a Board object, and a non-Player object, non_player.
  Act: Invoke the current_player function with non_player as the parameter.
  Assert: Check if an appropriate exception is raised.
Validation:
  The test is important to ensure that the function only accepts Player objects. This is crucial for the game flow as only players should be able to make moves.
"""

# ********RoostGPT********
import pytest
from battleship_v2.game import Game
from battleship_v2.player import Player
from battleship_v2.board import Board

class Test_GameCurrentPlayer:

    @pytest.mark.regression
    def test_set_current_player_to_player_1(self):
        # Arrange
        player_1 = Player('Player 1')
        player_2 = Player('Player 2')
        board = Board(5)
        game = Game(board, player_1, player_2)

        # Act
        game._current_player = player_1

        # Assert
        assert game._current_player == player_1

    @pytest.mark.regression
    def test_set_current_player_to_player_2(self):
        # Arrange
        player_1 = Player('Player 1')
        player_2 = Player('Player 2')
        board = Board(5)
        game = Game(board, player_1, player_2)

        # Act
        game._current_player = player_2

        # Assert
        assert game._current_player == player_2

    @pytest.mark.regression
    def test_switch_current_player(self):
        # Arrange
        player_1 = Player('Player 1')
        player_2 = Player('Player 2')
        board = Board(5)
        game = Game(board, player_1, player_2)
        game._current_player = player_1

        # Act
        game._current_player = player_2

        # Assert
        assert game._current_player == player_2

    @pytest.mark.regression
    def test_set_current_player_to_non_player(self):
        # Arrange
        player_1 = Player('Player 1')
        non_player = 'Not a player'
        board = Board(5)
        game = Game(board, player_1, non_player)

        # Act & Assert
        with pytest.raises(TypeError):
            game._current_player = non_player
