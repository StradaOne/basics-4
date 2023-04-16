function getAverage(marks) {
    const sum = marks.reduce((arraySum, accum) => arraySum + accum)
    const average = sum / marks.length
    const roundedDown = Math.floor(average)
    return roundedDown
}

console.log(getAverage([3, 3, 5, 8])) // 4
