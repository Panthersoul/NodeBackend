import express from "express";
import routerEjs from "./routes/indexEjs.js";
import routerHandlebars from "./routes/indexHandlebars.js";
import routerPug from "./routes/indexPug.js";


//Obtengo la ruta absoluta
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


    //********   Defino routers en funcion del template a usar     */
//const router = routerEjs; 
//const router = routerHandlebars;
const router = routerPug;

const app = express()

///////////////////////// PUG
app.set('views', __dirname+"/views/viewsPug");
app.set("view engine", "pug");
app.use('/', router)


// EJS //////////////////////////////////////////
// app.set('views', __dirname+"/views/viewsEjs");
// app.set("view engine", "ejs");
// app.use('/', router)


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
