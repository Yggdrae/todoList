const client = require('../model/databasepg');
const jwt = require('jsonwebtoken');

client.connect();

// Função para verificação da validade do token
function verifyToken(token){
    try {
        //Verifica/decodifica o token caso o mesmo esteja válido
        const decoded = jwt.verify(token, process.env.SECRET); 
        const id = decoded.id
        return id;
    }
    catch (err) {
        //caso o token esteja inválido, mostra a mensagem no console.
        console.error('Erro ao decodificar: ', err.message) 
        return null
    }
}

//Função para realizar comparação das datas e retornar o que será renderizado na
//linha "vencimento da tarefa"
function handleDateComparison(todoDate){
    const locale = 'pt-br'
    const today = new Date()
    const date = new Date(todoDate)

    return (date.getTime() >= today.getTime())

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
                res.json({ 'res': 'Email ou senha inválidos'});
            }
        } else {
            res.status(500).send(err.message)
        }
    });
};

//Função para verificar se o usuário já existe e, se não, cadastrá-lo
const signUp = (req, res) => {
    client.query(`SELECT * from users where username = '${req.body.username}' OR email = '${req.body.email}'`, (err, result) =>{
        if(!err){
            if(result.rowCount == 0){
                client.query(`INSERT INTO users (username, email, password) 
                    VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}')`, (err) =>{
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
    client.query(`SELECT * FROM tarefas WHERE iduser='${id}' ORDER BY id ASC`, (err, result) => {
        if (!err) {
            res.json(result.rows);
        } else {
            res.status(500).send('erro no get');
        }
    });
};

// Função para criar uma nova tarefa
const createTarefa = (req, res) => {
    const tarefa = req.body;
    const id = verifyToken(req.headers.authorization)
    
    if(handleDateComparison(tarefa.datavenc)){
        client.query(`INSERT INTO tarefas (title, description, date, iduser, iscomplete) VALUES ('${tarefa.titulo}', '${tarefa.descricao}', '${tarefa.datavenc}', '${id}', false)`, (err) => {
            if (!err) {
                res.end("Tarefa registrada com sucesso");
            } else {
                res.status(500).send(err.message);
            }
        });
    }
    else res.end('Data inválida')
};

// Função para atualizar uma tarefa
const updateTarefa = (req, res) => {
    const formInfo = req.body;

    if(handleDateComparison(req.body.datavenc)){
        client.query(`UPDATE tarefas SET title = '${formInfo.titulo}', description = '${formInfo.descricao}', date = '${formInfo.datavenc}' WHERE id = ${req.params.id}`, (err) => {
            if (!err) {
                res.end("Tarefa atualizada com sucesso");
            } else {
                res.status(500).send(err.message);
            }
        });
    } else res.end('Data inválida')
    
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
            res.end("Tarefa excluída com sucesso");
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
