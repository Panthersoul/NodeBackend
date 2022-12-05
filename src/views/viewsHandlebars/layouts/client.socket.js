const socket = io();

const messageForm = document.getElementById("messageForm");
const usernameInput = document.getElementById("usernameInput");
const messageInput = document.getElementById("messageInput");
const messagePool = document.getElementById("messagePool");
const btnMessage = document.getElementById("btn-Chat");

/*
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = messageInput.value;
    const username = usernameInput.value;

    // emito el evento desde el cliente, mando al back el mensaje y usr
    socket.emit("client:message", { username, message });

})*/

console.log("hola");

const enviarMsg = ((event) => {
    //event.preventDefault();
    console.log(event);

    const messageInfo = {
      username: usernameInput.value,
      message: messageInput.value,
    };
    
    socket.emit("client:message", messageInfo);
})

socket.on("server:messages", (messages) => {

    messagePool.innerHTML = "";

    messages.forEach(element => {
        messagePool.innerHTML += `<li>${element.username}: ${element.message}</li>`      
    });
});

btnMessage.addEventListener("click", enviarMsg)