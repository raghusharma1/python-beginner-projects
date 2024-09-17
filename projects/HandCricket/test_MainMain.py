
# ********RoostGPT********
"""

roost_feedback [9/17/2024, 11:16:42 AM]:Please print the function location provided in ***FUNCTION LOCATION PROVIDED BELOW*** in your prompt
"""

# ********RoostGPT********

import pytest
import random
import time
from unittest.mock import patch
from HandCricket.main import main

class Test_MainMain:

    @pytest.mark.regression
    @pytest.mark.positive
    @patch('builtins.input', side_effect=[3, 1, 1, 2])
    def test_game_with_correct_inputs(self, mock_input):
        with patch('HandCricket.main.play_game') as mock_play_game:
            mock_play_game.return_value = (20, 10)
            main()
            mock_play_game.assert_called_once_with(3, '1', '2', 2)

    @pytest.mark.regression
    @pytest.mark.negative
    @patch('builtins.input', side_effect=['invalid'])
    def test_game_with_invalid_inputs(self, mock_input, capsys):
        with pytest.raises(SystemExit):
            main()
        captured = capsys.readouterr()
        assert "Invalid input, exiting game" in captured.out

    @pytest.mark.regression
    @pytest.mark.positive
    @patch('builtins.input', side_effect=[1, 1, 1, 1])
    def test_boundary_conditions(self, mock_input):
        with patch('HandCricket.main.play_game') as mock_play_game:
            mock_play_game.return_value = (1, 0)
            main()
            mock_play_game.assert_called_once_with(1, '1', '2', 1)

    @pytest.mark.performance
    @pytest.mark.positive
    @patch('builtins.input', side_effect=[10, 1, 1, 1])
    def test_game_performance(self, mock_input):
        start_time = time.time()
        with patch('HandCricket.main.play_game') as mock_play_game:
            mock_play_game.return_value = (100, 90)
            main()
            mock_play_game.assert_called_once_with(10, '1', '2', 1)
        end_time = time.time()
        assert end_time - start_time < 5, "Performance issue detected"
