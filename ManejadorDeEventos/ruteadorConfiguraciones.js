const { Validator, ValidationError } = require("express-json-validator-middleware");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
const gestionarConfiguraciones = require("../ProcesadorDeEventos/gestionarConfiguraciones.js");
let gestorConfig = new gestionarConfiguraciones();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async function (err, db) {

    router.get("/configuracion/:nombreEmpresa", async (req, res, next) => {
        try {
            var nomEmpresa = req.params.nombreEmpresa;
            console.log(nomEmpresa)
            //Busca en JSON
            let configuracion = await gestorConfig.listarConfiguracionPorEmpresa(db, nomEmpresa);
            if (configuracion.length === 0) {

                mensaje = { msj: "configuracion no encontrada!" }

                res.status(206).send(mensaje);
            } else {
                console.log(configuracion)
                res.status(200).send(configuracion);
            }
        } catch (err) {
            next(err)
        }
    });

    router.post("/configuracion", async (req, res, next) => {
        try {
            const data = req.body;
            console.log(data);

            //Se asignan los valores a partir del body
            areaDeEnfoque = {
                nombre: data.nombre
            }

            //Almacena en Json
            info = await gestorAreasDeEnfoque.registrarAreaDeEnfoque(db, areaDeEnfoque);

            //Se verifica si se agrego el área
            if (info === "Una area ya tiene esa id!") {
                res.status(200).send({ alerta: info });
            } else {

                res.status(201).send({ mensaje: "area agregada!" });
            }
        } catch (err) {
            next(err)
        }
    });

    router.put("/configuracion/:nombreEmpresa", async (req, res, next) => {
        try {
            var nomEmpresa = req.params.nombreEmpresa;
            const data = req.body;
            console.log(data);
            console.log("email Empresa configuracion "+nomEmpresa)

            //Se asignan los valores a partir del body
            cantPlanes = {
                cantPlanes: data.cantPlanes
              }
            console.log(data.cantPlanes)
            //Almacena en Json
            info = await gestorConfig.modificarConfiguracion(db, nomEmpresa, cantPlanes.cantPlanes);

            //Se verifica si se agrego el área
            if (info === "Una area ya tiene esa id!") {
                res.status(200).send({ alerta: info });
            } else {

                res.status(201).send({ mensaje: "area agregada!" });
            }
        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router