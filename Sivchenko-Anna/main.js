const btnChangeColor = document.getElementById("change-bg");
const bgColorValue = btnChangeColor.getAttribute("data-color");

btnChangeColor.addEventListener('click', () => {
  document.body.style.backgroundColor = bgColorValue;
})

let styles = getComputedStyle(btnChangeColor);
console.log(styles.backgroundColor);

function changeBgColors () {
  const colors = ["red", "blue", "green", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
  console.log(randomColor);
}

setInterval(changeBgColors, 2000);