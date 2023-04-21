// Buttons

const btnBg = document.getElementById("bg");

const body = document.body;

// Task 1 Change background color
let bgBlack = false;
const colorData = btnBg.getAttribute("data-color");

function changeBgColor() {
  if (bgBlack === false) {
    body.style.backgroundColor = colorData;
    bgBlack = true;
  } else {
    body.style.backgroundColor = "white";
    bgBlack = false;
  }
}

btnBg.addEventListener("click", changeBgColor);

// Task 2 Look up the styles as an object
const styles = getComputedStyle(btnBg);
console.log(styles[0]);

// Task 3 (modified)
// elements

const container = document.querySelector(".container");
const star = document.getElementById("star");

// Service tools
const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
let intervalId;
let intervalOn = false;

const colors = [
  "#FF69B4",
  "#00FFFF",
  "#800080",
  "#FFA500",
  "#FFD700",
  "#32CD32",
  "#FF6347",
  "#1E90FF",
  "#FFFF00",
  "#FFC0CB",
];

const colorsAlt = [
  "#98FB98",
  "#000",
  "#40E0D0",
  "#FF7F50",
  "#BA55D3",
  "#F00",
  "#87CEFA",
  "#9370DB",
  "#FFC0C",
  "#FFC",
];

function newRandom() {
  return Math.floor(Math.random() * 10);
}

// Logic
function changeColors() {
  if (intervalOn === true) return;
  intervalOn = true;
  intervalId = setInterval(() => {
    container.style.backgroundColor = colors[newRandom()];
    star.style.color = colorsAlt[newRandom()];
  }, 200);
}

function stopColors() {
  intervalOn = false;
  clearInterval(intervalId);
}

// Eventlisteners
btnStart.addEventListener("click", changeColors);
btnStop.addEventListener("click", stopColors);
