const tabs = document.querySelectorAll('.tabs_item');
const displayItem = document.querySelectorAll('.content-area_display');

const inputValue = document.querySelector('.header-input');
const formNode = document.querySelector('.header');


function clearInput() {
    inputValue.value = '';
}


tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active-tab'))
        displayItem.forEach(el => el.classList.remove('active'))

        tab.classList.add('active-tab')
        displayItem[index].classList.add('active')
    })
});



async function getRequest() {
    try {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const cityName = inputValue.value;
        const apiKey = '2de34209accba46efc52dfd946a3c2b3';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        createDisplayNow(data);
        createDisplayDetails(data);
        clearInput();
    }
    catch (Err) {
        console.error(Err.message)
    }



};

function createDisplayNow(data) {

    const tempSpan = document.querySelector('.weather-temp span');
    const temperature = data.main.temp;
    tempSpan.textContent = temperature.toFixed(0);


    const iconId = data.weather[0].icon
    const iconImg = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
    const iconWeather = document.querySelector('.weather-icon img');
    iconWeather.src = iconImg;

    const cityName = document.querySelector('.location-target span');
    cityName.textContent = data.name;

};







function createDisplayDetails(data) {
    const cityName = document.querySelector('.details-city');
    cityName.textContent = data.name;
    const sunrise = document.querySelector('.sunrise');

    const hours = '0' + new Date(data.sys.sunrise * 1000).getHours();
    const minutes = new Date(data.sys.sunrise * 1000).getMinutes();
    const sunriseValue = hours + ':' + minutes;
    console.log(sunriseValue);
    sunrise.textContent = sunriseValue;
    

}




formNode.addEventListener('submit', (e) => {
    e.preventDefault();
    getRequest();
})




//add function

const nameShapeCity = document.querySelector('.love-city');
const addButtonShape = document.querySelector('.now-btn-shape');
const sectionItem = document.querySelector('.locations');

console.log(nameShapeCity.textContent)


const array = [];


function addTask(text) {
    array.push(text);
};

function addCity() {
    
    const name = nameShapeCity.textContent;
    const item = {
        city: name
    };
    
    addTask(item);
    console.log(array)
    
    render();
};

function deleteCity(text) {
    const indexItem = array.findIndex(e => e.city === text)
    console.log(indexItem);
    array.splice(indexItem, 1);
    console.log(array)
    render();
}


function createElement(sectionItem, text) {
    const newElem = document.createElement('span');
    newElem.classList.add('new-element')
    newElem.textContent = text

    sectionItem.appendChild(newElem);
};

function render() {
    sectionItem.innerHTML = '';
    for (let obj of array) {
        createElement(sectionItem, obj.city);
    }
}


addButtonShape.addEventListener('click', addCity)









