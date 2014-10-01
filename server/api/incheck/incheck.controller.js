'use strict';

var _ = require('lodash');
var Incheck = require('./incheck.model');

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