"use strict";

// DOM

const formHigh = document.querySelector(".form-high");
const formLow = document.querySelector(".form-low");
const fieldHigh = document.querySelector(".add-task-high");
const fieldLow = document.querySelector(".add-task-low");
const btnAddLow = document.querySelector(".plus-low");
const btnAddHigh = document.querySelector(".plus-high");
const inputLow = document.getElementById("low");
const inputHigh = document.getElementById("high");
const btnLow = document.getElementById("btn-low");
const lowContainer = document.querySelector(".low-container");
const highContainer = document.querySelector(".high-container");
const sourceDiv = document.querySelector(".hidden");

let newTaskText;
let activeForm = null;
let containerId;

// Logic

// Functions
// (LATER: EVENT DELEGATION on this one)

formHigh.addEventListener(
  "focus",
  () => {
    activeForm = "high-container";
  },
  true
);

formLow.addEventListener(
  "focus",
  () => {
    activeForm = "low-container";
  },
  true
);

formHigh.addEventListener(
  "blur",
  () => {
    activeForm = null;
  },
  true
);

formLow.addEventListener(
  "blur",
  () => {
    activeForm = null;
  },
  true
);

function submitForm(event) {
  event.preventDefault();

  // clone div
  const copiedDiv = sourceDiv.cloneNode(true);
  copiedDiv.classList.remove("hidden");

  // locate the nesting spot

  const targetEl = event.currentTarget;
  containerId = targetEl.getAttribute("data-container-id");

  // Enter-key Scenario
  // Checking the activeForm
  if (containerId !== "low-container" && containerId !== "high-container") {
    if (event.keyCode === 13 || event.which === 13 || event.key === "Enter") {
      containerId = activeForm;
      if (activeForm === null) return;
    }
  }

  // add text or if empty -> dismiss
  const textInside = copiedDiv.querySelector(".text");

  if (containerId === "high-container") {
    if (inputHigh.value === "") return;
    textInside.textContent = inputHigh.value;
    highContainer.appendChild(copiedDiv);
    inputHigh.value = "";
  }
  if (containerId === "low-container") {
    if (inputLow.value === "") return;
    textInside.textContent = inputLow.value;
    lowContainer.appendChild(copiedDiv);
    inputLow.value = "";
  } else {
    return;
  }
}

btnAddLow.addEventListener("click", submitForm);
btnAddHigh.addEventListener("click", submitForm);
formHigh.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitForm(event);
  }
});

formLow.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitForm(event);
  }
});
