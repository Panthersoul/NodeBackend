const Contenedor = require("./desafio")
const express = require("express")
const {Server: HttpServer}= require("http")
const {Server: IOServer} = require("socket.io")
const fs= require("fs")
const leerArchivo = new Contenedor("productos.txt")

// const route = express.Router()
const app= express()
const {engine} = require("express-handlebars")

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
            const data = leerArchivo.getAll()
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
            console.log(objetoNuevo)
            await leerArchivo.save(objetoNuevo)
            res.redirect("/") 
        }catch(error){
            throw new Error(error)
        }
    }
    agregarProducto()
})

//WEBSOCKETS
const chatParseado= JSON.parse(fs.readFileSync("chatMensajes.txt"))

ioServer.on("connection", async (socket) => {

    console.log("Usuario conectado")

    //PRODUCTOS
    socket.emit("products", await leerArchivo.getAll())
    socket.on("new_product", async(producto) => {
        console.log(producto)
        await leerArchivo.save(producto)
        const data = await leerArchivo.getAll()
        ioServer.sockets.emit("products", data)
    })

    //MENSAJES -CHAT
    socket.emit("messages",chatParseado)
    socket.on("new_message", async(mensaje) =>{   
        chatParseado.push(mensaje);
        ioServer.sockets.emit("messages", chatParseado)
        await fs.promises.writeFile("chatMensajes.txt", JSON.stringify(chatParseado))
        
    })
})

httpServer.listen(8080, () => {
    console.log("Server listening in port 8080")
})

