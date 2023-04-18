const displayCounter = document.getElementById("counter");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
let intervalId = null;
let count = 0;

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      count += 1;
      displayCounter.innerText = count;
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  count = 0;
  displayCounter.innerText = count;
}

startBtn.addEventListener("click", () => {
  startTimer();
});

pauseBtn.addEventListener("click", () => {
  pauseTimer();
});

resetBtn.addEventListener("click", () => {
  resetTimer();
});
