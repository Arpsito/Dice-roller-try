document.getElementById('roll-button').addEventListener('click', rollDice);

function rollDice() {
    const diceType = parseInt(document.getElementById('dice-type').value);
    const diceNumber = parseInt(document.getElementById('dice-number').value);
    const resultsDiv = document.getElementById('result');
    const historyList = document.getElementById('history-list');

    let results = [];
    for (let i = 0; i < diceNumber; i++) {
        let roll = Math.floor(Math.random() * diceType) + 1;
        results.push(roll);
    }

    // Display current roll
    resultsDiv.innerHTML = 'You rolled: ' + results.join(', ');

    // Add to history
    let historyItem = document.createElement('li');
    historyItem.textContent = `Rolled ${diceNumber} D${diceType}: ${results.join(', ')}`;
    historyList.prepend(historyItem);
}
