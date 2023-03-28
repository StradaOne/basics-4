const telegBook = {
    'Mother': 99999999,
    'Father': 88888888,
    'Brother Arthur': 77777777
};

console.log(telegBook);
console.log(telegBook.Mother);
console.log(telegBook['Brother Arthur']);

telegBook.Mother = 3721832;
telegBook['Brother Ruslan'] = 6666666;
delete telegBook['Brother Arthur'];
console.log (telegBook);