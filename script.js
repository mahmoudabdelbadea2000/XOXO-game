let currentPlayer = "X";
const NUMBER_OF_ROWS = 4;
const turns = NUMBER_OF_ROWS ** 2;
let turnsCounter = 0;
const resetBtn = document.querySelector("#reset");

const createBoardArr = () => {
    let board = [];

    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        board.push(Array.from({length: NUMBER_OF_ROWS}, () => "_"))
    }

    return board
}

let board = createBoardArr();

const getCellPlacement = (idx, numberOfRows) => {
    const row = Math.floor(idx / numberOfRows);
    const col = idx % numberOfRows;

    return [row, col];
}

const checkRows = (currentPlayer) => {
    let column = 0;

    for (let row = 0; row < NUMBER_OF_ROWS; row++) {
        while (column < NUMBER_OF_ROWS) {
            if (board[row][column] !== currentPlayer) {
                column = 0;
                break;
            }
            column++;
        }
        if (column === NUMBER_OF_ROWS) {
            return true
        }
    }
}

const checkColumns = (currentPlayer) => {
    let row = 0;

    for (let column = 0; column < NUMBER_OF_ROWS; column++) {
        while (row < NUMBER_OF_ROWS) {
            if (board[row][column] !== currentPlayer) {
                row = 0;
                break;
            }
            row++;
        }
        if (row === NUMBER_OF_ROWS) {
            return true
        }
    }
}

const checkDiagonals = (currentPlayer) => {
    let count = 0;

    while (count < NUMBER_OF_ROWS) {
        if (board[count][count] !== currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }
    if (count === NUMBER_OF_ROWS) {
        return true
    }
}

const checkDiagonalsReverse = (currentPlayer) => {
    let count = 0;

    while (count < NUMBER_OF_ROWS) {
        if (board[count][NUMBER_OF_ROWS - count - 1] !== currentPlayer) {
            count = 0;
            break;
        }
        count++;
    }
    if (count === NUMBER_OF_ROWS) {
        return true
    }
}

const checkWin = (currentPlayer) => {
    return (
        checkRows(currentPlayer) ||
        checkColumns(currentPlayer) ||
        checkDiagonals(currentPlayer) ||
        checkDiagonalsReverse(currentPlayer)
    );
};

const runWinEvent = (currentPlayer) => {
    setTimeout(() => {
        alert(`Player ${currentPlayer} won!`)
        resetBoard()
    }, 100);
}

const resetBoard = () => {
    document.querySelector(".board").remove();
    createBoard();
    board = createBoardArr();
    currentPlayer = "X";
    turnsCounter = 0;
}

const runDrawEvent = () => {
    setTimeout(() => {
        alert("Draw!")
        resetBoard()
    }, 100);
    
};

const cellClickHandler = (event, idx) => {
    const cell = event.target;
    const [row, col] = getCellPlacement(idx, NUMBER_OF_ROWS);

    if (board[row][col] === "_") {
        turnsCounter++;
        board[row][col] = currentPlayer;
        cell.querySelector(".value").textContent = currentPlayer;
        cell.classList.add(`cell--${currentPlayer}`);

        if (checkWin(currentPlayer)) {
            runWinEvent(currentPlayer)
        } else {
            if (turnsCounter === turns) runDrawEvent()
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

const createBoard = () => {
    const container = document.querySelector(".container");
    const board = document.createElement("div");

    board.classList.add("board");

    for (let i = 0; i < turns; i++) {
        const cellElementString = `<div class="cell" rule="button" tabindex="${i + 1}"><span class="value"></span></div>`;
        const cellElement = document.createRange().createContextualFragment(cellElementString);

        cellElement.querySelector(".cell").onclick = event => cellClickHandler(event, i);
        cellElement.querySelector(".cell").onkeydown = event => {
            (event.key === "Enter") ? cellClickHandler(event, i) : true;
        };
        board.appendChild(cellElement);
        document.documentElement.style.setProperty("--grid-rows", NUMBER_OF_ROWS);
    }

    container.insertAdjacentElement("afterbegin", board);
}

resetBtn.addEventListener("click", resetBoard)

createBoard();