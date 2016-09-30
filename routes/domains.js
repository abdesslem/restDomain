var express = require('express');
var router = express.Router();
var Domain     = require('../models/domain');
var mongoose   = require('mongoose');

router.route('/domains')

    // create a domain (accessed at POST http://localhost:8080/api/domains)
    .post(function(req, res) {

        var domain = new Domain();      // create a new instance of the Domain model
        domain.name = req.body.name;  // set the domains name (comes from the request)
	      domain.expiration = req.body.expiration;
	      domain.creation = req.body.creation;
	      domain.tech.push(mongoose.Types.ObjectId(req.body.contactTech));
	      domain.billing.push(mongoose.Types.ObjectId(req.body.contactBilling));
	      domain.admin.push(mongoose.Types.ObjectId(req.body.contactAdmin));
	      domain.registrant.push(mongoose.Types.ObjectId(req.body.registrant));
	      domain.host = req.body.host;
        domain.authcode =req.body.authcode;

        domain.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Domain name created!' });
        });

    })

    // get all the domains (accessed at GET http://localhost:8080/api/domains)
    .get(function(req, res) {
        Domain.find(function(err, domains) {
            if (err)
                res.send(err);

            res.json(domains);
        });
    });

router.route('/domains/:domain_name')
// get the domain with that id (accessed at GET http://localhost:8080/api/domains/:domain_name)

    .get(function(req, res) {
        Domain.findOne(req.params.domain_name, function(err, domain) {
          if (err)
            res.send(err);

          res.json(domain);
        });
    })

    .put(function(req, res) {

        Domain.findOne(req.params.domain_name, function(err, domain) {

            if (err)
                res.send(err);

            domain.name = req.body.name;

            domain.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Domain updated!' });
            });
	});
    })

    .delete(function(req, res) {
                Domain.remove({
                    name: req.params.domain_name
                }, function(err, domain) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Successfully deleted' });
                });
    });

module.exports = router;
