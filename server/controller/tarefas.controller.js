const express = require('express');
const client = require('../model/databasepg');
const router = express.Router();

client.connect();

// Rota GET para obter todas as tarefas
router.get('/', (req, res) => {
    client.query('Select * from tarefas', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
});

// Rota POST para criar uma nova tarefa
router.post('/', (req, res) => {
    const tarefa = req.body;
    client.query(`INSERT INTO public.tarefas (titulo, descricao, datavenc, iduser, jacompleta) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', 1, false)`, (err) => {
        if (!err) {
            res.status(201).send("Tarefa registrada com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
});

// Rota PUT para atualizar uma tarefa
router.put('/:id', (req, res) => {
    const formInfo = req.body;
    client.query(`UPDATE tarefas 
                SET titulo = '${formInfo.titulo}',
                    descricao = '${formInfo.descricao}',
                    datavenc = '${formInfo.datavenc}'
                WHERE id = ${req.params.id}`, (err) => {
        if (!err) {
            res.send("Tarefa atualizada com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
});

// Rota PUT para alterar o status de conclusão de uma tarefa
router.put('/:id/:iscompleted', (req, res) => {
    const userid = req.params.id;
    const isCompleted = req.params.iscompleted === 'false' ? true : false;
    client.query(`UPDATE tarefas SET jacompleta = ${isCompleted} WHERE id = ${userid}`, (err) => {
        if (!err) {
            res.send("Status de conclusão atualizado com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
});

// Rota DELETE para excluir uma tarefa
router.delete('/:id', (req, res) => {
    client.query(`DELETE FROM tarefas WHERE id=${req.params.id}`, (err) => {
        if (!err) {
            res.send("Tarefa excluída com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
});

module.exports = router;
