function showVerticalMessage(str, end) {
    let newStr = '';
    if (str[0] === 's') {
        newStr = str.slice(0, 1).toUpperCase() + str.slice(1, end);
    } else {
        newStr = str.slice(0, end);
    }

    for (let i = 0; i < newStr.length; i++) {
        console.log(newStr[i]);
    }

};

showVerticalMessage('dtradafffffffffffffff', 7);