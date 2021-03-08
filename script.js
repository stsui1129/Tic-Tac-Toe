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

        winningCombinations.forEach((item) => { //for every combination, if square not empty, check to see if position in board are same
            if (board[item[0]] !== "" && board[item[0]] === board[item[1]] && board[item[0]] === board[item[2]]) {
                displayController.declareWinner();
            }   
        })      
    }

    const checkTie = () => {
        if (!board.includes("")) {
            displayController.declareTie();
        }
    }
    
    return {board, checkWin, checkTie};
})();

const displayController = (() => {
    const playerOne = playerFactory('Player 1', 'X');
    const playerTwo = playerFactory('Player 2', 'O');
    let currentPlayer = playerOne;
    const gameStatus = document.querySelector('.game-status');
    const turnStatus = document.querySelector('.turn-status');
    turnStatus.textContent = "Player 1 (X)'s turn";

    const replay = document.querySelector('#replay-button');
    replay.addEventListener('click', () => location.reload()); //refreshes page

    const placeMarker = (e) => {
        const square = e.target;
        const currentMarker = currentPlayer.getMarker();
        square.innerHTML = currentMarker; //put marks on the physical gameboard
        gameBoard.board[square.getAttribute('data-num')] = currentMarker; //data-num attributes(0,1,2,...8), puts marker in board array
        gameBoard.checkTie();
        gameBoard.checkWin(); //tie & win order matters
        toggleTurn();
        turnStatus.textContent = `${currentPlayer.getName()} (${currentPlayer.getMarker()})'s turn`;
    }

    const squares = document.querySelectorAll('[data-num]');
    squares.forEach(square => {
        square.addEventListener('click', placeMarker, { once : true }) //listen should be invoked at most once
    })
    
    const toggleTurn = () => {
        currentPlayer == playerOne ? currentPlayer = playerTwo: currentPlayer = playerOne;
    } 

    const declareWinner = () => {
        turnStatus.remove();
        gameStatus.textContent = `${currentPlayer.getName()} (${currentPlayer.getMarker()}) wins`;
        squares.forEach(square => {
            square.style.pointerEvents = 'none'; //stops square from reacting to pointer events ('click')
        })
    }

    const declareTie = () => {
        turnStatus.remove();
        gameStatus.textContent = "It's a tie";  
    }

    return {placeMarker, toggleTurn, declareWinner, declareTie};
})();