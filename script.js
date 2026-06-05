function Gameboard() {
    const gameboard = [];

    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let i = 0; i < 3; i++) {
            row.push("");
        };
        gameboard.push(row);
    };

    return gameboard;
}

console.log(Gameboard())


/* 
- Store players as Objects
- object to control the flow
- display controller
 */