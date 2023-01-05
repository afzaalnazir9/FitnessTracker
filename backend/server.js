const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const uri = process.env.ATLAS_URI;
mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Mongodb database connected")
});

const port = process.env.port || 5000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const exceciseRoute = require('./routes/exercises');
const usersRoute = require('./routes/users');

app.use('/exercises', exceciseRoute);
app.use('/users', usersRoute);


app.listen(port, () => {
    console.log("listening...")
});