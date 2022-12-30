// use ecommerce
db.createCollection('mensajes')
db.createCollection('productos')

db.mensajes.insertMany([{id: 1, email:"hola@hotmail.com", date: "20221212", message: "hola"},{id: 2, email:"hola@hotmail.com", date: "20221213", message: "como andas?"},{id: 3, email:"hola@hotmail.com", date: "20221214", message: "todo bien? vos?"},{id: 4, email:"hola@hotmail.com", date: "20221215", message: "todo bien, en coder"},{id: 5, email:"hola@hotmail.com", date: "20221216", message: "estas estudiando?"},{id: 6, email:"hola@hotmail.com", date: "20221217", message: "no, estoy vendiendo"},{id: 7, email:"hola@hotmail.com", date: "20221218", message: "que vendes?"},{id: 8, email:"hola@hotmail.com", date: "20221219", message: "productos"},{id: 9, email:"hola@hotmail.com", date: "20221220", message: "en serio?"},{id: 10, email:"hola@hotmail.com", date: "20221222", message: "NO!"}]);
db.productos.insertMany([{nombre: "lapiz", precio: 1000, stock: 44, codigo: "1234" },{nombre: "goma", precio: 300, stock: 4, codigo: "9955" },{nombre: "escuadra", precio: 2350, stock: 46, codigo: "4555" },{nombre: "marcador", precio: 3400, stock: 9, codigo: "464" },{nombre: "corrector", precio: 4500, stock: 3, codigo: "85" },{nombre: "resaltador", precio: 3165, stock: 104, codigo: "456" },{nombre: "lapicera", precio: 700, stock: 25, codigo: "6655" },{nombre: "post-it", precio: 1250, stock: 57, codigo: "48" },{nombre: "cuaderno", precio: 3999, stock: 83, codigo: "34" },{nombre: "cuadernola", precio: 4850, stock: 88, codigo: "144" }], { ordered: true })
//Muestro las colecciones
db.mensajes.find()
db.productos.find()

//Cuento el total de las conexiones
db.articulos.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

db.productos.insertOne({nombre: "compas", precio:"2850", stock:"50", codigo: "4545"})

//Filtros
db.productos.find({ precio: { $lt: 1000}})
db.productos.find({ $and: [{precio: {$gte: 1000}}, {precio: {$lte: 3000}}]})
db.productos.find({ precio: { $gte: 3000}})
//Solo el nombre del tercer prod mas barato
db.productos.find({}, {nombre: 1, _id: 0}).skip(2).limit(3).sort({precio: 1})

//Actualizo stock
db.productos.updateMany({}, { $set: {stock: 100}})
db.productos.updateMany({precio: {$gte: 4000}}, { $set: {stock: 0}})

//Elimino
db.productos.deleteMany({precio: {$lt: 1000}})


// -> agrego a la BD el usr
// use ecommerce
db.createUser({ user: 'pepe', pwd: 'asd456', roles: [{role: 'read', db: 'ecommerce'}]})