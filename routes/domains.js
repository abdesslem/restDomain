var express = require('express');
var router = express.Router();
var Domain     = require('../models/domain');
var mongoose   = require('mongoose');

router.route('/domains')

// create a domain (accessed at POST http://localhost:8080/api/domains)
.post(function(req, res) {

  var domain = new Domain();      // create a new instance of the Domain model
  if (! isValidDomain(req.body.name))
  {
    res.json({ "message": 'domain name is not valid'});
  }
  domain.name = req.body.name;  // set the domains name (comes from the request)
  domain.tech.push(mongoose.Types.ObjectId(req.body.contactTech));
  domain.billing.push(mongoose.Types.ObjectId(req.body.contactBilling));
  domain.admin.push(mongoose.Types.ObjectId(req.body.contactAdmin));
  domain.registrant.push(mongoose.Types.ObjectId(req.body.registrant));
  domain.host = req.body.host;
  domain.authcode =req.body.authcode;

  domain.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Domain name created!' });
  });

})

// get all the domains (accessed at GET http://localhost:8080/api/domains)
.get(function(req, res) {
  Domain.find(function(err, domains) {
    if (err) {
      res.send(err);
    }
    res.json(domains);
  });
});

router.route('/domainCheck/:domain_name')
// get the domain with that id (accessed at GET http://localhost:8080/api/domains/:domain_name)

.get(function(req, res) {
  Domain.findOne({name : req.params.domain_name}, function(err, domain) {
    if (err) {
      res.send(err);
    }
    if (!domain)
    {
      res.json({ domain: req.params.domain_name, available: 'true' });
    }
    else
    {
      res.json({domain: req.params.domain_name, available: 'false' });
    }
  });
})

router.route('/domainInfo/:domain_name')
// get the domain with that id (accessed at GET http://localhost:8080/api/domains/:domain_name)

.get(function(req, res) {
  Domain.findOne({name : req.params.domain_name}, function(err, domain) {
    if (err) {
      res.send(err);
    }
    if (!domain)
    {
      res.json({ domain: req.params.domain_name, message: 'domain does not exist' });
    }
    else
    {
      res.json(domain);
    }
  });
})

router.route('/domainRenew')

.post(function(req, res) {

  Domain.findOne({name :req.body.name}, function(err, domain) {

    if (err){
      res.send(err);
    }
    //&  0 < parseInt(req.body.period) & parseInt(req.body.period) < 10
    if (domain )
    {
      //domain.expiration = req.body.host;
      new Date(domain.expiration).setFullYear(new Date().getFullYear() + parseInt(req.body.period) );

      domain.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'Domain renewed!' });
      });
    }
    else {
      res.json({ domain: req.body.name, message: 'domain does not exist' });
    }
  });
})

router.route('/domainTransfer')

.post(function(req, res) {

  Domain.findOne({name :req.body.name}, function(err, domain) {

    if (err){
      res.send(err);
    }
    if (domain and req.body.sponsor)
    {
      domain.sponsor = req.body.sponsor;

      domain.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'Domain transfered!' });
      });
    }
    else {
      res.json({ domain: req.body.name, message: 'An error occured' });
    }
  });
})

router.route('/domainTrade')

.post(function(req, res) {

  Domain.findOne({name :req.body.name}, function(err, domain) {

    if (err){
      res.send(err);
    }
    if (domain)
    {
      domain.registrant = req.body.registrant;

      domain.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'Owner changed Successfully' });
      });
    }
    else {
      res.json({ domain: req.body.name, message: 'domain does not exist' });
    }
  });
})

router.route('/domainUpdate/:domain_name')

.put(function(req, res) {

  Domain.findOne({name :req.params.domain_name}, function(err, domain) {

    if (err){
      res.send(err);
    }

    if (domain)
    {

      if (req.body.contactTech) domain.tech.push(mongoose.Types.ObjectId(req.body.contactTech));
      if (req.body.contactBilling) domain.billing.push(mongoose.Types.ObjectId(req.body.contactBilling));
      if (req.body.contactAdmin) domain.admin.push(mongoose.Types.ObjectId(req.body.contactAdmin));
      if (req.body.host) domain.host = req.body.host;
      if (req.body.authcode) domain.authcode =req.body.authcode;

      domain.save(function(err) {
        if (err){
          res.send(err);
        }
        res.json({ message: 'Domain updated!' });
      });
    }
    else {
      res.json({ domain: req.params.domain_name, message: 'domain does not exist' });
    }
  });
})

router.route('/domainDelete/:domain_name')

.delete(function(req, res) {
  Domain.remove({name: req.params.domain_name}, function(err, domain) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Successfully deleted' });
  });
});

// only .slouma domains are accepted
function isValidDomain(domain)
{
  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[slouma]{2,})+$/.test(domain)){
    return true;
  }
  else
  {
    return false;
  }
}

function isValidHost(host)
{
  if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(host)){
    return true;
  }
  else
  {
    return false;
  }
}
module.exports = router;
