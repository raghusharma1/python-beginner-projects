import pytest
import random
import time
from HandCricket.main import main

class Test_MainMain:
    
    @pytest.mark.valid
    def test_valid_game(self, mocker):
        mocker.patch('builtins.input', side_effect=['5', '1', '1', '2'])
        mocker.patch('HandCricket.main.play_game', return_value=(50, 40))
        mocker.patch('HandCricket.main.who_won')
        main()
        HandCricket.main.play_game.assert_called_once_with(5, '1', '2', 2)
        HandCricket.main.who_won.assert_called_once_with(50, 40)

    @pytest.mark.boundary
    @pytest.mark.parametrize("overs", [1, 10])
    def test_boundary_overs(self, overs, mocker):
        mocker.patch('builtins.input', side_effect=[str(overs), '1', '1', '2'])
        mocker.patch('HandCricket.main.play_game', return_value=(10, 20))
        mocker.patch('HandCricket.main.who_won')
        main()
        HandCricket.main.play_game.assert_called_once_with(overs, '1', '2', 2)
        HandCricket.main.who_won.assert_called_once_with(10, 20)
        
    @pytest.mark.error
    def test_invalid_inputs(self, mocker):
        mocker.patch('builtins.input', side_effect=['invalid', '1', '1', '2'])
        with pytest.raises(ValueError):
            main()

    @pytest.mark.performance
    def test_performance_maximum_overs_difficulty(self, mocker):
        start_time = time.time()
        mocker.patch('builtins.input', side_effect=['10', '1', '1', '3'])
        mocker.patch('HandCricket.main.play_game', return_value=(100, 90))
        mocker.patch('HandCricket.main.who_won')
        main()
        end_time = time.time()
        assert end_time - start_time < 5
        HandCricket.main.play_game.assert_called_once_with(10, '1', '2', 3)
        HandCricket.main.who_won.assert_called_once_with(100, 90)
