const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.export = function (){

    var db = require("../config/database");
}

const trabajadorSchema = new mongoose.Schema({
    
        emailEmpresa: String,
        nombreTrabajador: String,
        emailTrabajador: String,
        status: String
    
});

module.exports = mongoose.model('trabajadores', trabajadorSchema);