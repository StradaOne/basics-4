"use strict";

import dom from "./dom.js";

// Variables
let rawInput = null;
let uiCityName = null;
let isFav;
const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

let keeper = [];
console.log(keeper);

// Helper functions

function resetInput() {
  dom.input.value = "";
  isFav = null;
}
function hideCheckbox() {
  dom.parentHeart.classList.add("hidden");
}

// clear Favs
function resetFavScr() {
  dom.parentFavs.innerHTML = "";
}

function updateIsFav() {
  // console.log(keeper.includes(uiCityName));
  if (keeper.includes(uiCityName)) {
    isFav = true;
  } else if (!keeper.includes(uiCityName)) {
    isFav = false;
  }

  console.log(isFav);
}

function displayCheckbox() {
  console.log("isOnList:", isFav);
  dom.parentHeart.classList.remove("hidden");
  console.log(dom.parentHeart.classList);

  if (isFav) {
    dom.checkboxHeart.checked = true;
  } else if (!isFav) {
    dom.checkboxHeart.checked = false;
  }

  renderFavs();
}

function renderError(msg = "City not found!") {
  dom.errorBox.textContent = msg;
  dom.errorBox.classList.remove("hidden");
}

function hideErrorBox() {
  dom.errorBox.classList.add("hidden");
}

//%%%%%%%%%%%%%%% Business Logics  %%%%%%%%%%%%%%%%%%%%%

// Get user input
function getInput() {
  rawInput = dom.input.value;
}

// Process input
async function getData() {
  try {
    const url = `${serverUrl}?q=${rawInput}&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`City not found (${response.status})`);
    // Decode
    const data = await response.json();

    // Process and distribute
    const icon = data.weather[0].icon;
    uiCityName = data.name;
    const uiTemp = Math.round(data.main.temp - 273.15);

    return displayData(uiCityName, uiTemp, icon);
    // Handle the errors
  } catch (err) {
    console.error(err);
    renderError(`💥 Error: ${err.message}`);
  }
}
// Display the data
function displayData(cityName, temp, icon) {
  dom.nowPageCity.textContent = cityName;

  const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  dom.iconCloudImg.setAttribute("src", imgUrl);
  dom.nowPageTemp.textContent = `${temp}℃`;
  updateIsFav();
  displayCheckbox();
}

// Render the Favourites list
function renderFavs() {
  resetFavScr();
  console.log("keeper");
  if (keeper.length === 0) return;


  keeper.forEach((city) => {
    const copiedDiv = dom.sourceFav.cloneNode(true);
    const textInside = copiedDiv.querySelector(".text");
    textInside.textContent = city;
    dom.parentFavs.appendChild(copiedDiv);
    copiedDiv.classList.remove("hidden");
  });
}

//%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%
// Submit
dom.form.addEventListener("submit", async function (event) {
  event.preventDefault();
  getInput();
  try {
    // start the process of retreiving data
    await getData();

    resetInput();
  } catch (err) {
    renderError(`💥 Wrong Input!: ${err.message}💥`);
  }
});

dom.form.addEventListener("click", hideCheckbox);

// Hide Error Alert
dom.errorBox.addEventListener("click", hideErrorBox);

// Set Fav state + keeper manipulation
dom.checkboxHeart.addEventListener("change", function (event) {
  const target = event.target;
  if (target.checked === true) {
    isFav = true;
    keeper.push(uiCityName);
    console.log(keeper);
    console.log(isFav);
  }
  if (target.checked === false) {
    isFav = false;
    keeper = keeper.filter((city) => city !== uiCityName);
    console.log(keeper);
    console.log(isFav);
  }
  renderFavs();
});
