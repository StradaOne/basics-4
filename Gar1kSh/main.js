const BUTTONS = {
  CHANGE_COLOR: document.querySelector(".change-btn"),
  DEFAULT_COLOR: document.querySelector(".default-btn"),
  RANDOM_COLOR: document.querySelector(".random-btn"),
};

const changeBcgColor = () => {
  const colorBg = BUTTONS.CHANGE_COLOR.getAttribute("data-color");
  document.body.style.backgroundColor = colorBg;
};

const defaultBcgColor = () => {
  document.body.style.backgroundColor = "#ffffff";
};

const randomBcgColor = () => {
  const colors = ["green", "blue", "red", "orange", "black", "aqua"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const changeBcgColorPeriod = () => {
  let timerId = setInterval(() => {
    document.body.style.backgroundColor = randomBcgColor();
  }, 2000);
  setTimeout(() => {
    clearInterval(timerId);
  }, 10000);
};

BUTTONS.CHANGE_COLOR.addEventListener("click", changeBcgColor);
BUTTONS.DEFAULT_COLOR.addEventListener("click", defaultBcgColor);
BUTTONS.RANDOM_COLOR.addEventListener("click", changeBcgColorPeriod);
