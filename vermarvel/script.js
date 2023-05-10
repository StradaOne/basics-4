"use strict";

import dom from "./dom.js";

// Variables
let rawInput = null;
let uiCityName = null;
let isFav;
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

function updateIsFav() {
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
  dom.errorBox.textContent = msg;
  dom.errorBox.classList.remove("hidden");
}

function hideErrorBox() {
  dom.errorBox.classList.add("hidden");
}

function convertTime(time) {
  var date = new Date(time * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);

  return formattedTime;
}

//%%%%%%%%%%%%%%% Business Logics  %%%%%%%%%%%%%%%%%%%%%

// Get user input
function getInput() {
  rawInput = dom.input.value;
}

// Process input (async/await)
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
      // console.log(Math.round(data.main[0].feels_like - 273.15));
      const detFeelsLike = Math.round(data.main.feels_like - 273.15);
      const detWeather = data.weather[0].main;

      const detSunrise = convertTime(data.sys.sunrise);

      const detSunset = convertTime(data.sys.sunset);
      // console.log(data.sys[0].sunrise);
      // console.log(data.sys[0].sunset);
      const icon = data.weather[0].icon;
      uiCityName = data.name;
      const uiTemp = Math.round(data.main.temp - 273.15);
      displayData(uiCityName, uiTemp, icon);
      displayDetails(detFeelsLike, detWeather, detSunrise, detSunset);
      // Handle the errors
    })
    .catch((err) => {
      console.error(err);
      renderError(`💥 Error: ${err.message}`);
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
  updateIsFav();
  displayCheckbox();
}

function displayDetails(feelsLike, weather, sunrise, sunset) {
  dom.detailsFeels.textContent = `Feels like: ${feelsLike}℃`;
  dom.detailsWeather.textContent = `Weather: ${weather}`;
  dom.detailsSunrise.textContent = `Sunrise: ${sunrise}`;
  dom.detailsSunset.textContent = `Sunset: ${sunset}`;
}

// Render the Favourites list
function renderFavs() {
  resetFavScr();

  // if (keeper.length === 0) return;

  keeper.forEach((city) => {
    // assemble a div
    const copiedDiv = dom.sourceFav.cloneNode(true);
    const textInside = copiedDiv.querySelector(".text");
    textInside.textContent = city;
    dom.parentFavs.appendChild(copiedDiv);
    copiedDiv.classList.remove("hidden");
  });
}

function deleteFav() {
  console.log("deleteFav:", uiCityName);
  keeper = keeper.filter((city) => city !== uiCityName);
  renderFavs();
}

function addCityToFavs() {
  try {
    if (keeper.length > 8) {
      throw new Error();
    }
    keeper.push(uiCityName);
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
  } catch (err) {
    renderError(`💥 Something went wrong!: ${err.message}💥`);
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
    addCityToFavs();
  }
  if (target.checked === false) {
    isFav = false;
    keeper = keeper.filter((city) => city !== uiCityName);
  }
  renderFavs();
});

// Favs: manipulation (delete/display)
dom.parentFavs.addEventListener("click", function (event) {
  const target = event.target;

  // Display
  if (target.classList.contains("text")) {
    rawInput = target.textContent;

    dom.input.value = rawInput;
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

  // Open the selected page
  pageToOpen.classList.remove("hidden");
});
