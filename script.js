
// ===== Global State =====
let playerScore = 0;
let computerScore = 0;
let timeLeft = 30;
let timerInterval = null;

// Allowed moves
const choices = ["rock", "paper", "scissors", "gun", "car", "box"];

// Win map: key beats value
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
  gun: "box",
  car: "gun",
  box: "car",
};

// ===== UI Helpers =====
function updateScoreboard() {
  document.getElementById("scoreboard").textContent =
    `Player: ${playerScore} | Computer: ${computerScore}`;
}

function updateTimerUI() {
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
}

function setResultText(text) {
  document.getElementById("game-result").textContent = text;
}

// Enable/disable choice buttons
function setChoiceButtonsEnabled(enabled) {
  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.disabled = !enabled;
  });
}

// ===== Game Flow =====
function startGame() {
  // Reset scores and timer for a new session
  playerScore = 0;
  computerScore = 0;
  timeLeft = 30;
  updateScoreboard();
  updateTimerUI();
  setResultText("Game started! Pick a move.");

  // Stop any existing timer
  if (timerInterval) clearInterval(timerInterval);

  // Start countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      setResultText(`Time's up! Final Score — Player ${playerScore} : Computer ${computerScore}`);
      setChoiceButtonsEnabled(false);
    }
  }, 1000);

  setChoiceButtonsEnabled(true);
}

function restartGame() {
  // Same as start but without showing alert; clean slate
  startGame();
}

function playGame(playerChoice) {
  // Safeguard: ignore clicks if timer not running
  if (!timerInterval) {
    setResultText("Press Start Game to begin.");
    return;
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Decide result
  let result;
  if (playerChoice === computerChoice) {
    result = "It's a draw!";
  } else if (beats[playerChoice] === computerChoice) {
    result = "You win!";
    playerScore++;
  } else {
    result = "You lose!";
    computerScore++;
  }

  // Update UI
  document.getElementById("player-choice").textContent = playerChoice;
  document.getElementById("computer-choice").textContent = computerChoice;
  setResultText(result);
  updateScoreboard();
}

// ===== Wire up buttons without inline onclick =====
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("restart-btn").addEventListener("click", restartGame);

document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const choice = btn.getAttribute("data-choice");
    playGame(choice);
  });
});

// Disable buttons initially until Start is pressed
setChoiceButtonsEnabled(false);
