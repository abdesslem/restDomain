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
            if (err)
                res.send(err);

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

router.route('/hosts/:host_name')
// get the domain with that id (accessed at GET http://localhost:8080/api/hosts/:host_name)

    .get(function(req, res) {
        Host.findOne(req.params.host_name, function(err, host) {
          if (err)
            res.send(err);

          res.json(host);
        });
    })

    .put(function(req, res) {

        Host.findOne(req.params.domain_name, function(err, host) {

            if (err)
                res.send(err);

            host.name = req.body.name;

            host.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Host updated!' });
            });
	});
    })

    .delete(function(req, res) {
                Host.remove({
                    name: req.params.host_name
                }, function(err, host) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Successfully deleted' });
                });
    });

module.exports = router;
