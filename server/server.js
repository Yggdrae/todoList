const express = require('express');
const cors = require('cors');
const client = require('./model/databasepg');
const bodyParser = require('body-parser')
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(bodyParser.json())
app.use(cors(corsOptions));

client.connect();

app.get('/getTodo', (req, res) => {
    client.query('Select * from tarefas', (err, result) => {
        if(!err){
            res.json(result.rows);
        }
    })
    client.end
})

app.post('/createTodo', (req, res) => {
    const tarefa = req.body;
    client.query(`INSERT INTO public.tarefas (titulo, descricao, datavenc, status, iduser) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', 'incompleto', 1)`, (err) => {
        if(!err){
            console.log("Tarefa registrada com sucesso")
        } else {
            console.log(err.message)
        }
    })
    client.end
})

app.listen(8080, ()=> {
    console.log("Listening on port 8080")
})