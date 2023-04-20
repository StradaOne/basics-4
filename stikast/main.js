const COLORS = [
  "#D1E603",
  "#89E5F9",
  "#FF015B",
  "#88EFF2",
  "#55F574",
  "#2A88B7",
  "#55F574",
  "#34FF00",
  "#D1E603",
  "#EC87DA",
  "#4C52B8",
  "#D5F16F",
	"#F29648",
	"#D0110C",
	"#BEBEF1",
	"#BEBEF1",
	"#BEBEF1"
];

const button = document.getElementById("change-bg");
const color = button.getAttribute("data-color");

button.addEventListener("click", switchColor);

let changedColor = false;
let timerId;

function switchColor() {
  if (!changedColor) {
    timerId = setTimeout(function change() {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      document.body.style.backgroundColor = randomColor;
      timerId = setTimeout(change, 2000);
    }, 2000);
    changedColor = true;
  } else {
    document.body.style.backgroundColor = "#FFF";
    changedColor = false;
    clearInterval(timerId);
  }
}
