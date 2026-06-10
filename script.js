function GameBoard() {
    const row = 3;
    const column = 3;
    const boardArr = [];
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

    const boardReset = () => {
        boardArr.splice(0);
        for (let i = 0; i < (row * column); i++) {
            boardArr.push("");
        };
    };

    const printBoard = () => {
        const newBoard = [];
        for (let i = 0; i < boardArr.length; i += 3) {
            newBoard.push(boardArr.slice(i, i + 3));
        }
        console.log("Board", newBoard);
    };

    const markBoard = (location, playerMark) => {
        boardArr[location] = playerMark;
    };

    const winCheck = () => {
        for (let i = 0; i < winOptions.length; i++) {
            const winArr = [];
            winOptions[i].forEach((e) => winArr.push(boardArr[e]));

            if (winArr.every((e) => e === "X") || winArr.every((e) => e === "O")) {
                return true;
            };
        };
    };

    const drawCheck = () => {
        const full = boardArr.filter((e) => e === "");
        if (full.length === 0) return true;
    };

    const getBoard = () => boardArr;

    boardReset();

    return { printBoard, markBoard, winCheck, boardReset, drawCheck, getBoard };
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

        if (board.drawCheck()) {
            board.printBoard();
            console.log("The game it's a draw.");
            return gameRestart();
        };

        switchPlayer();
        printNextRound();
    };

    const getBoard = () => board.getBoard();

    printNextRound();

    return { playRound, getActivePlayer, getBoard };
}

function ScreenController() {
    const game = GameController();

    const boardContainer = document.querySelector(".board");
    const displayComments = document.querySelector(".comments");

    const updateScreen = () => {
        boardContainer.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        console.log("update board", board);

        displayComments.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((e, index) => {
            const cellBtn = document.createElement("button");
            cellBtn.classList.toggle("btn");
            cellBtn.dataset.id = index;
            cellBtn.textContent = board[index]; //temp data
            boardContainer.appendChild(cellBtn);
        });
    };

    function clickHandler(e) {
        const selectedLocation = e.target.dataset.id;

        if (!selectedLocation) return;

        game.playRound(selectedLocation);
        updateScreen();
    };


    boardContainer.addEventListener("click", clickHandler);
    updateScreen();
}

ScreenController();