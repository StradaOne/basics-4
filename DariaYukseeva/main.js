const stopwatchBtnStart = document.getElementById('stopwatch-btn-start');
const stopwatchBtnStop = document.getElementById('stopwatch-btn-stop');
const stopwatchBtnReset = document.getElementById('stopwatch-btn-reset');

const stopwatch = {
    hour: 0,
    min: 0,
    sec: 0,
}

let stopwatchStatus = false;
let time = 0;

let timeId;

// Запускаем отсчёт времени и вызываем функцию вывода в консоль каждую секунду
function startCount() {
    if (stopwatchStatus === false) {
        stopwatchBtnStart.className = 'active';
        stopwatchBtnStop.className = 'nonactive';
        timeId  = setInterval(() => {
            stepTime();
            refreshStopwatchDisplay();
            
        }, 1000)
        stopwatchStatus = true;
    }
        
}

// Останавливаем секундомер
function stopCount() {
    clearInterval(timeId);
    stopwatchStatus = false;
    stopwatchBtnStart.className = 'nonactive';
    stopwatchBtnStop.className = 'active';
}

// Изменяем время секундомера
function stepTime() {
    time++;
    stopwatch.sec = time % 60;
    stopwatch.min = Math.floor(time / 60);
    stopwatch.hour = Math.floor(time / 3600);

}

// Если значение секунд и минут меньше 10, то добавляем к нему 0 в вывод. Выводим секундомер в консоль
function refreshStopwatchDisplay() {
    let out = [];
    for (let key in stopwatch) {
        if (stopwatch[key] < 10) {
            stopwatch[key] = `0${stopwatch[key]}`;
        }
        else {
            stopwatch[key] = stopwatch[key];
        }
        out.push(stopwatch[key]);
    }
    
    console.clear();
    console.log(out);
    document.querySelector('.out').innerHTML = out.join(':');
}

// Останавливаем отсчёт и сбрасываем показания секундомера
function resetCount() {
    stopCount();
    time = 0;
    stopwatch.sec = 0;
    stopwatch.min = 0;
    stopwatch.hour = 0;
    
    refreshStopwatchDisplay()
    stopwatchBtnStart.className = 'nonactive';
    stopwatchBtnStop.className = 'nonactive';
}


stopwatchBtnStart.addEventListener('click', startCount);
stopwatchBtnStop.addEventListener('click', stopCount);
stopwatchBtnReset.addEventListener('click', resetCount);


