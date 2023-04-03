const todo = {
  list: {
    "create a new practice task": "In Progress",
    "make a bed": "Done",
    "write a post": " To Do"
  },
  changeStatus(task, status) {
    this.list[task] = status
  },
  addTask(newTask) {
    this.list[newTask] = "To Do"
  },
  deleteTask(task) {
    delete this.list[task]
  },
  showList() {
    let i = 0;
    console.log(("---To Do List---"))
    console.log("In Progress:")
    for (const name in todo.list) {
      if (this.list[name] === "In Progress") {
        console.log(`\t` + name)
        i++
      }
      if (i === 0) {
        console.log(`\t` + "-")
        break
      }
    }
    console.log("Done:")
    for (const name in todo.list) {
      if (this.list[name] === "Done") {
        console.log(`\t` + name)
        i++
      }
      if (i === 0) {
        console.log(`\t` + "Nothing is Done")
        break
      }
    }
    console.log("To Do:")
    for (const name in todo.list) {
      if (this.list[name] === "To Do") {
        console.log(`\t` + name)
        i++
      }
      if (i === 0) {
        console.log(`\t` + "-")
        break
      }
    }
  }
}

todo.addTask("do a jog", "To Do");
todo.deleteTask("make a bed");
todo.changeStatus("make a bed", "Done");
todo.addTask("learn English")
todo.showList();


