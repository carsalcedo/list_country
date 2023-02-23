const express = require("express");
const app = express();
const path = require('path');
const morgan = require('morgan');

//setting
app.set('port', 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//midelwares funcines que se ejecutan amtes de llegar a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para convertir formularios en formato json

//routes
app.use(require('./routes/index'));

//static
app.use(express.static(path.join(__dirname, 'public')));

//404 handler
app.use((req, res, next) =>{
    res.status(404).send("404 not found");
})

module.exports = app;