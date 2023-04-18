let i = 0;
let timerId;
let flag = 1;
var button = document.getElementById('timerButton');

function buttonClickHandler() {
    timerId = setInterval(() => console.log(++i), 1000);
};

function stopClick() {
  setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 0);
}

button.addEventListener("click", function() {
  if (flag == 1) {
    buttonClickHandler();
    flag = 2;
  }else {
      stopClick();
    flag = 1;
  }
}); 

