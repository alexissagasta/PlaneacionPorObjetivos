//gestionarPlanes.js

const bodyParser = require("body-parser");

class gestionarPlanes {

    registrarPlaneDeAccion = async (db, planDeAccion) => {
        try {
            var dbo = db.db("PlanesPorObjetivos");
            const res = await dbo.collection("planesacciones").insertOne(planDeAccion);
            console.log("Un plan de acción ha sido agregado");
            return res;

        } catch (e) {
            console.error(e);
        }

    }

    obtenerPlanEmpresa = async (client, user) => {
        try {
            // specify the DB's name
            const db = client.db('PlanesPorObjetivos');
            // execute find query
            const items = await db.collection('planesEmpresa').find({ "email": user }).toArray();
            console.log("contenido= "+JSON.stringify(items));
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    registrarPlanEmpresa = async (db, planEmpresa, email) => {
        var dbo = db.db("PlanesPorObjetivos");
        const items = await dbo.collection('planesEmpresa').find({ "email": email }).toArray();
        if(items.length == 0){
            try {
                var dbo = db.db("PlanesPorObjetivos");
                const res = await dbo.collection("planesEmpresa").insertOne(planEmpresa);
                console.log("El plan de la empresa se registro con exito");
                return res;
    
            } catch (e) {
                console.error(e);
            }
        }else{
            try {
                var dbo = db.db("PlanesPorObjetivos");
                const res = await dbo.collection("planesEmpresa").updateOne({ email: email }, {
                    $set:
                    {
                        "mision": planEmpresa.mision,
                        "vision": planEmpresa.vision,
                        "valores": planEmpresa.valores,
                        "areasEnfoque": planEmpresa.areasEnfoque,
                        "objetivos": planEmpresa.objetivos,
                        "porcentaje": planEmpresa.porcentaje
                    }
                });
                console.log("Plan se modifico");
                console.log({ configuracion: res });
                return res;
    
            } catch (e) {
                console.error(e);
            }
        }
        
        

    }
    
    listarPlanesDeAccion = async (db) => {

        try {
            // specify the DB's name
            var dbo = db.db("PlanesPorObjetivos");
            // execute find query
            const items = await dbo.collection('Planes').find({}).toArray();
            console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    listarPlanesDeAccionPorTitulo = async (client, titulo) => {
        try {
            // specify the DB's name
            const db = client.db('PlanesPorObjetivos');
            // execute find query
            const items = await db.collection('Planes').find({ "titulo": titulo }).toArray();
            console.log("titulo= "+titulo);
            console.log("contenido= "+JSON.stringify(items[0]));
            return items[0];
        } catch (e) {
            console.error(e);
        }

    }

    listarTitulosDePlanesDeAccion = async (client) => {
        try {
            // specify the DB's name
            const db = client.db('PlanesPorObjetivos');
            // execute find query
            const items = await db.collection('Planes').find({}).toArray();
            let titulos=[];
            items.forEach(element => {
                titulos.push(element.titulo)
            });
            return titulos;
        } catch (e) {
            console.error(e);
        }

    }
}

module.exports = gestionarPlanes