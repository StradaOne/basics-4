// clone with "for in"
const worker1 = {
    name:"Vasya",
    age: 15,
    profession: "pupil"

};

const worker2 = {};

for (const key in worker1){
    worker2[key]=worker1[key];
}
worker2.name = "Sergey";
worker2.age = 18;

console.log(worker2);

// object.assign
const pupil1 = {
    name:"Vasya",
    age: 15,
    profession: "pupil"

};

const pupil2 = {location : "Russia"};
const pupil3 = {city: "Orenburg"};

Object.assign(pupil1,pupil2,pupil3);
console.log(pupil1);

// Simply cloning

const solder1 = {
    name:"Vasya",
    age: 35,
    profession: "driver"

};

const solder2 = Object.assign({},solder1);

solder2.name = "Alex";
console.log(solder2);

// ...spread

const car1 = {
    "max speed": 200,
    weight:1500,
    color:"black"
};

const car2 = {...car1};
car2.color = "red";

console.log(car2);
