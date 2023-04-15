function buildFun(n){

	var res = []

	for (var i = 0; i< n; i++){
    function blyat(index){
      res.push(function(){
			return index;
		})
     }
    blyat(i)
    
	}
	return res
}