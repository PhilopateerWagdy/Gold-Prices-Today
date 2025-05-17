const mongoose = require("mongoose");

// 2- create schema
const CoinsSchema = mongoose.Schema({
  company_name: {
    type: String,
  },
  coin: {
    type: Number,
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
CoinsSchema.pre("save", function (next) {
  // Calculate `pur` before saving the document
  this.pur = ((this.gmpurprice || 0) + (this.factory || 0)) * (this.size || 0);
  this.sel = ((this.gmselprice || 0) + (this.cashback || 0)) * (this.size || 0);

  // Call next() to proceed with saving the document
  next();
});

// 3- create model
const Coins = mongoose.model("coins", CoinsSchema);

module.exports = Coins;
