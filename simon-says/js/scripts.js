const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let playerTurn = false;
let moves = 1;
let cpuQuadrants = [];
let playerQuadrants = [];

async function init() {
    moves = 1;
    cpuQuadrants = [];
    playerQuadrants = [];

    startSequence();
}

async function startSequence() {

    console.log('Starting sequence..')
    playerTurn = false;
    while (cpuQuadrants.length < moves) {
        let randomNumber = randomQuadrant();
        console.log(`random number: ${randomNumber}`);
        if(true) {

            await sleep(500);
            const quadrant = document.querySelector(`div[data-key="${randomNumber}"]`);
            quadrant.classList.add('active');
            cpuQuadrants.push(randomNumber);
            await sleep(200);
            quadrant.classList.remove('active');
        }
    }
    playerTurn = true;
}

function randomQuadrant() {
    return Math.floor(Math.random() * 4) + 1;
}

async function playerClick(number) {
    console.log(`number clicked: ${number}`);
    const quadrant = document.querySelector(`div[data-key="${number}"]`);
    quadrant.classList.add('active');
    await sleep(200);
    quadrant.classList.remove('active');
}