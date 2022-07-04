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
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});
	
	//Áreas de enfoque view
	app.get('/areasEnfoque', isLoggedIn, (req, res) => {
		res.render('areasEnfoque', {
			user: req.user
		});
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
