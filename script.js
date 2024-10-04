document.getElementById('roll-button').addEventListener('click', rollDice);

function rollDice() {
    const dicePoolInput = document.getElementById('dice-pool').value.trim();
    const resultsDiv = document.getElementById('result');
    const historyList = document.getElementById('history-list');

    if (!dicePoolInput) {
        resultsDiv.innerHTML = 'Please enter a valid dice pool.';
        return;
    }

    const dicePattern = /(\d*)D(\d+)/g;
    let match;
    const results = [];
    
    // Parse the input and roll each type of dice
    while ((match = dicePattern.exec(dicePoolInput)) !== null) {
        let count = parseInt(match[1]) || 1; // Default to 1 if no number specified
        let sides = parseInt(match[2]);

        for (let i = 0; i < count; i++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            results.push(`D${sides}: ${displayDiceResult(roll, sides)}`);
        }
    }

    // Display current roll
    resultsDiv.innerHTML = 'You rolled: <br>' + results.join('<br>');

    // Add to history
    let historyItem = document.createElement('li');
    historyItem.innerHTML = `Rolled: ${dicePoolInput} <br> ${results.join('<br>')}`;
    historyList.prepend(historyItem);
}

function displayDiceResult(roll, sides) {
    if (sides === 6) {
        const diceUnicode = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
        return diceUnicode[roll - 1];
    } else {
        // Use ASCII representation for other dice
        return roll.toString();
    }
}
