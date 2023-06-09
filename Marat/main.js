import { calculations, fetchLikes } from "./fetch.js";
const button_now = document.querySelector(".now");
const button_details = document.querySelector(".details");
const button_forecast = document.querySelector(".forecast");
const left_content_temperature = document.querySelector(".left_content_temperature");
const left_content_temperature2 = document.querySelector(".left_content_temperature2");
const left_content_temperature3 = document.querySelector(".left_content_temperature3");
const right_bottom_content = document.querySelector(".right_bottom_content");
const serdce = document.querySelector(".serdce");
const list = new Set();


if (localStorage.getItem('right_bottom_content')) {
    right_bottom_content.innerHTML = localStorage.getItem('right_bottom_content');
}


left_content_temperature.style.display = "";
left_content_temperature2.style.display = "none";
left_content_temperature3.style.display = "none";
console.log(right_bottom_content);


button_now.addEventListener("click", function () {
    left_content_temperature.style.display = "";
    left_content_temperature2.style.display = "none";
    left_content_temperature3.style.display = "none";
    localStorage.setItem("displayType", "now");
})
button_details.addEventListener("click", function () {
    left_content_temperature.style.display = "none";
    left_content_temperature2.style.display = "";
    left_content_temperature3.style.display = "none";
    localStorage.setItem("displayType", "details");
})
button_forecast.addEventListener("click", function () {
    left_content_temperature.style.display = "none";
    left_content_temperature2.style.display = "none";
    left_content_temperature3.style.display = "";
    localStorage.setItem("displayType", "forecast");
});
function button() {
    const displayType = localStorage.getItem("displayType");
    if (displayType === "now") {
        left_content_temperature.style.display = "";
        left_content_temperature2.style.display = "none";
        left_content_temperature3.style.display = "none";
    } else if (displayType === "details") {
        left_content_temperature.style.display = "none";
        left_content_temperature2.style.display = "";
        left_content_temperature3.style.display = "none";
    } else if (displayType === "forecast") {
        left_content_temperature.style.display = "none";
        left_content_temperature2.style.display = "none";
        left_content_temperature3.style.display = "";
    }
}
window.addEventListener("load", button);



const city = document.querySelector(".input");
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';
const form = document.querySelector(".head_content");
const Aktobe = document.querySelector(".Aktobe");
const left_content_temperature2_Aktobe = document.querySelector(".left_content_temperature2_Aktobe");
const Details_Temperature = document.querySelector(".Details_Temperature");
const Details_Feels = document.querySelector(".Details_Feels");
const Details_Weather = document.querySelector(".Details_Weather");
const Details_Sunrise = document.querySelector(".Details_Sunrise");
const Details_Sunset = document.querySelector(".Details_Sunset");
const text_temperature = document.querySelector(".text_temperature");

async function createElement2(city) {
    let array = await calculations();
    console.log(array);

    Aktobe.textContent = city.value;
    left_content_temperature2_Aktobe.innerHTML = city.value;
    text_temperature.innerHTML = array[0] + "&#176";
    Details_Temperature.innerHTML = "Temperature: " + array[0] + "&#176";
    Details_Feels.innerHTML = "Feels like: " + array[1] + "&#176";
    Details_Weather.innerHTML = "Weather: " + array[2];
    Details_Sunrise.innerHTML = "Sunrise: " + array[3];
    Details_Sunset.innerHTML = "Sunset: " + array[4];
}
function getItem(key){
    const cookies = document.cookie.split(";")
                .map(cookie => cookie.split("="))
                .reduce((acc, [key, value]) => ({...acc,
                    [key.trim()]: value
                }), {});
    console.log("cookies = " + cookies[key]);
    return cookies[key];
}
function setItem (key, value) {
    document.cookie = `${key}=${encodeURIComponent(value)}; max-age=3600; path=/`;
}

async function addLocation(e) {
    e.preventDefault();
    console.log(city.value);
    createElement2(city);
}

function findIndex(name) {
    return list.has(name);
}

function deleteLocation(name) {
    const Index = findIndex(name);
    console.log(Index);
    if (Index === false) {
        console.error("Такого города нет в списке");
        return;
    }
    else {
        list.delete(name);
        console.log("delete = " + name);
        setItem('loc', JSON.stringify([...list]));
    }

    render();
    return;
}
function addedLocation() {
    const name = Aktobe.textContent;
    console.log("name" + name);
    list.add(name);
    let setString = '';
    setString += name + ' ';


    console.log("Set = " + setString);
    setItem('loc', JSON.stringify([...list]));
}

const ul = document.createElement("ul");
function createElement(cityName) {
    const li = document.createElement("li");
    const location = document.createElement("p");
    const x = document.createElement("p");
    // console.log("cityName = " +  cityName);
    location.innerHTML = cityName;
    x.innerHTML = "&#215";
    li.classList.add("liCity");
    location.classList.add("p");
    x.classList.add("p2");

    li.appendChild(location);
    li.appendChild(x);
    console.log(li);
    ul.appendChild(li);
    right_bottom_content.appendChild(ul);

    location.addEventListener("click", Likes);

    console.log(location.textContent)
    x.addEventListener("click", (event) => {
        event.stopPropagation()
        deleteLocation(location.textContent);
    });


    return li;

}
// function render() {
//     right_bottom_content.innerHTML = "";
//     for (const loc of list) {
//         console.log("render = " + loc);
//         const locNode = createElement(loc);
//         right_bottom_content.appendChild(locNode);
//     }
// }
function renderRecursive(setIterator) {
    const next = setIterator.next();
    if (next.done) {
        return;
    }

    const loc = next.value;
    console.log("render = " + loc);
    const locNode = createElement(loc);
    right_bottom_content.appendChild(locNode);

    renderRecursive(setIterator);
}

function render() {
    right_bottom_content.innerHTML = "";
    const setIterator = list.values();
    renderRecursive(setIterator);
}
render();
async function Likes(event) {
    const p = event.target;
    const data = await fetchLikes(p);
    console.log(data);
    const gender = Math.floor(data.main.temp - 273);
    const feels_Like = Math.floor(data.main.feels_like - 273);
    const Weather = data.weather[0].main;

    const sunrise = data.sys.sunrise;
    const datesr = new Date(sunrise * 1000);
    const dates = datesr.getHours() + ":" + datesr.getMinutes();

    const sunset = data.sys.sunset;
    const datess = new Date(sunset * 1000);
    const dateess = datess.getHours() + ":" + datess.getMinutes();
    Aktobe.textContent = p.textContent;
    left_content_temperature2_Aktobe.innerHTML = p.textContent;
    text_temperature.innerHTML = gender + "&#176";
    Details_Temperature.innerHTML = "Temperature: " + gender + "&#176";
    Details_Feels.innerHTML = "Feels like: " + feels_Like + "&#176";
    Details_Weather.innerHTML = "Weather: " + Weather;
    Details_Sunrise.innerHTML = "Sunrise: " + dates;
    Details_Sunset.innerHTML = "Sunset: " + dateess;
    // localStorage.setItem('loc', JSON.stringify(list));
    // localStorage.getItem('loc');
}

serdce.addEventListener("click", () => {
    addedLocation(),
        render()
});
form.addEventListener("submit", addLocation);