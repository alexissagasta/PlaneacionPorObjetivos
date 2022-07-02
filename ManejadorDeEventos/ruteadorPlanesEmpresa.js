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

    router.get("/obtenerPlanEmpresa/:email", async (req, res, next) => {
        var email = req.params.email;
        try {

            //Busca en la BD

            let planesEmpresa = await gestorPlanes.obtenerPlanEmpresa(db, email);
            if (planesEmpresa.length == 0) {

                mensaje = { msj: "no hay planes!" }

                res.status(206).send(mensaje);
            } else {
                res.status(200).send(planesEmpresa);
            }

        } catch (err) {
            next(err)
        }
    });

    router.post("/registrarPlanEmpresa", async (req, res, next) => {
        try {
            const planEmpresa = req.body;
            console.log(req.body);

            //Almacena en Json
            //Se agrega el plan de la empresa
            await gestorPlanes.registrarPlanEmpresa(db, planEmpresa, planEmpresa.email);

            res.status(201).send({ mensaje: "plan agregado!" });
        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router