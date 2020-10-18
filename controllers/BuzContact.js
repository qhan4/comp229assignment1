var mongoose = require("mongoose");
var passport = require("passport");
var BuzContact = require("../models/BuzContact");

var buzContactController = {};

// Restrict access to root page
// buzContactController.home = function(req, res) {
//   res.render('index', { user : req.user });
// };
//
// // Go to registration page
// buzContactController.register = function(req, res) {
//   res.render('register',{ title: 'Register', page:'Register', menuId:'register'});
// };
//
// // Post registration
// buzContactController.doRegister = function(req, res) {
//   User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
//     if (err) {
//       return res.render('register', { user : user });
//     }
//
//     passport.authenticate('local')(req, res, function () {
//       res.redirect('/');
//     });
//   });
// };
//
// // Go to login page
// buzContactController.login = function(req, res) {
//   res.render('login',{ title: 'Login', page:'Login', menuId:'login'});
// };
//
// // Post login
// buzContactController.doLogin = function(req, res) {
//   passport.authenticate('local')(req, res, function () {
//     res.redirect('/');
//   });
// };
//
// // logout
// buzContactController.logout = function(req, res) {
//   req.logout();
//   res.redirect('/');
// };
//
// buzContactController.index('/buzContact/index', function(req, res, next) {
//   res.render('/buzContact/index', { title: 'Business Contacts', page:'Business Contacts', menuId:'buzContact'});
// });

buzContactController.index = function(req, res, next) {

  mongoose.model('BuzContact').find({}, function (err, contacts) {
    if (err) {
      return console.error(err);
    } else {
      res.format({
        html: function(){
          res.render('./buzContact/index', { title: 'Business Contacts', page:'Business Contacts', menuId:'buzContact', buzContacts: contacts});
        },
        json: function(){
          res.json(contacts);
        }
      });
    }
  });
};

buzContactController.new = function(req, res) {
  res.render('./buzContact/new',{ title: 'New Contact', page:'Business Contact', menuId:'buzContact'});
};

buzContactController.create = function(req, res) {
  var name = req.body.name;
  var number = req.body.number;
  var email = req.body.email;

  mongoose.model('BuzContact').create({
    name : name,
    number : number,
    email : email
  }, function (err, contacts) {
    if (err) {
      return console.error(err);
    } else {
      res.redirect('/buzContact/index');
    }
  });
};

buzContactController.edit = function(req, res) {

  mongoose.model('BuzContact').findById(req.params.id, function (err, contact){
    if (err) {
      return console.error(err);
    } else {
      res.render('./buzContact/edit',{ title: 'Edit Contact', page:'Edit Contact', menuId:'buzContact', contact: contact});
    }
  });


};

buzContactController.update = function(req, res) {
  var name = req.body.name;
  var number = req.body.number;
  var email = req.body.email;

  mongoose.model('BuzContact').findByIdAndUpdate(req.params.id, { $set: {name: name, number: number, email: email}}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Updated Contact");
      res.redirect('/buzContact/index');
    }
  });

};

module.exports = buzContactController;
