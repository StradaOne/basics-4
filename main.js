const UI_ELEMNTS={
INPUT_NAME: document.querySelector('.inputName'),
FORM: document.querySelector('.form'),
ADD_BTN : document.querySelector('.addNameBtn')
}

UI_ELEMNTS.FORM.addEventListener('submit',(e)=>{
e.preventDefault()
genderizeName(UI_ELEMNTS.INPUT_NAME)
})

async function genderizeName(input){
  const firstName = input.value;
const serverUrl = 'https://api.genderize.io';
const url = `${serverUrl}?name=${firstName}`;

let response = await fetch(url)
let obj = await response.json()
alert(`${obj.name} is ${obj.gender}`);

/*
  fetch(url)
  .then(response => response.json())
  .then(obj=>alert(`${obj.name} is ${obj.gender}`))
  */
}


