const {Client} = require('pg')

//Define as configurações do servidor do banco de dados
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "postgres"
})

client.query(`CREATE TABLE IF NOT EXISTS users
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
        username text NOT NULL,
        email text NOT NULL,
        password text NOT NULL,
        PRIMARY KEY (id)
    );
    
    ALTER TABLE IF EXISTS users
        OWNER to postgres;`)
    
client.query(`CREATE TABLE IF NOT EXISTS tarefas
    (
        id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
        title text NOT NULL,
        description text NOT NULL,
        date date NOT NULL,
        iscomplete boolean NOT NULL,
        iduser integer NOT NULL,
        CONSTRAINT iduser FOREIGN KEY (iduser)
            REFERENCES users (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
            NOT VALID
    );
    
    ALTER TABLE IF EXISTS tarefas
        OWNER to postgres;`)

module.exports = client