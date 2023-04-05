function showVerticalMessage(newMassege) {
    newMassege = newMassege[0].toUpperCase() + newMassege.slice(1, 7);
    for (let strMassege of newMassege) {
        console.log(`// ${strMassege}`);
    }
}

showVerticalMessage("strada");
// S
// t
// r
// a
// d
// a
