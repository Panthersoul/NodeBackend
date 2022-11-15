const fs = require('fs');

class Contenedor {

    constructor (ruta) {
        this.ruta = ruta
    }


    //save(object)
    async save(obj){
        //obtengo los objetos del archivo
        const listado = await this.getAll()

        //Si existe el producto no agrego nada
        if (listado.length > 0 && listado.some((el) => el.title === obj.title)){
            console.log("El producto ya se encuentra en el catalogo");
            return
        }

        //Identifico el ultimo ID y lo incremento
        let idNew;
        if (listado.length == 0){
            idNew = 1;
        }else{
            idNew = listado[listado.length -1].id + 1 //resto uno por el indice y al ese nro le sumo uno para setear el ID
        }
        
        //creo el nuevo objeto con ID
        const nuevoObjetoID = {...obj, id: idNew}

        listado.push(nuevoObjetoID)

        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2))
            return idNew;
        }
        catch(err){
         //Si no hay data, devuelvo un array vacío.
            throw new Error('Error al guardar '+err)
        }
    }

    //Obtengo los objetos del archivo
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.ruta, 'utf8')
            return JSON.parse(data)
        }
        catch(err){
         //Si no hay data, devuelvo un array vacío.
            return[]
        }
    }




    //Objeto por ID
    async getById (id) {
        try {
            const listado = await this.getAll();
            return listado.find(item => item.id === id) ?? null    
        } catch (error) {
            throw new Error(`Error al obtener objeto por ID: ${error}`)
            
        }
        
    }

    async getRandom(){
        try {
            const listado = await this.getAll();
            const index = Math.floor(Math.random() * listado.length);
            
            console.log( listado.length);
            console.log(index);

            return listado[index]
        } catch (error) {
            console.log('Error al obtener el objeto '+error);
        }
    }

    async deleteByID (id) {
        try {
            const listado = await this.getAll();
            const nuevoListado = listado.filter( item => item.id !== id) 

            await fs.promises.writeFile(this.ruta, JSON.stringify(nuevoListado, null, 2))
        } catch (error) {
            console.log('Error al borrar el objeto por ID '+error);
        }
    }

    
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
        }
        catch(err){
            console.log('Error al borrar el archivo '+err);
        }
    }



}

module.exports = Contenedor