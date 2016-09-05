var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HostSchema   = new Schema({
    name: { type: String, required: true, max: 100},
    ipv4:  { type: String, required: true, max: 20},
    ipv6:  { type: String, required: true,  max: 200},
    sponsor: { type: String, default : 'soloRegistry'},
    status: { type: String, default : 'ok'}
});

module.exports = mongoose.model('Host', HostSchema);
