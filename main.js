const players = {
  '1': 'red',
  '-1': 'blue',
}

const root = document.querySelector(':root');
const gameStateMessage = document.getElementById('game-state');
const columnButtons = [...document.querySelectorAll('#column-buttons div')];
const actionButton = document.querySelector('button');

let currentPlayer, currentBoard, winner;

document.getElementById('column-buttons')
        .addEventListener('click', handleBoardClick);
actionButton.addEventListener('click', handleActionButtonClick);

function init() {      
  currentPlayer = 1;
  currentBoard = [
    [0, 0, 0, 0, 0, 0], // column 0 (left)
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], // column 6 (right)
  ];
  render();
}

function handleBoardClick(event) {
  if (event.target.tagName !== 'DIV') return;
  const ci = columnButtons.indexOf(event.target);
  const ri = currentBoard[ci].indexOf(0);
  currentBoard[ci][ri] = currentPlayer;
  winner = checkForWinner(ci, ri);
  currentPlayer = -currentPlayer;
  render();
}  

function handleActionButtonClick() {
  init();
}  

function render() {
  root.style.setProperty('--current-player-color', players[currentPlayer]);

  columnButtons.forEach((button, bi) => {
    const hideButton = !currentBoard[bi].includes(0) || winner;
    button.style.visibility = hideButton ? 'hidden' : 'visible';
  });

  if (winner === 'T') {
    gameStateMessage.textContent = 'It’s a tie!';
  } else if (winner) {
    gameStateMessage.innerHTML = `<span style="color: ${players[winner]}">${players[winner].toUpperCase()}</span> player wins!`;
  } else {
    gameStateMessage.innerHTML = `It’s <span style="color: ${players[currentPlayer]}">${players[currentPlayer].toUpperCase()}</span> player’s turn.`;
  }

  currentBoard.forEach((col, ci) => {
    col.forEach((row, ri) => {
      const id = `c${ci}r${ri}`;
      const slot = document.getElementById(id);
      slot.textContent = currentBoard[ci][ri] !== 0 ? 'o' : '';
      slot.style.color = players[currentBoard[ci][ri]];
    });
  });

  actionButton.textContent = 'Reset Game';
}

function checkForWinner(ci, ri) {
  return (
    countAdjacent(ci, ri, 0, -1) === 3 ||
    countAdjacent(ci, ri, -1, 0) + countAdjacent(ci, ri, 1, 0) >= 3 ||
    countAdjacent(ci, ri, -1, 1) + countAdjacent(ci, ri, 1, -1) >= 3 ||
    countAdjacent(ci, ri, 1, 1) + countAdjacent(ci, ri, -1, -1) >= 3
  ) ? currentBoard[ci][ri] : null;
}

function countAdjacent(ci, ri, cd, rd) { // cd = column delta; rd = row delta
  const player = currentBoard[ci][ri];
  let count = 0;
  ci += cd; ri += rd;
  while (
    currentBoard[ci] !== undefined &&
    currentBoard[ci][ri] !== undefined &&
    currentBoard[ci][ri] === player
  ) {
    count++;
    ci += cd; ri += rd;
  }
  return count;
}

init();
