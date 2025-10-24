// Player chooses while Computer randomly chooses through Math.
function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors", "gun", "car", "box", "glove"];
    const computerChoice = choices[Math.floor(Math.random() * 8)];
// Game ends in draw if Player and Computer select same option.
    let result;
    if (playerChoice === computerChoice) {
        result = "It's a draw!";
        // Player and Computer determine the results of the match based on pairs.
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "gun" && computerChoice === "scissors") ||
        (playerChoice === "car" && computerChoice === "paper") ||
        (playerChoice === "box" && computerChoice === "rock") ||
        (playerChoice === "glove" && computerChoice === "box") ||
        (playerChoice === "gun" && computerChoice === "car")
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    document.getElementById("player-choice").textContent = playerChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
    document.getElementById("game-result").textContent = result;
}
