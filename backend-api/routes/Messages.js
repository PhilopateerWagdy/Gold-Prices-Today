const express = require("express");
const router = express.Router();

const { addMessage } = require("../controllers/MessagesController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Messages Contoller.");
  nxt();
});

// add message
router.post("/", addMessage);

module.exports = router;
