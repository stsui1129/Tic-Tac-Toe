const gameBoard = (() => {
    const board = Array(9).fill("");
    const getBoard = () => board;

    const makeMove = (player, position) => {
        if (board[position] === "") {
            board[position] = player.getMarker();
        return true;
        } else {
            return false
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    return {getBoard, makeMove, resetBoard};
})();


const playerFactory = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return {getName, getMarker};


};

const displayController = (() => {
    const boardContainer = document.querySelector(".board-container");
    
})();
