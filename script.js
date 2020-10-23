const gameBoard = (() => {
    const board = Array(9).fill("");

    // return {board}???
})();

const player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker}
}

const displayController = (() => {
    const  boardContainer = document.querySelector(".board-container");

})();