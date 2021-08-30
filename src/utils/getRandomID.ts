function getRandomID(length = 10) {

    let id = ""
    for (let c = 0; c < length; c++) {
        // de 0 ~ 35
        let code = Math.floor(Math.random()*36)
        if (code<10){
            id += code
        }else{
            code += 55 //Letras maiúsculas (code: 65~90)
            id += String.fromCharCode(code)
        }
    }

    return id
}

export {getRandomID}