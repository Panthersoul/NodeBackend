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

routerProd.get('/',(req,res) => {   
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

routerProd.get('/:id', (req, res) => {
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


routerProd.post('/',(req,res) => {    
    const agregarProducto = async() => {
        try{
            let objetoNuevo = req.body;
            objetoNuevo = {
                timestamp: moment.now(),
                ...objetoNuevo
            }
            console.log(objetoNuevo);
            if (req.body.admin == "true"){
            await prods.save(objetoNuevo)

                //return res.json("agregado")
                return res.redirect('/productos')
            }
            else{
                return res.json("No tiene permisos")
            }
        }catch(error){
            throw new Error(error)
        }
    }
    agregarProducto()
})

routerProd.put('/:id', (req,res) => {    
    const modificarProducto = async() => {
        try{
            if (req.body.admin == "true"){
            await prods.modifyById(JSON.stringify(req.body))
            return res.json("Se ha modificado.")
            }
            else{
                return res.json("No tiene permisos")
            }
        }catch(error){
            throw new Error(error)
        }
    }
    modificarProducto()
})


routerProd.delete('/:id', (req, res) => {
    const borrarProductos = async () => {
        try{
            if (req.query.admin == "true"){
                const data = await prods.deleteById(req.params.id)          
                return res.json(data);
            }else{
                return res.json("No tiene permisos")
            }
        }catch(error){
            throw new Error(error)
        }
    };
    borrarProductos()
})


export default routerProd;