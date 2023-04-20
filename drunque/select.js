const select = document.querySelector(".select");
const current = select.querySelector(".current");
const optionsBox = select.querySelector(".options");
const options = optionsBox.querySelectorAll("div[data-value]");

current.addEventListener("click", (event) => {
  optionsBox.classList.toggle("disabled");
});

options.forEach((option) => {
  option.addEventListener("click", (event) => {
    current.textContent = ``;
    const newCurrent = document.createElement("div");
    newCurrent.dataset.value = option.dataset.value;
    newCurrent.textContent = option.textContent;
    current.appendChild(newCurrent);
    optionsBox.classList.add("disabled");
  });
});

select.addEventListener("focusout", () => {
  optionsBox.classList.add("disabled");
});