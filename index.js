const mongoose = require('mongoose');
require('./config/db.js')
const express = require('express');
const path = require('path')
const exphbs = require('express-handlebars');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('./config/passport.js');
const createError = require('http-errors');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//habilitar validacion de campos con express-validator
app.use(expressValidator())
// habilitar handlebars como view
app.engine('handlebars', 
    exphbs({
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars.js')
    })
);
app.set('view engine', 'handlebars');


//leer los archivos staticos
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl: process.env.DATABASE}),
}));
//iniciar passport
app.use(passport.initialize());
app.use(passport.session());
//alertas y flash messages
app.use(flash());

//Crear un middleware para almamcenar los msg y el usuario autenticado
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use('/',router());

// 404 pagina no existente
app.use((req, res, next) => {
    next(createError(404, 'No Encontrado'));
})

// Administración de los errores
app.use((error, req, res) => {
    res.locals.mensaje = error.message;
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
});
// Inicia el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor iniciado en el puerto 5000');
});