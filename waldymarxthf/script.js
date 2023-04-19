const timer = document.querySelector('#timer');
const resetTimerButton = document.querySelector('#resetTimer');

let stopwatch;
let isRunning = timer.dataset.include === 'off';
let count = 0;

function startTimer() {

	stopwatch = setInterval(() => {
		count++;
		console.clear();
		console.log(count);
		updateTimerUI(count)
	}, 1000);
}

function stopTimer() {

	clearInterval(stopwatch);
	console.clear();
	console.log(`Вы остановили таймер на ${count}`);
}

function resetTimer() {
	count = 0;
	console.log(`Вы сбросили секундомер`);
}

function toggleButtonState(isRunning) {

	if (isRunning) {
		timer.dataset.include = 'off';
		timer.innerText = 'Запуск';
		timer.style.backgroundColor = '#addfad';
	} else {
		timer.dataset.include = 'on';
		timer.innerText = 'Остановить';
		timer.style.backgroundColor = '#e66761';
	}

}

function animateTimerButton() {
	timer.style.transform = 'scale(0.90)';
	setTimeout(() => timer.style.transform = 'scale(1)', 100);
}

function updateTimerUI(count) {
	timer.innerText = count;
}

function buttonClickTimer() {
	isRunning ? startTimer() : stopTimer();
	isRunning = !isRunning;
	toggleButtonState(isRunning)
}

timer.addEventListener('click', () => {
	buttonClickTimer(),
	animateTimerButton()
});
resetTimerButton.addEventListener('click', resetTimer);