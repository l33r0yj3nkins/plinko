let playerCredits = 1000;
let housePool = 0;
let prizePool = 1000;

const multipliers = [0.1, 0.3, 1, 3, 5, 10, 41, 110];
const weights = [400, 300, 150, 100, 30, 15, 4, 1];  // Updated weights for probabilities


function updateDisplay() {
    document.getElementById('playerCredits').innerText = playerCredits;
    document.getElementById('housePool').innerText = housePool;
    document.getElementById('prizePool').innerText = prizePool;
}

function createPegs() {
    const pegContainer = document.querySelector('.pegs');
    const pegPositions = [
        [4], 
        [3, 5], 
        [2, 4, 6], 
        [1, 3, 5, 7], 
        [0, 2, 4, 6, 8]  // Triangle formation
    ];

    pegPositions.forEach((row, rowIndex) => {
        row.forEach((pos) => {
            const peg = document.createElement('div');
            peg.classList.add('peg');
            peg.style.gridColumn = pos + 1;
            pegContainer.appendChild(peg);
        });
    });
}

function dropBalls(numberOfBalls) {
    let betAmount = parseInt(document.getElementById('betAmount').value);
    let totalBet = betAmount * numberOfBalls;

    if (playerCredits < totalBet) {
        alert("Not enough credits to bet!");
        return;
    }

    playerCredits -= totalBet;
    housePool += totalBet * 0.05;
    prizePool += totalBet * 0.95;

    for (let i = 0; i < numberOfBalls; i++) {
        dropBall(i * 500); // Stagger ball drops for visual effect
    }
}

function dropBall(delay) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.getElementById('game-board').appendChild(ball);

    // Randomize ball starting position
    const startX = Math.random() * 200 + 100; // Adjust for start position randomness
    ball.style.left = `${startX}px`;
    ball.style.top = '0px';

    setTimeout(() => {
        simulateBallDrop(ball, startX);
    }, delay);
}

function simulateBallDrop(ball, startX) {
    let currentX = startX;
    let currentY = 0;

    const dropInterval = setInterval(() => {
        currentY += 20;
        currentX += (Math.random() - 0.5) * 30; // Random movement left and right

        ball.style.top = `${currentY}px`;
        ball.style.left = `${currentX}px`;

        if (currentY >= 400) { // Ball reaches bottom
            clearInterval(dropInterval);
            ballLands(ball);
        }
    }, 100);
}

function ballLands(ball) {
    const slots = document.querySelectorAll('.slot');
    const randomSlot = Math.floor(Math.random() * slots.length);
    const selectedSlot = slots[randomSlot];

    // Highlight the slot and remove ball
    selectedSlot.classList.add('highlight');
    setTimeout(() => {
        selectedSlot.classList.remove('highlight');
        ball.remove();
    }, 1000);

    // Simulate win
    const multiplier = parseFloat(selectedSlot.getAttribute('data-multiplier'));
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const winnings = betAmount * multiplier;

    // Cap winnings by prize pool
    const payout = Math.min(winnings, prizePool);
    playerCredits += payout;
    prizePool -= payout;

    updateDisplay();
}

updateDisplay();
createPegs();
