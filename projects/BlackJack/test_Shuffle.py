import pytest
from BlackJack.black_jack import shuffle
import random

@pytest.mark.usefixtures("setup")
class Test_Shuffle:

    @pytest.mark.valid
    def test_shuffle_preserves_elements(self):
        # Arrange
        original_list = [1, 2, 3, 4, 5]
        copy_list = original_list[:]
        
        # Act
        shuffle(copy_list)
        
        # Assert
        assert sorted(original_list) == sorted(copy_list), "Shuffled list does not contain same elements"

    @pytest.mark.valid
    def test_shuffle_changes_order(self):
        # Arrange
        original_list = [1, 2, 3, 4, 5]
        copy_list = original_list[:]
        
        # Act
        shuffle(copy_list)
        
        # Assert
        assert original_list != copy_list, "Shuffled list is in the same order as the original list"

    @pytest.mark.valid
    def test_shuffle_empty_list(self):
        # Arrange
        empty_list = []
        
        # Act
        shuffle(empty_list)
        
        # Assert
        assert empty_list == [], "Empty list should remain empty after shuffle"

    @pytest.mark.valid
    def test_shuffle_produces_varied_results(self):
        # Arrange
        original_list = [1, 2, 3, 4, 5]
        first_shuffle = original_list[:]
        second_shuffle = original_list[:]
        
        # Act
        shuffle(first_shuffle)
        shuffle(second_shuffle)
        
        # Assert
        assert first_shuffle != second_shuffle, "Two consecutive shuffles resulted in the same order"

    @pytest.mark.valid
    def test_shuffle_retains_length(self):
        # Arrange
        original_list = [1, 2, 3, 4, 5]
        copy_list = original_list[:]
        
        # Act
        shuffle(copy_list)
        
        # Assert
        assert len(original_list) == len(copy_list), "Length of the list changed after shuffle"
