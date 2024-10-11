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

    // Simulate ball drops
    const results = [];
    for (let i = 0; i < numberOfBalls; i++) {
        const randomMultiplier = simulateBallDrop();
        const winnings = betAmount * randomMultiplier;
        results.push(randomMultiplier);

        // Cap winnings by prize pool
        const payout = Math.min(winnings, prizePool);
        playerCredits += payout;
        prizePool -= payout;
    }

    updateDisplay();
    console.log('Ball drop results:', results);
}

function simulateBallDrop() {
    // Randomly pick a slot multiplier (weights based on image you provided)
    const multipliers = [0.1, 0.3, 0.5, 1, 3, 5, 10, 41, 110];
    const weights = [400, 300, 200, 100, 40, 20, 10, 2, 1];
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const randomNum = Math.floor(Math.random() * totalWeight);

    let cumulativeWeight = 0;
    for (let i = 0; i < multipliers.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNum < cumulativeWeight) {
            return multipliers[i];
        }
    }
    return 1; // Default case, should never hit this.
}

updateDisplay();
