import express, { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { create } from 'express-handlebars';
//Importo la clase de manejo de productos.
import ProductosApi from "../class/product.js"
import { DiffieHellmanGroup } from "crypto";

const productosApi = new ProductosApi();

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }))


router.get('/', (req, res) => {
    res.render('home', {productos: JSON.stringify(productosApi)});
    
})

router.get('/productos', (req, res) => {
    res.render('productos', {productos: JSON.stringify(productosApi)});
    
})

router.post('/productos', (req, res) => {    
    console.log(req.body);
    productosApi.guardar(req.body);
    return res.redirect('/');
})

export default router;