export function animateCountup(element, targetValue) {
	return new Promise((resolve) => {
		let value = 0;

		const animation = setInterval(() => {
			if (value === targetValue) {
				clearInterval(animation);
				resolve();
				return;
			}

			value += 1;
			element.textContent = value;
		}, 15);
	});
}
