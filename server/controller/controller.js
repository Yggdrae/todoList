const client = require('../model/databasepg');
const jwt = require('jsonwebtoken');

client.connect();

function verifyToken(token){
    try {
        const decoded = jwt.verify(token, process.env.SECRET); //Verifica/decodifica o token caso o mesmo esteja válido
        const id = decoded.id
        return id;
    }
    catch (err) {
        console.error('Erro ao decodificar: ', err.message) //caso o token esteja inválido, mostra a mensagem no console.
        return null
    }
}

// Função para fazer login
const login = (req, res) => {
    client.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.senha}'`, (err, result) => {
        if (!err) {
            if (result.rowCount > 0) {
                const user = result.rows[0];
                const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
                res.json({
                    accessToken,
                });
            } else {
                res.status(401).send('Email ou senha inválidos');
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
                client.query(`INSERT INTO users (username, email, password) 
                    VALUES ('${req.body.usuario}', '${req.body.email}', '${req.body.senha}')`, (err) =>{
                        if(!err) res.end('Usuário cadastrado com sucesso!')
                        else res.status(500)
                    })
            }
            else res.end('Nome de usuário ou email em uso.');
        }
        else res.status(500).send(err.message)
    })
}

// Função para obter todas as tarefas
const getTarefas = (req, res) => {
    const id = verifyToken(req.headers.authorization)
    client.query(`SELECT * FROM tarefas WHERE iduser='${id}'`, (err, result) => {
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
    const id = verifyToken(req.headers.authorization)
    client.query(`INSERT INTO tarefas (title, description, date, iduser, iscomplete) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', '${id}', false)`, (err) => {
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
