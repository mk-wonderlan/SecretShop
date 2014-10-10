'use strict';

var _ = require('lodash');
var Incheck = require('./incheck.model');
var request = require('request');
// Get list of inchecks
exports.index = function(req, res) {
  Incheck.find(function (err, inchecks) {
    if(err) { return handleError(res, err); }
    return res.json(200, inchecks);
  });
};

// Get a single incheck
exports.show = function(req, res) {
  Incheck.findById(req.params.id, function (err, incheck) {
    if(err) { return handleError(res, err); }
    if(!incheck) { return res.send(404); }
    return res.json(incheck);
  });
};
exports.sync = function(req,rez){
  var orderNumbers = [];
  var orderObjects = [];
  var returnFunc = function()
  {
    rez.json(201,true);
  }
  var skuTranslate={
  9 : {
    name: "Datorplats",
    price: 180
  },
  16 : {
    name: "Datorplats + Märke",
    price: 205
  },
  25: {
    name: "Datorplats + Datorkjuts",
    price: 210
  },
  26: {
    name: "Datorplats + Datorkjuts + Märke",
    price: 235
  }};
  var ticketList = [];
  request({
      headers: {
        'X-Spree-Token': '641efeb66a840eaff9ecabb7bc7abd553111c6d25b798c02'
      },
      uri: 'https://store.wonderlan.se/api/orders?per_page=1000',
      method: 'GET'
    }, function (err, res, body) {
      //it works!
      var obj = JSON.parse(body);

      for(var i = 0;i<obj.orders.length;i++)
        {
          if(obj.orders[i].state ='complete' && Date.parse(obj.orders[i].created_at) > new Date(2014,9,1))
            {
                orderNumbers.push(obj.orders[i].number);
            }
        }
        var finish = _.after(orderNumbers.length,returnFunc);
        for(var i = 0;i<orderNumbers.length;i++)
          {
            request({
                headers: {
                  'X-Spree-Token': '641efeb66a840eaff9ecabb7bc7abd553111c6d25b798c02'
                },
                uri: 'https://store.wonderlan.se/api/orders/'+ orderNumbers[i],
                method: 'GET'
              }, function (err, res, body) {
                var object = JSON.parse(body);
                ticketList = [];
                for(var i= 0;i<object.line_items.length;i++)
                  {
                    var lineItem = skuTranslate[object.line_items[i].variant_id];
                    ticketList.push({type: lineItem.name,price: lineItem.price});
                  }
                  var firstName, lastName
                  if(object.ship_address == null)
                    {
                      firstName = 'Okänd';
                      lastName = 'Okänd';
                    }
                    else{
                      firstName= object.ship_address.firstname;
                      lastName = object.ship_address.lastname;
                    }
                var paymentState =  object.payment_state || "payment_due";
                var bodyObjectAsIncheck = {
                  number: object.number,
                  active: true,
                  bookedBy: {
                    name: firstName + ' '+ lastName,
                    email: object.email,
                    username: object.user_id
                  },
                  bookedAt: object.created_at,
                  tickets:ticketList,
                  total: object.total,
                  isPaid: paymentState == 'paid',
                  isCheckedIn : false
                }
                Incheck.update({number: object.number}, bodyObjectAsIncheck, {upsert: true}, function(err){
                  if(err){ return rez.json(400,bodyObjectAsIncheck);}
                finish();
                });
              }
            );
          }
    });

};
// Creates a new incheck in the DB.
exports.create = function(req, res) {
  Incheck.create(req.body, function(err, incheck) {
    if(err) { return handleError(res, err); }
    return res.json(201, incheck);
  });
};

// Updates an existing incheck in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Incheck.findById(req.params.id, function (err, incheck) {
    if (err) { return handleError(res, err); }
    if(!incheck) { return res.send(404); }
    var updated = _.merge(incheck, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, incheck);
    });
  });
};

// Deletes a incheck from the DB.
exports.destroy = function(req, res) {
  Incheck.findById(req.params.id, function (err, incheck) {
    if(err) { return handleError(res, err); }
    if(!incheck) { return res.send(404); }
    incheck.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
