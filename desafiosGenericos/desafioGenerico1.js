const express = require('express')
const moment = require('moment')
const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
})

let visitas = 0

//RUTAS
app.get('/', (req, res) => {
    visitas++
    res.send(`<h1 style="color:blue;">Bienvenidos al servidor de express</h1>`)
})

app.get('/visitas', (req, res) => {
    res.send(`La cantidad de visitas: ${visitas}`)
})

app.get('/fyh', (req, res) => {
    res.send({ fyh: moment().format('DD/MM/YYYY HH:mm:ss') })
})

server.on('error', (err) => { console.log(` =====> ERROR: ${err}`)})