export function Task(name, priority) {
  this.name = name;
  this.priority = priority;
  this.done = false;
  this.id = generateId();

  function generateId() {
    const id = new Date().getTime();
    return `task-${id}`;
  }
}
