const categories = document.querySelectorAll(".categori")

document.querySelector(".categories__bar").onclick = function(event) {
	console.log(categories)
	categories[0].classList.remove('select');
	categories[1].classList.remove('select');
	categories[2].classList.remove('select');
	event.target.classList.add('select')
}