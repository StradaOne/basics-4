import { formatDuration, intervalToDuration } from 'date-fns';
import { format } from 'date-fns';
import { ru } from "date-fns/locale";

const parentNode = document.querySelector('.date-area');
const inputNode = document.querySelector('.input');
const formNode = document.querySelector('.form');
const titleParentNode = document.querySelector('.title')

function clearInput() {
    inputNode.value = '';
}

function createDateElement() {
    const date = inputNode.value;
    const dateNow = new Date();
    const interval = intervalToDuration({
        start: new Date(date),
        end: dateNow
    });
    const durationFormat = formatDuration(interval, { format: ["years", "days", "hours"], locale: ru });
    titleParentNode.classList.add('active');
    parentNode.textContent = durationFormat
    console.log(durationFormat)
    clearInput();
}

formNode.addEventListener('submit', (e) => {
    e.preventDefault();
    createDateElement();
})