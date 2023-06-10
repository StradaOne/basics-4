import { weatherCards } from "./config.js";
import { createCardNow } from "./CreateCardNow.js";
import { createCardDetails } from "./CreateCardDetails.js";
import { createCardForecast } from "./CreateCardForecast.js";

export const render = (data) => {
  weatherCards.innerHTML = "";

  weatherCards.append(createCardNow(data));
  weatherCards.append(createCardDetails(data));
  weatherCards.append(createCardForecast(data));
};
