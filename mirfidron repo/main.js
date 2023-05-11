const addPlace = document.querySelector('.weather__input');
const btnPlace = document.querySelector('.weather__button');
const weatherNow = document.querySelector('.weather__container');
const addForm = document.querySelector('.weather__form');
const tab1 = document.getElementById('tab-1');
const listItem = document.querySelector('.list');

const list = [];
JSON.stringify(list)
console.log(list)

addForLocal();
addLikeLocal();
console.log(list[0])

addForm.addEventListener('submit',(event) => {
    event.preventDefault();
    add();
    addPlace.value = '';

});

async function add() {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    try {
        if (addPlace.value == '') {
            throw new SyntaxError("Поле ввода не может быть пустым")
        };
        const cityName = addPlace.value;
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        let response = await fetch(url).catch(err => alert(err));
        let weather = await response.json();
        const zag = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        if (zag != weather.name) {
            throw new SyntaxError("Напишите название города без ошибок!")
        }
        addObj(weather, zag);
        saveCityName()
    } catch(err) {
        alert(err.message)
    }
}   

async function addTaskPlace(a) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = a;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    let response = await fetch(url).catch(err => alert(err));
    let weather = await response.json();
    addObj(weather);
}

function addObject(a) {
    list.push(a)
}

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
            <button type="submit" class="like-btn"><img class="like" src="./img/shape.svg" alt=""></button>
        </div>
    </div>`);
    const like = document.querySelector('.like-btn');
    const cityName = document.querySelector('.tab-block__country')
    like.addEventListener('click', () => {
        addLike(cityName.textContent);
    })
}

async function addLike(b) {
    const zag = b.charAt(0).toUpperCase() + b.slice(1);
    const newDiv = document.createElement('div');
    listItem.appendChild(newDiv);
    newDiv.classList.add("list_container");
    newDiv.insertAdjacentHTML('afterbegin', `<p class="list_item">${zag}</p><button class="btn-del">x</button>`);
    const delDiv = newDiv.querySelector('.btn-del');
    delDiv.addEventListener('click',() => {
        const text = newDiv.textContent;
        const index = list.findIndex(task => text == task.name);
        list.splice(index,1);
        listItem.removeChild(newDiv);
        console.log(list);
    });
    addObject(zag);
    console.log(list);
    saveLikeName(zag);
    saveList();
    newDiv.addEventListener('click',() => {
        addTaskPlace(zag);
    } )
}


// localstorage

function saveCityName() {
    const cityNameJust = document.querySelector('.tab-block__country');
    localStorage.setItem('city', cityNameJust.textContent);
    const test = localStorage.getItem('city');
    console.log(test)
}

function saveLikeName(zag) {
    const city = zag;
    localStorage.setItem('like', city);
    const test = localStorage.getItem('like')
    console.log(test)

}

function saveList() {
    localStorage.setItem('list', list);
    list.push(localStorage.getItem('list'));
}

async function addLikeLocal() {
    for (let i in list) {
        const zag = list[i];
        const newDiv = document.createElement('div');
        listItem.appendChild(newDiv);
        newDiv.classList.add("list_container");
        newDiv.insertAdjacentHTML('afterbegin', `<p class="list_item">${zag}</p><button class="btn-del">x</button>`);
        const delDiv = newDiv.querySelector('.btn-del');
        delDiv.addEventListener('click',() => {
            const text = newDiv.textContent;
            const index = list.findIndex(task => text == task.name);
            list.splice(index,1);
            listItem.removeChild(newDiv);
            console.log(list);
        });
        addObject(zag);
        // saveLikeName(zag);
        newDiv.addEventListener('click',() => {
            addTaskPlace(zag);
        } )
    }
}

async function addForLocal() {
    if (localStorage.getItem('city')) {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const cityName = localStorage.getItem('city');
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        let response = await fetch(url).catch(err => alert(err));
        let weather = await response.json();
        const zag = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        addObj(weather, zag);
        saveCityName();
    } else {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const cityName = 'Moscow';
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        let response = await fetch(url).catch(err => alert(err));
        let weather = await response.json();
        const zag = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        addObj(weather, zag);
        saveCityName();
    }
}




