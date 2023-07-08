"use strict";

import dom from "./dom.mjs";
import store from "./store.mjs";
import err from "./err.mjs";
const { RunError, NotFoundError, ConnectionError } = err;

// Variables
let rawInput = null;
let uiCityName = null;
let curFav;

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
// const apiKey = "bee4bd6edc3ca09763c0dc89f33c92c4"; // spare apiKey
let keeper = new Set();
keeper = JSON.parse(store.get("keeper")) || [];

// Helper functions

function resetInput() {
  dom.input.value = "";
}

// clear Favs
function resetFavScr() {
  dom.parentFavs.innerHTML = "";
}

// Get user input
function getInput() {
  rawInput = dom.input.value;
}

function toggleCheckbox() {
  const isChecked = dom.checkboxHeart.checked;

  if (isChecked) {
    keeper.push(dom.nowPageCity.textContent);
    store.set("keeper", JSON.stringify([...keeper]));
  } else {
    console.log(keeper);
    deleteFav(dom.nowPageCity.textContent);

    // Delete from FAVs and save keeper
    keeper.delete(uiCityName);
    store.set("keeper", JSON.stringify([...keeper]));
  }
  renderFavs();
}

// Error
function renderError(errorMessage) {
  dom.errorMsg.textContent = errorMessage;
  dom.errorBox.classList.remove("hidden");
  dom.input.setAttribute("placeholder", "");
}

function hideErrorBox() {
  dom.errorBox.classList.add("hidden");
  dom.input.setAttribute("placeholder", "Search");
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

// Promise
async function getJSON(url) {
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new NotFoundError();
    }
    return response.json();
  } catch (err) {
    if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
      throw new ConnectionError();
    } else {
      throw new RunError(`💥 ${err}`);
    }
  }
}
//%%%%%%%%%%%%%%% Business Logics  %%%%%%%%%%%%%%%%%%%%%

// Process input (chained promises)
async function getData() {
  hideErrorBox();
  try {
    // Defining current favourite
    if (!curFav || curFav === null || curFav === undefined) {
      curFav = store.get("curFav") || rawInput || keeper[0] || "Shymkent";
    }

    if (!rawInput) {
      rawInput = curFav;
    }
    // Store
    store.set("curFav", curFav);

    const url = `${serverUrl}?q=${rawInput}&appid=${apiKey}&units=metric`;
    const data = await getJSON(url, "City not found");

    const {
      coord: { lon, lat },
      main: { temp, feels_like: feels },
      weather: [{ main: detWeather, icon }],
      sys: { sunrise, sunset },
      timezone: tZone,
      name: uiCityName,
    } = data;

    const detFeelsLike = tempFormatted(feels);
    const uiTemp = tempFormatted(temp);
    const detSunrise = convertTime(sunrise, tZone, true);
    const detSunset = convertTime(sunset, tZone, true);

    displayNow({
      uiCityName,
      uiTemp,
      icon,
    });

    displayDetails({
      detFeelsLike,
      detWeather,
      detSunrise,
      detSunset,
    });

    getDataForecast({
      lat,
      lon,
      tZone,
    });

    renderFavs();
    // Handle the errors
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : err;
    renderError(errorMessage);
  }
}
async function getDataForecast({ lat, lon, tZone }) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const data = await getJSON(forecastUrl, "Forecast not found");

    // Destructuring: 3h forecasts (7 boxes)
    const { list } = data;
    const arr = list.slice(0, 7);
    displayForecast(arr, tZone);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : err;
    renderError(errorMessage);
  }
}

// Display the data
function displayNow({ uiCityName, uiTemp, icon }) {
  // set the corresponding checknox
  dom.parentHeart.classList.remove("hidden");

  keeper.includes(uiCityName)
    ? (dom.checkboxHeart.checked = true)
    : (dom.checkboxHeart.checked = false);

  dom.nowPageCity.textContent = uiCityName;
  dom.detailsCity.textContent = uiCityName;
  dom.fcCity.textContent = uiCityName;

  const imgUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  dom.iconCloudImg.setAttribute("src", imgUrl);
  dom.nowPageTemp.textContent = `${uiTemp}℃`;
  dom.detailsTemp.textContent = `Temperature: ${uiTemp}℃`;
}

function displayDetails({ detFeelsLike, detWeather, detSunrise, detSunset }) {
  dom.detailsFeels.textContent = `Feels like: ${detFeelsLike}℃`;
  dom.detailsWeather.textContent = `Weather: ${detWeather}`;
  dom.detailsSunrise.textContent = `Sunrise: ${detSunrise}`;
  dom.detailsSunset.textContent = `Sunset: ${detSunset}`;
}

function displayForecast(arr, tZone) {
  // clear all
  dom.parentForecast.innerHTML = "";
  // run through the array with hourly weather
  arr.forEach((time) => {
    const {
      dt: curTime,
      main: { temp, feels_like: feels },
      weather: [{ main: fcPrecep, icon }],
    } = time;

    // assemble a list item
    const copiedLi = dom.sourceForecast.cloneNode(true);
    // add date
    const fcDateText = copiedLi.querySelector(".fc-date-text");
    const fcDate = convertTime(curTime, tZone, false);
    fcDateText.textContent = fcDate;
    const detDateText = document.querySelector("#details-date");
    detDateText.textContent = fcDate;
    // add time
    const fcTimeText = copiedLi.querySelector(".fc-time-text");
    const fcTime = convertTime(curTime, tZone, true);

    fcTimeText.textContent = fcTime;
    // add temp abd feels like
    const fcTempText = copiedLi.querySelector(".fc-temp-text");
    fcTempText.textContent = `Temperature: ${tempFormatted(temp)}℃`;
    const fcFeelsText = copiedLi.querySelector(".fc-feels-text");
    fcFeelsText.textContent = `Feels like: ${tempFormatted(feels)}℃`;
    // add Precipitation
    const fcPrecepText = copiedLi.querySelector(".fc-precep-text");
    fcPrecepText.textContent = fcPrecep;
    // add weather icon
    const fcIcon = copiedLi.querySelector(".below-right");
    const img = document.createElement("img");
    const imgUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    img.src = imgUrl;
    fcIcon.appendChild(img);
    img.classList.add("mini-icon");
    // nest the div and make it visible
    dom.parentForecast.appendChild(copiedLi);
    copiedLi.classList.remove("hidden");
  });
}

// %%%%%%%%%%%%%%%%%%%%%%% FAVs %%%%%%%%%%%%%%%%%%%%%%%%%%

// Render the Favourites list
function renderFavs() {
  resetFavScr();

  if (keeper.length === 0) return;
  keeper.forEach((city) => {
    // assemble a div
    const copiedDiv = dom.sourceFav.cloneNode(true);
    const textInside = copiedDiv.querySelector(".text");
    textInside.textContent = city;

    dom.parentFavs.appendChild(copiedDiv);
    copiedDiv.classList.remove("hidden");
    copiedDiv.classList.remove("source-fav-div");
    if (city === dom.nowPageCity.textContent) {
      copiedDiv.classList.add("cur-fav");
    }
  });
}

// Display first FAV
function displayCurFav() {
  rawInput = curFav;
  getData();
}

function deleteFav(uiCityName) {
  keeper = keeper.filter((city) => city !== uiCityName);
  if (dom.nowPageCity.textContent === uiCityName) {
    dom.checkboxHeart.checked = false;
  }
  if (keeper.length === 0) {
    curFav = uiCityName || "Shymkent";
  }

  // Store
  store.set("curFav", curFav);
  store.set("keeper", JSON.stringify(keeper));
  renderFavs();
}

//%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("DOMContentLoaded", getData);

// Submit
dom.form.addEventListener("submit", function (event) {
  event.preventDefault();
  getInput();

  try {
    // start the process of retreiving data
    getData();
    resetInput();
  } catch (err) {
    renderError(`💥 Something went wrong!: ${err.message}💥`);
  }
});

// Clear the input when it gets focus
dom.input.addEventListener("focus", function () {
  resetInput();
});

// Close Error Alert
dom.errorBox.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("fa-xmark")) {
    hideErrorBox();
  }
});

// Heart toggle
dom.checkboxHeart.addEventListener("change", toggleCheckbox);

// Favs: manipulation (delete/display)
dom.parentFavs.addEventListener("click", function (event) {
  const target = event.target;

  // Display
  if (
    target.classList.contains("text") ||
    target.classList.contains("fav-city")
  ) {
    curFav = target.closest(".fav-city")?.querySelector(".text").textContent;
    dom.input.textContent = curFav;
    displayCurFav();

    // Store curFav
    store.set("curFav", curFav);
    dom.input.value = curFav;
    // rawInput = curFav;

    getData();
    renderFavs();
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

// Further upgrade and fixes:
