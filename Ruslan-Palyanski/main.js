
const buttonTimer = document.getElementById('timer');
let i = 0;
let intervalId = 0;

function startTimer(event){
    if(event.target.className === 'start'){
        event.target.className = 'pause';
        event.target.innerText = 'pause';
        intervalId = setInterval(() => {
            console.log(i++)
        }, 1000);
        return null;
    }
    if(event.target.className === 'pause'){
        event.target.className = 'start';
        event.target.innerText = 'start';
        clearInterval(intervalId)
        return null;
    }
}



buttonTimer.addEventListener('click', startTimer)