const form = document.querySelector('.weather-search');
form.addEventListener('submit', getCityRequest);

async function getCityRequest(e) {
    e.preventDefault();
    const cityName = document.querySelector('.weather-search-input').value
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    console.log(cityName)
    e.target.reset(); 

    await fetch(url)
        .then(async (data) => {
            const obj =  await data.json();
            if (obj.message === "city not found") alert('Город англиски пжэжэ, первая буква большая(Вот пример для одаренных: Vladivostok')
            renderNow(obj)
        })
        .catch(()=> alert('Нахуй ты все сломал? Давай чини.'))
}

function renderNow(data){
    const cityText = data.name;
    const tempText = Math.round(data.main.temp);
    const city = document.querySelector('.weather-left-now-info-city-text');
    const temp = document.querySelector('.weather-left-now-info-degree-number');
    city.textContent = cityText;
    temp.textContent = tempText;
}
