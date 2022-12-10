import { Router } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import Productos from "../class/product.js";

const prods = new Productos("./productos.txt");

const __dirname = dirname(fileURLToPath(import.meta.url));
const routerProd = Router();


routerProd.get('/',(req,res) => {   
        const mostrarProductos = async () => {
        try{
            const data = await prods.getAll(prods.fileName);
            console.log( ...data);
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
            if(req.query.admin){
                const data = prods.getById(req.query.id)
                return res.json(data);
            }else{
                throw new Error ("Acceso denegado, no tiene permisos.")
            }
        }catch(error){
            throw new Error(error)
        }
    };
    traerProductos()
})


routerProd.post('/',(req,res) => {    
    const agregarProducto = async() => {
        try{
            
            console.log("sdfgs"+req.query);
            const objetoNuevo = req.query
            
            await prods.save(objetoNuevo)
            res.redirect("/") 
        }catch(error){
            throw new Error(error)
        }
    }
    agregarProducto()
})


export default routerProd;