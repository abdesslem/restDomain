var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SponsorSchema   = new Schema({
    name: { type: String, required: true, max: 100},
    email: { type: String, required: true, max: 100},
    password: { type: String, required: true, max: 100},
    balance: { type: Number, default : 0 }
    status: { type: String, default : 'ok' }
});

module.exports = mongoose.model('Sponsor', SponsorSchema);
