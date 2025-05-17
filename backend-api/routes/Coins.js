const express = require("express");
const router = express.Router();

const {
  getCompanyCoins,
  getCoinsSizeOfComp,
  updateCoinsData,
} = require("../controllers/CoinsController");

// Middleware message
router.all("/", (req, res, nxt) => {
  console.log("request recieved in Coins Contoller.");
  nxt();
});

// get all ignots of company
router.get("/:comp", getCompanyCoins);

// get speific ignot size data
router.get("/:comp/:coin", getCoinsSizeOfComp);

// get all gold prices
// router.put("/", updateCoinsData);

module.exports = router;
