
# ********RoostGPT********
"""

roost_feedback [9/16/2024, 5:41:15 PM]:Print out function location from the prompt provided
"""

# ********RoostGPT********

import pytest
from unittest.mock import MagicMock
from HandCricket.main import main

class Test_MainMain:

    @pytest.mark.parametrize("overs, team1_score, team2_score", [(5, 50, 40), (1, 10, 20), (10, 100, 90)])
    def test_valid_game(self, overs, team1_score, team2_score, mocker):
        mocker.patch('builtins.input', side_effect=[str(overs), '1', '1', '2'])
        mocker.patch('HandCricket.main.play_game', return_value=(team1_score, team2_score))
        mocker.patch('HandCricket.main.who_won')
        main()
        HandCricket.main.play_game.assert_called_once_with(overs, '1', '2', 2)
        HandCricket.main.who_won.assert_called_once_with(team1_score, team2_score)

    def test_invalid_inputs(self, mocker):
        mocker.patch('builtins.input', side_effect=['invalid', '1', '1', '2'])
        with pytest.raises(ValueError):
            main()

    def test_performance_maximum_overs_difficulty(self, mocker):
        mocker.patch('builtins.input', side_effect=['10', '1', '1', '3'])
        mocker.patch('HandCricket.main.play_game', return_value=(100, 90))
        mocker.patch('HandCricket.main.who_won')
        start_time = time.perf_counter()
        main()
        end_time = time.perf_counter()
        assert end_time - start_time < 5
        HandCricket.main.play_game.assert_called_once_with(10, '1', '2', 3)
        HandCricket.main.who_won.assert_called_once_with(100, 90)
