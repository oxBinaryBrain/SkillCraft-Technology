const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const gameStatus = document.getElementById('game-status');
const playerVsPlayer = document.getElementById('player-vs-player');
const playerVsComputer = document.getElementById('player-vs-computer');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let gameMode = 'PvP'; // Default to Player vs Player
let gameActive = true;

// Winning Combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize Game
function initializeGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleCellClick);
  });
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  gameStatus.textContent = `Player ${currentPlayer}'s turn`;
  gameActive = true;
  resetButton.disabled = false;
}

// Handle Cell Click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    gameStatus.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every((cell) => cell)) {
    gameStatus.textContent = 'It\'s a tie!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    if (gameMode === 'PvC' && currentPlayer === 'O') {
      computerMove();
    }
  }
}

// Check Winner
function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => gameBoard[index] === currentPlayer);
  });
}

// Computer Move (Simple AI)
function computerMove() {
  const emptyCells = gameBoard
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  cell.click();
}

// Reset Game
resetButton.addEventListener('click', initializeGame);

// Game Mode Selection
playerVsPlayer.addEventListener('click', () => {
  gameMode = 'PvP';
  initializeGame();
});

playerVsComputer.addEventListener('click', () => {
  gameMode = 'PvC';
  initializeGame();
});

// Start with PvP Mode
initializeGame();
