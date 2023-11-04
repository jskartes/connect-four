const players = {
  '1': 'red',
  '-1': 'blue',
}

const root = document.querySelector(':root');
const gameStateMessage = document.getElementById('game-state');
const columnButtons = [...document.querySelectorAll('#column-buttons div')];
const actionButton = document.querySelector('button');

let currentPlayer, currentBoard;

document.getElementById('column-buttons')
        .addEventListener('click', handleBoardClick);
actionButton.addEventListener('click', handleActionButtonClick);

function handleBoardClick(event) {
  if (event.target.tagName !== 'DIV') return;
  const ci = columnButtons.indexOf(event.target);
  const ri = currentBoard[ci].indexOf(0);
  currentBoard[ci][ri] = currentPlayer;
  currentPlayer = -currentPlayer;
  render();
}

function handleActionButtonClick() {
  init();
}

function init() {      
  currentPlayer = 1;
  currentBoard = [
    [0, 0, 0, 0, 0, 0], // column 6 (right)
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], //   .
    [0, 0, 0, 0, 0, 0], // column 0 (left)
  ];
  render();
}

function render() {
  root.style.setProperty('--current-player-color', players[currentPlayer]);

  gameStateMessage.innerHTML =
    `<span style="color: ${players[currentPlayer]}">${players[currentPlayer].toUpperCase()}</span> player’s turn`;

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

init();
