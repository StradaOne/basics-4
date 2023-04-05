function showVerticalMessage (message) {
    let i = 0;
    if (message[i] == "s"){
        console.log(message[i].toUpperCase());
        i++;
    }

    for (i; i < message.length; i++) {
        if (message[0] == "s"){
            
        }
        if (i >= 7) {
            break;
        }
        console.log(message[i]);
    }
}

showVerticalMessage("sssstrada");