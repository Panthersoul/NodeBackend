import express from "express";
import routerHandlebars from "./routes/indexHandlebars.js";
import { Server as IOServer } from "socket.io";
import { engine } from "express-handlebars";

//Obtengo la ruta absoluta
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express();
const expressServer = app.listen(8080, () => {
  console.log("Server listening port 8080");
});

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+"/views/viewsHandlebars/");
app.use('/', routerHandlebars);

const io = new IOServer(expressServer);
const messages = [];

//app.use(express.static(__dirname + "/public"));


io.on("connection", (socket) => {
  console.log(`New connection, socket ID: ${socket.id}`);

  socket.emit("server:message", messages);

  socket.on("client:message", (messageInfo) => {
    messages.push(messageInfo);
    io.emit("server:message", messages);
  });
});