const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const productRoute = require('./routes/product');
const articleRoute = require('./routes/article');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/product', productRoute);
app.use('/article', articleRoute);

module.exports = app;