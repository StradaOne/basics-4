class Storage {
  default = "значение по умолчанию";

  constructor(options) {
    this.names = this.checkDefault(options.names);
    this.how = options.storage;
  }

  checkDefault(options) {
    if (options === "") {
      return this.default;
    } else {
      return options;
    }
  }

  clear() {
    if (this.how == "local") {
      localStorage.removeItem("names");
    } else if (this.how == "session") {
      sessionStorage.removeItem("names");
    } else {
      console.log("нет такого режима");
    }
  }

  isEmpty() {
    if (this.how == "local") {
      let empty = localStorage.getItem("names");
      if (empty == null) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    } else if (this.how == "session") {
      let empty = sessionStorage.getItem("names");
      if (empty == null) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    } else {
      console.log("нет такого режима");
    }
  }

  set() {
    if (this.how == "local") {
      localStorage.setItem("names", JSON.stringify(this.names));
      console.log("выполненно");
    } else if (this.how == "session") {
      sessionStorage.setItem("names", JSON.stringify(this.names));
      console.log("выполненно");
    } else {
      console.log("нет такого режима");
    }
  }

  get() {
    if (this.how == "local") {
      console.log(JSON.parse(localStorage.getItem("names")));
      return JSON.parse(localStorage.getItem("names"));
    } else if (this.how == "session") {
      console.log(JSON.parse(sessionStorage.getItem("names")));
      return JSON.parse(sessionStorage.getItem("names"));
    } else {
      console.log("нет такого режима");
    }
  }
}

const names = new Storage({
  names: "что то",
  storage: "local",
});

names.set();
