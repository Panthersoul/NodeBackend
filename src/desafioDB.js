const knex = require("knex");

class Contenedor{

    constructor(databaseConfig, tableName){
        this.database = knex(databaseConfig);
        this.table = tableName;
    }

   async saveProduct(objeto){
    try{
        const produ = {
                title: objeto.title,
                thumbnail: objeto.thumbnail, 
                price: objeto.price,
        }
        await this.database(this.table).insert(produ)
        .then((result) => {
            console.log(result);
        })
    }catch(error){
        throw error
    }  
   }

   
   async saveMessage(objeto){
    try{
        const produ = {
                email: objeto.email,
                date: objeto.date, 
                message: objeto.mensaje,
        }
        await this.database(this.table).insert(produ)
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
            const productos = await this.database.from(this.table).select("*");
            
            return productos;

        }catch(error){
            console.log("Error en getAll: ", error)
            return [];
        }
    }

   
   async deleteById(id){
       try{

        await this.database(this.table).del().where({id});
        return true;
       }catch(error){
            throw new Error(`Error al borrar data:  ${error}`);
       }
   }
   async deleteAll(){
    try {
        await this.database(this.table).del();
      } catch (err) {
        throw new Error(`Error al escribir: ${err}`);
      }
   }
}



module.exports = Contenedor


