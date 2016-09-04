var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DomainSchema   = new Schema({
    name: String,
    expiration: Date,
    creation: Date,
    registrant: String,
    tech: String,
    billing: String,
    admin: String,
    host: String,
    sponsor: String,
    status: String,
});

module.exports = mongoose.model('Domain', DomainSchema);

