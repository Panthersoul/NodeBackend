const database = require("../bd/indexSQLite");

const createTable = async () => {
    try {
        await database.schema.dropTableIfExists("messages");
        await database.schema.createTable('messages', (messageTable) => {
            messageTable.increments("id").primary();
            messageTable.string("email", 50).notNullable();
            messageTable.integer("date").notNullable();
            messageTable.string("message", 250).notNullable();
        })
        console.log("Tabla MESSAGE creada correctamente");
        database.destroy();
    } catch (error) {
        console.log(error);
        database.destroy();
    }
}


createTable();
