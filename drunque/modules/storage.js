import { ui } from "./ui.js";

function storage(render) {
  const storage = {};

  function saveData() {
    localStorage.setItem("aktobe-data", JSON.stringify(storage));
    render(storage.history);
  }

  const publicMethods = {
    history: {
      addData(data) {
        storage.history.push(data);
        saveData();
      },
      removeData(data) {
        storage.history.splice(storage.history.indexOf(data), 1);
        saveData();
      },
      loadData() {
        const loadedData = JSON.parse(localStorage.getItem("aktobe-data"));
        const history = loadedData ? loadedData.history : [];
        if (!history && !history.length) return;
        storage.history = []
        for (const data of history) storage.history.push(data);
        render(storage.history);
      },
      includes(data) {
        return storage.history.includes(data);
      },
    },
    setData(key, value) {
      storage[key] = value;
      saveData();
    },
    getData(key) {
      const data = JSON.parse(localStorage.getItem("aktobe-data")) || {};
      return data[key];
    },
  };

  return publicMethods;
}


function renderHistoryNode(data) {
  ui.historyNode.textContent = "";

  for (const cityName of data) {
    const historyCityNode = document.createElement("div");
    historyCityNode.classList.add("history-city");

    const cityNode = document.createElement("p");
    cityNode.textContent = cityName;

    const button = document.createElement("button");
    button.classList.add("material-icons");
    button.classList.add("delete-button");
    button.textContent = "clear";
    
    historyCityNode.append(cityNode, button);
    ui.historyNode.append(historyCityNode);
  }
}

export const weatherStorage = storage(renderHistoryNode) 

