var Im = /** @class */ (function () {
    function Im(name, age) {
        this.name = name;
        this.age = age;
    }
    return Im;
}());
var Man = /** @class */ (function () {
    function Man(name, age, phone, adres) {
        this.name = name;
        this.age = age;
        this.phone = "+".concat(phone);
        this.adres = "Russia ".concat(adres);
    }
    return Man;
}());
var users = {
    Human: new Im("Nikita", 20),
    Human1: new Man("Andry", 25, 88005553535, "Novosibirsk"),
    Human2: new Man("Dariya", 10, 88005553535, "Novokuzneck"),
    Human3: new Man("Artem", 50, 88005553535, "Moscov"),
};
console.log(users);
