// Exporting module: UI (DOM selectors)

// *****Variables********
const getDOM = (s) => document.querySelector(s);
// Elements
const form = getDOM(".form");
const input = getDOM("#search-input");
// Now Page
const nowPageTemp = getDOM(".ui-temp");
const nowPageCloud = getDOM(".cloud");
// Tabs
const tabs = getDOM(".lower");
const tabNow = getDOM(".now");
const tabDetails = getDOM(".details");
const tabForecast = getDOM(".forecast");
// Error
const errorBox = getDOM(".error-box");
const errorMsg = getDOM(".err-msg");
const errorDelete = getDOM("err-delete");

// Pages
const nowPage = getDOM(".now-page");
const detailsPage = getDOM(".details-page");
const forecastPage = getDOM(".forecast-page");

// Now page
const nowPageCity = getDOM(".ui-city");
const iconCloudImg = getDOM(".icon-cloud-img");
const sourceHeartEmpty = getDOM(".source-heart-empty");
const sourceHeartFull = getDOM(".source-heart-full");
const parentHeart = getDOM(".heart");
const checkboxHeart = getDOM(".checkbox");
const sourceFav = getDOM(".source-fav-div");
const parentFavs = getDOM(".all-favs");
const btnDelete = getDOM(".delete");

// Details Page
const detailsCity = getDOM("#details-city");
const detailsTemp = getDOM("#temperature");
const detailsFeels = getDOM("#feels");
const detailsWeather = getDOM("#weather");
const detailsSunrise = getDOM("#sunrise");
const detailsSunset = getDOM("#sunset");

// Forecast
const fcCity = getDOM("#fc-city");

export default {
  input,
  nowPageCloud,
  nowPageTemp,
  tabs,
  tabNow,
  tabDetails,
  tabForecast,
  form,
  errorBox,
  nowPageCity,
  iconCloudImg,
  sourceHeartEmpty,
  sourceHeartFull,
  parentHeart,
  checkboxHeart,
  sourceFav,
  parentFavs,
  nowPage,
  forecastPage,
  detailsPage,
  btnDelete,
  detailsCity,
  detailsTemp,
  detailsFeels,
  detailsWeather,
  detailsSunrise,
  detailsSunset,
  fcCity,
  errorMsg,
  errorDelete,
};
