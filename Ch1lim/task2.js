function getAverage(marks){
    const quantity = marks.length;     
    let sum = 0;

    marks.forEach(num => {
        sum += num;
    });

    return Math.floor(sum / quantity);
}