
const button = document.getElementById('change-bg');
const color = button.getAttribute('data-color');
const body = document.body;
let flag = false;

function changeBg(event){
    event.preventDefault()
    if(!flag){
        body.style.backgroundColor = color;
        flag = true;
        return;
    } else {
        body.style.backgroundColor = '#fff';
        flag = false;
        return;
    }
}

button.addEventListener('click', changeBg)

let styles = getComputedStyle(button);
console.log(styles.backgroundColor)
console.log(styles.color)
console.log(styles.fontSize)

const colors = ['red', 
    'blue', 'green', 
    'yellow', 'pink', 
    'Thistle', 'Tomato',
    'DarkCyan', 'SteelBlue',
    'DimGray'
 ];

function randomColor(){
    let number = Math.random();
    body.style.backgroundColor = colors[Math.floor(number*10)];
}

const intervalId = setInterval(randomColor, 2000);