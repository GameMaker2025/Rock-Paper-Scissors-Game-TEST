function playGame(playerChoice) {
    const choices = ["rock", "paper", "scissors", "gun"];
    const computerChoice = choices[Math.floor(Math.random() * 4)];

    let result;
    if (playerChoice === computerChoice) {
        result = "It's a draw!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "gun" && computerChoice === "box") ||
        (playerChoice === "car" && computerChoice === "gun") ||
        (playerChoice === "box" && computerChoice == "glove") ||
        (playerChoice === "glove" && computerChoice == "paper")
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    document.getElementById("player-choice").textContent = playerChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
    document.getElementById("game-result").textContent = result;
}
