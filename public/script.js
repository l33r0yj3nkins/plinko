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
    const pegRows = [
        [4],
        [3, 5],
        [2, 4, 6],
        [1, 3, 5, 7],
        [0, 2, 4, 6, 8]
    ];

    pegRows.forEach((row, rowIndex) => {
        row.forEach((colIndex) => {
            const peg = document.createElement('div');
            peg.classList.add('peg');
            peg.style.gridColumn = colIndex + 1;
            pegContainer.appendChild(peg);
        });
    });
}

function createSlots() {
    const slotContainer = document.getElementById('slots');
    const multipliers = [50, 20, 7, 4, 1, 0, 0, 1, 4, 7, 20, 50];
    multipliers.forEach(multiplier => {
        const slot = document.createElement('div');
        slot.classList.add('slot');
        slot.innerText = multiplier;
        slot.setAttribute('data-multiplier', multiplier);
        slotContainer.appendChild(slot);
    });
}

function dropBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    document.getElementById('game-board').appendChild(ball);

    const startX = 250;  // Always start from the center top
    ball.style.left = `${startX}px`;
    ball.style.top = '0px';

    simulateBallDrop(ball, startX);
}

function simulateBallDrop(ball, startX) {
    let currentX = startX;
    let currentY = 0;

    const dropInterval = setInterval(() => {
        currentY += 20;
        currentX += (Math.random() - 0.5) * 30;  // Random left-right movement

        ball.style.top = `${currentY}px`;
        ball.style.left = `${currentX}px`;

        if (currentY >= 550) {  // When the ball reaches the bottom
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

    const multiplier = parseFloat(selectedSlot.getAttribute('data-multiplier'));
    const winnings = 10 * multiplier;  // Assuming a flat bet of 10 credits per ball

    const payout = Math.min(winnings, prizePool);
    playerCredits += payout;
    prizePool -= payout;

    updateDisplay();
}

updateDisplay();
createPegs();
createSlots();
