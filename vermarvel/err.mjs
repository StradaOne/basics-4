class RunError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ConnectionError extends RunError {
  constructor(message) {
    super(message);
    this.name = "ConnectionError";
  }
}

class NotFoundError extends RunError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

export default {
  RunError,
  ConnectionError,
  NotFoundError,
};
