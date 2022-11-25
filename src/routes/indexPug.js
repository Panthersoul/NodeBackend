import express, { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

//Importo la clase de manejo de productos.
import ProductosApi from "../class/product.js"

const productosApi = new ProductosApi();

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    console.log(productosApi);
    res.render('datos.pug', productosApi)
})

// Devuelvo la plantilla HandleBars
router.get('/productos', (req, res) => {
    res.sendFile(join(__dirname,"../views/viewsHandlebars/index.html"), {products: productosApi})
})

router.post('/productos', (req, res) => {    
    productosApi.guardar(req.body);
    return res.redirect('/');
})


export default router;