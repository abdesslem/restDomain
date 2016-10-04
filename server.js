var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var domains = require('./routes/domains'); //routes are defined here
var contacts = require('./routes/contacts');
var hosts = require('./routes/hosts');
// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();
var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/local'); // connect to our database

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'API endpoint' });
});

// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/api', domains);
app.use('/api', contacts);
app.use('/api', hosts);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port :' + port);
