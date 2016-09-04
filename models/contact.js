var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContactSchema   = new Schema({
    name: { type: String, max: 100, default : 'Null'},
    organization:  { type: String, max: 100, default : 'Null'},
    email: { type: String, required: true, max: 100},
    street: { type: String, required: true, max: 100},
    city : { type: String, required: true, max: 100},
    province: { type: String, max: 100, default : 'Null'},
    postalCode: { type: String, max: 50, default : 'Null'},
    country: { type: String, required: true },
    phone: { type: String, required: true },
    fax:{ type: String, default : 'Null' },
    authcode: { type: String, required: true, default: 'Null'},
    sponsor: { type: String, default : 'soloRegistry' },
    status: { type: String, default : 'ok' }
});

module.exports = mongoose.model('Contact', ContactSchema);
