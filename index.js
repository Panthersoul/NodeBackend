// use ecommerce

db.createCollection('mensajes')
db.createCollection('productos')

db.mensajes.insertMany();
db.productos.insertMany([{nombre: "lapiz", precio: "1000", stock: "44", codigo: "1234" },{nombre: "goma", precio: "300", stock: "4", codigo: "9955" },{nombre: "escuadra", precio: "2350", stock: "46", codigo: "4555" },{nombre: "marcador", precio: "3400", stock: "9", codigo: "464" },{nombre: "corrector", precio: "4500", stock: "3", codigo: "85" },{nombre: "resaltador", precio: "3165", stock: "104", codigo: "456" },{nombre: "lapicera", precio: "700", stock: "25", codigo: "6655" },{nombre: "post-it", precio: "1250", stock: "57", codigo: "48" },{nombre: "cuaderno", precio: "3999", stock: "83", codigo: "34" },{nombre: "cuadernola", precio: "4850", stock: "88", codigo: "144" }], { ordered: true });





