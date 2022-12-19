import express, { Router } from "express";

import moment from 'moment';
import Carrito from "../class/carrito.js";


const routerCart = Router();
/*Importante para recibir por BODY lo del POST*/
routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }))


const carrito = new Carrito("./carrito.txt");

routerCart.post('/', (req,res) => {    

    
    const crearCarrito = async() => {
        try{
            
            let carritoNuevo = {
                timestamp: moment.now(),
                productos: []
            }
            let a = await carrito.save(carritoNuevo);
            return res.json(`{"id":"${a}"}`);
        }catch(error){
            throw new Error(error)
        }
    }
    crearCarrito()
})

routerCart.get('/:id/productos',(req,res) => {    
    const enviarProds = async() => {
        try{
            
            let a = await carrito.getById(req.params.id);
            
            return res.json(a);
        }catch(error){
            throw new Error(error)
        }
    }
    enviarProds()
})


routerCart.post('/:id/productos',(req, res) => {    
    const crearCarrito = async() => {
        try{
            
            console.log("Query en el request: "+JSON.stringify(req.query))
            console.log(JSON.stringify(req.body));
            console.log("Parametro en el request: "+JSON.stringify(req.params))
            
            let respuesta = await carrito.addProductsToCart(req.params, req.body)
            return res.json(respuesta);
        }catch(error){
            throw new Error(error)
        }
    }
    crearCarrito()
})



routerCart.delete('/:id', (req, red) => {
    const eliminarCarrito = async() => {
        try{
            console.log(req.params);
            let respuesta = await carrito.deleteById(req.params.id)
            //return red.json(respuesta);
        }catch(error){
            throw new Error(error)
        }
    }
    eliminarCarrito();
})

routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const eliminarCarrito = async() => {
        try{
            console.log(req.params.id, req.params.id_prod);
            let respuesta = await carrito.deleteProductsFromCart(req.params.id, req.params.id_prod)
            return res.json(respuesta);
        }catch(error){
            throw new Error(error)
        }
    }
    eliminarCarrito();
})



export default routerCart;