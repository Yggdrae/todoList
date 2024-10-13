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

app.listen(8080, ()=> {
    console.log("Listening on port 8080")
})