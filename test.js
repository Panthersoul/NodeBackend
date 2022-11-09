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
    const contenedor = new Contenedor('./productos.txt')
    let id1 = await contenedor.save(item1);
    let id2 = await contenedor.save(item2);
    let id3 = await contenedor.save(item3);
}

main()