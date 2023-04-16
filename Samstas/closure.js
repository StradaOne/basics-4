function buildFun(n){
    let res = [];

    for (let i = 0; i < n; i += 1){
      res.push((function(num) {
        return function() {
          return num;
        }
      })(i));
    }

    return res;
  }