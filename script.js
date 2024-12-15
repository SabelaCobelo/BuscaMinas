const rows = 8; // Número de filas
const cols = 8; // Número de columnas
const totalMines = 10; // Número de minas
let board = [];
let revealedCells = 0;

function createBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                isMine: false,
                revealed: false,
                adjacentMines: 0
            });
        }
        board.push(row);
    }
    placeMines();
    calculateAdjacentMines();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < totalMines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
}

function calculateAdjacentMines() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j].isMine) continue;
            let mineCount = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const r = i + x;
                    const c = j + y;
                    if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].isMine) {
                        mineCount++;
                    }
                }
            }
            board[i][j].adjacentMines = mineCount;
        }
    }
}

function revealCell(row, col) {
    const cell = board[row][col];
    if (cell.revealed) return;
    cell.revealed = true;
    revealedCells++;

    const cellElement = document.getElementById(`cell-${row}-${col}`);
    cellElement.classList.add('revealed');

    if (cell.isMine) {
        cellElement.classList.add('mine');
        alert('¡Perdiste! Has tocado una mina.');
        return;
    }

    if (cell.adjacentMines > 0) {
        cellElement.textContent = cell.adjacentMines;
        cellElement.classList.add('number');
    }

    if (revealedCells === (rows * cols - totalMines)) {
        alert('¡Felicidades! Has ganado.');
    }
}

function createBoardUI() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.id = `cell-${i}-${j}`;
            cellElement.addEventListener('click', () => revealCell(i, j));
            boardElement.appendChild(cellElement);
        }
    }
}

createBoard();
createBoardUI();
