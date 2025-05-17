const Messages = require("../database/MessagesDBModel");

const addMessage = (req, res) => {
  try {
    const mess = new Messages(req.body);
    mess.save();

    res.send("Message Sent!");
  } catch (err) {
    for (let e in err.errors) {
      console.log(err.errors[e].message);
      res.status(400).send("Can't Send Message.");
    }
  }
};

module.exports = { addMessage };
