import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

import router from "./routes/router.js";
import routerProd from "./routes/routerProd.js";
import routerCart from "./routes/routerCart.js";

const app = express();


app.use('/', router);
app.use('/api/productos', routerProd);
app.use('/api/cart', routerCart);

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.listen(8080, () => {
    console.log("Server listening in port 8080")
})

app.on("error", error => console.log(`Error en servidor ${error}`))