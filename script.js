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
    return board;
}

console.log(GameBoard());


/* 
-Create players objects/factory
- object to control the flow
- display controller
 */