
const http = require('http')
const moment = require('moment')

const PORT = 8080

const server = http.createServer((peticion, respuesta) => {
    let currentHour = moment().format('HH')
    console.log(currentHour)
    let texto = '-'
    //asdsa
    console.log('sadasd')
    // 6 y 12 => BUENOS DIAS
    // 13 y 19 => BUENAS TARDES
    // 20 y 5 BUENAS NOCHES
    if(currentHour >= 6 && currentHour <= 12) {
        texto = "BUENOS DIAS"
    } else if(currentHour >= 13 && currentHour <= 19) {
        texto = "BUENOS TARDES"
    } else if(currentHour >= 20 || currentHour <= 5) {
        texto = "BUENOS NOCHES" 
    }

    respuesta.end(texto)
})

const connectedServer = server.listen(PORT, () => {
 console.log(`Servidor HTTP escuchando el puerto 
    ${connectedServer.address().port}
 `)
})
