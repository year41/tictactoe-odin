function GameBoard() {
    const row = 3;
    const column = 3;
    const boardArr = [];

    let n = 1;
    for (let i = 0; i < (row * column); i++) {
        boardArr.push(n);
        n++;
    }

    const markBoard = (location, playerMark) => {
        if (location > 9 || location < 1) return console.log("Cell out of bounds, please choose a cell withing the board.");

        if (boardArr[location - 1] === "X" || boardArr[location - 1] === "O") {
            console.log("This cell is already filled, please choose a different cell...");
            return true;
        };

        boardArr[location - 1] = playerMark;
    }

    const printBoard = () => {
        const newBoard = []
        for (let i = 0; i < boardArr.length; i += 3) {
            newBoard.push(boardArr.slice(i, i + 3));
        }
        console.log("Board", newBoard);
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

    const playRound = (location) => {
        console.log(`${getActivePlayer().name} places ${getActivePlayer().mark} in location number ${location}.`);

        if (board.markBoard(location, getActivePlayer().mark)) {
            printNextRound();
        } else {
            switchPlayer();
            printNextRound();
        }
    };

    printNextRound();

    return { playRound };
}

const play = GameController();

// play.playRound(1);
// play.playRound(1);
// play.playRound(1);
// play.playRound(9);
// play.playRound(10);


/* 
- object to control the flow
- display controller
 */