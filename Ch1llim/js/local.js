export function setLS(data, name) {
    const elText = JSON.stringify(data);
    localStorage.setItem(name, elText)
}

export function getLS(name){
    const elText =  localStorage.getItem(name)
    const el = JSON.parse(elText)
    return el
}