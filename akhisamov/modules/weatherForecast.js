import {elements} from "./elements.js";
import {convertTime, convertDate} from "./converAll.js";


export async function getForecastRequest(name) {
    const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const urlForecast = `${serverUrlForecast}?q=${name}&appid=${apiKey}`;
    try {
        let responseForecast = await fetch(urlForecast);
        let weatherForecast = await responseForecast.json();
        let list = weatherForecast.list;
        let spliceList = list.splice(0, 6);
        elements.countryTitle.textContent = weatherForecast.city.name;
        elements.content.innerHTML = '';
        spliceList.forEach(function(item) {
            createForecastEl(item);
        })
    } catch(err) {
        alert(err);
    }
}
    

export function createForecastEl(item) {
    let forecastBlock = document.createElement('div');
    forecastBlock.className = 'tab-3__block';
    
    let forecastData = document.createElement('div');
    forecastData.className = 'tab-3__data';
    let forecastDate = document.createElement('div');
    forecastDate.className = 'tab-3__date';
    forecastDate.textContent = `${convertDate(new Date(item.dt))}`;
    let forecastTime = document.createElement('div');
    forecastTime.className = 'tab-3__time';
    forecastTime.textContent = `${convertTime(new Date(item.dt))}`;

    forecastData.prepend(forecastDate, forecastTime);

    let forecastWeaather = document.createElement('div');
    forecastWeaather.className = 'tab-3__weaather';
    
    let forecastBlock1 = document.createElement('div');
    forecastBlock1.className = 'block-1';
    let forecastTemp = document.createElement('div');
    forecastTemp.className = 'tm';
    forecastTemp.textContent = `Temperature: ${Math.ceil(item.main.temp - 273.15)}°`;
    let forecastFeel = document.createElement('div');
    forecastFeel.className = 'like';
    forecastFeel.textContent = `Feels like: ${Math.ceil(item.main.feels_like - 273.15)}°`;
    forecastBlock1.prepend(forecastTemp, forecastFeel);

    let forecastBlock2 = document.createElement('div');
    forecastBlock2.className = 'block-2';
    let forecastDest = document.createElement('div');
    forecastDest.className = 'desc';
    forecastDest.textContent = `${item.weather[0].description}`;
    let forecastPict = document.createElement('img');
    forecastPict.className = 'img__forecast';
    forecastPict.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    forecastBlock2.prepend(forecastDest, forecastPict);

    forecastWeaather.prepend(forecastBlock1, forecastBlock2);
    
    forecastBlock.prepend(forecastData, forecastWeaather);
    elements.content.append(forecastBlock);
}

