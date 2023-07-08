import DOM from "./DOM.js";

var Locations = JSON.parse(localStorage.getItem('Loc')) || [];

function LocalStorageSave(){
	localStorage.setItem('Loc', JSON.stringify(Locations))
}

var LastCity = JSON.parse(localStorage.getItem('Last')) || "Novokuzneck";

function LocalStorageLast(){
	localStorage.setItem('Last', JSON.stringify(LastCity))
}

function LoadLast(){
	DOM.mainInput.value = LastCity;
	DOM.mainInput.placeholder = LastCity;
	GetWeather();
}

document.querySelector(".categories__bar").onclick = function(event) {
	DOM.categories[0].classList.remove('select');
	DOM.categories[1].classList.remove('select');
	DOM.categories[2].classList.remove('select');
	event.target.classList.add('select')
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

DOM.mainForm.addEventListener("submit", (e) => {
	e.preventDefault();
	DOM.likeIcon.classList.remove('fill')
	GetWeather();
})

async function GetWeather(){
	try{
		const cityName = DOM.mainInput.value.toLowerCase().capitalize();
		const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);
		const List = await response.json();
		console.log(List)
		LastCity = List.name;
		DOM.mainInput.placeholder = List.name;
		LocalStorageLast();
		RenderDetalis(List);
		RenderMain(List);
		DOM.mainInput.value = "";
	} catch (e){
		if(DOM.mainInput.value.toLowerCase() == ''){
			Locations.forEach((lock) => {
				console.log(lock);
				if(lock == DOM.titleForLike.textContent){
					DOM.likeIcon.classList.add('fill')
					console.log("da")
				}
			})
			alert("Заполните поле поиска.")
		} else{
			Locations.forEach((lock) => {
				console.log(lock);
				if(lock == DOM.titleForLike.textContent){
					DOM.likeIcon.classList.add('fill')
					console.log("da")
				}
			})
			alert("Неизвестная ошибка, посмотрите в консоле.")
			console.error(`Error! ${e}`);
		}
	}
}

function RenderMain(List){
	DOM.mainSity[0].textContent = DOM.mainInput.value.toLowerCase().capitalize();
	DOM.mainSity[1].textContent = DOM.mainInput.value.toLowerCase().capitalize();
	DOM.mainSity[2].textContent = DOM.mainInput.value.toLowerCase().capitalize();
	DOM.mainDegree.textContent = List.main.temp;
	Locations.forEach((lock) => {
		console.log(lock);
		if(lock == DOM.titleForLike.textContent){
			DOM.likeIcon.classList.add('fill')
			console.log("da")
		}
	})
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

DOM.placeForLoc.addEventListener('click', function(event) {
	if (event.target.classList.contains('cross')) {
			event.stopPropagation();
			const deleteName = event.target.parentNode.children;
			Locations = Locations.filter((element) => element!=deleteName[0].textContent)
			LocalStorageSave();
			DOM.likeIcon.classList.remove('fill')
			render();
	}
})

DOM.placeForLoc.addEventListener('click', function(event) {
	if (event.target.classList.contains('location-txt')) {
			event.stopPropagation();
			const searchName = event.target.parentNode.children;
			DOM.mainInput.value = searchName[0].textContent;
			DOM.likeIcon.classList.remove('fill')
			GetWeather();
			render();
	}
})

function newElement(task){
	const Element = document.createElement('li');
	Element.innerHTML = `
		<span class="location-txt">${task}</span>
		<img src="images/cross.png" class="cross">
	`;
	Element.classList.add(`location`);
	return Element;
}

DOM.likeIcon.onclick = function(e){
	e.target.classList.toggle("fill");
	if(DOM.likeIcon.classList.contains('fill')){
		Locations.push(DOM.titleForLike.textContent);
		LocalStorageSave();
		render();
	} else{
		Locations = Locations.filter(el => el != DOM.titleForLike.textContent);
		LocalStorageSave();
		render();
	}
	console.log(Locations)
}

function render(){
	DOM.placeForLoc.replaceChildren();
	Locations.forEach((lock) =>{
		const newElem = newElement(lock)
		DOM.placeForLoc.appendChild(newElem);
	})
}

LoadLast();
render();