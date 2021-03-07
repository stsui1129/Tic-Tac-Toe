const playerFactory = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
};

const gameBoard = (() => {
    const board = Array(9).fill("");

    const checkWin = () => {
        const winningCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];

        winningCombinations.forEach((item) => {
            if (gameBoard.board[item[0]] !== ""
            && gameBoard.board[item[0]] === gameBoard.board[item[1]]
            && gameBoard.board[item[1]] === gameBoard.board[item[2]]) {
                console.log ("win");
                displayController.declareWinner();
            }
        })
    }
    
    return {board, checkWin};
})();

const displayController = (() => {
    const playerOne = playerFactory('Player 1', 'X');
    const playerTwo = playerFactory('Player 2', 'O');
    let currentPlayer = playerOne;

    const placeMarker = (e) => {
        const square = e.target;
        const currentMarker = currentPlayer.getMarker();
        square.innerHTML = currentMarker;
        gameBoard.board[square.getAttribute('data-num')] = currentMarker;
        gameBoard.checkWin();

        toggleTurn();  
    }

    const squares = document.querySelectorAll('[data-num]');
    squares.forEach(square => {
        square.addEventListener('click', placeMarker, { once : true })
    })
    
    const toggleTurn = () => {
        currentPlayer == playerOne ? currentPlayer = playerTwo: currentPlayer = playerOne;
    } 

    const declareWinner = () => {
        squares.forEach(square => {
            square.style.pointerEvents = 'none';
        })
        gameStatus.innerText = `${currentPlayer.getName()} (${currentPlayer.getMarker()}) wins`;
        if (gameBoard.board.indexOf("") == -1) {
            gameStatus.innerText = "It's a tie";
        }
    }

    const gameStatus = document.querySelector('.game-status')
    const replay = document.querySelector('#replay-button');
    replay.addEventListener('click', () => location.reload());

    return {placeMarker, toggleTurn, declareWinner};
})();
