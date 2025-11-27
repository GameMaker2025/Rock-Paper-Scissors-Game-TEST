
let playerScore = 0;
let computerScore = 0;
let timeLeft = 30; // 30-second timer
let timerInterval;

function startTimer() {
    clearInterval(timerInterval); // Reset timer if already running
    timeLeft = 30;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Final Score: Player " + playerScore + " - Computer " + computerScore);
        }
    }, 1000);
}
// Player chooses while Computer randomly chooses through Math.
function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors", "gun", "car", "box"];
    const computerChoice = choices[Math.floor(Math.random() * 6)];
// Game ends in draw if Player and Computer select same option.
    let result;
    if (playerChoice === computerChoice) {
        result = "It's a draw!";
        // Player and Computer determine the results of the match based on pairs.
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "gun" && computerChoice === "box") ||
        (playerChoice === "car" && computerChoice === "gun") ||
        (playerChoice === "box" && computerChoice === "car")
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    document.getElementById("player-choice").textContent = playerChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
    document.getElementById("game-result").textContent = result;
    document.getElementById("scoreboard").textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}
