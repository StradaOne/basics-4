const btnBackgroundColor = document.getElementById("bg-color");
const colorGreenSea = btnBackgroundColor.getAttribute("data-color");
const colorOriginal = document.body.style.backgroundColor;

function changeBackgroundColor() {
  if (document.body.style.backgroundColor === colorOriginal) {
    document.body.style.backgroundColor = "#16a085";
  } else {
    document.body.style.backgroundColor = colorOriginal;
  }
}

btnBackgroundColor.addEventListener("click", changeBackgroundColor);
