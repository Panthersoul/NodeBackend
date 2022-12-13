import express, { Router } from "express";

const routerCart = Router();
/*Importante para recibir por BODY lo del POST*/
routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }))


export default routerCart;