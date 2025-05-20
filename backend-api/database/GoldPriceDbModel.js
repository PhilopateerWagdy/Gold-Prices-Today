const mongoose = require("mongoose");

// 2- create schema
const GoldRateSchema = mongoose.Schema({
  currency: {
    type: Map,
    of: new mongoose.Schema({
      curr: {
        type: String,
        enum: [
          "EGP",
          "SAR",
          "SYP",
          "TND",
          "AED",
          "YER",
          "QAR",
          "PSS",
          "OMR",
          "MAD",
          "LBP",
          "KWD",
          "JOD",
          "IQD",
        ],
      },
      ounce_price_usd: {
        type: Number,
      },
      gram_in_usd: {
        type: Number,
      },
      usd_to_curr: {
        type: Number,
      },
      ounce_in_curr: {
        type: Number,
      },
      gram_in_curr: {
        type: Number,
      },
      k24_sel: {
        type: Number,
      },
      k21_pur: {
        type: Number,
      },
      k21_sel: {
        type: Number,
      },
      k18_pur: {
        type: Number,
      },
      k18_sel: {
        type: Number,
      },
      k14_pur: {
        type: Number,
      },
      k14_sel: {
        type: Number,
      },
      coin: {
        type: Number,
      },
    }),
    required: true,
  },
  date: {
    type: String,
    trim: true,
  },
  timeUpdated: {
    type: String,
    trim: true,
  },
  id: {
    type: Number,
    unique: true,
    required: true,
    set: (v) => v + 1,
  },
});

// 3- create model
const Gold = mongoose.model("goldrates", GoldRateSchema);

module.exports = Gold;
