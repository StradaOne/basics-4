const minutes = document.querySelector(".js-minutes");
const seconds = document.querySelector(".js-seconds");
const milliseconds = document.querySelector(".js-milliseconds ");
const btnStart = document.querySelector(".js-btn-start");
const btnStop = document.querySelector(".js-btn-stop");
const btnReset = document.querySelector(".js-btn-reset");
const btnToggleTheme = document.querySelector(".js-btn-toggleTheme");
const wrapper = document.querySelector(".wrapper");

let time;
let min = 0;
let sec = 0;
let millisec = 0;

function timer() {
  millisec++;
  milliseconds.textContent = millisec;

  if(millisec > 99) {
    millisec = 0;
    sec++;
    seconds.textContent = sec;
  }
  if (sec < 10) {
      seconds.textContent = '0' + sec;
      }
  if (sec > 59) {
    min++;
    sec = 0;
    minutes.textContent = min;
  }
  if (min < 10) {
    minutes.textContent = "0" + min;
  }
}

function startTimer() {
  time = setInterval(timer, 10);
  wrapper.style.borderBottomColor = "#03AE85";
}

function stopTimer() {
  clearInterval(time);
  wrapper.style.borderBottomColor = "#FFC830";
}

function resetTimer() {
  clearInterval(time);
  min = 0;
  sec = 0;
  millisec = 0;

  minutes.textContent = '00';
  seconds.textContent = "00";
  milliseconds.textContent = "00";

  wrapper.style.borderBottomColor = "#FD6259";
}

btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);

btnToggleTheme.addEventListener('click', () => {
  document.body.classList.toggle("dark-theme");
})