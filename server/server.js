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

app.get('/tarefas/', (req, res) => {
    client.query('Select * from tarefas', (err, result) => {
        if(!err){
            res.json(result.rows);
        }
    })
    client.end
})

app.post('/tarefas', (req, res) => {
    const tarefa = req.body;
    client.query(`INSERT INTO public.tarefas (titulo, descricao, datavenc, iduser, jacompleta) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', 1, false)`, (err) => {
        if(!err){
            console.log("Tarefa registrada com sucesso")
        } else {
            console.log(err.message)
        }
    })
    client.end
})

app.put('/tarefas/:id', (req, res) => {
    const formInfo = req.body;
    console.log(formInfo)

    client.query(`update tarefas 
                set titulo = '${formInfo.titulo}',
                descricao = '${formInfo.descricao}',
                datavenc = '${formInfo.datavenc}'
                where id = ${req.params.id}`, (err) => {
        if(!err){
            console.log("Tarefa atualizada com sucesso")
        } else {
            console.log(err.message)
        }
    })
    client.end
})

app.put('/tarefas/:id/:iscompleted', (req, res) => {
    const userid = req.params.id
    const isCompleted = req.params.iscompleted
    client.query(`update tarefas set jacompleta = '${isCompleted=='false' ? true : false}' where id = ${userid}`, (err) => {
        if(!err){
            console.log("Tarefa atualizada com sucesso")
        } else {
            console.log(err.message)
        }
    })
    client.end
})

app.delete('/tarefas/:id', (req, res) => {
    client.query(`delete from tarefas where id=${req.params.id}`, (err) => {
        if(!err){
            console.log('Tarefa excluida com sucesso')
        } else {
            console.log(err.message)
        }
    })
    client.end
})

app.listen(8080, ()=> {
    console.log("Listening on port 8080")
})