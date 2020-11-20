const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let playerTurn = false;
let moves = 0;
let cpuQuadrants = [];
let playerQuadrants = [];

document.addEventListener('DOMContentLoaded', (e) => {
	const modalResult = document.getElementById('modal-result');
	const spanCloseResult = document.querySelector(`#modal-result .close`);
	spanCloseResult.onclick = function () {
		modalResult.style.display = 'none';
	};

	const modalOptions = document.getElementById('modal-options');
	const spanCloseOptions = document.querySelector(`#modal-options .close`);
	spanCloseOptions.onclick = function () {
		modalOptions.style.display = 'none';
	};

	const optionsButton = document.getElementById('options-button');
	optionsButton.onclick = function () {
		modalOptions.style.display = 'block';
	};

	window.onclick = function (event) {
		if (event.target == modalResult) {
			modalResult.style.display = 'none';
		}

		if (event.target == modalOptions) {
			modalOptions.style.display = 'none';
		}
	};
});

async function init() {
	cpuQuadrants = [];
	playerQuadrants = [];

	setNewGameButtonDisplay('none');

	setScore(0);
	setInstruction('Watch!');

	startSequence();
}

async function startSequence() {

	setInstruction('Watch!');

	moves = 0;
	playerTurn = false;

	for (const q of cpuQuadrants) {
		await sleep(500);
		const quadrant = document.querySelector(`div[data-key="${q}"]`);
		quadrant.classList.add('active');
		await sleep(200);
		quadrant.classList.remove('active');
	}

	let randomNumber = randomQuadrant();
	await sleep(500);
	const quadrant = document.querySelector(`div[data-key="${randomNumber}"]`);
	quadrant.classList.add('active');
	cpuQuadrants.push(randomNumber);
	await sleep(200);
	quadrant.classList.remove('active');

	playerTurn = true;

	setInstruction('Play!');
}

function randomQuadrant() {
	return Math.floor(Math.random() * 4) + 1;
}

async function playerClick(number) {
	if (playerTurn === true) {
		playerQuadrants.push(number);

		temporalyActiveQuadrant(number);

		if (cpuQuadrants[moves] === number) {
			moves++;
			await sleep(500);
			if (moves === cpuQuadrants.length) {

				setScore(moves);

				startSequence();
			}
		} else {
			showGameOverModal();
		}
	}
}

function showGameOverModal() {
	setNewGameButtonDisplay('block');
	setScore(0);
	setInstruction('');

	const modal = document.getElementById('modal-result');
	const resultText = document.querySelector(`#result-text`);
	resultText.innerHTML = `Game Over! Your score: ${cpuQuadrants.length - 1}`;
	modal.style.display = 'block';

	playerTurn = false;
}

async function temporalyActiveQuadrant(number) {
	const quadrant = document.querySelector(`div[data-key="${number}"]`);
	quadrant.classList.add('active');
	await sleep(200);
	quadrant.classList.remove('active');
}

function setNewGameButtonDisplay(display) {
	const newGameButton = document.getElementById('new-game-button');
	newGameButton.style.display = display;
}
function setScore(score) {
	const scoreText = document.querySelector('.info-score');
	scoreText.innerHTML = `Score: ${score}`;
}
function setInstruction(instruction) {
	const instructionText = document.querySelector('.info-instruction');
	instructionText.innerHTML = instruction;
}
function setNewGameButtonDisabledValue(value) {
	const newGameButton = document.querySelector(`.play-start-new-game a`);
	newGameButton.disabled = value;
}
