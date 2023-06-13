const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');


exports.mostrarTrabajos = async(req, res, next) => {
    const vacantes = await Vacante.find();
    if(!vacantes) return next();
    res.render('home',{
        nombrePagina: 'jobsIt',
        tagline:'Encuentra y publica tus empleos del area IT',
        barra: true,
        boton: true,
        vacantes
    })
}
