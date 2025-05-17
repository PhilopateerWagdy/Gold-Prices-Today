const mongoose = require("mongoose");

// 2- create schema
const IgnotsSchema = mongoose.Schema({
  company_name: {
    type: String,
  },
  size: {
    type: Number,
  },
  factory: {
    type: Number,
  },
  cashback: {
    type: Number,
  },
  gmpurprice: {
    type: Number,
  },
  gmselprice: {
    type: Number,
  },
  pur: {
    type: Number,
  },
  sel: {
    type: Number,
  },
});

// Add the `pre("save")` hook to calculate the `pur` field
IgnotsSchema.pre("save", function (next) {
  // Calculate `pur` before saving the document
  this.pur = ((this.gmpurprice || 0) + (this.factory || 0)) * (this.size || 0);
  this.sel = ((this.gmselprice || 0) + (this.cashback || 0)) * (this.size || 0);

  // Call next() to proceed with saving the document
  next();
});

// 3- create model
const Ignots = mongoose.model("ignots", IgnotsSchema);

module.exports = Ignots;
