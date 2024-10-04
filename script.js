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
    // Display current roll with dice faces
if (diceType === 6) {
    const diceUnicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    let diceFaces = results.map(num => diceUnicode[num - 1]).join(' ');
    resultsDiv.innerHTML = 'You rolled: ' + diceFaces;
} else {
    resultsDiv.innerHTML = 'You rolled: ' + results.join(', ');
}

    // Add to history
    let historyItem = document.createElement('li');
    historyItem.textContent = `Rolled ${diceNumber} D${diceType}: ${results.join(', ')}`;
    historyList.prepend(historyItem);
}
