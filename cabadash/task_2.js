'use strict'; 
//find 

const arr = ['cat', 'dog', 'elephant', 'tiger', 'lion'];

arr.find(words => {
    if (typeof words === 'string' && (words.length > 6)) {
        console.log(words);
    }
});

