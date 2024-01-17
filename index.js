const express = require('express');
require('dotenv').config();
const connection = require('./config/connection');

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hi");
});

app.use('/api',require('./routes'))


app.listen(3000, () => {
    console.log("Server listening in http://localhost:3000");
});
