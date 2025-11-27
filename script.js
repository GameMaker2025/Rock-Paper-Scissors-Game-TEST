
let playerScore = 0;
let computerScore = 0;
let timeLeft = 30;
let timerInterval;

function startGame() {
    // Reset scores and timer
    playerScore = 0;
    computerScore = 0;
    timeLeft = 30;

    document.getElementById("scoreboard").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

    clearInterval(timerInterval); // Stop any previous timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Final Score: Player ${playerScore} - Computer ${computerScore}`);
            disableButtons();
        }
    }, 1000);

    enableButtons();
}

function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors", "gun", "car", "box"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (playerChoice === computerChoice) {
        result = "It's a draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "gun" && computerChoice === "box") ||
        (playerChoice === "car" && computerChoice === "gun") ||
        (playerChoice === "box" && computerChoice === "car")
    ) {
        result = "You win!";
        playerScore++;
    } else {
        result = "You lose!";
        computerScore++;
    }

    document.getElementById("player-choice").textContent = playerChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
    document.getElementById("game-result").textContent = result;
    document.getElementById("scoreboard").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function disableButtons() {
    document.querySelectorAll("button[onclick^='playGame']").forEach(btn => btn.disabled = true);
}

function enableButtons() {
    document.querySelectorAll("button[onclick^='playGame']").forEach(btn => btn.disabled = false);
}
