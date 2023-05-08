// Exporting module

// *****Variables********
const getDOM = (s) => document.querySelector(s);
// Elements
const form = getDOM(".form");
const input = getDOM("#search-input");
// Now Page
const nowPageTemp = getDOM(".ui-temp");
const nowPageCloud = getDOM(".cloud");
// Tabs
const tabsParent = getDOM(".lower");
const tabNow = getDOM(".now");
const tabDetails = getDOM(".details");
const tabForecast = getDOM(".forecast");

const errorBox = getDOM(".error-box");
const nowPageCity = getDOM(".ui-city");
const iconCloudImg = getDOM(".icon-cloud-img");

const sourceHeartEmpty = getDOM(".source-heart-empty");
const sourceHeartFull = getDOM(".source-heart-full");
const parentHeart = getDOM(".heart");
const checkboxHeart = getDOM(".checkbox");
const sourceFav = getDOM(".source-fav-div");
const parentFavs = getDOM(".all-favs");

// Iterables

// Helper functions&variables

export default {
  input,
  nowPageCloud,
  nowPageTemp,
  tabsParent,
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
};
