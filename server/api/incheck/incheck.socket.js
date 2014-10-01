/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Incheck = require('./incheck.model');

exports.register = function(socket) {
  Incheck.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Incheck.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('incheck:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('incheck:remove', doc);
}