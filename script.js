// 🔓 Unlock time (change if needed)
const unlockTime = new Date(2026, 0, 14, 0, 0, 0).getTime();

const lock = document.getElementById("lock");
const letter = document.getElementById("letter");
const countdown = document.getElementById("countdown");
const waitMsg = document.getElementById("waitMsg");

const showPuzzleBtn = document.getElementById("showPuzzleBtn");
const puzzle = document.getElementById("puzzle");
const puzzleText = document.getElementById("puzzleText");
const puzzleInput = document.getElementById("puzzleInput");
const puzzleFeedback = document.getElementById("puzzleFeedback");
const submitPuzzle = document.getElementById("submitPuzzle");

let unlocked = false;

// 💌 PUZZLES (your custom ones)
const puzzles = [
  { text: "aapka naam?", answer: "haha" },
  { text: "I feel calm when I talk to ___ 😌", answer: "chal be" },
  { text: "You make my days ___ ✨", answer: "bekaltter" },
  { text: "My heart feels safe with ___ ❤️", answer: "abcdefg" }
];

let currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

// 🎯 Show puzzle immediately when button is clicked
showPuzzleBtn.onclick = () => {
  puzzle.classList.remove("hidden");
  showPuzzleBtn.style.display = "none";
  puzzleText.textContent = currentPuzzle.text;
};

// ✅ Check puzzle answer
submitPuzzle.onclick = () => {
  const ans = puzzleInput.value.trim().toLowerCase();

  if (ans === currentPuzzle.answer.toLowerCase()) {
    unlockLetter();
  } else {
    puzzleFeedback.textContent = "Almost 😌 Try again or wait 💕";
  }
};

// 🔓 Unlock the letter
function unlockLetter() {
  if (unlocked) return;
  unlocked = true;
  lock.classList.add("hidden");
  letter.classList.remove("hidden");
}

// ⏳ Countdown timer
function updateCountdown() {
  if (unlocked) return;

  const diff = unlockTime - Date.now();

  if (diff <= 0) {
    unlockLetter();
    return;
  }

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  countdown.textContent = `Unlocks in ${h}h ${m}m ${s}s`;
  waitMsg.textContent =
    "Just a little patience… something special is waiting 💖";
}

// 🚀 Start
updateCountdown();
setInterval(updateCountdown, 1000);
