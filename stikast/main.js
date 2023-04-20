const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.reset');
const output = document.querySelector('.output');

let seconds = 0;
let minutes = 0;
let splitSeconds = 0;

let timerId;
let isStarted = false;

function  updatingOutput() {
	if (splitSeconds > 99) {
		seconds += 1;
		splitSeconds = 0;
	}

	if (seconds > 59) {
		minutes += 1;
		seconds = 0;
	}

	if (minutes < 10 && seconds < 10 && splitSeconds < 10) {
		return output.textContent = `0${minutes} : 0${seconds}, 0${splitSeconds}`
	}
	if (minutes < 10 && seconds < 10 && splitSeconds >= 10) {
		return output.textContent = `0${minutes} : 0${seconds}, ${splitSeconds}`
	}
	if (minutes < 10 && seconds >= 10 && splitSeconds < 10) {
		return output.textContent = `0${minutes} : ${seconds}, 0${splitSeconds}`
	}
	if (minutes < 10 && seconds >= 10 && splitSeconds >= 10) {
		return output.textContent = `0${minutes} : ${seconds}, ${splitSeconds}`
	}
	if (minutes >= 10 && seconds < 10 && splitSeconds < 10) {
		return output.textContent = `${minutes} : 0${seconds}, 0${splitSeconds}`
	}
	if (minutes >= 10 && seconds >= 10 && splitSeconds < 10) {
		return output.textContent = `${minutes} : ${seconds}, 0${splitSeconds}`
	}
	if (minutes >= 10 && seconds < 10 && splitSeconds >= 10) {
		return output.textContent = `${minutes} : 0${seconds}, ${splitSeconds}`
	}
	if (minutes >= 10 && seconds >= 10 && splitSeconds >= 10) {
		return output.textContent = `0${minutes} : 0${seconds},${splitSeconds}`
	}
}

function start() {
	if (!isStarted) {
		timerId = setInterval(() => {
			++splitSeconds;
			updatingOutput();
	}, 10)

		isStarted = true;
		startButton.style.background = '#D8493D'
		startButton.textContent = 'Stop'

	} else {
		clearInterval(timerId);
		isStarted = false;
		startButton.style.background = '#69B67A'
		startButton.textContent = 'Start'
	}
}

function pause() {
	clearInterval(timerId)
}

function reset() {
	clearInterval(timerId);
	splitSeconds = 0;
	seconds = 0;
	minutes = 0;
	isStarted = false;
	startButton.textContent = 'Start';
	startButton.style.background = '#69B67A'
	output.textContent = `0${minutes} : 0${seconds}, 0${splitSeconds}`
}

startButton.addEventListener('click', start)
stopButton.addEventListener('click', reset)