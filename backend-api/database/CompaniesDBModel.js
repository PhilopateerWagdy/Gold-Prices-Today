const mongoose = require("mongoose");

// 2- create schema
const CompanySchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  ignot_size: {
    type: [Number],
  },
  ignot_factory: {
    type: [Number],
  },
  ignot_cashback: {
    type: [Number],
  },
  coin: {
    type: [Number],
  },
  coin_size: {
    type: [Number],
  },
  coin_factory: {
    type: [Number],
  },
  coin_cashback: {
    type: [Number],
  },
});

// 3- create model
const Company = mongoose.model("company", CompanySchema);

module.exports = Company;
