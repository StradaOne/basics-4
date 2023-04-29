export function taskManager() {
  const taskList = [];

  const validation = {
    isValid() {
      return true;
    },
  };

  const defaultValues = {
      status: "To Do",
      priority: "High",
  };

  const privateFunctions = {
    setTaskID() {
      const randomNumber = Math.floor(Math.random() * 10 ** 8);
      const taskID = randomNumber.toString(16).slice(-6);

      if (taskList) {
        const isIDExist = Boolean(taskList.find((task) => task.id === taskID));
        if (isIDExist) this.setTaskID();
      }

      return taskID;
    },
  };

  const publicFunctions = {
    getListLength() {
      return taskList.length;
    },

    getTaskID(index) {
      const task = taskList[index];
      return task.id;
    },

    getTaskData(taskID) {
      const task = taskList.find((task) => task.id == taskID);

      return {
        id: task.id,
        name: task.name,
        priority: task.priority,
        status: task.status,
      };
    },

    addTask(name, properties) {
      if (validation.isValid()) {
        const defaultProperties = defaultValues;

        const task = {
          id: privateFunctions.setTaskID(),
          name: name,
        };
        if (typeof properties === "undefined") properties = defaultProperties;

        for (const prop of Object.keys(defaultProperties)) {
          if (typeof properties[prop] === "undefined")
            properties[prop] = defaultProperties[prop];
          task[prop] = properties[prop];
        }

        taskList.push(task);
      }
    },

    changeProperty(id, property, value) {
      if (validation.isValid()) {
        const task = taskList.find((task) => task.id === id);
        task[property] = value;
      }
    },

    deleteTask(id) {
      if (validation.isValid()) {
        const taskIndex = taskList.findIndex((item) => item.id === id);
        taskList.splice(taskIndex, 1);
      }
    },
  };

  return publicFunctions;
}
