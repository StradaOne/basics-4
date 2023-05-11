import DOM from "./DOM.js";

document.querySelector(".categories__bar").onclick = function(event) {
	DOM.categories[0].classList.remove('select');
	DOM.categories[1].classList.remove('select');
	DOM.categories[2].classList.remove('select');
	event.target.classList.add('select')
}


const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

DOM.mainForm.addEventListener("submit", (e) => {
	e.preventDefault();
	GetWeather();
})

async function GetWeather(){
	try{
		const cityName = DOM.mainInput.value
		const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		const List = await response.json();
		console.log(List)
		RenderDetalis(List);
		RenderMain();
	} catch (e){
		if(DOM.mainInput.value == ''){
			alert("Заполните поле поиска.")
		} else{
			alert("Неизвестная ошибка, посмотрите в консоле.")
			console.error(`Error! ${e}`);
		}
	}
}

function RenderMain(){
	DOM.mainSity[0].textContent = DOM.mainInput.value;
	DOM.mainSity[1].textContent = DOM.mainInput.value;
	DOM.mainSity[2].textContent = DOM.mainInput.value;
}

function RenderDetalis(List){
	DOM.detalisTemp.textContent = "Температура: "+ List.main.temp;
	DOM.detalisLikes.textContent = "Ощущается: "+ List.main.feels_like;
	DOM.detalisWeather.textContent = "Погода: "+ List.weather[0].main;
	DOM.detalisSunrise.textContent = "Восход: "+ ConvertTime(List.sys.sunrise);
	DOM.detalisSunset.textContent = "Закат: : "+ ConvertTime(List.sys.sunset);
}

function ConvertTime(Time){
	let unix_timestamp = Time
	var date = new Date(unix_timestamp * 1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return(formattedTime);
}

