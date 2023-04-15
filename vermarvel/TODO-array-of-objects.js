"use strict";

// ToDo via arrays

//README
// An initially empty list of tasks is an empty array. Once task is added it is added as an object.
// Global functions are for add, update, delete and display list (sorted: 2 options).
// Status can be 0, 1 or 2 ('to do', 'in progress', 'done').
// Priority can be 'a', 'b' or 'c' or '' (not urgent, mildly urgent, super urgent or no priority)

const list = [];

// Errors

const errorStatus = `❌Please set the status to numbers 0 for a non-started task, 1 a task in progress or 2 for completed task`;
const errorPriority = `❌Please set the priority to 'a', 'b', 'c' or leave empty, where 'a' - low priority, 'b' - mild priority or 'c' - the most urgency`;
const errorNoTask = `❌ The list has no such task`;
const errorSort = "❌ Please set the display mode either to status or priority";
const errorTask = "❌ Please insert the task in any language or symbols";

// Global manipulation functions

const addTask = function (taskname, status = 0, priority = "a") {
  // Guard clause
  if (status !== 0 && status !== 1 && status !== 2)
    return console.log(errorStatus);
  if (priority !== "a" && priority !== "b" && priority !== "c") return;
  console.log(errorPriority);
  if (taskname === `` || taskname === undefined) return console.log(errorTask);

  const newTask = { task: taskname, status: status, priority: priority };
  list.push(newTask);
};

const deleteTask = function (task) {
  const toBeDeleted = list.findIndex((item) => item.task === task);
  if (toBeDeleted === -1) return console.log(errorNoTask);
  list.splice(toBeDeleted, 1);
};

const updateTask = function (task, status = 0, priority = "a") {
  // Guard clause
  if (
    (status !== 0 && status !== 1 && status !== 2 && status !== "") ||
    status === undefined
  )
    return console.log(errorStatus);

  if (
    (priority !== "a" &&
      priority !== "b" &&
      priority !== "c" &&
      priority !== "") ||
    priority === undefined
  )
    return console.log(errorPriority);

  const toBeEdited = list.findIndex((item) => item.task === task);
  list[toBeEdited].status = status;
  list[toBeEdited].priority = priority;
};

const displayList = function (sort) {
  // Guard clause
  if (sort === undefined || sort === "") sort = "status";
  // helper variables
  const padding = "       ";
  let zero = 0;
  let one = 0;
  let two = 0;

  // Sort by status

  if (sort === "status") {
    console.log("♻ To Do:");
    list.forEach((el) => {
      el.status === 0 ? (console.log(padding, el.task), zero++) : "";
    });

    zero === 0 ? console.log(padding, "-") : "";

    console.log("▶ In Progress:");
    list.forEach((el) => {
      el.status === 1 ? (console.log(padding, el.task), one++) : "";
    });

    one === 0 ? console.log(padding, "-") : "";

    console.log("✅ DONE:");
    list.forEach((el) => {
      el.status === 2 ? (console.log(padding, el.task), two++) : "";
    });
  }
  two === 0 ? console.log(padding, "-") : "";

  // Sort by priority

  if (sort === "priority") {
    console.log("😎 Take Your Time:");
    list.forEach((el) => {
      el.priority === "a" ? (console.log(padding, el.task), zero++) : "";
    });
    zero === 0 ? console.log(padding, "-") : "";

    console.log("😐 Mildly Important:");
    list.forEach((el) => {
      el.priority === "b" ? (console.log(padding, el.task), one++) : "";
    });
    one === 0 ? console.log(padding, "-") : "";

    console.log("😬 Super Urgent:");
    list.forEach((el) => {
      el.priority === "c" ? (console.log(padding, el.task), two++) : "";
    });
    two === 0 ? console.log(padding, "-") : "";
  } else {
    console.log(errorSort);
  }
};

// Tests

// addTask("clean the a/c filter", 0, "c");
// addTask("bake 2 apple pies", 0, "c");
// addTask("pack the bags for the trip", 1, "a");
// addTask("confirm the airline bookings", 2, "b");

// deleteTask("bake 2 apple pies");

// displayList("status");
// displayList("priority");
// updateTask("confirm the airline bookings", 0, "a");

// // displayList("status");
// // displayList("priority");

// // Edge inputs
// addTask("play with the dog", 2, "");
// addTask(``);
// addTask("check the engine");
// displayList("statuq");
// displayList();
// deleteTask("play with the puppy");
// updateTask("confirm airline bookings", 0, "x");
