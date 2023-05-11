const getElement = (selector) => document.querySelector(selector);
const firstName = getElement('.name-input');
const results = getElement('.results');
const form = getElement('form');

const serverUrl = 'https://api.genderize.io';
let resultsStorage = [];

function saveResultsToLocalStorage() {
    localStorage.setItem('genderizeResults', JSON.stringify(resultsStorage));
}
function getResultsFromLocalStorage() {
    if (localStorage.getItem('genderizeResults')) {
        resultsStorage = JSON.parse(localStorage.getItem('genderizeResults'))
    }
}

async function getGenderByName(name) {
    try {
        if (!!name) {
            const url = `${serverUrl}?name=${name}`;
            const response = await fetch(url)
            const nameInfo = await response.json();
            const gender = (nameInfo.gender !== null) ? nameInfo.gender : 'not found';
            addResultToStorage(name, gender);
               
            firstName.value = '';
            return  nameInfo;
        }
    }
    catch(err) {
        alert(err);
        firstName.value = '';
    }
        
    
        
}

const addResultToStorage = (name, gender) => {
    const newResult = {
        name,
        gender,
    }
    resultsStorage.push(newResult);
    saveResultsToLocalStorage();
    render();
}

const deleteResultFromStorage = (name) => {
    let resultIndex = resultsStorage.findIndex(result => result.name === name);
    resultsStorage.splice(resultIndex, 1);
    saveResultsToLocalStorage();
}

const createResultItem = (name, gender) => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-item');
    resultDiv.setAttribute('data-name', name);
    resultDiv.textContent = name + ' is ' + gender;
    results.append(resultDiv);
    return resultDiv;
}

const render = () => {
    results.innerHTML = '';
    resultsStorage.forEach(result => {
        createResultItem(result.name, result.gender);
    })
    console.log(resultsStorage);
}

const formSubmitHandler = (e) => {
    e.preventDefault();
    let inputValue = firstName.value.trim();
    getGenderByName(inputValue);
    render();
}

form.addEventListener('submit', formSubmitHandler);

const resultsDeleteHandler = (event) => {
    if (event.target.classList.contains('result-item')) {
        const name = event.target.getAttribute('data-name');
        deleteResultFromStorage(name);
        render();   
    }
}

results.addEventListener('click', resultsDeleteHandler);

getResultsFromLocalStorage();
render();