import { tabs, tabsBlocks, weatherElems } from "./ui.js";

function tabsBtnsHandler(e) {
    if (e.target.classList.contains('tab')) {
        const tabIdx = Array.from(tabs).indexOf(e.target);
        const tabsSort = Array.from(tabs).filter(tab => tab !== tabs[tabIdx]);

        Array.from(tabsSort).forEach(tab => tab.classList.remove('on-tab'));
        tabs[tabIdx].classList.add('on-tab');

        tabsBlocks.forEach(item => item.classList.add('hide'));
        tabsBlocks[tabIdx].classList.remove('hide');
    };
};

function timeConverter(unixTime) {
    const time = new Date(unixTime * 1000);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `${hours}:${minutes}`;
};

function tempConverter(kel) {
    return Math.floor(kel - 273);
};

async function getData(url) {
    try {
        const data = await fetch(url)
            .then(res => res.json())
        if ((data.message)) {
            throw new Error('Название города введено неправильно');
        } else {
            return data;
        };
    } catch (err) {
        alert(err)
    }
};

async function renderData(data) {
    const weatherName = data.weather[0].main;
    const temp = tempConverter(data.main.temp);
    const name = data.name;
    const feelsLike = tempConverter(data.main.feels_like);
    const sunrise = timeConverter(data.sys.sunrise);
    const sunset = timeConverter(data.sys.sunset);
    const idIcon = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${idIcon}@2x.png`;
  
    weatherElems.now.temp.textContent = temp;
    weatherElems.now.name.textContent = name;
    weatherElems.now.icon.src = iconSrc;

    weatherElems.details.name.textContent = name;
    weatherElems.details.temp.textContent = temp;
    weatherElems.details.feelsLike.textContent = feelsLike;
    weatherElems.details.weatherName.textContent = weatherName;
    weatherElems.details.sunrise.textContent = sunrise;
    weatherElems.details.sunset.textContent = sunset;
  };

export { tabsBtnsHandler, renderData, getData };