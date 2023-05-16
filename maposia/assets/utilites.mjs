
function  convertUnix(timestamp, timezone){
    return ((timestamp + timezone) * 1000 )
}

function convertTime(timestamp, timezone) {
    const date = new Date(convertUnix(timestamp, timezone));
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    return date.toLocaleTimeString([], options)
}



export default convertTime