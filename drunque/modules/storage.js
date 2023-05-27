export function storage(render) {
  const storage = {};

  function saveData() {
    const dataToSave = { ...storage, history: Array.from(storage.history) };
    localStorage.setItem("aktobe-data", JSON.stringify(dataToSave));
    render(dataToSave.history);
  }

  const publicMethods = {
    history: {
      addData(data) {
        storage.history.add(data);
        saveData();
      },
      deleteData(data) {
        storage.history.delete(data);
        saveData();
      },
      loadData() {
        const loadedData = JSON.parse(localStorage.getItem("aktobe-data"));
        const hasPreviousData =
          loadedData && loadedData.history && loadedData.history.length;
        const history = hasPreviousData ? [...loadedData.history] : [];
        storage.history = new Set(history);
        render(storage.history);
      },
      hasData(data) {
        return storage.history.has(data);
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
