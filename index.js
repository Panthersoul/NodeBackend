class Usuario {
    constructor (nombre, apellido, [name, author], array){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = [{name , author}]
        this.mascotas = array
    }

    getFullName(){
        return (`El nombre es ${this.nombre} ${this.apellido}`)
    }

    addMascota(nombre){
        this.mascotas.push(nombre)
    }

    countMascotas(){
        return (this.mascotas.length)
    }

    addBook(name, author){
        this.libros.push({name,author})
    }

    getBookNames(){
        return (this.libros.map(libro => libro.name))
    }

}

let usr = new Usuario('andres', 'giacosa', ['El Eclipse', 'Berocay'], ["perro", "gato", "calamar"])

usr.addBook('Un dia como hoy', 'Roberto Arlt')
usr.addBook('La Mazmorra', 'Benedetti')
usr.addMascota('Lagarto')
usr.addMascota('Oso')

console.log(usr.getFullName());
console.log(usr.getBookNames());
console.log(usr.countMascotas());
//console.log(usr)