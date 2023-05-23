
function delButon(city) {
  const delBtn = city.querySelector('.closeButton')
  delBtn.addEventListener('click', () => {
    city.remove(city)
  })
}
export {delButon}