export function storage(render) {
  const storage = {
    history: [],
  };

  const defaultQuery = "Aktobe";

  function saveData() {
    localStorage.setItem("aktobe-data", JSON.stringify(storage));
    render(storage.history);
  }

  return {
    addHistoryData(data) {
      storage.history.push(data);
      saveData();
    },
    removeHistoryData(data) {
      storage.history.splice(storage.history.indexOf(data), 1);
      saveData();
    },
    loadHistoryData() {
      const loadedData =
        JSON.parse(localStorage.getItem("aktobe-data")).history || [];
      if (!loadedData.length) return;
      for (const data of loadedData) storage.history.push(data);
      render(storage.history);
    },
    historyIncludes(data) {
      return storage.history.includes(data);
    },
    setData(key, value) {
      storage[key] = value;
      saveData();
    },
    getData(key) {
      const data = JSON.parse(localStorage.getItem("aktobe-data"));
      return data[key] || defaultQuery;
    },
  };
}
