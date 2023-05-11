"use strict";

import dom from "./dom.mjs";
import store from "./store.mjs";

// Variables
let rawInput = null;
let uiCityName = null;
let isFav;
let curFav;
const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

let keeper = [];

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

// Get user input
function getInput() {
  rawInput = dom.input.value;
}

// Check if the city is FAV
function updateIsFavState() {
  if (keeper.includes(uiCityName)) {
    isFav = true;
  } else if (!keeper.includes(uiCityName)) {
    isFav = false;
  }
}

function displayCheckbox() {
  dom.parentHeart.classList.remove("hidden");

  if (isFav) {
    dom.checkboxHeart.checked = true;
  } else if (!isFav) {
    dom.checkboxHeart.checked = false;
  }

  renderFavs();
}
// Error
function renderError(msg = "City not found!") {
  dom.errorMsg.textContent = msg;
  dom.errorBox.classList.remove("hidden");
}

function hideErrorBox() {
  dom.errorBox.classList.add("hidden");
}

// Starter algorithm
function start() {
  checkStorage();
  displayCurFav();
}
// Data processing
function convertTime(time, tZone) {
  const date = new Date(time * 1000);
  // console.log("date no utc", date);
  console.log("no timezone", date.getUTCHours());
  let hours = date.getUTCHours() + tZone;
  if (hours < 0) {
    hours = 24 + hours;
  }
  console.log("timezoned", hours);
  const minutes = "0" + date.getUTCMinutes();
  const formattedTime = hours + ":" + minutes.substr(-2); //

  return formattedTime;
}

function tempFormatted(data) {
  return Math.round(data - 273.15);
}
//%%%%%%%%%%%%%%% Business Logics  %%%%%%%%%%%%%%%%%%%%%

// START

start();

// Data Processing

// Process input (async/await) (DO NOT DELETE)
// async function getData() {
//   try {
//     const url = `${serverUrl}?q=${rawInput}&appid=${apiKey}`;

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`City not found (${response.status})`);
//     // Decode
//     const data = await response.json();

//     // Process and distribute
//     const icon = data.weather[0].icon;
//     uiCityName = data.name;
//     const uiTemp = Math.round(data.main.temp - 273.15);

//     return displayData(uiCityName, uiTemp, icon);
//     // Handle the errors
//   } catch (err) {
//     console.error(err);
//     renderError(`💥 Error: ${err.message}`);
//   }
// }

// Process input (chained promises)
function getData() {
  const url = `${serverUrl}?q=${rawInput}&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`City not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const detFeelsLike = tempFormatted(data.main.feels_like);
      const detWeather = data.weather[0].main;
      // time gap with UTC
      const tZone = data.timezone / 60 / 60;

      const detSunrise = convertTime(data.sys.sunrise, tZone);
      const detSunset = convertTime(data.sys.sunset, tZone);
      console.log(detSunset);

      const icon = data.weather[0].icon;
      uiCityName = data.name;
      const uiTemp = tempFormatted(data.main.temp);
      displayData(uiCityName, uiTemp, icon);
      displayDetails(detFeelsLike, detWeather, detSunrise, detSunset, tZone);
      // Handle the errors
    })
    .catch((err) => {
      if (err.message.includes("Failed to fetch")) {
        renderError(`💥 Error: Please check your internet connection`);
      } else {
        console.error(err);
        renderError(`💥 Error: ${err.message}`);
      }
    });
}

// Display the data
function displayData(cityName, temp, icon) {
  dom.nowPageCity.textContent = cityName;
  dom.detailsCity.textContent = cityName;
  dom.fcCity.textContent = cityName;

  const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  dom.iconCloudImg.setAttribute("src", imgUrl);
  dom.nowPageTemp.textContent = `${temp}℃`;
  dom.detailsTemp.textContent = `Temperature: ${temp}℃`;
  updateIsFavState();
  displayCheckbox();
}

function displayDetails(feelsLike, weather, sunrise, sunset) {
  dom.detailsFeels.textContent = `Feels like: ${feelsLike}℃`;
  dom.detailsWeather.textContent = `Weather: ${weather}`;
  dom.detailsSunrise.textContent = `Sunrise: ${sunrise}`;
  dom.detailsSunset.textContent = `Sunset: ${sunset}`;
}

// Check stored data
function checkStorage() {
  if (store.get("keeper")) {
    keeper = JSON.parse(store.get("keeper"));
  }

  if (store.get("curFav")) {
    curFav = store.get("curFav");
  } else {
    curFav = keeper?.[0];
  }
}

// %%%%%%%%%%%%%%%%%% MEMORY (FAVs) %%%%%%%%%%%%%%%%%%%%%%%%%%

// Render the Favourites list
function renderFavs() {
  resetFavScr();
  console.log(keeper);
  keeper.forEach((city) => {
    // assemble a div
    const copiedDiv = dom.sourceFav.cloneNode(true);
    const textInside = copiedDiv.querySelector(".text");
    textInside.textContent = city;
    dom.parentFavs.appendChild(copiedDiv);
    copiedDiv.classList.remove("hidden");
  });
}

// Display first FAV
function displayCurFav() {
  if (keeper.length > 0) {
    rawInput = curFav;
    getData();
  }
}
function deleteFav() {
  dom.input.value = uiCityName;
  dom.checkboxHeart.checked = false;
  isFav = false;
  keeper = keeper.filter((city) => city !== uiCityName);

  renderFavs();

  console.log(keeper);
  // Store
  store.set("keeper", JSON.stringify(keeper));

  start();
}

function addCityToFavs() {
  try {
    if (keeper.length > 8) {
      throw new Error();
    }
    keeper.push(uiCityName);
    // Store
    store.set("keeper", JSON.stringify(keeper));
    console.log("store");
  } catch (err) {
    renderError(
      "💥List is full; in order to add a city, delete one from the list💥"
    );
  }
}
//%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%

// Submit
dom.form.addEventListener("submit", function (event) {
  event.preventDefault();
  getInput();
  try {
    // start the process of retreiving data
    getData();
    resetInput();

    // Store
    // store.set("keeper", JSON.stringify(keeper));
  } catch (err) {
    renderError(`💥 Something went wrong!: ${err.message}💥`);
  }
});
// Hide checkbox when there's no active city
dom.form.addEventListener("click", hideCheckbox);

// Close Error Alert
dom.errorBox.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("fa-xmark")) {
    hideErrorBox();
  }
});
// Set Fav state + keeper manipulation
dom.checkboxHeart.addEventListener("change", function (event) {
  const target = event.target;
  if (target.checked === true) {
    isFav = true;
    addCityToFavs();
  }
  if (target.checked === false) {
    isFav = false;
    deleteFav();
    keeper = keeper.filter((city) => city !== uiCityName);
  }
  renderFavs();
});

// Favs: manipulation (delete/display)
dom.parentFavs.addEventListener("click", function (event) {
  const target = event.target;

  // Display
  if (target.classList.contains("text")) {
    curFav = target.textContent;

    dom.input.value = curFav;
    rawInput = curFav;

    getData();
    // Store curFav
    console.log(curFav);
    store.set("curFav", curFav);
  }

  // Delete
  if (target.classList.contains("fa-xmark")) {
    const targetText =
      target.parentElement.parentElement.querySelector(".text");
    uiCityName = targetText.textContent;
    deleteFav(uiCityName);
  }
});

// Navigation tabs
dom.tabs.addEventListener("click", function (event) {
  const target = event.target;

  // Guard clause
  if (!target) return;

  // Hide all
  dom.nowPage.classList.add("hidden");
  dom.detailsPage.classList.add("hidden");
  dom.forecastPage.classList.add("hidden");

  // Detect target page
  const pageID = target.getAttribute("data-target");
  const pageToOpen = dom[pageID];

  // Open the target page
  pageToOpen.classList.remove("hidden");
});

// Further upgrade:
// forecast
