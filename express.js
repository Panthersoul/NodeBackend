const express = require('express')
const moment = require('moment')
const Contenedor = require('./contenedor.js')

const contenedor = new Contenedor('./productos.txt')

async function datosPrueba (){
        //DATOS DE PRUEBA
            const item1 = {
                title: "Escuadra",
                price: 123.56,
                thumbnail: "https://f.fcdn.app/imgs/d4d97e/www.compinches.com.uy/cpinuy/95e7/original/catalogo/7750082001312_7750082001312_1/1920-1200/escuadra-60-x-20-cm-escuadra-60-x-20-cm.jpg"
            }

            const item2 = {
                title: "Calculadora",
                price: 423.67,
                thumbnail: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/c/a/calculadora-8-digitos-mw-8v-4935-default-1.jpg"
            }

            const item3 ={
            title: "Globo Terraqueo",
            price: 531.55,
            thumbnail: "https://f.fcdn.app/imgs/a24454/www.elclon.com.uy/clonuy/eae4/original/catalogo/3483-3/460_460/globo-terraqueo-21-4cm-0620-globo-terraqueo-21-4cm-0620.jpg"
            }

        let id1 = await contenedor.save(item1);
        let id2 = await contenedor.save(item2);
        let id3 = await contenedor.save(item3);  
}

async function main (){
    //Creo la instancia
    const app = express()
    const PORT = 8080
    //Inicializo
    const server = app.listen(PORT, () => {
        console.log(`Servidor prendido escuchando el puerto: ${PORT}`)
    })

    //Limpio el txt con los datos
    await contenedor.deleteAll();
    //Cargo los 3 datos de prueba
    await datosPrueba();

    let visitas = 0
    //RUTAS
    app.get('/', (req, res) => {
        visitas++
        res.send(`<h3 style="font-family: cursive;text-align: center;color:blue;">Bienvenidos al servidor de express</h1>`)
    })

    
    let productos = await contenedor.getAll();
    let productoRandom = await contenedor.getRandom();

    app.get('/productos', (req, res) => {    
        res.send(productos)
    })

    app.get('/productoRandom', (req, res) => {
        res.send(productoRandom)
    })

    server.on('error', (err) => { console.log(` =====> ERROR: ${err}`)})
}




main();
