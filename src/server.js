import express, { Router } from "express";
import multer from "multer";

const app = express();
const router = Router();

const personas = [];
const mascotas = [];

app.use(express.json());
app.use(express.urlencoded({extended: true }))

router
    .route("/personas")
    .get((req, res) => {
        res.json(personas)
    })
    .post((req, res) => {
        const {nombre, apellido, edad } = req.body;

        console.log(req.body);
        if (!nombre || !apellido || !edad){
            res.status(400).send("You muse send, nombre, apellido or edad")
        }

        res.status(201).json({nombre, apellido, edad})

    });

    router
    .route("/mascota")
    .get((req, res) => {
        console.log("estoy en mascota");
        res.json(mascotas)
    })
    .post((req, res) => {
        const {nombre, raza, edad } = req.body;
        
        if (!nombre || !raza || !edad){
            res.status(400).send("You muse send, name, raza or edad")
        }

        mascotas.push({nombre, raza, edad });
        res.status(201).json({nombre, raza, edad })

    });


    router.get("/", (req, res)  => {
        res.sendFile(__dirname + "/public/index.html")
    })
    //app.use("/", router);
//app.use('/static', express.static(__dirname + '/public'));

app.listen(3000, () =>  {
    console.log("Server listening port 3000");
})

app.on("error", (error) => {
    console.log(error);
})