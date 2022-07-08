module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	const modelPlanAccion = require("../aplicacionWeb/Modelos/planAccion");
	app.get('/profile', isLoggedIn, (req, res) => {
		modelPlanAccion.find({user: req.user}, (err, planesAcciones)=>{
			if(err) throw err;
			model.find({}, (err, trabajadores)=>{
				if(err) throw err;
				res.render('profile', {
					user: req.user, //Este user o variable es de la empresa que cuenta con el email de la empresa.
					planesAcciones: planesAcciones,
					trabajadores: trabajadores
				});
			})
		})
		/*    ///////////////////////// Esto iba principalmente
		res.render('profile', {
			user: req.user});*/
	});
	
	//Áreas de enfoque view
	app.get('/areasEnfoque', isLoggedIn, (req, res) => {
		res.render('areasEnfoque', {
			user: req.user
		});
	});

	//ruteador para la obtención del personal desde la bd
	const model = require("../aplicacionWeb/Modelos/trabajador")
	app.get('/personal', isLoggedIn, (req, res) => {
		model.find({}, (err, trabajadores)=>{
			if(err) throw err;
			res.render('personal', {
				user: req.user, //Este user o variable es de la empresa que cuenta con el email de la empresa.
				trabajadores: trabajadores
			});
		})
	});

	// ruteador para registrar plan de accion de una empresa
	app.post('/registrarPlanAccionEmpresa', (req, res) =>{
		let body = req.body;
		body.status = false;

		modelPlanAccion.create(body, (err, planAccionEmpresa) =>{
			if(err) throw err;
			res.redirect('/profile');
		})
	})

	app.post('/registrarTrabajador', (req, res) =>{
		let body = req.body;
		body.status = false;

		model.create(body, (err, trabajador) =>{
			if(err) throw err;
			res.redirect('/personal');
		})
	})

	app.get('/eliminarTrabajador/:id', (req, res) =>{
		let id = req.params.id;
		model.remove({_id: id}, (err, trabajador)=>{
			if(err) throw err;
			res.redirect('/personal');
		})
	});


	// logout
	app.get('/logout', (req, res, next) => {
		req.logout(function(err) {
		  if (err) { return next(err); }
		  res.redirect('/');
		});
	  });
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
