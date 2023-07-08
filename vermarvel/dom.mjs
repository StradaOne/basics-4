// Exporting module: UI (DOM selectors)

const getDOM = (s) => document.querySelector(s);
// *****Variables********
const dom = {
  // Elements
  form: getDOM(".form"),
  input: getDOM("#search-input"),

  // Now Page
  nowPageTemp: getDOM(".ui-temp"),
  nowPageCloud: getDOM(".cloud"),

  // Tabs
  tabs: getDOM(".lower"),
  tabNow: getDOM(".now"),
  tabDetails: getDOM(".details"),
  tabForecast: getDOM(".forecast"),
  // Error
  errorBox: getDOM(".error-box"),
  errorMsg: getDOM(".err-msg"),
  errorDelete: getDOM("err-delete"),

  // Pages
  nowPage: getDOM(".now-page"),
  detailsPage: getDOM(".details-page"),
  forecastPage: getDOM(".forecast-page"),

  // Now page
  nowPageCity: getDOM(".ui-city"),
  iconCloudImg: getDOM(".icon-cloud-img"),
  sourceHeartEmpty: getDOM(".source-heart-empty"),
  sourceHeartFull: getDOM(".source-heart-full"),
  parentHeart: getDOM(".heart"),
  checkboxHeart: getDOM(".checkbox"),
  sourceFav: getDOM(".source-fav-div"),
  parentFavs: getDOM(".all-favs"),
  btnDelete: getDOM(".delete"),
  // Details Page
  detailsCity: getDOM("#details-city"),
  detailsTemp: getDOM("#temperature"),
  detailsFeels: getDOM("#feels"),
  detailsWeather: getDOM("#weather"),
  detailsSunrise: getDOM("#sunrise"),
  detailsSunset: getDOM("#sunset"),

  // Forecast
  fcCity: getDOM("#fc-city"),
  sourceForecast: getDOM(".source-forecast"),
  fcDate: getDOM(".above-left"),
  fcTemp: getDOM(".mid-left"),
  fcFeels: getDOM(".below-left"),
  fcTime: getDOM(".above-right"),
  fcPrecep: getDOM(".mid-right"),
  fcIcon: getDOM(".below-right"),
  parentForecast: getDOM(".forecast-hourly-container"),
};

export { dom };
