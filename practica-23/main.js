function showVerticalMessage(string){
    string = string[0].toUpperCase() + string.slice(1, string.lenght);
    for(let char of string){
        char = char + "\n";
        console.log(char);
        
    }
}
showVerticalMessage("strada");
