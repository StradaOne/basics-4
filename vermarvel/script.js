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
  if (keeper.includes(uiCityName)) {
    isFav = true;
  } else if (!keeper.includes(uiCityName)) {
    isFav = false;
  }
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
// Error
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
      const icon = data.weather[0].icon;
      uiCityName = data.name;
      const uiTemp = Math.round(data.main.temp - 273.15);
      return displayData(uiCityName, uiTemp, icon);
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

  const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  dom.iconCloudImg.setAttribute("src", imgUrl);
  dom.nowPageTemp.textContent = `${temp}℃`;
  updateIsFav();
  displayCheckbox();
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

dom.parentFavs.addEventListener("click", function (event) {
  const target = event.target;
  // console.log(target.textContent);

  if (target.classList.contains("text")) {
    const selectedCity = target.textContent;

    uiCityName = selectedCity;
    deleteFav(uiCityName);
  }
});

// Navigation tabs
dom.tabs.addEventListener("click", function (event) {
  const target = event.target.closest(".now, .details, .forecast");
  // detect the tab
  const targetClass = ["now", "details", "forecast"].find((cl) =>
    target.classList.contains(cl)
  );
  // Hide all
  dom.nowPage.classList.add("hidden");
  dom.detailsPage.classList.add("hidden");
  dom.forecastPage.classList.add("hidden");

  // open the clicked page
  switch (targetClass) {
    case "now":
      dom.nowPage.classList.remove("hidden");
      break;
    case "details":
      dom.detailsPage.classList.remove("hidden");
      break;
    case "forecast":
      dom.forecastPage.classList.remove("hidden");
      break;
  }
});

// Further amendments:
