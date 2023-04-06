function showVerticalMessage(newString) {
	newString = newString[0].toUpperCase() + newString.slice(1, 7);
	for (let strMassege of newString) {
		console.log(`// ${strMassege}`);
	}
}

showVerticalMessage("strada");