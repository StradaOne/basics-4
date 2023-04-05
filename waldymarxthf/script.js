function showVerticalMessage(string) {
	if(!string) {
		console.log('String is empty')
		return null;
	}
	
	const firstLetter = 's'

	if (string.charAt(0) === firstLetter) {
		string = string.charAt(0).toUpperCase() + string.slice(1);
	}

	const maxLength = Math.min(string.length, 7)
	string = string.slice(0, maxLength);

	for(let i = 0; i < string.length; i++) {
		console.log(string.charAt(i))
	}
	return null;
}

showVerticalMessage('strada');