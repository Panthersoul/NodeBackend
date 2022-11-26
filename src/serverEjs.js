import express from "express";
import routerEjs from "./routes/indexEjs.js";


//Obtengo la ruta absoluta
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const router = routerEjs; 
const app = express();

// EJS //////////////////////////////////////////
 app.set('views', __dirname+"/views/viewsEjs");
 app.set("view engine", "ejs");
 app.use('/', router)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
