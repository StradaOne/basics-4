class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export const errorHandlers = {
  EmptyTaskError: class EmptyTaskError extends MyError {
    constructor() {
      super("Описание задачи не может быть пустым.");
    }
  },
  DuplicateTaskError: class DuplicateTaskError extends MyError {
    constructor() {
      super("Задача уже существует.");
    }
  },
  PropertyRequiredError: class PropertyRequiredError extends MyError {
    constructor(property) {
      super("Нет свойства: " + property);
    }
  },
};
