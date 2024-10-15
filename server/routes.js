const express = require('express');
const router = express.Router();
const controller = require('./controller/controller');

// Rota de login
router.post('/login', controller.login);

// Rota GET para obter todas as tarefas
router.get('/tarefas', controller.getTarefas);

// Rota POST para criar uma nova tarefa
router.post('/tarefas', controller.createTarefa);

// Rota PUT para atualizar uma tarefa
router.put('/tarefas/:id', controller.updateTarefa);

// Rota PUT para alterar o status de conclusão de uma tarefa
router.put('/tarefas/:id/:iscompleted', controller.updateTarefaStatus);

// Rota DELETE para excluir uma tarefa
router.delete('/tarefas/:id', controller.deleteTarefa);

module.exports = router;
