const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
const gestionarPlanes = require("../ProcesadorDeEventos/gestionarPlanes.js");
let gestorPlanes = new gestionarPlanes();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async function (err, db) {

    router.get("/planesDeAccion/:tituloPlan", async (req, res, next) => {
        var tituloPlan = req.params.tituloPlan;
        try {
            
            //Busca en la BD
            let planes = await gestorPlanes.listarPlanesDeAccionPorTitulo(db, tituloPlan);
            if (planes.length === 0) {

                mensaje = { msj: "no hay planes!" }

                res.status(206).send(mensaje);
            } else {
                console.log(planes)
                res.status(200).send(planes);
            }
        } catch (err) {
            next(err)
        }
    });

    router.post("/planDeAccion", async (req, res, next) => {
        try {
            const data = req.body;
            console.log(data);

            //Almacena en Json
            info = await gestorPlanes.registrarPlaneDeAccion(db, data);

            //Se verifica si se agrego el área
            if (info === "Un plan ya tiene esa id!") {
                res.status(200).send({ alerta: info });
            } else {

                res.status(201).send({ mensaje: "plan agregado!" });
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