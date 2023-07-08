import { errorHandlers } from "./ErrorsHandlers.js";

export const emptyName = (name) => {
  if (!name.trim()) {
    throw new errorHandlers.EmptyTaskError();
  } else {
    return name;
  }
};

export const containsTask = (arr, searchValue) => {
  return arr.findIndex((task) => task.name === searchValue) !== -1;
};

export const readTask = (task) => {
  if (!("name" in task)) {
    throw new errorHandlers.PropertyRequiredError("name");
  }
  if (!("priority" in task)) {
    throw new errorHandlers.PropertyRequiredError("property");
  }
  if (!("done" in task)) {
    throw new errorHandlers.PropertyRequiredError("done");
  }
  if (!("id" in task)) {
    throw new errorHandlers.PropertyRequiredError("id");
  }
  if (!("date" in task)) {
    throw new errorHandlers.PropertyRequiredError("date");
  }
  if (!("formattedDate" in task)) {
    throw new errorHandlers.PropertyRequiredError("formattedDate");
  }

  return task;
};
