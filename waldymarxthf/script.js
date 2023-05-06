const tabs = document.querySelectorAll('.tabs__item');
const weatherBlocks = document.querySelectorAll('.weather__block');

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'))
		weatherBlocks.forEach(w => w.classList.remove('active'));

		tab.classList.add('active')
		weatherBlocks[index].classList.add('active');
	});
});
