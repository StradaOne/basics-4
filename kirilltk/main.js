
function showVerticalMessage(str) {
	if (str.length  > 7 && str.startsWith('s')) {
		for (let i = 0; i < 7; i++) {
			(i === 0) ? console.log(str[i].toUpperCase()) : console.log(str[i]);
		};
	} else if (str.length  > 7) {
		for (let i = 0; i < 7; i++) {
			console.log(str[i]);
		};
	} else if (str.startsWith('s')) {
		for (let i = 0; i < str.length; i++) {
			(i === 0) ? console.log(str[i].toUpperCase()) : console.log(str[i]);
		};
	} else {
		for (let i = 0; i < str.length; i++) {
			console.log(str[i]);
		};
	};
};

showVerticalMessage('stradaaaaaa');