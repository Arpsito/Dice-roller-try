document.getElementById('roll-button').addEventListener('click', rollDice);
document.getElementById('save-pool-button').addEventListener('click', saveDicePool);
document.getElementById('saved-pool').addEventListener('change', loadSavedPool);

function rollDice() {
    const diceSelectors = document.querySelectorAll('.dice-selector');
    const resultsDiv = document.getElementById('result');
    const historyList = document.getElementById('history-list');
    let results = [];

    // Iterate through each set of dropdowns
    diceSelectors.forEach(selector => {
        const count = parseInt(selector.querySelector('.dice-count').value);
        const sides = parseInt(selector.querySelector('.dice-type').value);

        for (let i = 0; i < count; i++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            results.push(`D${sides}: ${roll}`);
        }
    });

    // Display current roll
    resultsDiv.innerHTML = 'You rolled: <br>' + results.join('<br>');

    // Add to history
    let historyItem = document.createElement('li');
    historyItem.innerHTML = `Rolled: ${results.join('<br>')}`;
    historyList.prepend(historyItem);
}

function saveDicePool() {
    const diceSelectors = document.querySelectorAll('.dice-selector');
    let pool = [];

    diceSelectors.forEach(selector => {
        const count = parseInt(selector.querySelector('.dice-count').value);
        const sides = parseInt(selector.querySelector('.dice-type').value);
        if (count > 0) {
            pool.push(`${count}D${sides}`);
        }
    });

    if (pool.length > 0) {
        const poolName = prompt('Enter a name for this dice pool:');
        if (poolName) {
            const savedPool = document.createElement('option');
            savedPool.value = pool.join(', ');
            savedPool.textContent = poolName;
            document.getElementById('saved-pool').appendChild(savedPool);
        }
    }
}

function loadSavedPool() {
    const savedPoolValue = document.getElementById('saved-pool').value;
    if (savedPoolValue) {
        const diceSelectors = document.querySelectorAll('.dice-selector');
        const poolItems = savedPoolValue.split(', ');

        // Reset all dropdowns to 0
        diceSelectors.forEach(selector => {
            selector.querySelector('.dice-count').value = 0;
        });

        // Set values based on saved pool
        poolItems.forEach(item => {
            const [count, sides] = item.split('D').map(Number);
            const matchingSelector = Array.from(diceSelectors).find(
                selector => parseInt(selector.querySelector('.dice-type').value) === sides
            );
            if (matchingSelector) {
                matchingSelector.querySelector('.dice-count').value = count;
            }
        });
    }
}
