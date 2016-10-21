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

            res.json({ id : contact._id, message: 'contact name created!'});
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

router.route('/contactCheck/:contact_id')
// get the contact with that id (accessed at GET http://localhost:8080/api/contacts/:contact_name)

    .get(function(req, res) {
        Contact.findOne({_id : req.params.contact_id }, function(err, contact) {
            if (err){
              res.send(err);
            }
            if (!contact)
            {
              res.json({ contact: req.params.domain_id, available: 'true' });
            }
            else
            {
              res.json({contact: req.params.domain_id, available: 'false' });
            }
        });
    })

router.route('/contactInfo/:contact_id')

  .get(function(req, res) {
      Contact.findOne({_id : req.params.contact_id }, function(err, contact) {
        if (err){
          res.send(err);
        }
        if (!contact)
        {
          res.json({ domain: req.params.domain_id, message: 'contact does not exist'});
        }
        else
        {
          res.json(contact);
        }
    });
})

router.route('/contactUpdate/:contact_id')

    .put(function(req, res) {

        Contact.findOne({ _id :req.params.contact_id}, function(err, contact) {

            if (err)
                res.send(err);

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

                res.json({ message: 'contact name updated!' });
            });
	         });
    })

router.route('/contactDelete/:contact_id')
    .delete(function(req, res) {
                Contact.remove({ _id: req.params.contact_id }, function(err, contact) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Successfully deleted' });
                });
    });

module.exports = router;
