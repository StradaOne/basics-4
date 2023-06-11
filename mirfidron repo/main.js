const addPlace = document.querySelector('.weather__input');
const btnPlace = document.querySelector('.weather__button');
const weatherNow = document.querySelector('.weather__container');
const addForm = document.querySelector('.weather__form');
const tab1 = document.getElementById('tab-1');

function addObj(weather) {
    const newDiv = document.createElement('div');
    weatherNow.insertBefore(newDiv, weatherNow.children[0]);
    newDiv.classList.add('tab-hidden');
    newDiv.id = 'tab-1'
    newDiv.insertAdjacentHTML("afterbegin", `<div class="temperature">${Math.floor(weather.main.temp)}&deg;</div>
    <div class="img">
        <img src="./img/cloud.svg" alt="cloud">
    </div>
    <div class="tab-block">
        <div class="tab-block__country">${weather.name}</div>
        <div class="tab-block__img">
            <img src="./img/shape.svg" alt="">
        </div>
    </div>`)
}

async function add() {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = addPlace.value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let weather = await response.json();
    addObj(weather);
}   

addForm.addEventListener('submit',(event) => {
    event.preventDefault();
    add();
    addPlace.value = '';
  });
