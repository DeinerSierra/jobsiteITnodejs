const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE,{useNewUrlParser:true});
mongoose.connection.on('error',(error)=>{
    console.log(error)
})

//importar los modelos
require('../models/Vacantes.js');
require('../models/Usuarios.js');