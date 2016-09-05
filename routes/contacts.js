var express = require('express');
var router = express.Router();
var Contact     = require('../models/contact');

router.route('/contacts')

    // create a contact (accessed at POST http://localhost:8080/api/contacts)
    .post(function(req, res) {

        var contact = new Contact();      // create a new instance of the contact model
        contact.name = req.body.name;  // set the contacts name (comes from the request)
	      contact.organization = req.body.organization;
	      contact.email = req.body.email;
	      contact.street = req.body.street;
	      contact.city = req.body.city;
	      contact.province = req.body.province;
	      contact.postalCode = req.body.postalCode;
	      contact.country = req.body.country;
        contact.phone = req.body.phone;
        contact.fax = req.body.fax;
        contact.authcode = req.body.authcode;

        contact.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'contact name created!'});
        });

    })

    // get all the contacts (accessed at GET http://localhost:8080/api/contacts)
    .get(function(req, res) {
        Contact.find(function(err, contacts) {
            if (err)
                res.send(err);

            res.json(contacts);
        });
    });

router.route('/contacts/:contact_name')
// get the contact with that id (accessed at GET http://localhost:8080/api/contacts/:contact_name)

    .get(function(req, res) {
        Contact.findOne(req.params.contact_name, function(err, contact) {
          if (err)
            res.send(err);

          res.json(contact);
        });
    })

    .put(function(req, res) {

        Contact.findOne(req.params.contact_name, function(err, contact) {

            if (err)
                res.send(err);

            contact.name = req.body.name;

            contact.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'contact name updated!' });
            });
	});
    })

    .delete(function(req, res) {
                Contact.remove({
                    name: req.params.contact_name
                }, function(err, contact) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Successfully deleted' });
                });
    });

module.exports = router;
