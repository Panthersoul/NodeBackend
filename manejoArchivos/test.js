const Contenedor = require('./contenedor.js')

//DATOS DE PRUEBA
const item1 = {
        title: "Escuadra",
        price: 123.56,
        thumbnail: "https://f.fcdn.app/imgs/d4d97e/www.compinches.com.uy/cpinuy/95e7/original/catalogo/7750082001312_7750082001312_1/1920-1200/escuadra-60-x-20-cm-escuadra-60-x-20-cm.jpg"
    }

const item2 = {
        title: "Calculadora",
        price: 423.67,
        thumbnail: "https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/c/a/calculadora-8-digitos-mw-8v-4935-default-1.jpg"
    }

const item3 ={
    title: "Globo Terraqueo",
    price: 531.55,
    thumbnail: "https://f.fcdn.app/imgs/a24454/www.elclon.com.uy/clonuy/eae4/original/catalogo/3483-3/460_460/globo-terraqueo-21-4cm-0620-globo-terraqueo-21-4cm-0620.jpg"
}

async function main () {

    //Creo la instancia
    const contenedor = new Contenedor('./productos.txt')

    //Obtengo todo el documento
    let datos = await contenedor.getAll()
    console.log(datos);
    console.log("---------------------------");
    
    //Guardo los 3 productos (Metodo SAVE)
    let id1 = await contenedor.save(item1);
    let id2 = await contenedor.save(item2);
    let id3 = await contenedor.save(item3);

    //Agrego un elemento repetido para comprobar el control
    let id4 = await contenedor.save(item3);
    

    //Busco por ID
        let buscador1 = await contenedor.getById(1)
        console.log(buscador1);
    
    console.log("---------------------------");
    //Elimino por ID
        await contenedor.deleteByID(2)
        let deleted = await contenedor.getAll()
        console.log(deleted);
    
    console.log("---------------------------");
    //Elimino TODO
        await contenedor.deleteAll()
        let deleteALL = await contenedor.getAll()
        console.log(deleteALL);
}

main();