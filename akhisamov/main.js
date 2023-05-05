const elements = {
    inputName: document.querySelector('#input_name'),
    btn: document.querySelector('#btn'),
    history: document.querySelector('.history'),
}

elements.btn.addEventListener('click', (event) => {
    event.preventDefault();
    getGender();
    elements.inputName.value = '';
})

elements.history.addEventListener('click', deleteName);

async function getGender() {
    const firstName = elements.inputName.value;
    const serverUrl = 'https://api.genderize.io';
    const url = `${serverUrl}?name=${firstName}`;
    let nameVis;
    try {
        let response = await fetch(url);
        let name = await response.json();
        nameVis = (`${firstName} is ${name.gender}`);
    } catch(err) {
        alert(err);
    }
    addName(nameVis);
}

function addName(item) {
    const newDiv = document.createElement('div');
    newDiv.textContent = item;
    elements.history.append(newDiv);
}

function deleteName(item) {
    elements.history.removeChild(item.target);
}