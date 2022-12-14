import express, { Router } from "express";

const routerCart = Router();
/*Importante para recibir por BODY lo del POST*/
routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }))
import moment from 'moment';

import Carrito from "../class/carrito.js";

const carrito = new Carrito("./carrito.txt");


routerCart.post('/',(req,res) => {    
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

routerCart.post('/:id/productos',(req,res) => {    
    const crearCarrito = async() => {
        try{
            
            console.log("fjjfjfj"+JSON.stringify(req.body))
            
            console.log("sd"+JSON.stringify(req.params))
            
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
        }catch(error){
            throw new Error(error)
        }
    }
    eliminarCarrito();
})

routerCart.delete('/:id/productos/:id_prod', (req, red) => {
    const eliminarCarrito = async() => {
        try{
            console.log(req.params);
            //let respuesta = await carrito.deleteById(req.params.id)
        }catch(error){
            throw new Error(error)
        }
    }
    eliminarCarrito();
})



export default routerCart;