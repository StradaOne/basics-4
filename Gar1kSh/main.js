const counterDisplay = document.querySelector("#counter");
const buttonStart = document.querySelector("#startPauseTimer");
const buttonReset = document.querySelector("#resetTimer");
let timerId = null;
let status = "stopped";
let count = 0;

function stopWatch() {
  count++;
  console.log(count);
  counterDisplay.innerText = count;
}

function startPauseTimer() {
  if (status === "stopped") {
    timerId = setInterval(stopWatch, 1000);
    buttonStart.innerText = "Pause";
    buttonStart.style.background = "orange";
    status = "started";
  } else {
    buttonStart.style.background = "#85eb6b";
    clearInterval(timerId);
    buttonStart.innerText = "Start";
    status = "stopped";
  }
}

function resetTimer() {
  clearInterval(timerId);
  timerId = null;
  count = 0;
  counterDisplay.innerText = count;
  buttonStart.innerText = "Start";
  buttonStart.style.background = "#85eb6b";
  console.clear();
}

buttonStart.addEventListener("click", startPauseTimer);

buttonReset.addEventListener("click", resetTimer);
