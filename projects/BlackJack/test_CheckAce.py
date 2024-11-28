import pytest
from BlackJack.black_jack import check_ace  # Ensure this import path is correct based on your project structure
import random

class Test_CheckAce:

    @pytest.mark.positive
    def test_check_ace_with_ace_card(self):
        # Arrange
        ace_cards = ["Ace", {"rank": "Ace"}, ("Ace", "Hearts")]  # Choose the appropriate one based on implementation
        for ace_card in ace_cards:
            # Act
            result = check_ace(ace_card)

            # Assert
            assert result is True, f"Failed with input: {ace_card}"

    @pytest.mark.negative
    def test_check_ace_with_non_ace_card(self):
        # Arrange
        non_ace_cards = ["King", {"rank": "King"}, ("King", "Hearts")]  # Choose the appropriate one based on implementation
        for non_ace_card in non_ace_cards:
            # Act
            result = check_ace(non_ace_card)

            # Assert
            assert result is False, f"Failed with input: {non_ace_card}"

    @pytest.mark.invalid
    def test_check_ace_with_number_input(self):
        # Arrange
        number_input = 5

        # Act
        result = check_ace(number_input)

        # Assert
        assert result is False, "The function should return False when the input is not a card."

    @pytest.mark.invalid
    def test_check_ace_with_none_input(self):
        # Arrange
        none_input = None

        # Act
        result = check_ace(none_input)

        # Assert
        assert result is False, "The function should handle None input gracefully and return False."

    @pytest.mark.positive
    def test_check_ace_with_structured_card_object(self):
        # Arrange
        structured_card_input = {"rank": "Ace", "suit": "Spades"}  # Make sure the actual input format matches

        # Act
        result = check_ace(structured_card_input)

        # Assert
        assert result is True, "The function should correctly identify an Ace in a structured card object."
