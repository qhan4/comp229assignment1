var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuzContactSchema = new Schema({
    name: String,
    number: String,
    email: String
});


module.exports = mongoose.model('BuzContact', BuzContactSchema);
