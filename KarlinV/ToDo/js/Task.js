export class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
    this.done = false;
    this.id = this.generateUniqueID();
    this.date = new Date();
    this.formattedDate = this.getFormattedDate();
  }

  getFormattedDate() {
    const today = this.date;
    const dd = today.getDate().toString().padStart(2, "0");
    const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    const yy = today.getFullYear();
    const time = `${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}`;

    return `Дата создания ${dd}.${mm}.${yy} в ${time}`;
  }

  generateUniqueID() {
    const id = new Date().getTime();
    return `task-${id}`;
  }
}
