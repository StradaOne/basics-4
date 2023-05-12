import { form, cityNameInputValue } from "./constants.js";
import { arrCityList } from "./constants.js";
import { getDataWeather } from "./weatherForecastFetcher.js";
import { renderCityList } from "./createLocationPoints.js";
import { render } from "./mainRender.js";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  render(await getDataWeather(cityNameInputValue.value));

  cityNameInputValue.setAttribute("placeholder", cityNameInputValue.value);
  cityNameInputValue.value = "";
});

// start
render(await getDataWeather(arrCityList.length === 0 ? "Amur" : arrCityList[0]));
cityNameInputValue.setAttribute("placeholder", arrCityList.length === 0 ? "Amur" : arrCityList[0]);
renderCityList();
