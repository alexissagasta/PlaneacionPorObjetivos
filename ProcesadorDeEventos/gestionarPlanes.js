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