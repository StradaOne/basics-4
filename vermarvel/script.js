"use strict";

import dom from "./dom.js";

let activeForm = null;

// Keeper
const keeper = [];

// Logic
// Service functions

// Plus
function addTask(event) {
  event.preventDefault();

  let prio = activeForm;
  let taskName;
  if (activeForm === "high") {
    taskName = dom.inputHigh.value;
  }
  if (activeForm === "low") {
    taskName = dom.inputLow.value;
  }
  if (activeForm === null || taskName === "") return;
  console.log(taskName, prio);
  addNewToMemory(taskName, prio);
}

// RESET
function resetInputs() {
  dom.inputHigh.value = "";
  dom.inputLow.value = "";
}

// &&&&&&&&&&&&&&&&   Memory  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// ADD TO MEMORY

function addNewToMemory(taskName, prio) {
  // assemble
  // create a random ID
  const id = "id-" + Date.now();

  // creating an object
  const newT = { task: taskName, complete: false, priority: prio, id: id };

  // push to keeper
  keeper.push(newT);
  render();
}

// DELETE FROM MEMORY

function deleteInMemory(id) {
  const toBeDeleted = keeper.findIndex((item) => item.id === id);

  keeper.splice(toBeDeleted, 1);
  render();
}

//%%%%%%%%%%%%%%%%%%%%%%%  RENDER %%%%%%%%%%%%%%%%%%%%%%%%%%%

function render() {
  // Resest all the tasks on screen

  dom.parentHigh.innerHTML = "";
  dom.parentLow.innerHTML = "";

  // run through the memory

  keeper.forEach((obj) => {
    // create a div by a .hidden template
    const copiedDiv = dom.sourceDiv.cloneNode(true);

    // Add text
    const textInside = copiedDiv.querySelector(".text");
    textInside.textContent = obj.task;

    // Add priority, status
    // Nest the div
    // (nesting into the corresponding (priority) container, corresponding (status): above or below
    if (obj.priority === "high" && obj.complete === true) {
      dom.parentHigh.insertAdjacentElement("beforeend", copiedDiv);
      copiedDiv.classList.add("complete");
    }
    if (obj.priority === "low" && obj.complete === true) {
      dom.parentLow.insertAdjacentElement("beforeend", copiedDiv);
      copiedDiv.classList.add("complete");
    }
    if (obj.priority === "high" && obj.complete === false) {
      dom.parentHigh.insertAdjacentElement("afterbegin", copiedDiv);
    }

    if (obj.priority === "low" && obj.complete === false) {
      dom.parentLow.insertAdjacentElement("afterbegin", copiedDiv);
    }

    // Add a checkbox

    const checkboxInput = copiedDiv.querySelector("input[type='checkbox']");

    // Set the correct initial checked state
    checkboxInput.id = obj.id;
    checkboxInput.checked = obj.complete;

    // Install ID into checkbox html
    const label = copiedDiv.querySelector("label");
    label.setAttribute("for", obj.id);
    copiedDiv.classList.add(obj.id);

    // make the created div visible
    copiedDiv.classList.remove("hidden");
  });
  resetInputs();
}

//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&//

// Listeners
// (Event delegation)

dom.container.addEventListener("click", function (event) {
  const target = event.target;

  // listen for +

  if (target.classList.contains("fa-plus")) {
    // Add text, priority, status: noncomplete
    addTask(event);
  }
  // listen for X

  if (
    target.parentNode.classList.contains("delete") ||
    target.classList.contains("fa-times")
  ) {
    // Retrieve ID from the div
    const divID = target.parentElement.parentElement.classList[2];
    console.log(divID);
    deleteInMemory(divID);
  }
  // handle checkbox
  if (
    target.parentNode.classList.contains("checkbox") ||
    target.classList.contains("checkbox")
  ) {
    checkboxHandler(event);
  }
});

// State: Active Form

dom.fieldHigh.addEventListener("input", function (event) {
  activeForm = "high";
  console.log(activeForm);
});

dom.fieldLow.addEventListener("input", function (event) {
  activeForm = "low";
  console.log(activeForm);
});

// Add a task (with Enter scenario)
// Enter
dom.formLow.addEventListener("submit", addTask);
dom.formHigh.addEventListener("submit", addTask);

// Listen to CHECKBOX
function checkboxHandler(event) {
  // retrieve id
  const target = event.target;
  const checkboxID = target.id;

  // locate (address on the keeper array)
  const toBeEdited = keeper.findIndex((item) => item.id == checkboxID);

  // update status on the memory (toggle)
  keeper[toBeEdited].complete = !keeper[toBeEdited].complete;
  render();
}

//-------------------------------------------------
// Following modifications:

// render() into a separate module
