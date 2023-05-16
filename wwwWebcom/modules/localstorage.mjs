// import{city} from './constants.mjs'

// export function setItem(array) {
//   for (let i = 0; i < array.length; i++) {
//     localStorage.setItem(array[i],"city")
//   }
// }

// export function getItem(index) {
//   return localStorage.key(index)
// }

// export function removeItem(array, index) {
//   console.log(JSON.parse(localStorage.getItem(key)))
//   localStorage.removeItem(array[index])
// }

// export function setlastItem() {
//   localStorage.setItem('lastItem', city.textContent)
// }

export function saveLocationToLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage(key) {
  const result = localStorage.getItem(key)
  return result ? JSON.parse(result) : null
}