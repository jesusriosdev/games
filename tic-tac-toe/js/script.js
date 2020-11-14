document.addEventListener('DOMContentLoaded', (e) => {

    init();

    document.querySelectorAll('.square').forEach((square) => {
        square.addEventListener('click', (ee) => {
            // console.log(square);
            square.innerHTML = values[turn - 1];
            let winner = checkForWinner();
            console.log(winner);
            if(winner) {
                alert(`Winner: Player ${winner == 'X' ? 1 : 2}!`);
            }

            turn = turn == 1 ? 2 : 1;
        });
    });

});

let turn = 1;
let winner = null;

let xValue = 'X';
let oValue = 'O';

let values = ['X', 'O'];

function init() {
    console.log('Starting new game, have fun!');

    turn = 1;
    document.querySelectorAll('.square').forEach((square) => {
        square.innerHTML = '';
    });
}

function checkForWinner() {
    let square1 = document.getElementById('square1');
    let square2 = document.getElementById('square2');
    let square3 = document.getElementById('square3');
    let square4 = document.getElementById('square4');
    let square5 = document.getElementById('square5');
    let square6 = document.getElementById('square6');
    let square7 = document.getElementById('square7');
    let square8 = document.getElementById('square8');
    let square9 = document.getElementById('square9');
    

    values.forEach((v) => {

        // Posible winner moves.
        if(checkLines(square1, square2, square3, v)) return v;
        if(checkLines(square1, square5, square9, v)) return v;
        if(checkLines(square1, square4, square7, v)) return v;
    
        if(checkLines(square2, square5, square8, v)) return v;
    
        if(checkLines(square3, square6, square9, v)) return v;
    
        if(checkLines(square4, square5, square6, v)) return v;
    
        if(checkLines(square7, square8, square9, v)) return v;
    });

    return '';
}

function checkLines(square1, square2, square3, value) {
    console.log(square1);
    console.log(square2);
    console.log(square3);
    if(square1.innerHTML == value && square2.innerHTML == value && square3.innerHTML == value) return true;
}