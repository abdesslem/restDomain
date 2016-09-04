var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SponsorSchema   = new Schema({
    name: String,
    email: String,
    password: String,
    balance: String,
    status: String,
});

module.exports = mongoose.model('Sponsor', SponsorSchema);

