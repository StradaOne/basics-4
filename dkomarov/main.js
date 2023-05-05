const inputValue = document.querySelector('.inputName');
const button = document.querySelector('.btn');
const form = document.querySelector('.form');

function clearInpt() {
    inputValue.value = '';
};



async function getRequest() {
    const firstName = inputValue.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    try {
        const response = await fetch(url);
        const data = await response.json()
        alert(`${firstName} is ${data.gender}`);
        
    } catch(Err) {
        renderMesssage(Err);
    };
};

function renderMesssage() {
    const body = document.querySelector('body');
    body.style.backgroundColor = 'red';
    form.innerHTML = '';
    alert('Ошибка!');
}

form.addEventListener('submit',  (e) => {
    e.preventDefault();
    getRequest();
    clearInpt();
});







