import { UI_ELEMENTS } from "./ui.js";

function loadUI(temperature, name, icon) {
  UI_ELEMENTS.TEMP.textContent = temperature + "°";
  UI_ELEMENTS.CURRENT_CITY.textContent = name;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  UI_ELEMENTS.CURRENT_ICON.setAttribute("src", iconUrl);
}

export { loadUI };
