function changeBG() {
	const colors = ['red', 'blue', 'green', 'orange'];
	let timer = setInterval(function tick() {
		let randomColor = colors[Math.floor(Math.random() * colors.length)];
		document.body.style.background = randomColor
		timer = setTimeout(tick, 2000)
	}, 2000)
}

changeBG()