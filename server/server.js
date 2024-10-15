const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"]
};

// Importa o controller
const router = require('./routes');

// Middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Rotas
app.use('/', router);

// Servidor
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
