onload = mountBoard;

var cells, rows, board, turnIcon;

var logic = {
    currentPiece: null,
    isWhiteTurn: true,
    isWhite: true,
    o: { x: null, y: null },
    d: { x: null, y: null },
}

const BASE_PATH = './images/';

function mountBoard() {
    console.log('mounting board...');
    setBoard();
    setDraggableElements();
    setReferences();
    turnIcon = document.querySelector('span#turn');
    console.log('ready...');
}

function setBoard() {
    let table = document.createElement('table');
    let tagClass = document.createAttribute('class');
    tagClass.value = 'board';
    table.setAttributeNode(tagClass);

    for (let i = 0; i < 9; i++) {
        let row = document.createElement('tr');
        table.appendChild(row);
        let charCode = 65;
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement('td');
            row.appendChild(cell);

            let piece = document.createElement('img');
            let src = document.createAttribute('src');
            let draggable = document.createAttribute('draggable');
            let tagClass = document.createAttribute('class');
            draggable.value = true;
            tagClass.value = 'draggable';
            
            if ((cell.cellIndex + cell.parentNode.rowIndex) % 2 == 0) {
                if (!(cell.cellIndex == 0 && row.rowIndex != 8) && !(row.rowIndex == 8)) {
                    cell.style.backgroundColor = 'lightgrey';
                }
            }

            if (row.rowIndex == 8) {
                if (cell.cellIndex != 0) {
                    cell.innerText = String.fromCharCode(charCode++);
                }
            }
            else if (cell.cellIndex == 0 && row.rowIndex != 8) {
                cell.innerText = row.rowIndex+1;
            }
            else if ((row.rowIndex == 1 || row.rowIndex == 6) && (row.rowIndex != 1 || cell.cellIndex != 0) && (row.rowIndex != 6 || cell.cellIndex != 0)) {
                src.value = BASE_PATH + (row.rowIndex == 1 ? 'Peao-Preto.svg' : row.rowIndex == 6 ? 'Peao-Branco.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else if ((row.rowIndex == 0 || row.rowIndex == 7) && (cell.cellIndex == 1 || cell.cellIndex == 8)) {
                src.value = BASE_PATH + ((row.rowIndex == 0 && cell.cellIndex == 1) || ((row.rowIndex == 0 && cell.cellIndex == 8)) ? 'Torre-Preta.svg' : (row.rowIndex == 7 && cell.cellIndex == 1) || ((row.rowIndex == 7 && cell.cellIndex == 8)) ? 'Torre-Branca.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else if ((row.rowIndex == 0 || row.rowIndex == 7) && (cell.cellIndex == 2 || cell.cellIndex == 7)) {
                src.value = BASE_PATH + ((row.rowIndex == 0 && cell.cellIndex == 2) || ((row.rowIndex == 0 && cell.cellIndex == 7)) ? 'Cavalo-Preto.svg' : (row.rowIndex == 7 && cell.cellIndex == 2) || ((row.rowIndex == 7 && cell.cellIndex == 7)) ? 'Cavalo-Branco.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else if ((row.rowIndex == 0 || row.rowIndex == 7) && (cell.cellIndex == 3 || cell.cellIndex == 6)) {
                src.value = BASE_PATH + ((row.rowIndex == 0 && cell.cellIndex == 3) || ((row.rowIndex == 0 && cell.cellIndex == 6)) ? 'Bispo-Preto.svg' : (row.rowIndex == 7 && cell.cellIndex == 3) || ((row.rowIndex == 7 && cell.cellIndex == 6)) ? 'Bispo-Branco.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else if ((row.rowIndex == 0 || row.rowIndex == 7) && cell.cellIndex == 4) {
                src.value = BASE_PATH + (row.rowIndex == 0 && cell.cellIndex == 4 ? 'Rainha-Preta.svg' : row.rowIndex == 7 && cell.cellIndex == 4 ? 'Rainha-Branca.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else if ((row.rowIndex == 0 || row.rowIndex == 7) && cell.cellIndex == 5) {
                src.value = BASE_PATH + (row.rowIndex == 0 && cell.cellIndex == 5 ? 'Rei-Preto.svg' : row.rowIndex == 7 && cell.cellIndex == 5 ? 'Rei-Branco.svg' : '');
                piece = setPiece(piece, src, draggable, tagClass);
                cell.appendChild(piece);
            }
            else {
                // cell.innerText = row.rowIndex + ', ' + cell.cellIndex;
            }
        }
    }

    document.querySelector('.container').appendChild(table);
    board = table;
}

function setPiece(piece, src, draggable, tagClass) {
    piece.setAttributeNode(src);
    piece.setAttributeNode(draggable);
    piece.setAttributeNode(tagClass);
    return piece;
}

function setDraggableElements() {
    const draggables = document.querySelectorAll('.draggable');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            draggable.style.opacity = 0;
            logic.currentPiece = draggable;
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            draggable.style.opacity = 1;
        });
    });
}

function setReferences() {
    cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        if (cell.cellIndex != 0 && cell.parentNode.rowIndex != 8) {
            cell.addEventListener('dragover', e => {
                e.preventDefault();
                logic.o.x = logic.currentPiece.parentNode.parentNode.rowIndex;
                logic.o.y = logic.currentPiece.parentNode.cellIndex;
                logic.d.x = cell.parentNode.rowIndex;
                logic.d.y = cell.cellIndex;
            });
        
            cell.addEventListener('drop', e => {
                move(logic);
            })
        }
    });
}