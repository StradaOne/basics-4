var ButtonStart = document.getElementById('buttonStart');
var ButtonPause = document.getElementById('buttonPause');
var ButtonStop = document.getElementById('buttonStop');
var TxtTime = document.getElementById('Time');

var Time = 0;

var Tick;

function TickTime(){
	Tick = setInterval(function(){
		Time = Time + 1
		TxtTime.textContent = Time;
	}, 1000);
}
function PauseTime(){
	clearInterval(Tick);
}
function StopTime(){
	clearInterval(Tick);
	Time = 0;
	TxtTime.textContent = Time;
}



ButtonStart.addEventListener('click', TickTime)
ButtonPause.addEventListener('click', PauseTime)
ButtonStop.addEventListener('click', StopTime)