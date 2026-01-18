const options = ['rock', 'paper', 'scissors'];

const resultText = {
    win: "You Win!",
    lose: "You Lose!",
    draw: "It's a Draw!"
};

const scores = {
    user: 0,
    comp: 0
};

// DOM Elements
const userScoreEl = document.getElementById('user-score');
const compScoreEl = document.getElementById('comp-score');
const selectionPhase = document.getElementById('selection-phase');
const resultPhase = document.getElementById('result-phase');
const resultTitle = document.getElementById('result-text');
const userPickContainer = document.getElementById('user-pick-icon');
const compPickContainer = document.getElementById('comp-pick-icon');
const playAgainBtn = document.getElementById('play-again-btn');
const resetBtn = document.getElementById('reset-btn');

// Icon map for result display
const iconMap = {
    rock: '<i class="fa-regular fa-hand-back-fist" style="color: var(--accent-rock)"></i>',
    paper: '<i class="fa-regular fa-hand" style="color: var(--accent-paper)"></i>',
    scissors: '<i class="fa-regular fa-hand-scissors" style="color: var(--accent-scissors)"></i>'
};

// Event Listeners
document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const userChoice = btn.getAttribute('data-choice');
        playRound(userChoice);
    });
});

playAgainBtn.addEventListener('click', () => {
    resetRound();
});

resetBtn.addEventListener('click', () => {
    resetGame();
});

// Game Logic
function computerPlay() {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function determineWinner(user, comp) {
    if (user === comp) return 'draw';
    
    if (
        (user === 'rock' && comp === 'scissors') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissors' && comp === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function playRound(userChoice) {
    const compChoice = computerPlay();
    const result = determineWinner(userChoice, compChoice);
    
    // Update Score Logic
    if (result === 'win') {
        scores.user++;
    } else if (result === 'lose') {
        scores.comp++;
    }
    
    // Update UI Score immediately
    updateScoreUI();
    
    // Transition to Result View
    showResult(userChoice, compChoice, result);
}

function showResult(userChoice, compChoice, result) {
    // Hide selection, show result
    selectionPhase.classList.remove('active');
    selectionPhase.classList.add('hidden');
    
    resultPhase.classList.remove('hidden');
    resultPhase.classList.add('active');
    
    // Set icons
    userPickContainer.innerHTML = iconMap[userChoice];
    compPickContainer.innerHTML = iconMap[compChoice]; // Instant reveal for now, can add delay for suspense
    
    // Set Text
    resultTitle.innerText = resultText[result];
    
    // Styles for Winner
    userPickContainer.classList.remove('winner');
    compPickContainer.classList.remove('winner');
    
    if (result === 'win') {
        userPickContainer.classList.add('winner');
    } else if (result === 'lose') {
        compPickContainer.classList.add('winner');
    }
}

function updateScoreUI() {
    userScoreEl.innerText = scores.user;
    compScoreEl.innerText = scores.comp;
}

function resetRound() {
    resultPhase.classList.remove('active');
    resultPhase.classList.add('hidden');
    
    selectionPhase.classList.remove('hidden');
    selectionPhase.classList.add('active');
    
    userPickContainer.innerHTML = '';
    compPickContainer.innerHTML = '';
}

function resetGame() {
    scores.user = 0;
    scores.comp = 0;
    updateScoreUI();
    resetRound(); // Go back to main screen if not already there
}
