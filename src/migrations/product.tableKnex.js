const database = require("../bd/indexKnex.js");

const createTable = async () => {
    try {

        await database.schema.dropTableIfExists("product");

        await database.schema.createTable('product', (productTable) => {
            productTable.increments("id").primary();
            productTable.string("title", 50).notNullable();
            productTable.integer("price").notNullable();
            productTable.string("thumbnail", 250).notNullable();
        })
        console.log("Tabla product creada correctamente");
        database.destroy();
    } catch (error) {
        console.log(error);
        database.destroy();
    }
}


createTable();
