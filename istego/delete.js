export function deleteDiv(elemDiv) {
    elemDiv.addEventListener('click', () => {
        elemDiv.remove();
    })
}
