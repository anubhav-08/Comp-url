const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');

const connectDB = require('./Server/Database/DbConnect');
const homeRoute = require('./Server/Routes/Home')
dotenv.config({ path: '.env' })

const PORT = process.env.PORT
const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('', homeRoute);


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

module.exports = app;