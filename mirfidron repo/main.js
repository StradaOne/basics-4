const inputName = document.querySelector('.input_name');
const btn = document.querySelector('.btn');

async function getGender () {
    const firstName = inputName.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    let nameVis;
    let response = await fetch(url);
    let name = await response.json();
    alert(`${firstName} is ${name.gender}`)
    
}

btn.addEventListener('click', (event) => {
    event.preventDefault();
    getGender();
    inputName.value = '';
})
