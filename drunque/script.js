function taskManager() {
  return {
    taskList: [],

    validation: {
      isValid() {
        return true;
      },
    },

    settings: {
      indent: ` `.repeat(4),

      default: {
        property: "status",
        properties: {
          value: {
            status: "To Do",
            priority: "High",
          },
          values: {
            status: ["To Do", "In Progress", "Done"],
            priority: ["Low", "Medium", "High"],
          },
        },
      },
    },

    addTask(name, properties) {
      if (this.validation.isValid()) {
        const defaultProperties = this.settings.default.properties.value;

        const task = {
          id: this.setTaskID(),
          name: name,
        };

        if (typeof properties === "undefined") properties = defaultProperties;

        for (const prop of Object.keys(defaultProperties)) {
          if (typeof properties[prop] === "undefined")
            properties[prop] = defaultProperties[prop];
          task[prop] = properties[prop];
        }

        this.taskList.push(task);
      }
    },

    setTaskID() {
      const taskList = this.taskList

      const randomNumber = Math.floor(Math.random() * 10**8)
      const taskID = randomNumber.toString(16).slice(-6);


      const isTaskListEmpty = taskList.length === 0
      const isIdExist = Boolean(taskList.find(task => task.id === taskID)) 
      if (isTaskListEmpty) {
        if (isIdExist) this.setTaskID();
      }

      return taskID;
    },

    getTaskID(name) {
      const task = this.taskList.find((task) => task.name === name);
      return task.id;
    },

    changeProperty(id, property, value) {
      if (this.validation.isValid()) {
        const task = this.taskList.find((task) => task.id === id);
        task[property] = value;
      }
    },

    deleteTask(id) {
      if (this.validation.isValid()) {
        const taskList = this.taskList;
        const taskIndex = taskList.findIndex((item) => item.id === id);
        delete taskList[taskIndex];
      }
    },

    showProperty(filter, property) {
      if (this.validation.isValid()) {
        console.log(`${property}:`);

        let isEmpty = true;

        const filteredTasks = this.taskList.filter(
          (task) => task[filter] === property
        );

        for (const task of filteredTasks) {
          const defaultProperties = Object.keys(
            this.settings.default.properties.value
          );
          const settings = this.settings;

          const restProperties = defaultProperties
            .filter((item) => item !== filter)
            .map((filter) => task[filter]);

          const taskTemplate = `${settings.indent}${task.id} | ${
            task.name
          } - ${restProperties.join(", ")}`;
          console.log(taskTemplate);

          isEmpty = false;
        }

        if (isEmpty) console.log(`${this.settings.indent}-`);
      }
    },

    showList(filter) {
      if (typeof filter === "undefined")
        filter = this.settings.default.property;

      if (this.validation.isValid()) {
        for (const property of this.settings.default.properties.values[
          filter
        ]) {
          this.showProperty(filter, property);
        }
      }
    },
  };
}

const drunque = taskManager();

drunque.addTask("listen to techno", {
  status: "In Progress",
  priority: "Medium",
});

drunque.addTask("look for keys");
drunque.addTask("run 10.5 km");

drunque.showList();

console.log("-".repeat(20));

drunque.deleteTask(drunque.getTaskID("look for keys"));
drunque.changeProperty(
  drunque.getTaskID("listen to techno"),
  "priority",
  "High"
);

drunque.showList("priority");
