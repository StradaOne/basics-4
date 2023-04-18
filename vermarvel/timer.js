// UI Elements
const startBtn = document.getElementById(`start`);
const pauseBtn = document.getElementById(`pause`);
const stopBtn = document.getElementById(`stop`);
const timeField = document.getElementById(`time-field`);

// State variables
let time = 0;
let timerId;
// let pauseOn = false;

// Process
function addTime() {
  timerId = setInterval(() => {
    time++;
    updTimeField();
  }, 900);
}

function start() {
  addTime();
  hideStartShowPause();
  // pauseOn = false;
}

function pause() {
  clearInterval(timerId);
  hidePauseShowStart();
  // pauseOn = true;
}

function stop() {
  time = 0;
  clearInterval(timerId);
  // pauseOn = false;
  timeField.textContent = "00.00.00";
  hidePauseShowStart();
}

// HELPER FUNCTIONS

function hideStartShowPause() {
  startBtn.style.display = "none";
  pauseBtn.style.display = "block";
}

function hidePauseShowStart() {
  pauseBtn.style.display = "none";
  startBtn.style.display = "block";
}

function timeToStr(time) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;

  const strHours = hours.toString().padStart(2, "0");
  const strMinutes = minutes.toString().padStart(2, "0");
  const strSeconds = seconds.toString().padStart(2, "0");
  return `${strHours}.${strMinutes}.${strSeconds}`;
}

function updTimeField() {
  const timeString = timeToStr(time);
  timeField.textContent = timeString;
}

// Events

startBtn.addEventListener(`click`, start);
pauseBtn.addEventListener(`click`, pause);
stopBtn.addEventListener(`click`, stop);
