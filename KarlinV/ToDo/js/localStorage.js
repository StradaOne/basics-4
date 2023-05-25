export function setTasksLocalStorage(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    console.error(
      `Не удалось сохранить задачи в локальное хранилище: ${error}`
    );
  }
}

export function getTasksLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(
      `Не удалось получить задачи из локального хранилища: ${error}`
    );
    return null;
  }
}
