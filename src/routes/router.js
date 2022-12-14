import express, {Router} from "express";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import Productos from "../class/product.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const prods = new Productos("./productos.txt");


const router = Router();

/*Importante para recibir por BODY lo del POST*/
router.use(express.json());
router.use(express.urlencoded({ extended: true }))


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
})
router.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/pages/addProduct.html'));    
})
router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname,'../public/pages/listProducts.html'));
})

export default router;