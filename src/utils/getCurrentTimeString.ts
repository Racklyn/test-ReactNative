function getCurrentTimeString() {
    let time = new Date()

    //  Formatando Data/Hora
    const YY = time.getFullYear()
    const MM = ('0' + (time.getMonth() + 1)).slice(-2)
    const DD = ('0' + (time.getDate())).slice(-2)
    const h = ('0' + time.getHours()).slice(-2)
    const m = ('0' + time.getMinutes()).slice(-2)
    const s = ('0' + time.getSeconds()).slice(-2)

    return `${YY}/${MM}/${DD} ${h}:${m}:${s}`
    
}


function getHoursFromDate(date: Date) {

    return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
}


export {getCurrentTimeString, getHoursFromDate}