function showVerticalMessage (text) {
    let newText = text.slice (0, 7);

        if (newText.startsWith('s')) {
            console.log ('S');
            newText = newText.slice (1);
            //console.log (newText.slice (1));
        }
            
        for (let symbol of newText) {
            console.log (symbol);
        }

}

showVerticalMessage ('stradas');