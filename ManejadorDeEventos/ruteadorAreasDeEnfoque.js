const { Validator, ValidationError } = require("express-json-validator-middleware");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
//const inv = require('../Procesador de eventos/invernadero');
//const lec = require('../Procesador de eventos/lectura');
const gestionarAreasDeEnfoque = require("../ProcesadorDeEventos/gestionarAreasDeEnfoque.js");
let gestorAreasDeEnfoque = new gestionarAreasDeEnfoque();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const lecturaSchema = {
    type: "object",
    required: ["id", "gradoTemperatura", "indiceHumedad", "fechaLectura"],
    properties: {
        id: {
            type: "number",
        },

        gradoTemperatura: {
            type: "string",
        },
        indiceHumedad: {
            type: "string",
        },
        fechaLectura: {
            type: "string",
        }
    },
};

const { validate } = new Validator();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
client.connect(async function (err, db) {

    router.get("/areasDeEnfoque", async (req, res, next) => {
        try {
            //Busca en JSON
            let areasDeEnfoque = await gestorAreasDeEnfoque.listarAreasDeEnfoque(db);

            if (areasDeEnfoque.length === 0) {

                let mensaje = "No hay areas de enfoque!";

                res.status(206).send({alerta: mensaje});
            } else {

                res.status(200).send(areasDeEnfoque);
            }
        } catch (err) {
            next(err)
        }
    });

    router.post("/areaDeEnfoque", async (req, res, next) => {
        try {
            const data = req.body;
            console.log(data);

            //Se asignan los valores a partir del body
            areaDeEnfoque = {
                nombre:data.nombre
            }
            
            //Almacena en Json
            info = await gestorAreasDeEnfoque.registrarAreaDeEnfoque(db, areaDeEnfoque);

            //Se verifica si se agrego el área
            if (info === "Una area ya tiene esa id!") {
                res.status(200).send({alerta: info});
            } else {
                
                res.status(201).send({mensaje: "area agregada!"});
            }
        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router