var express = require('express');
var router = express.Router();

var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page:'Home', menuId:'home' });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', page:'About Me', menuId:'about' });
});

router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects', page:'Projects', menuId:'projects'});
});

router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services', page:'Services', menuId:'services'});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me', page:'Contact Me', menuId:'contact'});
});


// restrict index for logged in user only
//router.get('/', auth.home);
// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);


module.exports = router;
