let winner = '';
let numberOfTurns = 0;
let turn = 1;

const values = ['X', 'O'];
let moves = [];

document.addEventListener('DOMContentLoaded', (e) => {
    const modal = document.getElementById("modal-result");

    const spanClose = document.querySelector(`.close`);
    spanClose.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
});

init();

function init() {
    console.log('Starting new game, have fun!');
    
    winner = '';
	numberOfTurns = 0;
    turn = 1;
    moves = [];

    const playerOneText = document.querySelector(`.player-one-text`);
    const playerTwoText = document.querySelector(`.player-two-text`);
    playerOneText.classList.remove('active');
    playerTwoText.classList.remove('active');
    playerOneText.classList.add('active');

	document.querySelectorAll('.square').forEach((square) => {
		square.innerHTML = '';
    });

    const resultsContainer = document.querySelector(`.results-container`);
    resultsContainer.innerHTML = ``;
}

function move(number) {
    console.log(`Number clicked: ${number}`);
    // console.log(moves.includes(number));
    // console.log(moves.includes(number) === false && winner === '');
    if(moves.includes(number) === false && winner === '') {

        moves.push(number);
        numberOfTurns++;

        const square = document.querySelector(`div[data-key="${number}"]`);
        square.innerHTML = values[turn - 1];
        
        const modal = document.getElementById("modal-result");

        winner = checkForWinner();
        if (winner) {
            
            const winnerResultText = document.querySelector(`#winner-result-text`);
            winnerResultText.innerHTML = `Winner: Player ${turn}!`;
            modal.style.display = "block";

            return;
        }
        
        if(numberOfTurns === 9) {
            winner = '/';

            const resultsContainer = document.querySelector(`.results-container`);
            resultsContainer.innerHTML = `<h1>Winner: THIS IS A TIE!</h1>`;
            return;
        }

        const playerOneText = document.querySelector(`.player-one-text`);
        const playerTwoText = document.querySelector(`.player-two-text`);
        if(turn === 1) {

            turn = 2;
            playerOneText.classList.remove('active');
            playerTwoText.classList.add('active');
        } else {

            turn = 1;
            playerTwoText.classList.remove('active');
            playerOneText.classList.add('active');
        }
    }
}

function checkForWinner() {
	let square1 = document.querySelector(`div[data-key="${1}"]`);
	let square2 = document.querySelector(`div[data-key="${2}"]`);
	let square3 = document.querySelector(`div[data-key="${3}"]`);
	let square4 = document.querySelector(`div[data-key="${4}"]`);
	let square5 = document.querySelector(`div[data-key="${5}"]`);
	let square6 = document.querySelector(`div[data-key="${6}"]`);
	let square7 = document.querySelector(`div[data-key="${7}"]`);
	let square8 = document.querySelector(`div[data-key="${8}"]`);
	let square9 = document.querySelector(`div[data-key="${9}"]`);

	for (const v of values) {
		if (checkLines(square1, square2, square3, v)) return v;
		if (checkLines(square1, square5, square9, v)) return v;
		if (checkLines(square1, square4, square7, v)) return v;

		if (checkLines(square2, square5, square8, v)) return v;

		if (checkLines(square3, square6, square9, v)) return v;
		if (checkLines(square3, square5, square7, v)) return v;

		if (checkLines(square4, square5, square6, v)) return v;

		if (checkLines(square7, square8, square9, v)) return v;
	}

	return '';
}

function checkLines(square1, square2, square3, value) {
	if (
		square1.innerHTML == value &&
		square2.innerHTML == value &&
		square3.innerHTML == value
	)
		return true;
}
