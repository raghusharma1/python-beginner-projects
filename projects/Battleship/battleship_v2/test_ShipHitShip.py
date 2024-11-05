# ********RoostGPT********
"""
Test generated by RoostGPT for test test-py using AI Type  and AI Model 

ROOST_METHOD_HASH=hit_ship_3bdac7fefd
ROOST_METHOD_SIG_HASH=hit_ship_6f0656d6db


Scenario 1: Test that the function correctly marks a ship cell as hit.
Details:
  TestName: test_hit_ship_marks_cell_as_hit
  Description: This test is intended to verify that the function correctly marks a cell as hit when provided with a valid row and column.
Execution:
  Arrange: Initialize a ship object with a set of coordinates. 
  Act: Invoke the hit_ship function with a row and column that exists within the ship's coordinates.
  Assert: Verify that the cell is removed from the _un_hit_coordinates set.
Validation:
  This test is important as it verifies the basic functionality of the hit_ship function, ensuring that it correctly marks cells as hit.

Scenario 2: Test that the function throws an exception when trying to hit a cell that has already been hit.
Details:
  TestName: test_hit_ship_raises_exception_when_cell_already_hit
  Description: This test checks that the function raises an InvalidHitMoveException when trying to hit a cell that has already been hit.
Execution:
  Arrange: Initialize a ship object and hit a cell.
  Act: Attempt to hit the same cell again.
  Assert: Check that an InvalidHitMoveException is thrown.
Validation:
  This test ensures that the function correctly prevents cells from being hit more than once, which is a key rule in the game of Battleship.

Scenario 3: Test that the function throws an exception when trying to hit a cell that is not part of the ship.
Details:
  TestName: test_hit_ship_raises_exception_when_cell_not_part_of_ship
  Description: This test checks that the function raises an InvalidHitMoveException when trying to hit a cell that is not part of the ship.
Execution:
  Arrange: Initialize a ship object with a certain set of coordinates.
  Act: Attempt to hit a cell that is not in the ship's coordinates.
  Assert: Check that an InvalidHitMoveException is thrown.
Validation:
  This test ensures that the function correctly prevents cells that are not part of the ship from being hit, maintaining the integrity of the game rules.

Scenario 4: Test that the function throws an exception when trying to hit a ship that has already been destroyed.
Details:
  TestName: test_hit_ship_raises_exception_when_ship_already_destroyed
  Description: This test checks that the function raises an InvalidHitMoveException when trying to hit a ship that has already been destroyed.
Execution:
  Arrange: Initialize a ship object and hit all its cells.
  Act: Attempt to hit a cell of the now destroyed ship.
  Assert: Check that an InvalidHitMoveException is thrown.
Validation:
  This test ensures that the function correctly prevents a destroyed ship from being hit again, which is an important requirement in the game of Battleship.
"""

# ********RoostGPT********
import pytest
from typing import Set, Tuple, List
from exceptions import InvalidHitMoveException, InvalidShipCoordinateException
from ship import Ship  # Corrected import statement

class Test_ShipHitShip:

    @pytest.mark.regression
    @pytest.mark.positive
    def test_hit_ship_marks_cell_as_hit(self):
        ship = Ship([(0, 0), (0, 1), (0, 2)])
        ship.hit_ship(0, 0)
        assert (0, 0) not in ship._un_hit_coordinates

    @pytest.mark.regression
    @pytest.mark.negative
    def test_hit_ship_raises_exception_when_cell_already_hit(self):
        ship = Ship([(0, 0), (0, 1), (0, 2)])
        ship.hit_ship(0, 0)
        with pytest.raises(InvalidHitMoveException):
            ship.hit_ship(0, 0)

    @pytest.mark.regression
    @pytest.mark.negative
    def test_hit_ship_raises_exception_when_cell_not_part_of_ship(self):
        ship = Ship([(0, 0), (0, 1), (0, 2)])
        with pytest.raises(InvalidHitMoveException):
            ship.hit_ship(1, 1)

    @pytest.mark.regression
    @pytest.mark.negative
    def test_hit_ship_raises_exception_when_ship_already_destroyed(self):
        ship = Ship([(0, 0)])
        ship.hit_ship(0, 0)
        with pytest.raises(InvalidHitMoveException):
            ship.hit_ship(0, 0)
