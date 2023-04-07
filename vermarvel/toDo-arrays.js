"use strict";

// ToDo via arrays

//README
// An initially empty list of tasks is an empty array. Once task is added it is added as an array.
// Global functions are for add, update, delete and display list (sorted: 2 options).
// Status can be 0, 1 or 2 ('to do', 'in progress', 'done')
// Priority can be 'a', 'b' or 'c' or '' (not urgent, mildly urgent, super urgent or no priority)

const list = [];

// Helper functions

const errorStatus = `❌Please set the status to numbers 0 for a non-started task, 1 a task in progress or 2 for completed task`;
const errorPriority = `❌Please set the priority to 'a', 'b', 'c' or leave empty, where 'a' - low priority, 'b' - mild priority or 'c' - the most urgency`;

// Global manipulation functions

const addTask = function (taskname, status = 0, priority = "a") {
  if (status !== 0 && status !== 1 && status !== 2) console.log(errorStatus);
  if (priority !== "a" && priority !== "b" && priority !== "c")
    console.log(errorPriority);
  list.push([taskname, status, priority]);
};

const deleteTask = function (task) {
  const toBeDeleted = list.findIndex((arr) => arr[0] === task);
  list.splice(toBeDeleted, 1);
};

const updateTask = function (task, status, priority) {
  if (status !== 0 && status !== 1 && status !== 2) console.log(errorStatus);
  if (priority !== "a" && priority !== "b" && priority !== "c")
    console.log(errorPriority);
  const toBeEdited = list.findIndex((arr) => arr[0] === task);
  list[toBeEdited][1] = status;
  list[toBeEdited][2] = priority;
};

const displayList = function (sort) {
  const padding = "       ";
  let zero = 0;
  let one = 0;
  let two = 0;
  if (sort === "status") {
    console.log("♻ To Do:");
    for (const arr of list) {
      arr[1] === 0 ? (console.log(padding, arr[0]), zero++) : "";
    }
    zero === 0 ? console.log("-") : "";

    console.log("▶ In Progress:");
    for (const arr of list) {
      arr[1] === 1 ? (console.log(padding, arr[0]), one++) : "";
    }
    one === 0 ? console.log("-") : "";

    console.log("✅ DONE:");
    for (const arr of list) {
      arr[1] === 2 ? (console.log(padding, arr[0]), two++) : "";
    }
    two === 0 ? console.log("-") : "";
  }
  if (sort === "priority") {
    console.log("😎 Take Your Time:");
    for (const arr of list) {
      arr[2] === "a" ? (console.log(padding, arr[0]), zero++) : "";
    }
    zero === 0 ? console.log("-") : "";

    console.log("😐 Mildly Important:");
    for (const arr of list) {
      arr[2] === "b" ? (console.log(padding, arr[0]), one++) : "";
    }
    one === 0 ? console.log("-") : "";

    console.log("😬 Super Urgent:");
    for (const arr of list) {
      arr[2] === "c" ? (console.log(padding, arr[0]), two++) : "";
    }
    two === 0 ? console.log("-") : "";
  } else {
    console.log("Please set the display mode either to status or priority");
  }
};

// Tests

addTask("walk the dog", 0, "c");
addTask("wash the dog", 1, "a");
addTask("feed the dog", 2, "b");

deleteTask("feed the dog");

displayList("status");
displayList("priority");
updateTask("wash the dog", 2, "a");

console.log("new status!!!!!!!!!!!");
displayList("status");
displayList("priority");

// Edge inputs
addTask("play with the dog", 2, "");
displayList("statuq");
addTask("play with the puppy", 4, "d");
