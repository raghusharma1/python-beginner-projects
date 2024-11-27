# Import the necessary libraries and method
from BlackJack.black_jack import deal_one
import pytest
import random

# Test class for the deal_one function
class Test_DealOne:

    @pytest.mark.regression
    def test_deal_one_reduces_deck_size(self):
        # Arrange
        deck = Deck()  # Assuming Deck is the class with the `deal_one` method
        initial_size = len(deck.cards)  # Assume deck has an attribute `cards` which is a list of cards
        
        # Act
        deck.deal_one()
        
        # Assert
        assert len(deck.cards) == initial_size - 1

    @pytest.mark.negative
    def test_deal_one_from_empty_deck(self):
        # Arrange
        deck = Deck()  # Assuming Deck is the class with `deal_one` method
        deck.cards = []  # Create an empty deck

        # Act / Assert
        with pytest.raises(Exception):  # Replace Exception with the specific exception expected
            deck.deal_one()

    @pytest.mark.valid
    def test_deal_one_specific_card(self):
        # Arrange
        deck = Deck()  # Assuming Deck is the class with `deal_one` method
        # Assuming cards are in a known order; adjust based on your deck's initialization
        expected_card = deck.cards[0]

        # Act
        dealt_card = deck.deal_one()

        # Assert
        assert dealt_card == expected_card

    @pytest.mark.performance
    def test_deal_one_deals_all_cards(self):
        # Arrange
        deck = Deck()  # Assuming Deck is the class with `deal_one` method
        num_cards = len(deck.cards)
        
        # Act
        dealt_cards = []
        for _ in range(num_cards):
            dealt_card = deck.deal_one()
            dealt_cards.append(dealt_card)
        
        # Assert
        assert len(deck.cards) == 0
        assert len(dealt_cards) == num_cards
    
    @pytest.mark.security
    def test_deal_one_unique_card_output(self):
        # Arrange
        deck = Deck()  # Assuming Deck is the class with `deal_one` method
        dealt_cards = set()
        
        # Act
        while deck.cards:
            dealt_card = deck.deal_one()
            assert dealt_card not in dealt_cards  # Each card dealt should be unique
            dealt_cards.add(dealt_card)

# Note: The Deck class and its behavior are assumed for these tests. Adjust as necessary for your actual implementation.
// TODO: Replace 'Exception' in test_deal_one_from_empty_deck with the correct exception type raised by deal_one.
