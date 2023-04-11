const phoneBook = {
    "A" : 1,
    "B" : 2,
    "C" : 3,
    "D" : 4,
    "E" : 5
};

phoneBook["C"] = 123;

console.log (phoneBook);
console.log (phoneBook.A);
console.log (phoneBook["B"]);
console.log (phoneBook["C"]);

console.log ("----------------");

phoneBook["F"] = 890;
console.log (phoneBook["F"]);

delete phoneBook["F"];
console.log (phoneBook["F"]);

console.log ("----------------");
console.log ("****************");

const Book = {
    list: {
        "Z" : 100,
        "X" : 200,
        "C" : 300
    },

    log() {
        console.log (this.list);
    }
};

Book.log();