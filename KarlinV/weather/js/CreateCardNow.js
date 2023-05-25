import { createEl, convertKelvinToCelsius } from "./config.js";
import { renderCityList } from "./createLocationPoints.js";
import { arrCityList, setArrCityList } from "./constants.js";
import { storage } from "./saveLocalStorage.js";

const workingWithAnArray = (option) => {
  const setCities = new Set(option.array);

  if (option.action === "has") {
    return setCities[option.action](option.element);
  }

  setCities[option.action](option.element);

  setArrCityList([...setCities]);

  return [...setCities];
};

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

        const newArrCityList = workingWithAnArray({ array: arrCityList, action: "add", element: data.city.name });

        storage.setFavoriteCities(newArrCityList);
        renderCityList();
      } else {
        cardNowSityLike.dataset.like = false;
        cardNowSityLike.style.backgroundImage = "url(./img/Shape.svg)";

        const newArrCityList = workingWithAnArray({ array: arrCityList, action: "delete", element: data.city.name });

        storage.setFavoriteCities(newArrCityList);
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
