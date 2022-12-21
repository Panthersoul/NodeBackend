const knex = require("knex");
const path = require("path");

const config = {
    client: "sqlite3",
    connection:  { filename: path.resolve(  __dirname, "../database/ecommerce.sqlite")},
    useNullAsDefault: true
};

const database = knex(config);

module.exports = database