function GameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push("");
        };
    };
    return board;
};

function GameController(playerOne = "Player 1", playerTwo = "Player 2") {
    const board = GameBoard();

    const players = [{ name: playerOne, mark: "X" }, { name: playerTwo, mark: "O" } ]

    return { board, players };
}

console.log(GameBoard());
console.log(GameController());



/* 
- object to control the flow
- display controller
 */