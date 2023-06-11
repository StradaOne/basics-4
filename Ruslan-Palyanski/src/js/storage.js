const storage = {
    setDate(dateTimestamp){
        localStorage.setItem('dateEnd', dateTimestamp)
    },
    getDate(){
        const timeStamp = +localStorage.getItem('dateEnd');
        return timeStamp;
    },
}

export {storage};