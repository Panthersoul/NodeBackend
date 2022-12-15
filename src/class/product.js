import fs from "fs";



const creandoArchivo = async (fileName) => {
    try {
      await fs.promises.writeFile(fileName, "[]");
    } catch (error) {
      throw error;
    }
  };

const existeArchivo = async (fileName) => {
    const stats = fs.existsSync(fileName);
  
    if (stats == false) {
      console.log(`Creacion del archivo: ${fileName}`);
      await creandoArchivo(fileName);
    }
  };

class Productos{

    constructor(filename){
      this.fileName = filename;
    }


   async save(producto){
    try{
        await existeArchivo(this.fileName);
    
        const contenido = JSON.parse(await fs.promises.readFile(this.fileName))
        let longitud = contenido.length;
        let index = 0
        
            if (longitud == 0) {
                index = 1;
              } else {
                index = contenido[longitud - 1].id + 1;
              }
            
            producto.id = index
            contenido.push(producto)
            await fs.promises.writeFile(this.fileName, JSON.stringify(contenido));
            return producto.id

    }catch(error){
        throw error
    }  
   }

    async getById(id){
       try{

        const contenido = await fs.promises.readFile(this.fileName)
        const objeto = JSON.parse(contenido)
        let productoReturn = "undefined";

        objeto.forEach(element => {
          if (element.id == id) { productoReturn = element; }
        });

        return productoReturn;
        
       }catch(error){
            throw error
       }
   }

async getAll(){
    try{
        await existeArchivo(this.fileName)
        const contenidoCrudo = await fs.promises.readFile(this.fileName)
        const contenido = JSON.parse(contenidoCrudo)
        return contenido;
    }catch(error){
        console.log("Error en getAll: ", error)
        return [];
    }
   }

   async modifyById(producto){
  
     await existeArchivo(this.fileName);

     const contenido = await fs.promises.readFile(this.fileName)
     const objeto = JSON.parse(contenido);
     const produ = JSON.parse(producto);

     console.log(produ);
     
    

    objeto.forEach(element => {
       if (element.id == produ.id) { 
              element.timestamp = Date.now();
              element.nombreProducto = produ.nombreProducto;
              element.descripcionProducto = produ.descripcionProducto;
              element.codigoProducto = produ.codigoProducto;
              element.urlFotoProducto = produ.urlFotoProducto;
              element.precioProducto = produ.precioProducto;
              element.stockProducto = produ.stockProducto;
        }
        else{
          console.log("no entre al if");
        }
     });

     
     await fs.promises.writeFile(this.fileName, JSON.stringify(objeto));
     
     return objeto;

   }
   
   async deleteById(id){
       try{
        const contenido = await fs.promises.readFile(this.fileName)
        const contenidoParseado = JSON.parse(contenido)
        let arrayFiltrado = contenidoParseado.filter((x) => x.id !== Number(id))
        
        await fs.promises.writeFile(this.fileName, JSON.stringify(arrayFiltrado));
        return "Borrado"
    
       }catch(error){
        throw error
       }
   }

   async deleteAll(){
       await creandoArchivo(this.fileName)

   }
}



export default Productos;

