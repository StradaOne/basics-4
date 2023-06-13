export function saveToLocalStorage (key, value){
   localStorage.setItem(key, JSON.stringify(value));
}
export function loadFromLocalStorage(key){
   const location = JSON.parse(localStorage.getItem(key));
   return location;
}