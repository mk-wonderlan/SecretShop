'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IncheckSchema = new Schema({
  number: String,
  active: Boolean,
  bookedBy: {},
  bookedAt: Date,
  tickets: [],
  total: Number,
  isPaid: Boolean,
  isCheckedIn: Boolean,
  paymentMethod: String,
  hasAdministrativeCosts: Boolean

});

module.exports = mongoose.model('Incheck', IncheckSchema);
