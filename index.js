//index.js
const ruteador = require("./ManejadorDeEventos/ruteadorAreasDeEnfoque.js");
const ruteadorConfig = require("./ManejadorDeEventos/ruteadorConfiguraciones.js");
const ruteadorPlanes = require("./ManejadorDeEventos/ruteadorPlanesDeAccion.js");
const express = require("express");
var fs = require("fs");
var morgan = require('morgan');
var path = require("path");
const e = require("express");
const app = express();

async function main() {
    // Crea un archivo en el directorio actual
    var accessLogStream =
        fs.createWriteStream(path.join(__dirname, 'access.log'), {
            flags: 'a'
        })

    app.use(express.json());
    app.use(express.static("./public"));
    app.use(morgan('combined', { stream: accessLogStream }))
    app.use("/", ruteadorConfig);
    app.use("/", ruteadorPlanes);
    app.use("/", ruteador);

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/index.html");
    });
    

    app.get("/aplicacionWeb/estilos", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/estilos.css");       
    });

    app.get("/aplicacionWeb/nucleo-icons", (req, res) => {
        res.sendFile(__dirname + "/assets/css/nucleo-icons.css");       
    });
    app.get("/aplicacionWeb/nucleo-svg", (req, res) => {
        res.sendFile(__dirname + "/assets/css/nucleo-svg.css");       
    });

    
    try {
        app.get("/aplicacionWeb/material-dashboard", (req, res) => {
            res.sendFile(__dirname + "/assets/css/material-dashboard.css");          
        });
    } catch (error) {
        console.error(error)
    }

    app.get("/aplicacionWeb/material-dashboard_map", (req, res) => {
        res.sendFile(__dirname + "/assets/css/material-dashboard.css.map");       
    });

    app.get("/aplicacionWeb/material-dashboard_min", (req, res) => {
        res.sendFile(__dirname + "/assets/css/material-dashboard.min.css");       
    });

    app.get("/aplicacionWeb/favicon_png", (req, res) => {
        res.sendFile(__dirname + "/assets/img/favicon.png");       
    });

    app.get("/aplicacionWeb/apple-icon_png", (req, res) => {
        res.sendFile(__dirname + "/assets/img/apple-icon.png");       
    });

    app.get("/aplicacionWeb/logo-ct_png", (req, res) => {
        res.sendFile(__dirname + "/assets/img/logo-ct.png");       
    });

    app.get("/aplicacionWeb/team-2_png", (req, res) => {
        res.sendFile(__dirname + "/assets/img/team-2.jpg");       
    });

    app.get("/aplicacionWeb/logo-spotify_svg", (req, res) => {
        res.sendFile(__dirname + "/assets/img/small-logos/logo-spotify.svg");       
    });
    /*
    <!--   Core JS Files   -->
    */

    app.get("/aplicacionWeb/popper_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/core/popper.min.js");       
    });
    
    app.get("/aplicacionWeb/bootstrap_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/core/bootstrap.min.js");       
    });

    app.get("/aplicacionWeb/perfect-scrollbar_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/plugins/perfect-scrollbar.min.js");       
    });

    app.get("/aplicacionWeb/smooth-scrollbar_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/plugins/smooth-scrollbar.min.js");       
    });

    app.get("/aplicacionWeb/chartjs_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/plugins/chartjs.min.js");       
    });

    app.get("/aplicacionWeb/material-dashboard_min_js", (req, res) => {
        res.sendFile(__dirname + "/assets/js/material-dashboard.min.js?v=3.0.0");       
    });
    
    /*INICIO RUTAS PAGINAS HTML*/
    app.get("/aplicacionWeb/dashboard_html", (req, res) => {
        res.sendFile(__dirname + "/pages/dashboard.html");       
    });

    app.get("/aplicacionWeb/tables_html", (req, res) => {
        res.sendFile(__dirname + "/pages/tables.html");       
    });

    app.get("/aplicacionWeb/billing_html", (req, res) => {
        res.sendFile(__dirname + "/pages/billing.html");       
    });

    app.get("/aplicacionWeb/virtual-reality_html", (req, res) => {
        res.sendFile(__dirname + "/pages/virtual-reality.html");       
    });

    app.get("/aplicacionWeb/rtl_html", (req, res) => {
        res.sendFile(__dirname + "/pages/rtl.html");       
    });

    app.get("/aplicacionWeb/notifications_html", (req, res) => {
        res.sendFile(__dirname + "/pages/notifications.html");       
    });

    app.get("/aplicacionWeb/sign-in_html", (req, res) => {
        res.sendFile(__dirname + "/pages/sign-in.html");       
    });

    app.get("/aplicacionWeb/sign-up_html", (req, res) => {
        res.sendFile(__dirname + "/pages/sign-up.html");       
    });
    
    /*FINAL RUTAS PAGINAS HTML*/
    app.get("/aplicacionWeb/script", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/js/funciones.js");       
    });
    
    app.get("/aplicacionWeb/jquery360", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/js/jquery-3.6.0.min.js");       
    });

    app.get("/aplicacionWeb/backImagen", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/background.jpg");       
    });

    app.use(function (err, req, res, next) {
        console.log(err);
        res.send({alerta: 'Ocurrio un error interno!'});
    })

    app.listen(3000, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("El servidor se esta ejecutando en el puerto 3000");
    });

}

main();