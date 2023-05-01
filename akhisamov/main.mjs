import data from './data.json' assert {type: "json"};

function showName(arr) {
    arr.forEach(item => {
        console.log(item.firstName)
    })
}

function showAllInfo(arr) {
    arr.forEach(item => {
        console.log(`${item.firstName}, born at ${item.dateOfBirth} and ${item.knowsAs}`);
    })
}

showName(data.users);
showAllInfo(data.users);
