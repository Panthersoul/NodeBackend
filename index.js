const http = require('http')

const PORT = 8080

const server = http.createServer((peticion, respuesta) => {
    respuesta.end('HOLA MUNDO')
})

const connectedServer = server.listen(PORT, () => {
 console.log(`Servidor HTTP escuchando el puerto 
    ${connectedServer.address().port}
 `)
})

