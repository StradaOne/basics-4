class RunError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ConnectionError extends RunError {
  constructor() {
    super("💥 Check your Internet connection");
    this.name = "ConnectionError";
  }
}

class NotFoundError extends RunError {
  constructor() {
    super("💥 City not found");
    this.name = "NotFoundError";
  }
}

export default {
  RunError,
  ConnectionError,
  NotFoundError,
};
