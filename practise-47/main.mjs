
import data from './data.json' assert {type: "json"};

let newData1 = JSON.stringify(data, function replacer(key, value){
    return key === "abracadabra" ? undefined : value;
}, 2);
console.log(newData1)


let newData2 = JSON.parse(newData1, function(key, value){
    return key === "abracadabra" ? undefined : value;
});
console.log(newData2)

for(const item of newData2.users){
    let result = '';
    for(const item2 in item){
        result += item[item2] + ' ';
    }
    console.log(result)
}
