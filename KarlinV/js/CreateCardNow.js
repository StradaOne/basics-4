import { createEl, convertKelvinToCelsius, addCityToList, removeCityFromList } from "./config.js";
import { renderCityList } from "./createLocationPoints.js";
import { arrCityList } from "./constants.js";
import { storage } from "./saveLocalStorage.js";

export const createCardNow = (data) => {
  const cardNow = createEl("div");
  const cardNowTemperature = createEl("div");
  const cardNowIcon = createEl("div");
  const cardNowContainerSity = createEl("div");
  const cardNowSityName = createEl("div");
  const cardNowSityLike = createEl("div");

  cardNow.classList.add("card", "card__now");
  cardNow.setAttribute("id", "card-now");
  cardNowTemperature.classList.add("card__now-temperature");
  cardNowIcon.classList.add("card__now-icon");
  cardNowContainerSity.classList.add("card__now-sity");
  cardNowSityName.classList.add("card__now-sity-name");
  cardNowSityLike.classList.add("card__now-sity-like");
  cardNowSityLike.dataset.like = arrCityList.indexOf(data.city.name) === -1 ? false : true;

  if (cardNowSityLike.dataset.like === "true") {
    cardNowSityLike.style.backgroundImage = "url(./img/shape_true.svg)";
  }

  cardNowTemperature.textContent = `${convertKelvinToCelsius(data.list[0].main.temp)}°`;
  cardNowSityName.textContent = `${data.city.name}`;

  cardNowIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png)`;
  cardNowIcon.setAttribute("title", data.list[0].weather[0].description);

  cardNow.addEventListener("click", (event) => {
    if (event.target.classList.value === "card__now-sity-like") {
      if (cardNowSityLike.dataset.like === "false") {
        cardNowSityLike.dataset.like = true;
        cardNowSityLike.style.backgroundImage = "url(./img/shape_true.svg)";

        storage.setFavoriteCities(addCityToList({ array: arrCityList, element: data.city.name }));
        renderCityList();
      } else {
        cardNowSityLike.dataset.like = false;
        cardNowSityLike.style.backgroundImage = "url(./img/Shape.svg)";

        storage.setFavoriteCities(removeCityFromList({ array: arrCityList, element: data.city.name }));
        renderCityList();
      }
    }
  });

  cardNowContainerSity.append(cardNowSityName);
  cardNowContainerSity.append(cardNowSityLike);
  cardNow.append(cardNowTemperature);
  cardNow.append(cardNowIcon);
  cardNow.append(cardNowContainerSity);

  return cardNow;
};
