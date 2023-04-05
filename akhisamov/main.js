function showVerticalMessage(item) {
    let itemStr = item;
    
    if (item[0] === 's') {
        itemStr = itemStr[0].toUpperCase() + itemStr.slice(1);
    }

    if (itemStr.length > 7) {
        itemStr = itemStr.slice(0, 7);
    }
    
    let message = '';
    for (i = 0; i < itemStr.length; i++) {
        message += `${itemStr[i]}\n`;
    }
    console.log(message);
}

showVerticalMessage('s234567890');
