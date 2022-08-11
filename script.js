const { useState, useEffect } = React;

const PLAYER_X = "x";
const PLAYER_O = "o";

const WINNING_STATES = [
[0, 1, 2],
[3, 4, 5],
[2, 5, 8],
[0, 3, 6],
[6, 7, 8],
[0, 4, 8],
[2, 4, 6],
[1, 4, 7]];


const Status = props => {
  const { winner, tie, turnCounter, playerTurn, winningCell } = props;

  let status = `Turn ${turnCounter}: ${playerTurn}'s turn`;
  if (winner) {
    status = `The winner is ${winner}`;
  } else if (tie) {
    status = "Tie";
  }

  return /*#__PURE__*/React.createElement("div", { className: "Status" }, status);
};

const Cell = props => {
  const {
    player,
    index,
    onClick,
    onCellClick,
    active,
    winningCell,
    playerTurn } =
  props;

  const click = () => {
    if (!player && active) {
      onCellClick(index);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", {
      className: `Cell ${!player ? "Cell--selectable" : ""} ${
      active ? "Cell--active" : ""
      } ${winningCell ? "Cell--winning" : ""} ${
      active ? `Cell--turn-${playerTurn}` : ""
      }`,
      onClick: click },

    player || ""));


};

const Grid = props => {
  const { grid, onCellClick, active, tie, winningCells, playerTurn } = props;

  return /*#__PURE__*/(
    React.createElement("div", { className: `Grid ${tie ? "Grid--tie" : ""}` },
    grid.map((cell, index) => /*#__PURE__*/
    React.createElement(Cell, {
      player: cell,
      index: index,
      onCellClick: onCellClick,
      active: active,
      winningCell: winningCells && winningCells.includes(index),
      playerTurn: playerTurn }))));




};

const TicTacToe = () => {
  const generateGrid = () => {
    return Array.from(new Array(9), x => null);
  };

  const [grid, setGrid] = useState(generateGrid());
  const [winner, setWinner] = useState(null);
  const [tie, setTie] = useState(false);
  const [turnCounter, setTurnCounter] = useState(1);
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [winningCells, setWinningCells] = useState(null);

  const resetGame = () => {
    setWinner(null);
    setGrid(generateGrid());
    setWinningCells(null);
    setPlayerTurn(PLAYER_X);
    setTie(false);
    setTurnCounter(1);
  };

  const checkWinner = (grid, turn) => {
    for (state of WINNING_STATES) {
      const winningCells = [];
      for (cell of state) {
        if (grid[cell] === turn) {
          winningCells.push(cell);
        }
      }
      if (winningCells.length === 3) {
        return { winner: turn, winningCells: winningCells };
      }
    }
    return { winner: null, winningCells: null };
  };

  const onCellClick = index => {
    const newGrid = grid.slice();
    newGrid[index] = playerTurn;
    setGrid(newGrid);

    const { winner: winner_, winningCells: winningCells_ } = checkWinner(
    newGrid,
    playerTurn);

    if (winner_) {
      setWinner(winner_);
      setWinningCells(winningCells_);
    } else {
      setTurnCounter(turnCounter + 1);
      if (turnCounter === 9) {
        setTie(true);
      } else {
        setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
      }
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "TicTacToe" }, /*#__PURE__*/
    React.createElement("h1", null, "Tic-tac-toe"), /*#__PURE__*/
    React.createElement(Status, {
      winner: winner,
      playerTurn: playerTurn,
      turnCounter: turnCounter,
      tie: tie }), /*#__PURE__*/

    React.createElement(Grid, {
      grid: grid,
      winningCells: winningCells,
      onCellClick: onCellClick,
      active: !winner,
      playerTurn: playerTurn,
      tie: tie }), /*#__PURE__*/

    React.createElement("button", { className: "Reset", onClick: resetGame }, "Reset")));




};

ReactDOM.render( /*#__PURE__*/React.createElement(TicTacToe, null), document.getElementById("root"));