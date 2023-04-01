const contact = {
    list: {
        "Maksim": 23554443,
        "Marat": 89297826100,
        "Alina": 9040545
    },
    add(name, number){
        this.list[name] = number;
    },
    remove(name){
        delete this.list[name];
    }


}
// contact.add("Yma", 897654345);
// contact.remove("Alina");
// console.log("Marat" in contact.list);
for(const name in contact.list){
    console.log(name , " - ", contact.list[name]);
}