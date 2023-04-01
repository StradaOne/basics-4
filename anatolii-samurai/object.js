const phoneBook = {
    list:{
        'John Smith' : 12345,
        'David' : 23456,
        'Jane' : 34567,
        'Kate' : 456789
    },
    log(){
        console.log(this.list);
    }
   
};

phoneBook.log();
// phoneBook.list.Zara = 555555;
// delete phoneBook.David;

// let anotherPhoneBook = phoneBook;
// // console.log(phoneBook.Jane = 777777);
// anotherPhoneBook.list["John Smith"] = 890000;
// console.log(anotherPhoneBook);
// let listName = phoneBook.list.David;

// console.log(listName);