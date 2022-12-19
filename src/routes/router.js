import express, {Router} from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import Productos from "../class/product.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



const router = Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
})
router.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/pages/addProduct.html'));    
})
router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/pages/listProducts.html'));
})
router.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/pages/cart.html'));
})

export default router;