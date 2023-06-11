
import { intervalToDuration, getTime} from 'date-fns';
import { storage } from './storage.js';

const form = getElement(".form");
const dateInput = getElement(".form__input");
const restNum = getElement(".rest__num");

function getElement(selector){
    return document.querySelector(selector);
}

function getDuration(){
    return intervalToDuration({
                        start: new Date(),
                        end: storage.getDate()
                    });
}

function render(duration){
    restNum.innerText = duration;
}

function submitForm(event){
    event.preventDefault();
        storage.setDate(getTime(new Date(dateInput.value)));
        const {years, months, days, hours, minutes, seconds} = getDuration();
        render(`${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
}

form.addEventListener('submit', submitForm)

if(storage.getDate()){
    const {years, months, days, hours, minutes, seconds} = getDuration();
    render(`${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);
} 

if(!storage.getDate()){
    render('You must choose date');
}



