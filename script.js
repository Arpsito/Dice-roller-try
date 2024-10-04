document.getElementById('roll-button').addEventListener('click', rollDice);
document.getElementById('save-pool-button').addEventListener('click', saveDicePool);
document.getElementById('saved-pool').addEventListener('change', loadSavedPool);
document.getElementById('roll-saved-pool-button').addEventListener('click', rollSavedPool);

const selectedDice = {};
document.querySelectorAll('.dice').forEach(dice => {
    dice.addEventListener('click', () => {
        const sides = dice.getAttribute('data-sides');
        if (!selectedDice[sides]) {
            selectedDice[sides] = 0;
        }
        selectedDice[sides]++;
        updateSelectedDiceDisplay();
    });
});

function updateSelectedDiceDisplay() {
    const selectedDiceDiv = document.getElementById('selected-dice');
    selectedDiceDiv.innerHTML = 'Selected Dice: ' + Object.entries(selectedDice)
        .map(([sides, count]) => `${count}D${sides}`)
        .join(', ');
}

function rollDice() {
    const resultsDiv = document.getElementById('result');
    const historyList = document.getElementById('history-list');
    let results = [];

    for (const [sides, count] of Object.entries(selectedDice)) {
        for (let i = 0; i < count; i++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            results.push(`D${sides}: ${roll}`);
        }
    }

    // Display current roll
    if (results.length > 0) {
        resultsDiv.innerHTML = 'You rolled: <br>' + results.join('<br>');

        // Add to history
        let historyItem = document.createElement('li');
        historyItem.innerHTML = `Rolled: ${results.join('<br>')}`;
        historyList.prepend(historyItem);
    } else {
        resultsDiv.innerHTML = 'No dice selected.';
    }
}

function saveDicePool() {
    // Implementation remains the same as before for saving dice pools.
}

function loadSavedPool() {
    // Implementation remains the same for loading saved pools.
}

function rollSavedPool() {
    // Implementation remains the same for rolling saved pools.
}
