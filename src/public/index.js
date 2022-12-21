const socket = io()

//PRODUCTOS
const enviarProducto = () => {
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value
    const producto ={
        title,
        price,
        thumbnail
    }
    socket.emit("new_product", producto)
    return false
}

const crearEtiquetasProductos =(producto) => {
    const {title,thumbnail,price,id}= producto
    return `
    <tr>
        <td>${id}</td>
        <td>${title}</td>
        <td>$${price}</td>
        <td><img style="width: 50px; height:50px" src=${thumbnail} alt=""></td>
        
    </tr>`
}

const agregarProducto= (producto) => {
    const productoFinal = producto.map(producto => crearEtiquetasProductos(producto)).join("<br>")
    document.getElementById("contenedorProductos").innerHTML= productoFinal
}
socket.on("products", (products) => agregarProducto(products))



//CHAT MENSAJES
const boton = document.getElementById("enviar")
boton.addEventListener("click", ()=> {
    const email = document.getElementById("email").value
    const mensaje = document.getElementById("mensaje").value
    const date = `${new Date().toLocaleDateString()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    const objetoMensaje = {
        email,
        date ,
        mensaje
    }
    socket.emit("new_message", objetoMensaje)
})

const crearEtiquetas = (mensajes) => {
    const {email,date,message} = mensajes
    return `
    <div>
        <strong id="estilo">${email}</strong>
        <strong id="fecha">[${date}] :</strong>
        <em id="message">${message}</em>
    </div>`
}

const agregarMensaje = (mensajes) =>{
    messages = mensajes;
    const mensajeFinal = messages.map(mensaje => crearEtiquetas(mensaje)).join("");
    let a = document.getElementById("chat");
    a.innerHTML = mensajeFinal;
    
    
    
}

socket.on("messages", (messages) => agregarMensaje(messages))
