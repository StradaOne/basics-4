const BODY = document.body,
      colors = ['red', 'blue', 'green', 'orange'];

    
function changeCol(){
 setInterval(()=>
    BODY.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
, 2000)
}
changeCol()
