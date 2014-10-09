'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IncheckSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  bookedBy: {},
  bookedAt: Date,
  tickets: [],
  total: Number,
  isPaid: Boolean,
  isCheckedIn: Boolean
});

module.exports = mongoose.model('Incheck', IncheckSchema);
