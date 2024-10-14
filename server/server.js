const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

// Importa o controller
const router = require('./controller/tarefas.controller');

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rotas
app.use('/tarefas', router);

// Servidor
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
