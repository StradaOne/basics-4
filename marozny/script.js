const tabs = document.querySelectorAll('.tabs__item')
const weatherBlock = document.querySelectorAll('.weather__block')

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'))
		weatherBlock.forEach(w => w.classList.remove('active'))

		tab.classList.add('active')
		weatherBlock[index].classList.add('active')
	})
})