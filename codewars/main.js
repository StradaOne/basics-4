
function buildFun1(n){

	let res = [];

	for (var i = 0; i < n; ++i){
		res.push(((i) => {
      return function(){
        console.log(i)
      }
    })(i))
	}

	return res;
}

function buildFun2(n){

	let res = [];

	for (let i = 0; i < n; ++i){
		res.push(function(){
			console.log(i)
		})
	}

	return res;
}

function buildFun3(n){

	let res = [];

	for (var i = 0; i < n; ++i){
    let j = i;
		res.push(function(){
			console.log(j)
		})
	}

	return res;
}

function showResult(func, n){
    for(let i = 0; i < 10; i++){
        func(n)[i]()
    }
}

showResult(buildFun1,10)
showResult(buildFun2,10)
showResult(buildFun3,10)


function getAverage(marks){
    let numbers = marks.length;
    let sum =   marks.reduce((acc, item) => {
        return acc + item;
      }, 0)
    let result = Math.floor(sum / numbers);
    console.log(result)
  }

getAverage([2,2,2,2])
getAverage([1,2,3,4,5])
getAverage([1,1,1,1,1,1,1,2])

