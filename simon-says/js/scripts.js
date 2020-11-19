const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let playerTurn = false;
let moves = 0;
let cpuQuadrants = [];
let playerQuadrants = [];

async function init() {
    
    cpuQuadrants = [];
    playerQuadrants = [];

    const scoreText = document.querySelector('.score h3');
    scoreText.innerHTML = `Score: 0`;

    startSequence();
}

async function startSequence() {

    moves = 0;
    console.log('Starting sequence..')
    playerTurn = false;

    for (const q of cpuQuadrants) {
        console.log(`cpuQuadrant: ${q}`);
        await sleep(500);
        const quadrant = document.querySelector(`div[data-key="${q}"]`);
        quadrant.classList.add('active');
        await sleep(200);
        quadrant.classList.remove('active');
    }

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
    

    playerTurn = true;
}

function randomQuadrant() {
    return Math.floor(Math.random() * 4) + 1;
}

async function playerClick(number) {
    if(playerTurn === true) {

        console.log(`number clicked: ${number}`);
        playerQuadrants.push(number);

        const quadrant = document.querySelector(`div[data-key="${number}"]`);
        quadrant.classList.add('active');
        await sleep(200);
        quadrant.classList.remove('active');

        if(cpuQuadrants[moves] === number) {
            
            moves++;

            const scoreText = document.querySelector('.score h3');
            scoreText.innerHTML = `Score: ${moves}`;

            await sleep(500);

            if(moves === cpuQuadrants.length) {
                console.log('All good.. start new sequence.');
                startSequence();
                return;
            } else {
                console.log('All good.. wait for next number.');
            }

        }
        else {
            console.log('game over dude..');
        }
    }
}