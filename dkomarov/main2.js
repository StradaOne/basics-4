function getAverage(marks){
    const add = marks => marks.reduce((a,b) => a+b, 0);
    const average = add(marks)/marks.length;
    return (Math.round(average))
}