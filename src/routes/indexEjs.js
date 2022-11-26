import express, { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
//Importo la clase de manejo de productos.
import ProductosApi from "../class/product.js"

const router = Router();

const productosApi = new ProductosApi();

const __dirname = dirname(fileURLToPath(import.meta.url));

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.render('main.ejs',{color: "blue", productos: productosApi})
})

router.get('/productos', (req, res) => {
    res.render('productos.ejs', {productos: productosApi} )
})

router.post('/productos', (req, res) => {    
    productosApi.guardar(req.body);
    return res.redirect('/');
})


export default router;