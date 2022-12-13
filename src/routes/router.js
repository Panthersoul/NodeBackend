import {Router} from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const router = Router();

router.get('/', (req, res) => {
    res.json(`Bienvenido. Utilice los endpoints /productos o /carrito.`);
})


export default router;