const {Client} = require('pg')

//Define as configurações do servidor do banco de dados
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "postgres"
})

module.exports = client