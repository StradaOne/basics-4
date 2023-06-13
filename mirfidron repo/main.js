import { format } from './node_modules/date-fns';
import { formatDuration, intervalToDuration } from './node_modules/date-fns';
import { ru } from "./node_modules/date-fns/locale";

const btn = document.querySelector('.btn');
const inpt = document.querySelector('.inpt');
const form = document.querySelector('.form');
const timeList = document.querySelector('.time-list')

function createDate(event) {
    event.preventDefault()
    const remained = intervalToDuration({
        start: new Date(`${inpt.value}`),
        end: new Date()
    });
    const durationFormat = formatDuration(remained, { format: ["years", "days", "hours"], locale: ru });
    timeList.textContent = durationFormat;
    console.log(durationFormat)
}






form.addEventListener("submit", createDate)

