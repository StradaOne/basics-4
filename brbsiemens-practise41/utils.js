import {UI_ELEMNTS } from './ui_elements.js';
function clearInputHigh(){
  UI_ELEMNTS.INPUT_HIGH.value=("")
}

function clearInputLow(){
  UI_ELEMNTS.INPUT_LOW.value=("")
}

function ShowTime(){
  let now = new Date();
  let date = now.getDate()
  UI_ELEMNTS.TIME.append(`Today is the ${date}th`)
}
export{clearInputHigh,clearInputLow,ShowTime}