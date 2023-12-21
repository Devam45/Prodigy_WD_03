let board, currentPlayer, isGameOver, playerXScore, playerOScore, isTwoPlayerMode;

// Initialize scores once when the page is loaded
playerXScore = 0;
playerOScore = 0;

function startNewGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameOver = false;
    isTwoPlayerMode = getGameMode() === "player";
    updateBoard();
    updateScore();
}

function getGameMode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('mode');
}

function updateBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.textContent = board[i];
        cell.addEventListener("click", () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

function makeMove(index) {
    if (board[index] === "" && !isGameOver) {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) {
            displayResult(`${currentPlayer} wins!`);
            updateScore();
        } else if (board.every(cell => cell !== "")) {
            displayResult("It's a draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (!isTwoPlayerMode && currentPlayer === "O") {
                makeCPUMove();
            }
        }
    }
}

function makeCPUMove() {
    const emptyCells = board.reduce((acc, cell, index) => (cell === "" ? [...acc, index] : acc), []);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function displayResult(result) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = result;
    isGameOver = true;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
}

function goToHomepage() {
    // Redirect to the homepage
    window.location.href = "index.html";
}

function updateScore() {
    const playerXElement = document.getElementById("playerX");
    const playerOElement = document.getElementById("playerO");

    if (checkWinner()) {
        currentPlayer === "X" ? playerXScore++ : playerOScore++;
    }

    playerXElement.textContent = `Player X: ${playerXScore || 0}`;
    playerOElement.textContent = `Player O: ${playerOScore || 0}`;
}

// Initialize the game
startNewGame();
