var mongoose = require("mongoose");
var passport = require("passport");
var BuzContact = require("../models/BuzContact");

var buzContactController = {};

buzContactController.index = function(req, res, next) {

  mongoose.model('BuzContact').find({}).sort({ name: 1 }).exec(function (err, contacts) {
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

buzContactController.delete = function(req, res) {
  mongoose.model('BuzContact').remove({_id: req.params.id}, function(err, contact) {
    if (err) {
      return console.error(err);
    } else {
      //res.send("Successfully Deleted Contact");
      res.redirect('/buzContact/index');
    }
  });
};


module.exports = buzContactController;
