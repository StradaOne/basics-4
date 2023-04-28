import data from './data.json' assert {type: "json"}; 

let obj = Object.values(data)[0];
obj.forEach(el => {
    console.log(`${el.firstName}, born at ${el.dateOfBirth} and ${el.knowsAs}`)
});