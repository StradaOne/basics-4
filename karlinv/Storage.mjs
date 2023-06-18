export class Storage {
  constructor(key, option = { type: "local", data: [] }) {
    const { type, data } = option;

    this.key = key;
    this.type = type === "session" ? sessionStorage : localStorage;
    this.set(data);
  }

  get() {
    const data = this.type.getItem(this.key);

    return data !== null ? JSON.parse(data) : this.data;
  }

  set(data) {
    this.type.setItem(this.key, JSON.stringify(data));
  }

  clear() {
    this.type.removeItem(this.key);
  }

  isEmpty() {
    const data = this.get();

    return !data;
  }
}
