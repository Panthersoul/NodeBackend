import express from "express";
import routerHandlebars from "./routes/indexHandlebars.js";
import { engine } from "express-handlebars";


//Obtengo la ruta absoluta
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = routerHandlebars;
const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+"/views/viewsHandlebars/");

app.use('/', router);

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
