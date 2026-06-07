function GameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(j);
        };
    };

    const markBoard = (row, column, playerMark) => {
        if (board[row][column] === "X" || board[row][column] === "O") {
            return console.log("This cell is already filled, please choose a different cell...");
        };

        if (playerMark !== "X" && playerMark !== "O") {
            return console.log(`"${playerMark}" is not a valid marking. Please input the correct marking, "X" or "O"...`);
        };

        board[row][column] = playerMark;
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((col) => col));
        console.log("Board", boardWithValues);
    };

    return { printBoard, markBoard };
};

function GameController(playerOne = "Player 1", playerTwo = "Player 2") {
    const board = GameBoard();

    const players = [{ name: playerOne, mark: "X" }, { name: playerTwo, mark: "O" }];

    let activePLayer = players[0];

    const switchPlayer = () => activePLayer === players[0] ? players[1] : players[0];

    board.markBoard(1, 1, "O");
    board.markBoard(1, 2, "p");

    board.printBoard();

    return { players };
}

// console.log(GameBoard());
// console.log(GameController());

GameController();



/* 
- object to control the flow
- display controller
 */