let playerCredits = 1000;
let housePool = 0;
let prizePool = 1000;

function updateDisplay() {
    document.getElementById('playerCredits').innerText = playerCredits;
    document.getElementById('housePool').innerText = housePool;
    document.getElementById('prizePool').innerText = prizePool;
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

    // Simulate ball drops here
    updateDisplay();
}

updateDisplay();
