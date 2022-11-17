const express = require('express')
const moment = require('moment')


const router = require('Router')

const contenedor = new Contenedor('./productos.txt')

    const app = express()

    app.use('./mascota', express.static('./routes/mascota.routes.js'))
    app.use('./persona', express.static('./routes/mascota.routes.js'))


    const PORT = 8080
    //Inicializo
    const server = app.listen(PORT, () => {
        console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
    })

