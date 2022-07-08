const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.export = function (){

    var db = require("../config/database");
}

const planAccionSchema = new mongoose.Schema({
    
    email: String,
    titulo: String,
    encargado: String,
    acciones: Array,
    porcentajeAcciones: Array,
    recursos: Array,
    tiempo: String,
    indicadores: String
    
});

module.exports = mongoose.model('PlanesAccione', planAccionSchema);