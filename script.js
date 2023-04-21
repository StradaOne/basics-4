const button = document.getElementById('change-bg');
const colors = ['red', 'blue', 'green', 'orange'];
let randomColor = colors[Math.floor(Math.random() * colors.length)];
let chenging = false;

function randomChange(){
	randomColor = colors[Math.floor(Math.random() * colors.length)];
	console.log(randomColor);
	document.querySelector('.block').style.backgroundColor = randomColor;
}


var intervalID;

function changeBG(){
	if(chenging == false){
		intervalID = setInterval(randomChange, 1000);
		chenging = true;
		button.innerHTML = 'Остановить'
		console.log(chenging)
	} else if(chenging == true) {
		clearInterval(intervalID);
		chenging = false;
		button.innerHTML = 'Поменяй цвет'
		console.log(chenging)
	}
}



button.addEventListener('click', changeBG)