// 🔓 Unlock time
const unlockTime = new Date(2026, 0, 14, 0, 0, 0).getTime();

// Elements
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

// 💌 ALL PUZZLES (order matters now)
const puzzles = [
  { text: "aapka naam?", answer: "haha" },
  { text: "I feel calm when I talk to ___ 😌", answer: "chal be" },
  { text: "You make my days ___ ✨", answer: "bekaltter" },
  { text: "My heart feels safe with ___ ❤️", answer: "abcdefg" },

  { text: "Who makes me smile without trying? 😏", answer: "you" },
  { text: "Mujhe sabse zyada kaun pasand hai? 😌", answer: "tum" },
  { text: "One word to describe you 💖", answer: "perfect" }
];

// 🔢 How many puzzles must be solved
const REQUIRED_PUZZLES = 3;

let currentIndex = 0;

// 🎯 Start puzzle chain
showPuzzleBtn.onclick = () => {
  puzzle.classList.remove("hidden");
  currentIndex = 0;
  loadPuzzle();
};

// 📥 Load current puzzle
function loadPuzzle() {
  const currentPuzzle = puzzles[currentIndex];
  puzzleText.textContent = `(${currentIndex + 1}/${REQUIRED_PUZZLES}) ${currentPuzzle.text}`;
  puzzleInput.value = "";
  puzzleFeedback.textContent = "";
}

// ✅ Check answer
submitPuzzle.onclick = () => {
  const userAnswer = puzzleInput.value.trim().toLowerCase();
  const correctAnswer = puzzles[currentIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    currentIndex++;

    if (currentIndex >= REQUIRED_PUZZLES) {
      unlockLetter();
    } else {
      puzzleFeedback.textContent = "Correct 😌 next one…";
      setTimeout(loadPuzzle, 800);
    }
  } else {
    puzzleFeedback.textContent = "Nope 😏 try again";
  }
};

// 🔓 Unlock letter
function unlockLetter() {
  if (unlocked) return;
  unlocked = true;
  lock.classList.add("hidden");
  letter.classList.remove("hidden");
}

// ⏳ Countdown
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
