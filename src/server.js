const express = require("express")
const {Server: HttpServer}= require("http")
const {Server: IOServer} = require("socket.io")
const fs= require("fs")
//const leerArchivo = new Contenedor("productos.txt")

const path = require("path");

const contenedor = require("./desafioDB.js");

//Configuracion MARIAdb
const productApi = new contenedor({
    client: "mysql",
    connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
}, "product");


//Configuracion SQLITE
const messageApi = new contenedor({
    client: "sqlite3",
    connection:  { filename: path.resolve(  __dirname, "./database/ecommerce.sqlite")},
    useNullAsDefault: true
}, "messages");


// const route = express.Router()
const app= express()
const {engine} = require("express-handlebars")
const Contenedor = require("./desafio.js")


const httpServer= new HttpServer(app)
const ioServer= new IOServer(httpServer)

//MOTOR DE PLANTILLAS: HANDLEBARS
app.engine(
    "hbs",
    engine({
        extname:".hbs",
        defaultLayout:"index.hbs"
    })
)

app.set("views", "./public/views")
app.set("view engine", "hbs")
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))


app.get("/", (req, res) => {
    const traerProductos = async () => {
        try{
            const data = productApi.getAll();
            console.log(data);
            res.render("formulario", {data:data}) 
        }catch(error){
            throw new Error(error)
        }
    };
    traerProductos()
})

app.post("/productos",(req,res) => {    
    const agregarProducto = async() => {
        try{
            const objetoNuevo = req.body
            await productApi.saveProduct(objetoNuevo);
            console.log(objetoNuevo)
            res.redirect("/") 
        }catch(error){
            throw new Error(error)
        }
    }
    agregarProducto()
})

//WEBSOCKETS
async function cargarMsg(){
 return await messageApi.getAll(); 
}

let chatParseado = cargarMsg();

ioServer.on("connection", async (socket) => {

    console.log("Usuario conectado")
    //PRODUCTOS
    socket.emit("products", await productApi.getAll());
    socket.on("new_product", async(producto) => {
        const data1 = productApi.saveProduct(producto);
        let prods = await productApi.getAll();
        ioServer.sockets.emit("products", prods);
    })

    //MENSAJES -CHAT 
    socket.emit("messages",chatParseado)
    socket.on("new_message", async(mensaje) =>{   
        messageApi.saveMessage(mensaje);
        chatParseado = await messageApi.getAll();
        ioServer.sockets.emit("messages", chatParseado)
    })    
})

httpServer.listen(8080, () => {
    console.log("Server listening in port 8080")
})

