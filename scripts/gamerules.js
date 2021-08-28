function move(logic) {
    board.rows[logic.d.x].cells[logic.d.y].appendChild(logic.currentPiece);
    switchTurn();

}

function switchTurn() {
    logic.isWhiteTurn = !logic.isWhiteTurn;
    turnIcon.innerText = (turnIcon.innerText == '⚫' ? '⚪' : '⚫')
}