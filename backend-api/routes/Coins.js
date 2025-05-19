const express = require("express");
const router = express.Router();

const { updateCoinsData } = require("../controllers/CoinsController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Coins Contoller.");
  nxt();
});

// get all ignots of company
router.get("/:comp", updateCoinsData);

// get speific ignot size data
router.get("/:comp/:coin", updateCoinsData);

module.exports = router;
