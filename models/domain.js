var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
//var Contact     = require('contact');
//var Host     = require('host');

var DomainSchema   = new Schema({
    name: { type: String, required: true, min: 5, max: 63},
    expiration: { type: Date, default: Date.now },
    creation: { type: Date, default: Date.now},
    registrant: [{type: Schema.Types.ObjectId, ref: 'Contact', required: true}],
    tech: [{type: Schema.Types.ObjectId, ref: 'Contact', required: true}],
    billing: [{type: Schema.Types.ObjectId, ref: 'Contact', required: true}],
    admin: [{type: Schema.Types.ObjectId, ref: 'Contact', required: true}],
    host: { type: String, required: true, max: 63},
    host2: { type: String, max: 63, default : 'Null'},
    host3: { type: String, max: 63, default : 'Null'},
    authcode: { type: String,required: true, default : 'totest'},
    sponsor: { type: String, default : 'soloRegistry' },
    status: { type: String, default : 'ok' }
});

module.exports = mongoose.model('Domain', DomainSchema);
