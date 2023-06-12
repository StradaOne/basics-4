function setVertical(theString) {
    if (theString[0] === 's') {
        theString = theString[0].toUpperCase() + theString.slice(1);
    };
    if (theString.length > 7) {
        theString = theString.slice(0,7);
    }
    for (let char of theString) {
        console.log(char);
    };
};
setVertical('strada');