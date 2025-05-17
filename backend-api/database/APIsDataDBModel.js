const mongoose = require("mongoose");

// 2- create schema
const APISchema = mongoose.Schema({
  api_name: {
    type: String,
  },
  base_url: {
    type: String,
  },
  api_key: {
    type: String,
  },
});

// 3- create model
const API = mongoose.model("api", APISchema);

module.exports = API;
