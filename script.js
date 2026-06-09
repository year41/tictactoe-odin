function GameBoard() {
    const row = 3;
    const column = 3;
    const boardArr = [];

    for (let i = 0; i < (row * column); i++) {
        boardArr.push("");
    };
    
    const boardReset = () => {
        boardArr.splice(0);
        for (let i = 0; i < (row * column); i++) {
            boardArr.push("");
        };
    };


    const winOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const winCheck = () => {
        for (let i = 0; i < winOptions.length; i++) {
            const winArr = [];
            winOptions[i].forEach((e) => winArr.push(boardArr[e]));

            if (winArr.every((e) => e === "X") || winArr.every((e) => e === "O")) {
                return true;
            };
        };
    };

    const markBoard = (location, playerMark) => {
        boardArr[location] = playerMark;
    };

    const printBoard = () => {
        const newBoard = [];
        for (let i = 0; i < boardArr.length; i += 3) {
            newBoard.push(boardArr.slice(i, i + 3));
        }
        console.log("Board", newBoard);
    };

    return { printBoard, markBoard, winCheck, boardReset };
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

    const gameRestart = () => {
        board.boardReset();
        console.log("New game starting.");
        printNextRound();
    }

    const playRound = (location) => {
        console.log(`${getActivePlayer().name} places ${getActivePlayer().mark} in cell number ${location}...`);
        
        board.markBoard(location, getActivePlayer().mark)
        
        if (board.winCheck()) {
            board.printBoard();
            console.log(`${activePlayer.name} is the winner.`)
            return gameRestart();
        };
        
        switchPlayer();
        printNextRound();
    };

    printNextRound();

    return { playRound };
}

const play = GameController();

play.playRound(6);
play.playRound(3);
play.playRound(7);
play.playRound(4);
// play.playRound(8);
// play.playRound(5);