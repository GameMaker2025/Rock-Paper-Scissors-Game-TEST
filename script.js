// ===== Global State =====
let playerScore = 0;
let computerScore = 0;
let timeLeft = 30;
let timerInterval = null;

// Allowed moves
const choices = ["rock", "paper", "scissors"];

// Win map: key beats value
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
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

// ===== Cookie Helpers =====
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // Use SameSite=Lax by default; add Secure if you serve over HTTPS.
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  // If your site is HTTPS, prefer:
  // document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

function getCookie(name) {
  const target = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map(c => c.trim())
    .find(c => c.startsWith(target))
    ?.substring(target.length)
    ? decodeURIComponent(
        document.cookie
          .split(";")
          .map(c => c.trim())
          .find(c => c.startsWith(target))
          .substring(target.length)
      )
    : null;
}

function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ===== High Score =====
let highScore = 0;

function loadHighScore() {
  const saved = getCookie("rps_highscore");
  highScore = saved ? parseInt(saved, 10) : 0;
  updateHighScoreUI();
}

function saveHighScore() {
  setCookie("rps_highscore", String(highScore), 365); // keep for 1 year
}

function updateHighScoreUI() {
  document.getElementById("highscore").textContent = `High Score: ${highScore}`;
}

// Inside your existing timer tick where timeLeft <= 0:
if (timeLeft <= 0) {
  clearInterval(timerInterval);
  timerInterval = null;
  setResultText(`Time's up! Final Score — Player ${playerScore} : Computer ${computerScore}`);
  setChoiceButtonsEnabled(false);

  // === High score check on game end ===
  if (playerScore > highScore) {
    highScore = playerScore; // or (playerScore - computerScore) if you prefer net score
    saveHighScore();
    updateHighScoreUI();
    // Optional: Tell the player
    setResultText(`🎉 New High Score: ${highScore}! Final Score — Player ${playerScore} : Computer ${computerScore}`);
  }
}

// After you increment playerScore in playGame:
if (playerScore > highScore) {
  highScore = playerScore;
  saveHighScore();
  updateHighScoreUI();
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

// Load existing high score from cookie on initial load

// ... ; SameSite=Lax; Secure