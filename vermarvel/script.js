"use strict";

// DOM

const getDOM = (s) => document.querySelector(s);

const container = getDOM(".container");
const input = getDOM(".inp");
const memory = getDOM(".memory");
const sourceDiv = getDOM(".source");
const errorDiv = getDOM(".error-msg");
const form = getDOM(".form");

// variables
const serverUrl = "https://api.genderize.io";
let curName = null;
let curText = null;

// Memory
let keeper = [];

//%%%%%%%%%%%%%%%%%%% logics %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Check stored data
if (localStorage.getItem("keeper")) {
  keeper = JSON.parse(localStorage.getItem("keeper"));
}

// Get input from user

function getInput() {
  // Guard Clause: RegEx: Only A-z and '-'; no 1 letter, no empty;
  const inputValue = input.value.trim();
  if (/^[a-zA-Z]+[\-a-zA-Z]*$/.test(inputValue) && inputValue.length > 1) {
    curName = inputValue;
  } else {
    input.value = "";
  }
}

// Reset
// clear input
function resetInp() {
  input.value = "";
}

// clear Memory Screen
function resetMemoryScr() {
  memory.innerHTML = "";
}

// Error handler
function renderError(msg) {
  const textInside = errorDiv.querySelector(".error-text");
  textInside.textContent = msg;
  errorDiv.classList.remove("hidden");
}

// Set up a text
function setText(data) {
  // Format the name
  const name = curName.charAt(0).toUpperCase() + curName.toLowerCase().slice(1);

  // Guard clause for the data
  if (data.gender === null || data.gender === undefined)
    throw new Error(`Name not found (${response.status})`);
  // Assemble the output
  return `${name} is a ${data.gender} name`;
}

// Get data from api
async function getData() {
  try {
    // receive
    const response = await fetch(`${serverUrl}?name=${curName}`);
    if (!response.ok) throw new Error(`Name not found (${response.status})`);
    // decode
    const data = await response.json();
    // assemble text
    const text = setText(data);
    // save to Memory
    keeper.push(text);
    return text;
  } catch (err) {
    renderError(`💥 Wrong Input!: ${err.message}💥`);
  } finally {
    curName = null;
  }
}
// Create a result div with a text
function createDiv(text) {
  // clone a div
  const copiedDiv = sourceDiv.cloneNode(true);
  memory.appendChild(copiedDiv);
  // add text
  const textInside = copiedDiv.querySelector(".text-inside");
  textInside.textContent = text;
  // add color
  if (text.includes("female")) {
    copiedDiv.classList.remove("male");
  }
  // make visible
  copiedDiv.classList.remove("hidden");
}

//%%%%%%%%%%%%%%%%%%%%  RENDER  %%%%%%%%%%%%%%%%%%%%%%%%

function render() {
  // Clear Memory Screen
  resetMemoryScr();
  console.log(keeper);
  // If array is empty - stop
  if (keeper.length === 0) return;

  keeper.forEach((item) => {
    createDiv(item);
  });
}

//%%%%%%%%%%%%%%%%%%%%  LISTENERS  %%%%%%%%%%%%%%%%%%%%%%%%

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  getInput();
  try {
    // start the process of retreiving data
    await getData();
    // when the data is already in memory, update UI
    if (keeper.length > 6) {
      keeper.shift();
    }

    resetInp();
    render();
    // Store
    localStorage.setItem("keeper", JSON.stringify(keeper));
  } catch (err) {
    renderError(`💥 Wrong Input!: ${err.message}💥`);
  }
});

container.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("clear")) {
    errorDiv.classList.add("hidden");
    keeper = [];
    localStorage.removeItem("keeper");
    render();
  }
});
