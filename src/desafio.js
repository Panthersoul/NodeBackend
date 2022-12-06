const fs = require("fs");

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

  
class Contenedor{

    constructor(fileName){
        this.fileName= fileName
    }

   async save(objeto){
    try{
        await existeArchivo(this.fileName)
    
        const contenido = JSON.parse(await fs.promises.readFile(this.fileName))
        let longitud = contenido.length;
        let index = 0
        
            if (longitud == 0) {
                index = 1;
              } else {
                index = contenido[longitud - 1].id + 1;
              }
            
            objeto.id = index
            contenido.push(objeto)
            await fs.promises.writeFile(this.fileName, JSON.stringify(contenido));
            return objeto.id

    }catch(error){
        throw error
    }  
   }

    async getById(id){
       try{
        const contenido = await fs.promises.readFile(this.fileName)
        const objeto = JSON.parse(contenido)

        let objetoId = objeto.find((x) => x.id == id) || null;
        
        return objetoId;
        
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

   
   async deleteById(id){
       try{
        const contenido = await fs.promises.readFile(this.fileName)
        const contenidoParseado = JSON.parse(contenido)
        
        let arrayFiltrado = contenidoParseado.filter((x) => x.id !== id)
    
        await fs.promises.writeFile(this.fileName, JSON.stringify(arrayFiltrado))
    
       }catch(error){
        throw error
       }
   }
   async deleteAll(){
       await creandoArchivo(this.fileName)
   }
}

const ejecutarProductos = async () => {
    const productos = new Contenedor("productos.txt")
}

module.exports= Contenedor

