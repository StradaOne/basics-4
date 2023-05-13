const form = document.querySelector('.weather-search');
const btnFav = document.querySelector('.weather-left-now-info-favourite');
const addedBlock = document.querySelector('.weather-right-info')
const list = [];

form.addEventListener('submit', sendForm);
btnFav.addEventListener('click', addFav);
addedBlock.addEventListener('click', deleteFav);
addedBlock.addEventListener('click', sendFav);

function sendForm(e){
    e.preventDefault();
    const cityName = document.querySelector('.weather-search-input').value
    e.target.reset(); 
    getCityRequest(cityName);
}

async function getCityRequest(city) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric`;

    await fetch(url)
        .then(async (data) => {
            const obj =  await data.json();
            console.log(obj)
            if (obj.message === "city not found") return alert('Город англиски пжэжэ, первая буква большая(Вот пример для одаренных: Vladivostok')
            renderNow(obj)
        })
        .catch(()=> alert('Нахуй ты все сломал? Давай чини.'))
}

function renderNow(data){
    const cityText = data.name;
    const iconBlockNow = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconBlockNow}@4x.png`;
    const tempText = Math.round(data.main.temp);
    const city = document.querySelector('.weather-left-now-info-city-text');
    const temp = document.querySelector('.weather-left-now-info-degree-number');
    const icon = document.querySelector('.weather-left-now-info-icon')
    icon.setAttribute('src', iconUrl)
    city.textContent = cityText;
    temp.textContent = tempText;
}

function addFav(){
    const city = document.querySelector('.weather-left-now-info-city-text').textContent;
    if (list.find(item => item === city)) return alert('Данный город уже добавлен в любимые')
    list.push(city)
    renderList()
}

function deleteFav(e){
    const targ = e.target;
    if (targ.matches('div.delete')){  
        const name = targ.parentNode.textContent;
        const listInd = list.findIndex(item => item === name);
        list.splice(listInd, 1)
        renderList()
    }
}

function sendFav(e) {
    const targ = e.target;
    if (targ.matches('li')){  
        const name = targ.textContent;
        getCityRequest(name)
    }
}

function renderList(){
    const ul = document.querySelector('.weather-right-info-list');
    ul.innerHTML = '';
    list.forEach(item => {
        const li = document.createElement('li');
        const divDel = document.createElement('div');
        li.textContent = item;
        divDel.classList.add('delete');
        ul.append(li);
        li.append(divDel);
    })
}