const qS = (element) => document.querySelector(element);
const highInput = qS(".input_text_high");
const lowInput = qS(".input_text_low");
const formHigh = qS(".task_form_high");
const formLow = qS(".task_form_low");
const highTask = qS(".task_priority_high");
const lowTask = qS(".task_priority_low");

const list = [];

const PRIORITY = {
    LOW: "low",
    HIGH: "high"
  };

const STATUS = {
    TODO: "ToDo",
    DONE: "Done"
  };  

export {highInput, lowInput, formHigh, formLow, highTask, lowTask, list, PRIORITY, STATUS}