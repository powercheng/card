
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let User = require('../models/User');

// Home Page - Dashboard
router.get('/', ensureAuthenticated, (req, res, next) => {
	console.log("home page router");
});

router.get('/test', ensureAuthenticated, (req, res, next) => {

});

// Login Form
router.get('/login', function(req, res, next) {
	console.log("login router");
	res.render('login');
});

// Register Form
router.get('/register', (req, res, next) => {
	res.render('register');
});

// Logout
router.get('/logout', (req, res, next) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
});

// Process Register
router.post('/register', (req, res, next) => {
	console.log("register");
	const name = req.body.name;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Email field is required').notEmpty();
	req.checkBody('email', 'Email must be a valid email address').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();

	if(errors) {
		res.render('register', {
			errors: errors
		});
	} else {
		const newUser = new User({
			name: name,
			username: username,
			email: email,
			password: password
		});

		User.registerUser(newUser, (err, user) => {
			if(err) throw err;
			req.flash('success_msg', 'You are registered and can log in');
			res.redirect('/login');
		});
	}
});

// Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.getUserById(id, (err, user) => {
		done(err, user);
	});
});

// Login Processing
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// Access Control
function ensureAuthenticated(req, res, next) {
	console.log("access control");
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login');
	}
}

module.exports = router;