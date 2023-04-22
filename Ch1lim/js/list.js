export function blockResults(data){
    const listEl = document.createElement('li');
    listEl.className = 'block_result_list_el';
    listEl.textContent = data;
    listEl.addEventListener('click', ()=>listEl.remove());
    return listEl;
}
