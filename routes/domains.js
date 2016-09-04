var express = require('express');
var router = express.Router();
var Domain     = require('../models/domain');

router.route('/domains')

    // create a domain (accessed at POST http://localhost:8080/api/domains)
    .post(function(req, res) {

        var domain = new Domain();      // create a new instance of the Domain model
        domain.name = req.body.name;  // set the domains name (comes from the request)
	      domain.expiration = req.body.expiration;
	      domain.creation = req.body.creation;
	      domain.tech = req.body.contactTech;
	      domain.billing = req.body.contactBilling;
	      domain.admin = req.body.contactAdmin;
	      domain.registrant = req.body.registrant;
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

    router.route('/contacts')

        .post(function(req, res) {

            var contact = new Contact();
            contact.name = req.body.name;
    	      contact.street = req.body.street;
    	      contact.country = req.body.country;
    	      contact.phone = req.body.phone;
    	      contact.fax = req.body.fax;
    	      contact.postalCode = req.body.postalCode;
    	      contact.authcode = req.body.authcode;
    	      contact.email = req.body.email;
            contact.city =req.body.city;

            contact.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Contact created!' });
            });

        })

        // get all the domains (accessed at GET http://localhost:8080/api/domains)
        .get(function(req, res) {
            Contact.find(function(err, contacts) {
                if (err)
                    res.send(err);

                res.json(contacts);
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
