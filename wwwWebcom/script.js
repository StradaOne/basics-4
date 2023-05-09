import {
  tabs,
  windows,
  form,
  input,
  serverUrl,
  apiKey,
} from "./modules/constants.mjs";
import { renderInfo } from "./modules/functions.mjs";

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    for (const tab of tabs) tab.classList.remove("active");
    for (const window of windows) window.classList.remove("active");
    tabs[index].classList.add("active");
    windows[index].classList.add("active");
  });
});

async function getData(apiKey,serverUrl) {
  try {
    const cityName = input.value;
    const response = await fetch(`${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (!response.ok) throw new Error("Такого города не существует");
    renderInfo(data)
  } catch (e) {
    if(e.message === 'Failed to fetch') {
      alert('Неправильный адрес URL')
    } else {
      alert(e.message);
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getData(apiKey,serverUrl);
});
