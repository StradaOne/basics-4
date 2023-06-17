"use strict";

import { dom } from "./dom.mjs";
import store from "./store.mjs";

// States
let rawInput = null;
let uiCityName = null;
let curFav;
let favourites = JSON.parse(store.get("favourites")) || [];

// Api
const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
// const apiKey = "bee4bd6edc3ca09763c0dc89f33c92c4"; // spare apiKey

// Helper functions

function resetInput() {
  dom.input.value = "";
}

function resetFavScr() {
  dom.parentFavs.innerHTML = "";
}

function getInput() {
  rawInput = dom.input.value;
}

function toggleCheckbox() {
  const isChecked = dom.checkboxHeart.checked;

  if (isChecked) {
    if (!favourites.includes(dom.nowPageCity.textContent)) {
      // Add city to FAVS
      favourites.push(dom.nowPageCity.textContent);
      store.set("favourites", JSON.stringify(favourites));
    }
  } else {
    deleteFav(dom.nowPageCity.textContent);

    // Delete from FAVs and save favourites
    favourites = favourites.filter((city) => city !== uiCityName);
    store.set("favourites", JSON.stringify(favourites));
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

// Data processing
function convertTime(time, tZone, type) {
  const msPerSecond = 1000;
  const date = new Date((time + tZone) * msPerSecond);

  if (type === "time") {
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);
    const formattedTime = `${hours} ":" ${minutes}`;
    return formattedTime;
  }

  if (type === "date") {
    const options = { day: "numeric", month: "short" };
    let formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }
}

function tempFormatted(data) {
  return Math.round(data);
}

// Promise
function getJSON(url, msg) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${msg} ${response.status}`);
    return response.json();
  });
}
//%%%%%%%%%%%%%%% Business Logics  %%%%%%%%%%%%%%%%%%%%%

// Process input (chained promises)
function getData() {
  // Defining current favourite
  if (!curFav || curFav === null || curFav === undefined) {
    curFav = store.get("curFav") || rawInput || favourites[0] || "Shymkent";
  }

  if (!rawInput) {
    rawInput = curFav;
  }
  // Store
  store.set("curFav", curFav);

  const url = `${serverUrl}?q=${rawInput}&appid=${apiKey}&units=metric`;
  getJSON(url, "City not found")
    .then((data) => {
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
      const detSunrise = convertTime(sunrise, tZone, "time");
      const detSunset = convertTime(sunset, tZone, "time");

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

function getDataForecast({ lat, lon, tZone }) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  getJSON(forecastUrl, "Forecast not found")
    .then((data) => {
      // Destructuring: 3h forecasts (7 boxes)
      const { list } = data;
      const arr = list.slice(0, 7);
      displayForecast(arr, tZone);

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
function displayNow({ uiCityName, uiTemp, icon }) {
  // set the corresponding checknox
  dom.parentHeart.classList.remove("hidden");

  favourites.includes(uiCityName)
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
    const cloneDiv = dom.sourceForecast.cloneNode(true);
    // add date
    const fcDateText = cloneDiv.querySelector(".fc-date-text");
    const fcDate = convertTime(curTime, tZone, "date");
    fcDateText.textContent = fcDate;
    const detDateText = document.querySelector("#details-date");
    detDateText.textContent = fcDate;
    // add time
    const fcTimeText = cloneDiv.querySelector(".fc-time-text");
    const fcTime = convertTime(curTime, tZone, "time");

    fcTimeText.textContent = fcTime;
    // add temp abd feels like
    const fcTempText = cloneDiv.querySelector(".fc-temp-text");
    fcTempText.textContent = `Temperature: ${tempFormatted(temp)}℃`;
    const fcFeelsText = cloneDiv.querySelector(".fc-feels-text");
    fcFeelsText.textContent = `Feels like: ${tempFormatted(feels)}℃`;
    // add Precipitation
    const fcPrecepText = cloneDiv.querySelector(".fc-precep-text");
    fcPrecepText.textContent = fcPrecep;
    // add weather icon
    const fcIcon = cloneDiv.querySelector(".below-right");
    const img = document.createElement("img");
    const imgUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    img.src = imgUrl;
    fcIcon.appendChild(img);
    img.classList.add("mini-icon");

    dom.parentForecast.appendChild(cloneDiv);
    cloneDiv.classList.remove("hidden");
  });
}
function navigateTabs(event) {
  const target = event.target;

  if (!target) return;

  // Hide all
  dom.nowPage.classList.add("hidden");
  dom.detailsPage.classList.add("hidden");
  dom.forecastPage.classList.add("hidden");

  // Detect target page
  const pageID = target.getAttribute("data-target");
  const pageToOpen = dom[pageID];
  pageToOpen.classList.remove("hidden");
}
// %%%%%%%%%%%%%%%%%%%%%%% FAVs %%%%%%%%%%%%%%%%%%%%%%%%%%

// Render the Favourites list
function renderFavs() {
  resetFavScr();

  if (favourites.length === 0) return;
  favourites.forEach((city) => {
    // assemble a div
    const divClone = dom.sourceFav.cloneNode(true);
    const textInside = divClone.querySelector(".text");
    textInside.textContent = city;

    dom.parentFavs.appendChild(divClone);
    divClone.classList.remove("hidden");
    divClone.classList.remove("source-fav-div");
    if (city === dom.nowPageCity.textContent) {
      divClone.classList.add("cur-fav");
    }
  });
}

// Display first FAV
function displayCurFav() {
  rawInput = curFav;
  getData();
}

function deleteFav(uiCityName) {
  favourites = favourites.filter((city) => city !== uiCityName);
  if (dom.nowPageCity.textContent === uiCityName) {
    dom.checkboxHeart.checked = false;
  }
  if (favourites.length === 0) {
    curFav = uiCityName || "Shymkent";
  }

  // Store
  store.set("curFav", curFav);
  store.set("favourites", JSON.stringify(favourites));
  renderFavs();
}

function manipulateFavs(event) {
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
}
//%%%%%%%%%%%%%%%%%  Listeners  %%%%%%%%%%%%%%%%%%%%%%%%

document.addEventListener("DOMContentLoaded", getData);

// Submit
dom.form.addEventListener("submit", function (event) {
  event.preventDefault();
  getInput();

  try {
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
dom.errorDelete.addEventListener("click", hideErrorBox);

// Heart toggle
dom.checkboxHeart.addEventListener("change", toggleCheckbox);

// Favs: manipulation (delete/display)
dom.parentFavs.addEventListener("click", (event) => manipulateFavs(event));

// Navigation tabs
dom.tabs.addEventListener("click", (event) => navigateTabs(event));

// Further upgrade and fixes:
