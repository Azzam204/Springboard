import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    const trueOrFalse = () => {
      const randInt = Math.floor(Math.random() * 100) + 1;
      if (randInt <= chanceLightStartsOn * 100) return true;
      return false
    };

    for (let step = 0; step < nrows; step++) {
      let row = [];
      for (let step = 0; step < ncols; step++) {
        row.push(trueOrFalse())
      }
      initialBoard.push(row)
    }

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }


  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let cell of row) {
        if(cell) return false
      }
    }
    return true
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  if (hasWon()) {
    return (
      <div> YOU WIN!!!!!!!</div>
    )
  }


  return (
    <table className="Board" >
      <tbody>
        {board.map((r, y) => (
          <tr key={y}>
            {r.map((c, x) => (
              <Cell
                key={`${y}-${x}`}
                flipCellsAroundMe={e => flipCellsAround(`${y}-${x}`)}
                isLit={c} />
            )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Board;
