document.getElementById('roll-button').addEventListener('click', rollDice);
document.getElementById('clear-selection-button').addEventListener('click', clearSelection);
document.getElementById('save-pool-button').addEventListener('click', saveDicePool);
document.getElementById('saved-pool').addEventListener('change', loadSavedPool);
document.getElementById('roll-saved-pool-button').addEventListener('click', rollSavedPool);

const selectedDice = {};
let savedPools = {};

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

function clearSelection() {
    // Clear the selected dice
    Object.keys(selectedDice).forEach(key => delete selectedDice[key]);
    updateSelectedDiceDisplay();
    document.getElementById('result').innerHTML = ''; // Clear the result display
}

function saveDicePool() {
    if (Object.keys(selectedDice).length === 0) {
        alert("No dice selected to save!");
        return;
    }

    const poolName = prompt('Enter a name for this dice pool:');
    if (poolName) {
        savedPools[poolName] = { ...selectedDice }; // Save a copy of the current dice selection
        const savedPoolSelect = document.getElementById('saved-pool');
        const option = document.createElement('option');
        option.value = poolName;
        option.text = poolName;
        savedPoolSelect.add(option);
    }
}

function loadSavedPool() {
    const selectedPoolName = document.getElementById('saved-pool').value;
    if (selectedPoolName && savedPools[selectedPoolName]) {
        clearSelection(); // Clear any previously selected dice
        Object.assign(selectedDice, savedPools[selectedPoolName]); // Load the saved dice pool
        updateSelectedDiceDisplay();
    }
}

function rollSavedPool() {
    const selectedPoolName = document.getElementById('saved-pool').value;
    if (selectedPoolName && savedPools[selectedPoolName]) {
        const resultsDiv = document.getElementById('result');
        const historyList = document.getElementById('history-list');
        let results = [];

        for (const [sides, count] of Object.entries(savedPools[selectedPoolName])) {
            for (let i = 0; i < count; i++) {
                let roll = Math.floor(Math.random() * sides) + 1;
                results.push(`D${sides}: ${roll}`);
            }
        }

        // Display the saved pool roll
        if (results.length > 0) {
            resultsDiv.innerHTML = `Rolled saved pool (${selectedPoolName}): <br>` + results.join('<br>');

            // Add to history
            let historyItem = document.createElement('li');
            historyItem.innerHTML = `Rolled saved pool (${selectedPoolName}): <br>${results.join('<br>')}`;
            historyList.prepend(historyItem);
        } else {
            resultsDiv.innerHTML = 'No dice selected in saved pool.';
        }
    } else {
        alert("Please select a saved pool to roll.");
    }
}
