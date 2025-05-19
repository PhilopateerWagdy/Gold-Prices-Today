const mongoose = require("mongoose");
const moment = require("moment-timezone");

// 2- create schema
const MessageSchema = mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
  },
  date: {
    type: String,
  },
});

MessageSchema.pre("save", function (next) {
  // Calculate `pur` before saving the document
  this.date = moment().tz("Africa/Cairo").format("D-MM-YYYY HH:mm");
  // Call next() to proceed with saving the document
  next();
});

// 3- create model
const Messages = mongoose.model("messages", MessageSchema);

module.exports = Messages;
