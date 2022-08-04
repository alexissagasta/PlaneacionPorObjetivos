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
            console.log("plan empresa Ruteador "+req.body);

            //Almacena en Json
            //Se agrega el plan de la empresa
            await gestorPlanes.registrarPlanEmpresa(db, planEmpresa, planEmpresa.email);

            res.status(201).send({ mensaje: "plan agregado!" });
        } catch (err) {
            next(err)
        }
    });

    router.get("/trabajadores/:email", async (req, res, next) => {
        var email = req.params.email;
        try {

            //Busca en la BD

            let trabajadores = await gestorPlanes.obtenerTrabajadores(db, email);
            if (trabajadores.length == 0) {

                mensaje = { msj: "no hay trabajadores!" }

                res.status(206).send(mensaje);
            } else {
                res.status(200).send(trabajadores);
            }

        } catch (err) {
            next(err)
        }
    });

    router.delete("/eliminarTodo/:email", async (req, res, next) => {
        var email = req.params.email;
        try {

            //Busca en la BD

            let planEliminar = await gestorPlanes.eliminarPlanes(db, email);
            if (planEliminar.length == 0) {

                mensaje = { msj: "no hay planes!" }

                res.status(206).send(mensaje);
            } else {
                res.status(200).send(planEliminar);
            }

        } catch (err) {
            next(err)
        }
    });

    router.delete("/eliminarPlanesAcciones/:email", async (req, res, next) => {
        var email = req.params.email;
        try {

            //Busca en la BD

            let planAccionEliminar = await gestorPlanes.eliminarPlanesAcciones(db, email);
                res.status(200).send(planAccionEliminar);

        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router