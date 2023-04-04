function lineOutput(string) {
    if (string[0] === "s") {
        let startSymbol = string[0].toUpperCase();
        let myString = startSymbol + string.slice(1,6);
        for (let str of myString) {
            console.log(str);
        };
        
    } else {
        for (str of string.slice(0,7)) {
            console.log(str);
        }; 
    };
};


lineOutput("strada777")