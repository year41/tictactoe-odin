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

    const players = [
        { name: playerOne, mark: "X", counter: 0 },
        { name: playerTwo, mark: "O", counter: 0 },
    ];

    const draw = { counter: 0 };

    let activePlayer = players[0];

    const getDrawCounter = () => draw;

    const getPlayers = () => players;

    const switchPlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const printNextRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const gameRestart = () => {
        board.boardReset();
        console.log("New game starting.");
        switchPlayer();
        printNextRound();
    };

    const getWinner = () => board.winCheck();

    const getDraw = () => board.drawCheck();

    const playRound = (location) => {
        if (getWinner()) return;

        console.log(`${getActivePlayer().name} places ${getActivePlayer().mark} in cell number ${location}...`);

        board.markBoard(location, getActivePlayer().mark)

        if (getWinner()) {
            board.printBoard();
            getActivePlayer().counter++;
            return console.log(`${getActivePlayer().name} is the Winner.`);
        };

        if (getDraw()) {
            board.printBoard();
            getDrawCounter().counter++;
            return console.log("The game it's a draw. Start a new Game?");
        };

        switchPlayer();
        printNextRound();
    };

    const getBoard = () => board.getBoard();

    printNextRound();

    return { playRound, getActivePlayer, getBoard, getWinner, getDraw, gameRestart, getPlayers, getDrawCounter };
}

function ScreenController() {
    const game = GameController();
    const players = game.getPlayers();

    const boardContainer = document.querySelector(".board");
    const displayComments = document.querySelector(".comments");
    const newGame = document.querySelector("#new-game");
    const resetGame = document.querySelector("#reset-game");

    const player1Counter = document.getElementById("player1-counter")
    const drawCounter = document.getElementById("draw-counter")
    const player2Counter = document.getElementById("player2-counter")

    const nameDialog = document.querySelector("#names-dialog");
    const dialogBtn = document.getElementById("close-dialog");
    const player1Dialog = document.getElementById("player1");
    const player2Dialog = document.getElementById("player2");

    const updateScreen = () => {
        boardContainer.textContent = "";

        const board = game.getBoard();
        const draws = game.getDrawCounter();
        const activePlayer = game.getActivePlayer();
        const gameWinner = game.getWinner();
        const gameDraw = game.getDraw();
        const boardUpdate = () => {
            board.forEach((e, index) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.toggle("btn");
                cellBtn.dataset.id = index;
                cellBtn.textContent = board[index];
                boardContainer.appendChild(cellBtn);
            });
        };

        displayComments.textContent = `${activePlayer.name}'s turn `;

        const commentsBtn = document.createElement("span");
        commentsBtn.classList.toggle("player-mark")
        commentsBtn.textContent = `- ${activePlayer.mark} -`;
        displayComments.appendChild(commentsBtn);

        if (gameDraw) {
            displayComments.textContent = "The game it's a draw. Start a new Game?";
        };

        if (gameWinner) {
            displayComments.textContent = `${activePlayer.name} is the winner. Congratulations!`;
        };

        player1Counter.textContent = `${players[0].name}: ${players[0].counter}`;
        player2Counter.textContent = `${players[1].name}: ${players[1].counter}`;
        drawCounter.textContent = `Draw: ${draws.counter}`;

        boardUpdate();

    };

    function boardClickHandler(e) {
        const selectedLocation = e.target.dataset.id;
        const locationValue = e.target.textContent;

        if (!selectedLocation) return;
        if (locationValue !== "") return;

        game.playRound(selectedLocation);
        updateScreen();
    };

    function updateName() {
        const playersDiv = document.querySelectorAll(".player1, .player2");
        const changeName = (player, index) => {
            if (player.value !== "") {
                playersDiv[index].textContent = player.value;
                return players[index].name = player.value;
            };
            player.value = players[index].name;
        };

        const newPlayer1 = changeName(player1Dialog, 0);
        const newPlayer2 = changeName(player2Dialog, 1);

        updateScreen();
        nameDialog.close();
    }

    function textFocus() {
        this.select();
    };

    boardContainer.addEventListener("click", boardClickHandler);

    newGame.addEventListener("click", (e) => {
        game.gameRestart();
        updateScreen();
    });

    resetGame.addEventListener("click", () => {
        window.location.reload();
    });

    player1Dialog.addEventListener("click", textFocus);

    player2Dialog.addEventListener("click", textFocus);

    dialogBtn.addEventListener("click", updateName);

    updateScreen();
}

ScreenController();