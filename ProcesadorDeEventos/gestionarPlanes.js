//gestionarPlanes.js

class gestionarPlanes {

    registrarPlaneDeAccion = async (db, planDeAccion) => {
        try {
            var dbo = db.db("PlanesPorObjetivos");
            const res = await dbo.collection("Planes").insertOne(planDeAccion);
            console.log("Un plan de acción ha sido agregado");
            return res;

        } catch (e) {
            console.error(e);
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
            const items = await db.collection('Planes').findOne({ "titulo": titulo });
            console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }
}

module.exports = gestionarPlanes