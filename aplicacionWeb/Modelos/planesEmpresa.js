const mongoose = require('mongoose');

const planesEmpresaSchema = new mongoose.Schema({
    plan: {
        mision: String,
        vision: String,
        valores: String,
        areasDeEnfoque: Array,
        objetivo: Array,
        PlanesDeAccion: Array
    },
    usuario: String
});

module.exports = mongoose.model('PlanesEmpresa', planesEmpresaSchema);