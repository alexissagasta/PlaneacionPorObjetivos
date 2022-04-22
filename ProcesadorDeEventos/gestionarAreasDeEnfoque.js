//gestionarAreasDeEnfoque.js

class gestionarAreasDeEnfoque {

    registrarAreaDeEnfoque = async (db, areaDeEnfoque) => {
        try {
            var dbo = db.db("PlanesPorObjetivos");
            const res = await dbo.collection("areasDeEnfoque").insertOne(areaDeEnfoque);
            console.log("Una área de enfoque ha sido agregada");
            return res;

        } catch (e) {
            console.error(e);
        }

    }

    borrarAreaDeEnfoquePorId = async (db, id) => {
        try {
            var dbo = db.db("Invernaderos");
            var myquery = { "_id": id };
            const res = await dbo.collection("areasDeEnfoque").deleteOne(myquery);
            console.log("Un invernadero ha sido eliminado");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }

    }


    listarAreasDeEnfoque = async (db) => {

        try {
            // specify the DB's name
            var dbo = db.db("PlanesPorObjetivos");
            // execute find query
            const items = await dbo.collection('areasDeEnfoque').find({}).toArray();
            //console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    listarAreaDeEnfoquePorId = async (client, id) => {
        try {
            // specify the DB's name
            const db = client.db('Invernaderos');
            // execute find query
            const items = await db.collection('invernadero').find({ "_id": id }).toArray();
            //console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    /*
    agregarObjetivoAreaDeEnfoque = async (db, idInv, lectura, lecturaId) => {
        try {
            var dbo = db.db("Invernaderos");
            var myquery = { "_id": idInv };
            //busca si ya existe una lectura con el mismo id
            var idExist = await dbo.collection("invernadero").find({
                lecturas: {
                    $elemMatch: {
                        _id: lecturaId, idInvernadero: idInv
                    }
                }
            }).toArray();

            if (idExist.length > 0) {
                return "Una lectura ya tiene esa id!"
            } else {

                const res = await dbo.collection("invernadero").updateOne(myquery, {
                    $addToSet:
                    {
                        "lecturas": lectura
                    }
                });
                console.log("Una lectura ha sido agregada");
                console.log({ lectura: res });
                return res;

            }


        } catch (e) {
            console.error(e);
        }

    }
    */


}

module.exports = gestionarAreasDeEnfoque