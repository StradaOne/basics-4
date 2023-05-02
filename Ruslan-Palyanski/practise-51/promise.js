
let promise = new Promise((resolve, rejecte) => {
    resolve(1)
    setTimeout(() => {resolve(2)}, 1000)
})

promise.then((value) => {
    console.log(value)
})


const delay = function (ms){
                const promise = new Promise((resolve, rejecte) => {
                    setTimeout(() => {
                        resolve('Done')
                    }, ms)
                })
                return promise;
            }

delay(3000).then(() => {
    console.log('выполнилось через 3 секунды')
})


