function showVerticalMessage(str){
    let upperStr;
    if (str[0] == "s") {
        upperStr = str[0].toUpperCase() + str.slice(1)
    }

    if (str.length > 7) {
        upperStr = upperStr.slice(0,7);
    }

    let target
    for(let i = 0; upperStr.length > i; ++i) {
        target = upperStr[i];
        console.log(target)
    }
}

showVerticalMessage("strada12345");