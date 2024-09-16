import pytest
import random
from unittest.mock import patch
from HandCricket.main import main

class Test_MainMain:
    @pytest.mark.smoke
    @pytest.mark.regression
    @pytest.mark.positive
    @patch('builtins.input', side_effect=[3, 1, 1, 2])
    def test_game_with_correct_inputs(self, mock_input):
        with patch('HandCricket.main.play_game', return_value=(30, 25)) as mock_play:
            with patch('HandCricket.main.who_won') as mock_who_won:
                main()
                mock_play.assert_called_once_with(3, "1", "2", 2)
                mock_who_won.assert_called_once_with(30, 25)

    @pytest.mark.negative
    @patch('builtins.input', side_effect=[11, 1, 1, 2])
    def test_game_with_incorrect_inputs(self, mock_input, capsys):
        main()
        out, err = capsys.readouterr()
        assert "Invalid input, exiting game" in out

    @pytest.mark.regression
    @pytest.mark.positive
    @patch('builtins.input', side_effect=[2, 1, 1, 1])
    def test_game_with_tie_score(self, mock_input):
        with patch('HandCricket.main.play_game', return_value=(25, 25)) as mock_play:
            with patch('HandCricket.main.who_won') as mock_who_won:
                main()
                mock_play.assert_called_once_with(2, "1", "2", 1)
                mock_who_won.assert_called_once_with(25, 25)
