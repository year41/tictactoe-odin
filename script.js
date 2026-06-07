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
            // return ;
        };

        if (playerMark !== "X" && playerMark !== "O") {
            return console.log(`"${playerMark}" is not a valid marking. Please input the correct marking, "X" or "O"...`);
            // return false;
        };

        board[row][column] = playerMark;
        // return true;
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

    let activePlayer = players[0];

    const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const printNextRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} places ${getActivePlayer().mark} in row ${row}, column ${column} location. `);

        board.markBoard(row, column, getActivePlayer().mark);
        switchPlayer();
        printNextRound();
    };

    printNextRound();

    return { playRound };
}

const play = GameController();

play.playRound(1, 0);
play.playRound(1, 1);
play.playRound(1, 2);


/* 
- object to control the flow
- display controller
 */