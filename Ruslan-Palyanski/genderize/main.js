import {getElement, form, btn, question} from './constants.js';
import {ERROR} from './errors.js';

function isValidName(name){
    if(name === ''){
        alert(ERROR.EMPTY)
        return false;
    } 
    if(name.length > 20){
        alert(ERROR.SIZE)
        return false;
    }
    return true;
}

function isValidNameOnGender(gender){
    if(gender === null){
        alert('Your name is not valid!')
        return false;
    }
    return true;
}

async function getResponse(event){
    event.preventDefault()
    const formData = new FormData(form);
    const name = formData.get('name');
    if(isValidName(name)){
        const serverUrl = 'https://api.genderize.io';
        const response = await fetch(`${serverUrl}/?name=${name}`);
        if(response.ok){
            const data = await response.json();
            if(isValidNameOnGender(data.gender)){
                const string = `${data.name} is ${data.gender}`;
                render(string)
            }
        } else {
            alert(ERROR.MISTAKE)
            console.log(ERROR.STATUS + response.status)
        }
    }
    event.target.reset()
}

function render(string){
    question.textContent = string;
}

form.addEventListener('submit', getResponse)
