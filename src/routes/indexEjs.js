import express, { Router } from "express";

//Importo la clase de manejo de productos.
import ProductosApi from "../class/product.js"

const router = Router();

// router de productos

const productosApi = new ProductosApi()
const productosRouter = new Router()

productosRouter.use(express.json())
productosRouter.use(express.urlencoded({ extended: true }))

productosRouter.get('/', (req, res) => {
    res.json(productosApi.listarAll())
})

productosRouter.get('/:id', (req, res) => {
    res.json(productosApi.listar(req.params.id))
})

productosRouter.post('/', (req, res) => {
    res.json(productosApi.guardar(req.body))
})

productosRouter.put('/:id', (req, res) => {
    res.json(productosApi.actualizar(req.body, req.params.id))
})

productosRouter.delete('/:id', (req, res) => {
    res.json(productosApi.borrar(req.params.id))
})


export default router;