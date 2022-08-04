//gestionarPlanes.js

const bodyParser = require("body-parser");

class gestionarPlanes {

    registrarPlaneDeAccion = async (db, planDeAccion) => {
        /*try {
            var dbo = db.db("PlanesPorObjetivos");
            const res = await dbo.collection("planesacciones").insertOne(planDeAccion);
            console.log("Un plan de acción ha sido agregado");
            return res;

        } catch (e) {
            console.error(e);
        }
        //////////////////////////////////////////////////////////////////////////*/
        var dbo = db.db("PlanesPorObjetivos");
        //const items = await dbo.collection('planesacciones').find( { "email": planDeAccion.email,"titulo": planDeAccion.titulo}).toArray()
        console.log("Plan Acción Gestor "+items.length);
        try {
            var dbo = db.db("PlanesPorObjetivos");
            const res = await dbo.collection("planesacciones").insertOne(planDeAccion);
            console.log("El plan de acción de la empresa se registro con exito");
            return res;

        } catch (e) {
            console.error(e);
        }
        /*if(items.length == 0){
            
        }else{
            try {
                var dbo = db.db("PlanesPorObjetivos");
                const res = await dbo.collection("planesacciones").findOneAndUpdate({"email": planDeAccion.email, "titulo": planDeAccion.titulo}, {
                    $set:
                    {
                        "titulo": planDeAccion.titulo,
                        "encargado": planDeAccion.encargado,
                        "acciones": planDeAccion.acciones,
                        "porcentajeAcciones": planDeAccion.porcentajeAcciones,
                        "recursos": planDeAccion.recursos,
                        "tiempo": planDeAccion.tiempo,
                        "indicadores": planDeAccion.indicadores
                    }
                });
                console.log("Plan se modifico");
                console.log({ configuracion: res });
                return res;
    
            } catch (e) {
                console.error(e);
            }
        }*/
        

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

    obtenerTrabajadores = async (client, user) => {
        try {
            // specify the DB's name
            const db = client.db('PlanesPorObjetivos');
            // execute find query
            const items = await db.collection('trabajadores').find({ "emailEmpresa": user }).toArray();
            console.log("trabajadores= "+JSON.stringify(items));
            return items;
        } catch (e) {
            console.error(e);
        }

    }

     eliminarPlanes = async (db, email) => {
        try {
            var dbo = db.db("PlanesPorObjetivos");
            var myquery = { "email": email };
            const res = await dbo.collection("planesEmpresa").deleteOne(myquery);
            console.log("El plan empresa ha sido eliminado");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }

    }
    eliminarPlanesAcciones = async (db, correo) => {
        /*try {
            var dbo = db.db("PlanesPorObjetivos");
            //var myquery = { email: correo };
            const res = await dbo.collection("planesacciones").deleteMany({ email: correo });
            console.log("El plan acción de empresa ha sido eliminado");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }*/
        console.log(correo);
        try {
            const database = db.db("PlanesPorObjetivos");
            const planAccion = database.collection("planesacciones");
            // Query for all movies with a title containing the string "Santa"
            const query = { email: { $regex: correo } };
            const result = await planAccion.deleteMany(query);
            console.log("Deleted " + result.deletedCount + " documents");
          }catch (e) {
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
                //const res = await dbo.collection("planesEmpresa").updateOne({ email: email }, {
                const res = await dbo.collection("planesEmpresa").findOneAndUpdate({ "email": email }, {
                    $set:
                    {
                        "email": planEmpresa.email,
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
            //console.log("titulo= "+titulo);
            //console.log("contenido= "+JSON.stringify(items[0]));
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