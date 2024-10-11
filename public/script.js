let playerCredits = 1000;
let housePool = 0;
let prizePool = 1000;

function updateDisplay() {
    document.getElementById('playerCredits').innerText = playerCredits;
    document.getElementById('housePool').innerText = housePool;
    document.getElementById('prizePool').innerText = prizePool;
}

function createPegs() {
    const pegContainer = document.getElementById('pegs');
    const rows = 6;
    for (let i = 0; i < rows; i++) {
        const rowDiv = document.createElement('div');
        for (let j = 0; j <= i; j++) {
            const peg = document.createElement('div');
            peg.classList.add('peg');
            rowDiv.appendChild(peg);
        }
        pegContainer.appendChild(rowDiv);
    }
}

function createSlots() {
    const slotContainer = document.getElementById('slots');
    const multipliers = ['0.1x', '0.3x', '1x', '3x', '5x', '10x', '41x', '110x'];
    multipliers.forEach(multiplier => {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.innerText = multiplier;
        slot.setAttribute('data-multiplier', multiplier);
        slotContainer.appendChild(slot);
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
        dropBall(i * 500);
    }
}

function dropBall(delay) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.getElementById('game-board').appendChild(ball);

    const startX = Math.random() * 200 + 100;
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
        currentX += (Math.random() - 0.5) * 30;

        ball.style.top = `${currentY}px`;
        ball.style.left = `${currentX}px`;

        if (currentY >= 400) {
            clearInterval(dropInterval);
            ballLands(ball);
        }
    }, 100);
}

function ballLands(ball) {
    const slots = document.querySelectorAll('.slot');
    const randomSlot = Math.floor(Math.random() * slots.length);
    const selectedSlot = slots[randomSlot];

    selectedSlot.classList.add('highlight');
    setTimeout(() => {
        selectedSlot.classList.remove('highlight');
        ball.remove();
    }, 1000);

    const multiplier = parseFloat(selectedSlot.getAttribute('data-multiplier').replace('x', ''));
    const betAmount = parseInt(document.getElementById('betAmount').value);
    const winnings = betAmount * multiplier;

    const payout = Math.min(winnings, prizePool);
    playerCredits += payout;
    prizePool -= payout;

    updateDisplay();
}

updateDisplay();
createPegs();
createSlots();
