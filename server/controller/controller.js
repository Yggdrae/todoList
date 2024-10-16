const client = require('../model/databasepg');
const jwt = require('jsonwebtoken');

client.connect();

// Função para fazer login
const login = (req, res) => {
    client.query(`SELECT * FROM users WHERE username = '${req.body.usuario}' AND password = '${req.body.senha}'`, (err, result) => {
        if (!err) {
            if (result.rowCount > 0) {
                const user = result.rows[0];
                const accessToken = jwt.sign({ id: user.id, username: user.username }, 'chaveSecreta');
                res.json({
                    id: user.id,
                    username: user.username,
                    accessToken,
                });
            } else {
                res.status(401).send('Usuário ou senha inválidos');
            }
        } else {
            res.status(500).send(err.message);
        }
    });
};

const signUp = (req, res) => {
    client.query(`SELECT * from users where username = '${req.body.usuario}' OR email = '${req.body.email}'`, (err, result) =>{
        if(!err){
            if(result.rowCount == 0){
                client.query(`INSERT INTO users (username, email, password, isAdmin) 
                    VALUES ('${req.body.usuario}', '${req.body.email}', '${req.body.senha}', 'false')`)
                    res.status(201).send('Usuário cadastrado com sucesso!')
            }
            else res.status(401).send('Nome de usuário e/ou email já em uso')
        }
        else res.status(500).send(err.message)
    })
}

// Função para obter todas as tarefas
const getTarefas = (req, res) => {
    client.query('SELECT * FROM tarefas', (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send(err.message);
        }
    });
};

// Função para criar uma nova tarefa
const createTarefa = (req, res) => {
    const tarefa = req.body;
    client.query(`INSERT INTO tarefas (title, description, date, iduser, iscomplete) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', 2, false)`, (err) => {
        if (!err) {
            res.status(201).send("Tarefa registrada com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
};

// Função para atualizar uma tarefa
const updateTarefa = (req, res) => {
    const formInfo = req.body;
    client.query(`UPDATE tarefas SET title = '${formInfo.titulo}', description = '${formInfo.descricao}', date = '${formInfo.datavenc}' WHERE id = ${req.params.id}`, (err) => {
        if (!err) {
            res.send("Tarefa atualizada com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
};

// Função para alterar o status de conclusão de uma tarefa
const updateTarefaStatus = (req, res) => {
    const userid = req.params.id;
    const isCompleted = req.params.iscompleted === 'false' ? true : false;
    client.query(`UPDATE tarefas SET iscomplete = ${isCompleted} WHERE id = ${userid}`, (err) => {
        if (!err) {
            res.send("Status de conclusão atualizado com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
};

// Função para excluir uma tarefa
const deleteTarefa = (req, res) => {
    client.query(`DELETE FROM tarefas WHERE id=${req.params.id}`, (err) => {
        if (!err) {
            res.send("Tarefa excluída com sucesso");
        } else {
            res.status(500).send(err.message);
        }
    });
};

module.exports = {
    login,
    signUp,
    getTarefas,
    createTarefa,
    updateTarefa,
    updateTarefaStatus,
    deleteTarefa,
};
