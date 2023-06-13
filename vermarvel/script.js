"use strict";
// DAYS COUNTER
import { isValid, format, compareAsc } from "date-fns";
import moment from "moment";
moment().format();
import dom from "./dom.js";
import { store } from "./store.js";
// Dropdown calendar
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
// Reset storage
// let state = store.clear();
let state = store.get("state") || [];
// Helper funcs
function resetInputs() {
  dom.nameInput.value = "";
  dom.dateSelect.value = "";
}

function resetItemsScr() {
  dom.parentItems.innerHTML = "";
}
function checkForFuture(input, now) {
  if (input > now) return "to go";
  if (input < now) return "left";
}
function checkForZero(number, string) {
  if (number === 0) return "";
  if (number > 0) return `<strong>${number}</strong> ${string}`;
}
function pastOrFutureClass(str) {
  if (str.includes("left")) return "future";
  if (str.includes("go")) return "past";
}
function capitalize(str) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(inputDate, standard) {
  const date = new Date(inputDate);
  if (standard === "HH:mm, MMM dd, yyyy") {
    return format(date, "HH:mm, MMM dd, yyyy");
  }
  if (standard === "YYYY-MM-dd HH:MM:SS") {
    return format(date, "YYYY-MM-dd HH:MM:SS");
  }
}

function deleteItem(id) {
  state = state.filter((i) => i.id !== id);
  store.set("state", state);
  return renderUI();
}
// Collecting data from dropdown calendar
const fp = flatpickr(dom.dateSelect, {
  enableTime: true,
  dateFormat: "YYYY-mm-dd",
});

function timeDifference(inputDate) {
  const now = moment();
  const input = moment(inputDate);
  const diff = moment.duration(Math.abs(now.diff(input)));

  const years = diff.years();
  const months = diff.months();
  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();
  const seconds = diff.seconds();
  const agoOrLeft = checkForFuture(input, now);

  return `${checkForZero(years, "years")} ${checkForZero(
    months,
    "months"
  )} ${checkForZero(days, "days")} <br/>
  ${checkForZero(
    hours,
    "hours"
  )} <strong>${minutes}</strong> minutes <strong>${seconds}</strong> seconds ${agoOrLeft}`;
}
setInterval(renderUI, 1000);

function sortBigToSmall() {
  state = state.sort(
    (obj1, obj2) => new Date(obj1.inputDate) - new Date(obj2.inputDate)
  );
  store.set("state", state);
  renderUI();
}
function sortSmallToBig() {
  state = state.sort(
    (obj2, obj1) => new Date(obj1.inputDate) - new Date(obj2.inputDate)
  );
  store.set("state", state);
  renderUI();
}
//%%%%%%%%%%%%%%%%%% BUSINESS LOGICS %%%%%%%%%%%%%%%%%%%%
function renderUI() {
  resetItemsScr();
  state = store.get("state") || [];
  // Guard clause
  if (!state.length) return;
  console.log(state);
  state.forEach((obj) => {
    console.log(obj.inputDate);
    // Assemble a div
    const str = timeDifference(obj.inputDate);

    const html = `<div class="item ${pastOrFutureClass(str)}">
          <div class="upper-box">
            <div id="uiName">${obj.name}</div>
          </div>
          <div class="middle-box">
            <div id="ui-target-date">${obj.dateUI}</div>
            <i class="fa-solid fa-xmark btn-del" id="${obj.id}" ></i>
            <div id="to-go" class="hidden"></div>
            <div id="left" class="hidden">Left</div>
          </div>
          <div class="lower-box">
            <div id="output">${str}</div>
          </div>
        </div>`;

    dom.parentItems.innerHTML += html;
  });
}

function createItem(event) {
  event.preventDefault();
  const selectedDate = fp.selectedDates[0];
  console.log(selectedDate);
  // Guard clause
  if (!selectedDate) {
    console.log("No date selected");
    return;
  }
  const name = capitalize(dom.nameInput.value);

  if (!isValid(new Date(selectedDate))) {
    console.log("Invalid date:", selectedDate);
    return;
  }
  if (name === "" || selectedDate === "") return;

  const obj = {};
  obj.name = name;
  obj.dateUI = formatDate(selectedDate, "HH:mm, MMM dd, yyyy");
  obj.inputDate = selectedDate;
  obj.id = Math.round(Math.random() * 100000000);
  state.push(obj);
  store.set("state", state);
  resetInputs();
  renderUI();
}
//%%%%%%%%%%%%%%%%%% EVENT-LISTENERS %%%%%%%%%%%%%%%%%%%%

// Submit date and name, add an item to state
dom.btnAdd.addEventListener("click", (event) => createItem(event));

dom.wrapper.addEventListener("click", function (event) {
  console.log(event);
  const target = event.target;
  const id = Number(target.id);

  if (target.classList.contains("btn-del")) {
    deleteItem(id);
  }

  if (
    target.classList.contains("btn-sort-to-small") ||
    target.classList.contains("icon-sort-to-small")
  ) {
    sortBigToSmall();
  }
  if (
    target.classList.contains("btn-sort-to-big") ||
    target.classList.contains("icon-sort-to-big")
  ) {
    sortSmallToBig();
  }
});

// Start
document.addEventListener("DOMContentLoaded", renderUI);

// Further work:
// BUGS

// FEATURES

// DESIGN

// REFACTOR

//DONE TODAY:
// Sorting btn
// Listeners
// Timer
// Reformat string
// Add ago or left to the string
// css classes for future and past items
