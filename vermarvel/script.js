"use strict";

import dom from "./dom.mjs";
import store from "./store.mjs";

// Variables
let rawInput = null;
let uiCityName = null;
let isFav;
let curFav = store.get("curFav") || "Shymkent";

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f&units=metric";

let keeper = JSON.parse(store.get("keeper")) || [];

// Helper functions

function resetInput() {
  dom.input.value = "";
  // isFav = null;
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
  dom.input.setAttribute("placeholder", "");
}

function hideErrorBox() {
  dom.errorBox.classList.add("hidden");
  dom.input.setAttribute("placeholder", "Search");
}

// Starter algorithm
function start() {
  renderFavs();
  displayCurFav();
  console.log(curFav);
}
// Data processing
function convertTime(time, tZone, boolean) {
  const date = new Date((time + tZone) * 1000);

  if (boolean === true) {
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    const formattedTime = hours + ":" + minutes;
    return formattedTime;
  }

  if (boolean === false) {
    const options = { day: "numeric", month: "short" };
    let formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
}

function tempFormatted(data) {
  return Math.round(data);
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
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      const detFeelsLike = tempFormatted(data.main.feels_like);
      const detWeather = data.weather[0].main;
      // time gap with UTC

      const tZone = data.timezone;
      const detSunrise = convertTime(data.sys.sunrise, tZone, true);
      const detSunset = convertTime(data.sys.sunset, tZone, true);

      const icon = data.weather[0].icon;
      uiCityName = data.name;
      const uiTemp = tempFormatted(data.main.temp);

      displayData(uiCityName, uiTemp, icon);
      displayDetails(detFeelsLike, detWeather, detSunrise, detSunset, tZone);

      getDataForecast(lat, lon, tZone);
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

function getDataForecast(lat, lon, tZone) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${apiKey}`;

  fetch(forecastUrl)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Forecast not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      const arr = [
        data.hourly[0],
        data.hourly[1],
        data.hourly[2],
        data.hourly[3],
      ];
      displayForecast(arr, data.timezone_offset);

      // (arr = data.hourly[0].dt) convertTime(data.hourly[0].dt, tZone);

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

function displayForecast(arr, tZone) {
  // clear all

  dom.parentForecast.innerHTML = "";
  // run through the array with hourly weather
  arr.forEach((time) => {
    // assemble a list item
    const copiedLi = dom.sourceForecast.cloneNode(true);
    // add date
    const fcDateText = copiedLi.querySelector(".fc-date-text");
    const fcDate = convertTime(time.dt, tZone, false);
    fcDateText.textContent = fcDate;

    // add time
    const fcTimeText = copiedLi.querySelector(".fc-time-text");
    const fcTime = convertTime(time.dt, tZone, true);

    fcTimeText.textContent = fcTime;
    // add temp
    const fcTempText = copiedLi.querySelector(".fc-temp-text");
    const fcTemp = tempFormatted(time.temp);
    fcTempText.textContent = `Temperature: ${fcTemp}℃`;
    // add Feels like
    const fcFeelsText = copiedLi.querySelector(".fc-feels-text");
    const fcFeels = tempFormatted(time.feels_like);
    fcFeelsText.textContent = `Feels like: ${fcFeels}℃`;
    // add Precipitation/weather
    const fcPrecepText = copiedLi.querySelector(".fc-precep-text");
    fcPrecepText.textContent = time.weather[0].main;
    // add icon
    const fcIcon = copiedLi.querySelector(".below-right");
    const icon = time.weather[0].icon; // icon

    const img = document.createElement("img");
    const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    img.src = imgUrl;
    fcIcon.appendChild(img);
    img.classList.add("mini-icon");

    dom.parentForecast.appendChild(copiedLi);
    copiedLi.classList.remove("hidden");
  });
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
    console.log("rawInp", rawInput);
    console.log("keeper", keeper);
    rawInput = curFav || keeper[0] || "Shymkent";
    getData();
  } else {
    return;
  }
}
function deleteFav() {
  dom.input.value = uiCityName;
  dom.checkboxHeart.checked = false;
  isFav = false;
  keeper = keeper.filter((city) => city !== uiCityName);
  if (keeper.length === 0) {
    curFav = null;
  }
  // Store
  store.set("curFav", JSON.stringify(curFav));
  store.set("keeper", JSON.stringify(keeper));
  renderFavs();

  console.log(keeper);

  // start();
}

function addCityToFavs() {
  try {
    if (keeper.length > 8) {
      throw new Error();
    }
    keeper.push(uiCityName);
    // Store
    store.set("keeper", JSON.stringify(keeper));
    console.log("stored");
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
    // Store
    store.set("keeper", JSON.stringify(keeper));
  }
  renderFavs();
});

// Favs: manipulation (delete/display)
dom.parentFavs.addEventListener("click", function (event) {
  const target = event.target;

  // Display
  if (target.classList.contains("text")) {
    curFav = target.textContent;
    // Store curFav
    store.set("curFav", curFav);
    dom.input.value = curFav;
    rawInput = curFav;

    getData();
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

// current favourite city in list highlighted

// when user is on fc or det - search another town not possible - fix
