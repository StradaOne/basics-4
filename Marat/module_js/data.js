
export function presentTime(){
    const data = new Date();

    const hourAndMinute = data.getHours() + ':' + data.getMinutes();
    return hourAndMinute
}

export function currentTime(time){
    data = new Date(time);
    const hourAndMinute = data.getHours() + ':' + data.getMinutes();
    return hourAndMinute;
}

console.log(presentTime());
