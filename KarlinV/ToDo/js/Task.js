export function Task(name, priority) {
  this.name = name;
  this.priority = priority;
  this.done = false;
  this.id = generateId();
  this.data = dateOfCreate();

  function dateOfCreate() {
    const today = new Date();
    const dd = today.getDate().toString().padStart(2, "0");
    const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    const yy = today.getFullYear();
    const time = `${today.getHours()}:${today.getMinutes()}`;

    return `Дата создания ${dd}.${mm}.${yy} в ${time}`;
  }

  function generateId() {
    const id = new Date().getTime();
    return `task-${id}`;
  }
}
