import express, { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import moment from 'moment';

import Productos from "../class/product.js";
import { Console } from "console";

const prods = new Productos("./productos.txt");

const __dirname = dirname(fileURLToPath(import.meta.url));
const routerProd = Router();

routerProd.use(express.json());
routerProd.use(express.urlencoded({ extended: true }))

const admin = true;

const validarAdmin = (req, res, next) => {
   
    /*
    req.user = {
      fullName: "Andres",
      isAdmin: true
    };
    */

   if (admin){
    next()
   }else{
    res.json({
        error: -1,
        description: `Ruta ${req.path} método ${req.method} no autorizada`
    })
   }
    
  };



routerProd.get('/', validarAdmin, (req,res) => {   
        const mostrarProductos = async () => {
        try{
            const data = await prods.getAll(prods.fileName);
            
            res.json(JSON.stringify(data))
        }catch(error){
            throw new Error(error)
        }
    }
    mostrarProductos();
})

routerProd.get('/:id', validarAdmin, (req, res) => {
    const traerProductos = async () => {
        try{            
                const data = await prods.getById(req.params.id)               
                return res.json(data);
            
        }catch(error){
            throw new Error(error)
        }
    };
    traerProductos()
})


routerProd.post('/', validarAdmin, (req,res) => {    
    const agregarProducto = async() => {
        try{

            let objetoNuevo = req.body;
            
            objetoNuevo = {
                timestamp: moment.now(),
                ...objetoNuevo
            }
            
            await prods.save(objetoNuevo)
            return res.redirect('/productos')
        }catch(error){
            throw new Error(error)
        }
    }
    agregarProducto()
})

routerProd.put('/:id', validarAdmin, (req,res) => {    
    const modificarProducto = async() => {
        try{
            await prods.modifyById(JSON.stringify(req.body))
            return res.json("Se ha modificado.")
        }catch(error){
            throw new Error(error)
        }
    }
    modificarProducto()
})


routerProd.delete('/:id', validarAdmin, (req, res) => {
    const borrarProductos = async () => {
        try{
            const data = await prods.deleteById(req.params.id)    
            return res.json(data)      
        }catch(error){
            throw new Error(error)
        }
    };
    borrarProductos()
})


export default routerProd;