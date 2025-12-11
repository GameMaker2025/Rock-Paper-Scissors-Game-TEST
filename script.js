
// ===== Global State =====
let playerScore = 0;
let computerScore = 0;
let timeLeft = 30;
let timerInterval = null;
let highScore = 0;

// Allowed moves
const choices = ["rock", "paper", "scissors"];

// Win map: key beats value
const beats = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// ===== UI Helpers =====
function updateScoreboard() {
  const el = document.getElementById("scoreboard");
  if (el) el.textContent = `Player: ${playerScore} \n Computer: ${computerScore}`;
}

function updateTimerUI() {
  const el = document.getElementById("timer");
  if (el) el.textContent = `Time: ${timeLeft}s`;
}

function setResultText(text) {
  const el = document.getElementById("game-result");
  if (el) el.textContent = text;
}

function updateHighScoreUI() {
  const el = document.getElementById("highscore");
  if (el) el.textContent = `High Score: ${highScore}`;
}

// Enable/disable choice buttons
function setChoiceButtonsEnabled(enabled) {
  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.disabled = !enabled;
  });
}

// ===== Persistence (localStorage) =====
function loadHighScore() {
  const saved = localStorage.getItem("rps_highscore");
  highScore = saved ? parseInt(saved, 10) || 0 : 0;
  updateHighScoreUI();
}

function saveHighScore() {
  localStorage.setItem("rps_highscore", String(highScore));
}

// --- If you prefer cookies instead of localStorage, uncomment the block below and swap the calls ---
// function setCookie(name, value, days = 365) {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
// }
// function getCookie(name) {
//   const target = `${encodeURIComponent(name)}=`;
//   const found = document.cookie.split(";").map(c => c.trim()).find(c => c.startsWith(target));
//   return found ? decodeURIComponent(found.substring(target.length)) : null;
// }
// function loadHighScore() {
//   const saved = getCookie("rps_highscore");
//   highScore = saved ? parseInt(saved, 10) || 0 : 0;
//   updateHighScoreUI();
// }
// function saveHighScore() {
//   setCookie("rps_highscore", String(highScore), 365);
// }

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

      // End of game messaging
      setResultText(
        `Time's up! Final Score — Player ${playerScore} : Computer ${computerScore}`
      );
      setChoiceButtonsEnabled(false);

      // === High score check on game end ===
      if (playerScore > highScore) {
        highScore = playerScore; // or (playerScore - computerScore) if you prefer net score
        saveHighScore();
        updateHighScoreUI();
        setResultText(
          `🎉 New High Score: ${highScore}! Final Score — Player ${playerScore} : Computer ${computerScore}`
        );
      }
    }
  }, 1000);

  setChoiceButtonsEnabled(true);
}

function restartGame() {
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

    // === Immediate high score update on win ===
    if (playerScore > highScore) {
      highScore = playerScore;
      saveHighScore();
      updateHighScoreUI();
    }
  } else {
    result = "You lose!";
    computerScore++;
  }

  // Update UI
  const pEl = document.getElementById("player-choice");
  const cEl = document.getElementById("computer-choice");
  if (pEl) pEl.textContent = playerChoice;
  if (cEl) cEl.textContent = computerChoice;

  setResultText(result);
  updateScoreboard();
}

// ===== Wire up buttons =====
function wireEvents() {
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");

  if (startBtn) startBtn.addEventListener("click", startGame);
  if (restartBtn) restartBtn.addEventListener("click", restartGame);

  document.querySelectorAll(".choice-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const choice = btn.getAttribute("data-choice");
      playGame(choice);
    });
  });

  // Disable buttons initially until Start is pressed
  setChoiceButtonsEnabled(false);
}

// ===== Init on DOM ready =====
document.addEventListener("DOMContentLoaded", () => {
  wireEvents();
  loadHighScore(); // <-- Ensure high score loads before the user starts playing
  updateScoreboard();
  updateTimerUI();
});
