
const express = require('express')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})

//RUTAS
app.get('/', (req, res) => {
    //throw new Error(`Servidor`)
    res.send({ mensaje: `ESTO ES UNA PRUEBA` })
})

server.on('error', (err) => { console.log(`=====> ERROR: ${err}`)})