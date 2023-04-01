const phoneBook = {
    list:{
        'John Smith' : 12345,
        'David' : 23456,
        'Jane' : 34567,
        'Kate' : 456789
    },
    add(key){
        this.list[key];
    },
    // delete(name){
    //     delete this.list[name];
    // }
};

phoneBook.add("Sarah Connor");
// console.log(phoneBook.list["Sarah Connor"]);
// phoneBook.delete('David');
console.log(phoneBook);