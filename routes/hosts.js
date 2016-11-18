var express = require('express');
var router = express.Router();
var Host     = require('../models/host');

router.route('/hosts')

// create a domain (accessed at POST http://localhost:8080/api/hosts)
.post(function(req, res) {

  var domain = new Host();      // create a new instance of the Domain model
  domain.name = req.body.name;  // set the domains name (comes from the request)
  domain.ipv4 = req.body.ipv4;
  domain.ipv6 = req.body.ipv6;

  domain.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Host created!' });
  });

})

// get all the domains (accessed at GET http://localhost:8080/api/hosts)
.get(function(req, res) {
  Host.find(function(err, hosts) {
    if (err)
    res.send(err);

    res.json(hosts);
  });
});

router.route('/hostCheck/:host_name')

.get(function(req, res) {
  Host.findOne({name : req.params.host_name}, function(err, host) {
    if (err) {
      res.send(err);
    }
    if (!host)
    {
      res.json({ host: req.params.host_name, available: 'true' });
    }
    else
    {
      res.json({host: req.params.host_name, available: 'false' });
    }
  });
})

router.route('/hostUpdate/:host_name')

.put(function(req, res) {

  Host.findOne({name : req.params.host_name}, function(err, host) {

    if (err) {
      res.send(err);
    }

    if (host) {

      host.ipv4 = req.body.ipv4;
      host.ipv6 = req.body.ipv6;

      host.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Host updated!' });
      });
    }
    else {
      res.json({ host: req.params.host_name, message: 'host does not exist' });
    }
  });
})

router.route('/hostDelete/:host_name')

.delete(function(req, res) {
  Host.remove({ name: req.params.host_name }, function(err, host) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
